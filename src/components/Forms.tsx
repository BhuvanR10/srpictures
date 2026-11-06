import { useState, useRef, useEffect, type FormEvent } from 'react';
import { checkFormRateLimit, recordFormSubmission } from '../lib/rateLimit';

type Errors = Record<string, string>;
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function Field({ error, id, children }: { error?: string; id: string; children: React.ReactNode }) {
  return (
    <>
      {children}
      {error && (
        <div className="text-size-small field-error text-red-400 mt-1 text-xs" id={`${id}-error`} role="alert">
          {error}
        </div>
      )}
    </>
  );
}

const SUCCESS_NOTE = 'Inquiry formatted! Connecting you directly to our WhatsApp studio team (+91 96322 08050)...';
const WHATSAPP_PHONE = '919632208050';

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [submittedWaUrl, setSubmittedWaUrl] = useState('');
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formLoadTime = useRef(Date.now());

  // Check initial rate limit on mount
  useEffect(() => {
    const check = checkFormRateLimit(45);
    if (!check.allowed) {
      setRateLimitSeconds(check.remainingSeconds);
    }
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    if (rateLimitSeconds <= 0) return;
    const timer = setInterval(() => {
      setRateLimitSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [rateLimitSeconds]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Rate Limit Check
    const rateCheck = checkFormRateLimit(45);
    if (!rateCheck.allowed) {
      setRateLimitSeconds(rateCheck.remainingSeconds);
      return;
    }

    const d = new FormData(e.currentTarget);

    // 2. Honeypot Anti-Bot Trap
    if (d.get('_gotcha')) {
      console.warn('Bot submission discarded via honeypot.');
      setDone(true);
      return;
    }

    // 3. Speed-trap verification (rejections under 1.2 seconds)
    if (Date.now() - formLoadTime.current < 1200) {
      console.warn('Bot submission discarded via speed trap.');
      setDone(true);
      return;
    }

    const er: Errors = {};
    const email = String(d.get('email') ?? '').trim();
    if (!email) er.email = 'Please enter your email address.';
    else if (!emailOk(email)) er.email = 'Please enter a valid email address.';
    if (!String(d.get('Subject') ?? '').trim()) er.Subject = 'Please add a subject or event type.';
    if (!String(d.get('Message') ?? '').trim()) er.Message = 'Please describe your dates or requirements.';

    setErrors(er);

    if (Object.keys(er).length === 0) {
      const name = String(d.get('name') ?? '').trim();
      const subject = String(d.get('Subject') ?? '').trim();
      const message = String(d.get('Message') ?? '').trim();

      const waText = [
        `*New Studio Enquiry — The SR Pictures*`,
        `👤 *Name:* ${name || 'Client'}`,
        `📧 *Email:* ${email}`,
        `📌 *Event / Service:* ${subject}`,
        `💬 *Requirements & Dates:* ${message}`,
        `\n_Sent via SR Pictures Web Portfolio_`
      ].join('\n');

      const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`;
      setSubmittedWaUrl(waUrl);

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setDone(true);
        recordFormSubmission();
        setRateLimitSeconds(45);
        try {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        } catch (err) {
          console.warn('Popup blocked by browser, user can click manual WhatsApp button:', err);
        }
      }, 500);
    }
  };

  const p = (k: string) => ({
    'aria-invalid': !!errors[k] || undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  });

  return (
    <div className="contact-form-wrapper w-form">
      {/* Quick Direct WhatsApp Access Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.977.574 3.824 1.564 5.385L2 22l4.734-1.528A9.99 9.99 0 0 0 12.031 22C17.567 22 22 17.505 22 12.031 22 6.495 17.567 2 12.031 2zm5.786 14.282c-.244.686-1.42 1.328-1.956 1.393-.509.062-1.168.087-3.483-.872-2.73-1.134-4.48-3.905-4.618-4.088-.137-.184-1.1-1.464-1.1-2.791 0-1.328.697-1.978.945-2.247.244-.27.533-.338.711-.338.177 0 .356.002.511.009.167.008.389-.063.608.463.227.547.777 1.9.845 2.038.068.138.114.3.023.483-.092.184-.138.298-.275.463-.137.165-.29.368-.413.494-.138.138-.282.288-.122.563.16.275.71 1.171 1.525 1.897 1.05.934 1.935 1.223 2.21 1.36.275.138.435.115.595-.069.16-.184.687-.798.87-1.073.183-.275.366-.23.618-.138.252.092 1.594.752 1.869.89.275.138.458.207.527.321.068.115.068.664-.176 1.35z" />
            </svg>
          </div>
          <div>
            <div className="text-white text-sm font-medium">Prefer Instant WhatsApp Chat?</div>
            <div className="text-xs text-neutral-400">Direct studio hotline: +91 96322 08050</div>
          </div>
        </div>
        <a
          href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hi The SR Pictures! I would like to inquire about booking your team for an upcoming event.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-emerald-950/40"
        >
          <span>Chat on WhatsApp</span>
          <span>→</span>
        </a>
      </div>

      <div className="form-heading">◉ Ready to start your project?</div>

      {rateLimitSeconds > 0 && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
          <span>Rate limit active: Please wait before sending another inquiry.</span>
          <span className="font-mono font-bold ml-2 px-2 py-0.5 rounded bg-black/40">
            {rateLimitSeconds}s
          </span>
        </div>
      )}

      <form className="contact-form" noValidate onSubmit={submit}>
        {/* Hidden Honeypot Field */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none' }}
          aria-hidden="true"
        />

        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          className="form-input w-input"
          maxLength={256}
          name="name"
          type="text"
          id="name"
          autoComplete="name"
          placeholder="Your Full Name"
        />
        <div className="spacer-small"></div>

        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <Field id="email" error={errors.email}>
          <input
            className="form-input w-input"
            maxLength={256}
            name="email"
            type="email"
            id="email"
            autoComplete="email"
            required
            placeholder="name@domain.com"
            {...p('email')}
          />
        </Field>
        <div className="spacer-small"></div>

        <label htmlFor="Subject" className="form-label">
          Subject / Event Type
        </label>
        <Field id="Subject" error={errors.Subject}>
          <input
            className="form-input w-input"
            maxLength={256}
            name="Subject"
            type="text"
            id="Subject"
            placeholder="e.g. Wedding Cinematography / Commercial"
            required
            {...p('Subject')}
          />
        </Field>
        <div className="spacer-small"></div>

        <label htmlFor="Message" className="form-label">
          Message &amp; Event Dates
        </label>
        <Field id="Message" error={errors.Message}>
          <textarea
            className="form-input is-text-area w-input"
            maxLength={5000}
            name="Message"
            id="Message"
            placeholder="Tell us about your dates, location, and vision..."
            required
            {...p('Message')}
          />
        </Field>
        <div className="spacer-small"></div>

        <div className="text-[11px] text-neutral-400 leading-relaxed mb-4">
          By submitting this form, you consent to The SR Pictures processing your contact information strictly to respond to your inquiry in accordance with our{' '}
          <a href="/privacy-policy" className="text-amber-400 underline hover:text-amber-300">
            Privacy Policy
          </a>{' '}
          pursuant to the Digital Personal Data Protection Act, 2023 (DPDP Act, India).
        </div>

        <button
          type="submit"
          disabled={isSubmitting || rateLimitSeconds > 0}
          className={`button w-button w-full sm:w-auto transition-all ${
            rateLimitSeconds > 0
              ? 'opacity-50 cursor-not-allowed bg-neutral-800'
              : 'hover:brightness-110'
          }`}
        >
          {isSubmitting
            ? 'Transmitting...'
            : rateLimitSeconds > 0
            ? `Cooldown (${rateLimitSeconds}s)`
            : 'Send Message'}
        </button>
      </form>

      {done && (
        <div className="form-message-success w-form-done mt-6 p-6 rounded-2xl bg-neutral-900 border border-emerald-500/30 text-center" style={{ display: 'block' }} role="status">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="text-emerald-400 font-semibold text-lg mb-1">Enquiry Prepared for WhatsApp!</div>
          <div className="text-sm text-neutral-300 max-w-md mx-auto mb-5">{SUCCESS_NOTE}</div>
          {submittedWaUrl && (
            <a
              href={submittedWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>Open in WhatsApp (+91 96322 08050)</span>
              <span>→</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function NewsletterForm({ id }: { id?: string }) {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rateLimitSeconds > 0) return;

    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim();
    const msg = !email
      ? 'Please enter your email address.'
      : !emailOk(email)
      ? 'Please enter a valid email address.'
      : '';
    setError(msg);

    if (!msg) {
      setDone(true);
      setRateLimitSeconds(30);
      const timer = setInterval(() => {
        setRateLimitSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <div id={id} className="newsletter-form-wrapper w-form">
      <form className="newsletter-form" noValidate onSubmit={submit}>
        <div className="input-wrap">
          <label htmlFor="nl-name" className="form-label">
            Name
          </label>
          <input
            className="form-input w-input"
            maxLength={256}
            name="name"
            type="text"
            id="nl-name"
            autoComplete="name"
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="nl-email" className="form-label">
            Email
          </label>
          <input
            className="form-input w-input"
            maxLength={256}
            name="email"
            type="email"
            id="nl-email"
            autoComplete="email"
            required
            aria-invalid={!!error || undefined}
            aria-describedby={error ? 'nl-error' : undefined}
          />
          {error && (
            <div className="text-size-small field-error" id="nl-error" role="alert">
              {error}
            </div>
          )}
        </div>
        <div className="text-[10px] text-neutral-400 mb-2">
          By subscribing, you consent to receiving updates in accordance with our{' '}
          <a href="/privacy-policy" className="text-amber-400 underline">Privacy Policy</a> (DPDP Act, 2023).
        </div>
        <button
          type="submit"
          disabled={rateLimitSeconds > 0}
          className="button is-form-submit w-button"
        >
          {rateLimitSeconds > 0 ? `Wait ${rateLimitSeconds}s` : 'Subscribe'}
        </button>
      </form>
      {done && (
        <div className="form-message-success w-form-done" style={{ display: 'block' }} role="status">
          <div>Subscribed! You will receive our latest stories and production updates.</div>
        </div>
      )}
    </div>
  );
}

export function StyleGuideForm() {
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState(false);
  return (
    <div className="form-component w-form">
      <form className="form-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-field-wrapper">
          <label htmlFor="First-Name" className="form-label">Text Input</label>
          <input className="form-input w-input" maxLength={256} name="First-Name" placeholder="First Name" type="text" id="First-Name" />
        </div>
        <div className="form-field-wrapper">
          <label htmlFor="sg-message" className="form-label">Text Area</label>
          <textarea id="sg-message" name="Message" maxLength={5000} placeholder="Message" className="form-input is-text-area w-input" />
        </div>
        <div className="form-field-wrapper">
          <label htmlFor="Select" className="form-label">Select field</label>
          <select id="Select" name="Select" className="form-input is-select-input w-select" defaultValue="">
            <option value="">Select one...</option>
            <option value="First">First Choice</option>
            <option value="Second">Second Choice</option>
            <option value="Third">Third Choice</option>
          </select>
        </div>
        <div className="form-field-wrapper">
          <span className="form-label">Checkbox field</span>
          <label className="w-checkbox form-checkbox">
            <div className={`w-checkbox-input w-checkbox-input--inputType-custom form-checkbox-icon${checked ? ' w--redirected-checked' : ''}`}></div>
            <input type="checkbox" name="Checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} style={{ opacity: 0, position: 'absolute', zIndex: -1 }} />
            <span className="form-checkbox-label w-form-label">Checkbox</span>
          </label>
        </div>
        <div className="form-field-wrapper">
          <span className="form-label">Radio button</span>
          <label className="form-radio w-radio">
            <div className={`w-form-formradioinput w-form-formradioinput--inputType-custom form-radio-icon w-radio-input${radio ? ' w--redirected-checked' : ''}`}></div>
            <input type="radio" name="Radio" checked={radio} onChange={() => setRadio(true)} style={{ opacity: 0, position: 'absolute', zIndex: -1 }} />
            <span className="form-radio-label w-form-label">Radio</span>
          </label>
        </div>
        <input type="submit" className="button is-form-submit w-button" value="Submit" />
      </form>
    </div>
  );
}
