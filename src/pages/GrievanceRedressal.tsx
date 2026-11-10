import { Link } from 'react-router-dom';
import { usePageSeo } from '../lib/usePageSeo';

export default function GrievanceRedressal() {
  usePageSeo({
    title: 'Grievance Redressal Portal | The SR Pictures',
    description: 'Designated Grievance Officer and Data Protection Redressal mechanism for The SR Pictures.',
  });
  return (
    <>
      <div id="top" className="top"></div>
      <header className="section-licenses-header pt-28 sm:pt-36 pb-8">
        <div className="padding-global">
          <div className="container-large">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-4">
                Statutory Redressal Mechanism
              </span>
              <h1 className="legal-header-title text-white">Grievance Redressal Portal</h1>
              <div className="spacer-tiny"></div>
              <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
                Mandatory disclosure under Section 13 of the Digital Personal Data Protection Act, 2023 (DPDP Act) and Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="section-licenses-content py-8 sm:py-12">
        <div className="padding-global">
          <div className="legal-doc-container">
            <div className="space-y-10 text-neutral-300 font-sans">

              {/* Statutory Commitment */}
              <div className="legal-card-panel">
                <h2 className="legal-section-title">1. Legal Commitment &amp; Transparency</h2>
                <p className="text-sm text-neutral-300 m-0">
                  <strong>The SR Pictures</strong> is deeply committed to upholding user privacy, digital rights, and ethical customer care. Pursuant to the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the <strong>Information Technology Act, 2000</strong>, we provide this dedicated statutory channel to enable Data Principals and clients to lodge grievances, seek rectification, or exercise their statutory data rights.
                </p>
              </div>

              {/* Designated Grievance Officer */}
              <div className="legal-card-panel border-amber-500/20">
                <h2 className="legal-section-title text-amber-200">2. Designated Grievance &amp; Data Protection Officer</h2>
                <p className="text-sm text-neutral-300 mb-4">
                  In compliance with statutory requirements, our appointed Grievance Officer details are published below for prompt communication:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-neutral-300">
                  <div>
                    <span className="text-white block font-semibold">Grievance Officer:</span>
                    S. R. Gowda (Legal &amp; Operations Desk)
                  </div>
                  <div>
                    <span className="text-white block font-semibold">Entity:</span>
                    The SR Pictures
                  </div>
                  <div>
                    <span className="text-white block font-semibold">Physical Address:</span>
                    Bengaluru, Karnataka - 560076, India
                  </div>
                  <div>
                    <span className="text-white block font-semibold">Statutory Email:</span>
                    thesrpictures@gmail.com
                  </div>
                  <div>
                    <span className="text-white block font-semibold">Direct Telephone:</span>
                    +91 99861 55516
                  </div>
                  <div>
                    <span className="text-white block font-semibold">Operational Hours:</span>
                    Mon – Sat: 10:00 AM – 6:30 PM IST
                  </div>
                </div>
              </div>

              {/* 3-Step Redressal Process */}
              <div>
                <h2 className="legal-section-title">3. Redressal Procedure &amp; Statutory Timelines</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">Step 01</div>
                      <h3 className="legal-subsection-title">Filing the Grievance</h3>
                      <p className="text-xs text-neutral-400 m-0 leading-relaxed">
                        Email <strong>thesrpictures@gmail.com</strong> with subject <em>"ATTN: Grievance Officer"</em>, outlining your full name, contact information, relevant booking invoice number (if applicable), and description of your concern.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">Step 02</div>
                      <h3 className="legal-subsection-title">Mandatory Acknowledgment</h3>
                      <p className="text-xs text-neutral-400 m-0 leading-relaxed">
                        Under Indian IT rules, your communication will be logged and formally acknowledged with a unique Grievance Reference ID within <strong>24 hours</strong> of receipt.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">Step 03</div>
                      <h3 className="legal-subsection-title">Resolution</h3>
                      <p className="text-xs text-neutral-400 m-0 leading-relaxed">
                        The Grievance Officer will investigate the matter and deliver a formal resolution or redressal within <strong>15 calendar days</strong> (never exceeding the 30-day statutory ceiling).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Rights Requests */}
              <div className="legal-card-panel">
                <h2 className="legal-section-title">4. Exercising Data Principal Rights</h2>
                <p className="text-sm text-neutral-300 mb-3">
                  Data Principals may submit requests directly to the Grievance Officer for:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-400 text-sm">
                  <li><strong>Data Access:</strong> Requesting an audit summary of personal information held by The SR Pictures.</li>
                  <li><strong>Data Rectification:</strong> Amending misspelled names, addresses, or phone numbers.</li>
                  <li><strong>Data Erasure:</strong> Requesting removal of contact records or public portfolio photos from digital channels.</li>
                  <li><strong>Nomination:</strong> Registering a nominee under Section 14 of the DPDP Act 2023.</li>
                </ul>
              </div>

              {/* Statutory Regulatory Escalation */}
              <div className="legal-card-panel">
                <h2 className="legal-section-title">5. Escalation to the Data Protection Board of India</h2>
                <p className="text-sm text-neutral-300 mb-4">
                  Under Section 13(3) of the DPDP Act 2023, if your grievance is not resolved by our Grievance Officer within 30 days, or if you are unsatisfied with the resolution provided, you hold the statutory right to file a formal complaint before the:
                </p>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-neutral-300 space-y-1">
                  <div className="text-white font-semibold">Data Protection Board of India (DPBI)</div>
                  <div className="text-neutral-400 text-xs">Ministry of Electronics and Information Technology, Government of India</div>
                  <div className="text-amber-400 text-xs">Official Portal: https://www.meity.gov.in / Designated DPBI Portal</div>
                </div>
                <p className="text-xs text-neutral-400 mt-4 leading-relaxed">
                  Additionally, for consumer service disputes, individuals may access the <strong>National Consumer Helpline (NCH)</strong> under the Ministry of Consumer Affairs, Government of India (Toll-free: 1915 or consumerhelpline.gov.in).
                </p>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                <div className="text-xs text-neutral-500 font-mono">
                  THE SR PICTURES • BENGALURU, KARNATAKA
                </div>
                <div className="flex gap-4 text-xs font-mono">
                  <Link to="/privacy-policy" className="text-amber-400 hover:underline">Privacy Policy</Link>
                  <Link to="/terms-of-service" className="text-amber-400 hover:underline">Terms of Service</Link>
                  <Link to="/cancellation-refund" className="text-amber-400 hover:underline">Cancellation Policy</Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
