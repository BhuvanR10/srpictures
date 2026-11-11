import { Link } from 'react-router-dom';
import { usePageSeo } from '../lib/usePageSeo';

export default function CancellationRefund() {
  usePageSeo({
    title: 'Cancellation & Refund Policy | The SR Pictures Bengaluru',
    description: 'Transparent cancellation, rescheduling and refund matrix for photography and cinematography bookings with The SR Pictures.',
    canonicalPath: '/legal/cancellation-refund',
  });
  return (
    <>
      <div id="top" className="top"></div>
      <header className="section-licenses-header pt-28 sm:pt-36 pb-8">
        <div className="padding-global">
          <div className="container-large">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-4">
                Consumer Protection Rules Compliant
              </span>
              <h1 className="legal-header-title text-white">Cancellation &amp; Refund Policy</h1>
              <div className="spacer-tiny"></div>
              <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
                Last Updated: November 2026 • Formulated under the Consumer Protection (E-Commerce) Rules, 2020 and Consumer Protection Act, 2019 of India.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="section-licenses-content py-8 sm:py-12">
        <div className="padding-global">
          <div className="legal-doc-container">
            <div className="space-y-10 text-neutral-300 font-sans">

              {/* Purpose and Exclusivity */}
              <div className="legal-card-panel">
                <h2 className="legal-section-title">1. Nature of Bespoke Production Bookings</h2>
                <p className="text-sm text-neutral-300 mb-3">
                  At <strong>The SR Pictures</strong>, we accept a strictly limited number of wedding assignments and cinematic commissions each season to ensure uncompromising artistic quality.
                </p>
                <p className="text-xs text-neutral-400 m-0">
                  When you book our crew for specific dates, we turn away all other prospective commissions for those exact dates, reserve cinema camera packages, and commit lead cinematographers and sound recordists. As such, our cancellation and rescheduling policies are structured transparently in accordance with fair trade principles under the <strong>Consumer Protection (E-Commerce) Rules, 2020</strong>.
                </p>
              </div>

              {/* Booking Advance (Retainer) */}
              <div>
                <h2 className="legal-section-title">2. Advance Booking Deposit</h2>
                <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-400 text-sm">
                  <li>To formally secure your calendar dates, a <strong>40% booking deposit (retainer fee)</strong> is required upon execution of the service quotation.</li>
                  <li>This deposit compensates the Studio for date reservation, pre-production planning, creative briefings, and potential lost booking opportunities.</li>
                </ul>
              </div>

              {/* Cancellation Matrix Table */}
              <div className="legal-card-panel border-amber-500/20">
                <h2 className="legal-section-title text-amber-200">3. Cancellation Timelines &amp; Refund Matrix</h2>
                <p className="text-sm text-neutral-300 mb-4">
                  If the Client cancels a confirmed booking for personal reasons, written notice must be submitted via email to <strong className="text-white">thesrpictures@gmail.com</strong>. Refunds are calculated based on the interval between the written notice and the scheduled event date:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm font-sans border-collapse">
                    <thead>
                      <tr className="border-b border-white/20 text-white font-mono text-xs uppercase tracking-wider">
                        <th className="py-3 px-4">Notice Period Prior to Event</th>
                        <th className="py-3 px-4">Refund of Booking Advance</th>
                        <th className="py-3 px-4">Alternate Studio Credit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-neutral-300 text-xs sm:text-sm">
                      <tr>
                        <td className="py-3.5 px-4 font-medium text-white">More than 60 calendar days</td>
                        <td className="py-3.5 px-4 text-emerald-400 font-semibold">70% Refund</td>
                        <td className="py-3.5 px-4 text-amber-300">100% Studio Credit (valid 12 mos)</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-medium text-white">Between 30 to 60 calendar days</td>
                        <td className="py-3.5 px-4 text-emerald-400 font-semibold">40% Refund</td>
                        <td className="py-3.5 px-4 text-amber-300">70% Studio Credit (valid 12 mos)</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-medium text-white">Less than 30 calendar days</td>
                        <td className="py-3.5 px-4 text-red-400 font-semibold">Non-Refundable</td>
                        <td className="py-3.5 px-4 text-neutral-400">Evaluated on compassionate basis</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Date Rescheduling */}
              <div>
                <h2 className="legal-section-title">4. Event Rescheduling Policy</h2>
                <div className="space-y-3 text-sm text-neutral-400">
                  <p>
                    <strong>Rescheduling Notice:</strong> If you need to postpone or shift your wedding or event dates, notify us in writing at least <strong>15 days</strong> prior to the initial date.
                  </p>
                  <p>
                    <strong>Calendar Availability:</strong> If our crew is available on the newly requested date, your entire advance payment will be transferred to the new date without any penalty or administrative charge.
                  </p>
                  <p>
                    <strong>Date Conflicts:</strong> If the newly requested date is already booked by another client, the cancellation provisions outlined above will apply, or the Client may convert the balance into a floating studio credit note valid for up to 12 months.
                  </p>
                </div>
              </div>

              {/* Refund Processing Mode & Timelines */}
              <div className="legal-card-panel">
                <h2 className="legal-section-title">5. Statutory Refund Processing Timelines</h2>
                <p className="text-sm text-neutral-300 mb-3">
                  Under the Consumer Protection (E-Commerce) Rules 2020, once a cancellation request is verified and approved:
                </p>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono text-neutral-300">
                  <div><strong className="text-amber-400">Processing Window:</strong> 7 to 10 working days from the date of written approval.</div>
                  <div><strong className="text-amber-400">Mode of Repayment:</strong> Credited directly to the original bank account, UPI ID, or card used during the transaction.</div>
                  <div><strong className="text-amber-400">Transaction Deductions:</strong> Actual bank gateway handling fees (typically 1.5% - 2%) charged by payment aggregators will be deducted at cost.</div>
                </div>
              </div>

              {/* Force Majeure Cancellations */}
              <div>
                <h2 className="legal-section-title">6. Force Majeure &amp; Unforeseen Government Restrictions</h2>
                <p className="text-sm text-neutral-400">
                  In instances of statutory pandemic lockdowns, natural disasters, or government directives preventing assembly, 100% of the advance amount will be converted into a non-expiring credit voucher applicable to any future shoot or family milestone session.
                </p>
              </div>

              {/* Contact for Inquiries */}
              <div className="legal-card-panel">
                <h2 className="legal-section-title">7. Cancellation Desk Contact</h2>
                <p className="text-sm text-neutral-300 mb-4">
                  For any questions regarding cancellations, date transfers, or refund statuses, please reach out to our billing desk:
                </p>
                <div className="text-xs font-mono text-neutral-300 space-y-1">
                  <div><strong>Email:</strong> thesrpictures@gmail.com</div>
                  <div><strong>Subject Line:</strong> CANCELLATION REQUEST - [Booking Invoice / Client Name]</div>
                  <div><strong>Hotline:</strong> +91 99861 55516</div>
                  <div><strong>Studio Address:</strong> Bengaluru, Karnataka - 560076, India</div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                <div className="text-xs text-neutral-500 font-mono">
                  THE SR PICTURES • BENGALURU, KARNATAKA
                </div>
                <div className="flex gap-4 text-xs font-mono">
                  <Link to="/privacy-policy" className="text-amber-400 hover:underline">Privacy Policy</Link>
                  <Link to="/terms-of-service" className="text-amber-400 hover:underline">Terms of Service</Link>
                  <Link to="/grievance-redressal" className="text-amber-400 hover:underline">Grievance Portal</Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
