import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <>
      <div id="top" className="top"></div>
      <header className="section-licenses-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-top-header">
              <div className="spacer-medium"></div>
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-4">
                  Indian Contract Act &amp; Copyright Framework
                </span>
                <h1 className="heading-style-h2 text-white">Terms of Service</h1>
                <div className="spacer-tiny"></div>
                <p className="text-size-medium text-neutral-400">
                  Effective Date: November 2026 • Governed by the laws of India, including the Indian Contract Act, 1872, Copyright Act, 1957, and DGCA Drone Regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section-licenses-content py-12 sm:py-16">
        <div className="padding-global">
          <div className="container-large max-w-4xl mx-auto">
            <div className="space-y-12 text-neutral-300 leading-relaxed font-sans">

              {/* Introduction & Binding Nature */}
              <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-white/10">
                <h2 className="text-xl sm:text-2xl font-serif text-white mb-3">1. Agreement to Terms</h2>
                <p className="mb-3">
                  These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("Client", "you"), and <strong>The SR Pictures</strong> ("Studio", "we", "us", or "our"), concerning your access to our website and the provision of photography, cinematography, post-production, and drone imaging services.
                </p>
                <p className="text-sm text-neutral-400">
                  By engaging our services, remitting a booking deposit, or signing a shoot contract, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms under the <strong>Indian Contract Act, 1872</strong>.
                </p>
              </div>

              {/* Scope of Production Services */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif text-white mb-4">2. Scope of Services & Booking Confirmation</h2>
                <p className="mb-3">
                  The SR Pictures provides specialized visual production services, including wedding cinematography, candid wedding photography, traditional portraiture, pre-wedding &amp; engagement films, maternity &amp; newborn sessions, commercial fashion, and corporate event documentation.
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-400 text-sm">
                  <li><strong>Date Exclusivity:</strong> Dates are blocked on our master calendar only upon receipt of the agreed initial booking advance and formal written confirmation.</li>
                  <li><strong>Crew Allocation:</strong> Production crew size, camera equipment, lighting gears, and audio setups are allocated strictly based on the mutually agreed package quotation.</li>
                  <li><strong>Shoot Hours:</strong> Scheduled shoot hours are consecutive. Extended coverage beyond agreed timelines will incur overtime fees as specified in the service schedule.</li>
                </ul>
              </div>

              {/* Intellectual Property & Copyright Act, 1957 */}
              <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-amber-500/20">
                <h2 className="text-xl sm:text-2xl font-serif text-white mb-3">3. Copyright &amp; Intellectual Property Ownership</h2>
                <p className="mb-3">
                  Under Section 17 of the <strong>Indian Copyright Act, 1957</strong>, the copyright of all photographic works, cinematic captures, RAW digital negatives, and video edits created during the assignment remains the exclusive intellectual property of <strong>The SR Pictures</strong>:
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong className="text-amber-300 block">Client Usage License:</strong>
                    Upon receipt of full payment, the Client is granted a perpetual, non-exclusive, non-transferable license to view, reproduce, print, and share finalized high-resolution photographs and edited films for personal, family, and non-commercial purposes across private social media profiles.
                  </div>
                  <div>
                    <strong className="text-amber-300 block">Commercial Restriction:</strong>
                    No images or films may be licensed, sublicensed, sold, or supplied to third-party commercial vendors (e.g. makeup artists, banquet venues, decorators, attire designers) for commercial advertising without explicit written consent and licensing terms from The SR Pictures.
                  </div>
                  <div>
                    <strong className="text-amber-300 block">Studio Promotional Rights:</strong>
                    Unless a written Non-Disclosure Agreement (NDA) or privacy exemption is mutually signed prior to production, the Studio reserves the legitimate right to display select edited works across its official website portfolio, social media channels, and award submissions.
                  </div>
                </div>
              </div>

              {/* DGCA Drone Regulations Compliance */}
              <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-white/10">
                <h2 className="text-xl sm:text-2xl font-serif text-white mb-3">4. Aerial Drone Cinematography &amp; DGCA Compliance</h2>
                <p className="mb-3 text-sm">
                  All aerial cinematography operations conducted by The SR Pictures strictly comply with the <strong>Drone Rules, 2021</strong> framed by the Ministry of Civil Aviation, Government of India, and the Directorate General of Civil Aviation (DGCA):
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-400 text-sm">
                  <li><strong>Airspace Zoning:</strong> Drone operations are subject to Digital Sky airspace categorization. Flights are strictly prohibited within designated Red Zones (e.g. within vicinity of airports, military bases, high-security state assets) and require statutory clearance in Yellow Zones.</li>
                  <li><strong>Safety & Weather Contingency:</strong> The certified drone remote pilot in command holds absolute discretionary authority to cancel or abort flights in case of torrential rainfall, heavy wind gusts, electrical storms, or dense bird activity. In such events, the safety of human life and equipment takes precedence.</li>
                  <li><strong>Venue Clearances:</strong> The Client is solely responsible for obtaining venue management permissions and local municipal approvals for drone takeoff and operation over private event grounds.</li>
                </ul>
              </div>

              {/* Client Cooperation & Deliverables */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif text-white mb-4">5. Production Deliverables & Revision Guidelines</h2>
                <div className="space-y-3 text-sm text-neutral-400">
                  <p>
                    <strong>Delivery Timelines:</strong> Highlight films, teaser clips, and curated photo previews are typically delivered within 3 to 6 weeks. Master wedding films, documentary edits, and complete photo galleries are released within 8 to 12 weeks post-event, allowing for cinematic color grading and audio mastering.
                  </p>
                  <p>
                    <strong>Revisions:</strong> Video edits include up to two (2) complimentary rounds of minor editorial adjustments (e.g., specific family footage swaps, title spelling corrections). Structural overhauls or music changes requested after approval will be billed on hourly post-production rates.
                  </p>
                  <p>
                    <strong>RAW Media:</strong> Unedited RAW camera files and uncompressed sensor dumps represent proprietary studio working files and are not released as part of standard packages unless specifically contracted.
                  </p>
                </div>
              </div>

              {/* Payment Terms & Invoicing */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif text-white mb-4">6. Payment Terms &amp; Taxes</h2>
                <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-400 text-sm">
                  <li><strong>Advance Deposit:</strong> 40% non-refundable booking deposit required upon date confirmation.</li>
                  <li><strong>Pre-Event Milestone:</strong> 50% due on or prior to the first day of shooting/coverage.</li>
                  <li><strong>Final Balance:</strong> 10% due prior to dispatch of high-resolution print deliverables, customized albums, and external hard drives.</li>
                  <li><strong>Taxation:</strong> Applicable Goods &amp; Services Tax (GST) will be charged on invoices as mandated by the Government of India.</li>
                </ul>
              </div>

              {/* Force Majeure & Limitation of Liability */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif text-white mb-4">7. Force Majeure &amp; Limitation of Liability</h2>
                <p className="text-sm text-neutral-400 mb-3">
                  Neither party shall be liable for failure to perform obligations if hindered or delayed by a Force Majeure event, including acts of God, extreme natural calamities, pandemics, government curfews, civic disturbances, or sudden venue sealings. In such cases, both parties will make bona fide efforts to reschedule to an agreeable alternate date.
                </p>
                <p className="text-sm text-neutral-400">
                  <strong>Liability Cap:</strong> In the highly improbable event of total mechanical failure, theft, corrupted digital media cards, or team illness where we are unable to supply contracted deliverables, the maximum aggregate liability of The SR Pictures shall be strictly limited to the actual sums paid by the Client to the Studio.
                </p>
              </div>

              {/* Governing Law & Bengaluru Jurisdiction */}
              <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/80 border border-white/10">
                <h2 className="text-xl sm:text-2xl font-serif text-white mb-3">8. Governing Law &amp; Exclusive Jurisdiction</h2>
                <p className="text-sm mb-3 text-neutral-300">
                  This Agreement and any dispute, controversy, or claim arising out of or relating to it shall be governed by, interpreted, and construed in accordance with the substantive laws of the <strong>Republic of India</strong>.
                </p>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-sm font-mono text-amber-300">
                  The competent civil and commercial courts situated exclusively in <strong>Bengaluru, Karnataka, India</strong> shall have exclusive jurisdiction to settle any disputes or legal proceedings arising out of this Agreement.
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                <div className="text-xs text-neutral-500 font-mono">
                  THE SR PICTURES • BENGALURU, KARNATAKA
                </div>
                <div className="flex gap-4 text-xs font-mono">
                  <Link to="/privacy-policy" className="text-amber-400 hover:underline">Privacy Policy</Link>
                  <Link to="/cancellation-refund" className="text-amber-400 hover:underline">Cancellation Policy</Link>
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

