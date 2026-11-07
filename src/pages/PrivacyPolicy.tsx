import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <>
      <div id="top" className="top"></div>
      <header className="section-licenses-header pt-28 sm:pt-36 pb-8">
        <div className="padding-global">
          <div className="container-large">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-4">
                DPDP Act, 2023 Compliant Notice
              </span>
              <h1 className="legal-header-title text-white">Privacy Policy</h1>
              <div className="spacer-tiny"></div>
              <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
                Last Updated: November 2026 • Governed under the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000 of India.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="section-licenses-content py-8 sm:py-12">
        <div className="padding-global">
          <div className="legal-doc-container">
            <div className="space-y-10 text-neutral-300 font-sans">

              {/* Data Fiduciary Declaration */}
              <div className="legal-card-panel">
                <h2 className="legal-section-title">1. Identity of the Data Fiduciary</h2>
                <p className="mb-4 text-sm text-neutral-300">
                  Under the provisions of the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, this Privacy Policy outlines how <strong>The SR Pictures</strong> ("Studio", "we", "us", or "our"), functioning as the <em>Data Fiduciary</em>, collects, verifies, stores, uses, and safeguards personal data provided by individuals ("Data Principals") interacting with our website, booking our photography and cinematography services, or communicating with our team.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-neutral-400 pt-3 border-t border-white/10">
                  <div>
                    <span className="text-white block font-semibold">Data Fiduciary:</span>
                    The SR Pictures
                  </div>
                  <div>
                    <span className="text-white block font-semibold">Registered Location:</span>
                    Bengaluru, Karnataka - 560076, India
                  </div>
                  <div>
                    <span className="text-white block font-semibold">Official Contact:</span>
                    +91 99861 55516
                  </div>
                  <div>
                    <span className="text-white block font-semibold">Designated Data Desk:</span>
                    thesrpictures@gmail.com
                  </div>
                </div>
              </div>

              {/* Scope & Grounds for Processing */}
              <div>
                <h2 className="legal-section-title">2. Grounds for Processing Personal Data</h2>
                <p className="mb-3 text-sm text-neutral-300">
                  In compliance with Section 6 of the DPDP Act 2023, The SR Pictures only processes digital personal data for specified lawful purposes based on your free, specific, informed, unconditional, and unambiguous consent, or for legitimate uses such as:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-400 text-sm">
                  <li>Processing service inquiries submitted through web forms, WhatsApp, phone, or email.</li>
                  <li>Execution and fulfillment of photography, cinematography, drone filming, and editing contracts.</li>
                  <li>Issuing booking agreements, invoices, GST receipts, and transaction records.</li>
                  <li>Delivering finalized digital photographs, video reels, hard drives, and cloud gallery albums.</li>
                  <li>Complying with applicable laws, tax mandates, and regulatory obligations in the Republic of India.</li>
                </ul>
              </div>

              {/* Data We Collect */}
              <div>
                <h2 className="legal-section-title">3. Categories of Personal Data Collected</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h3 className="legal-subsection-title">A. Contact &amp; Identification Information</h3>
                    <p className="text-sm text-neutral-400 m-0">
                      Full name, telephone / WhatsApp number, email address, billing address, and event venue location within India.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h3 className="legal-subsection-title">B. Visual Media &amp; Imagery</h3>
                    <p className="text-sm text-neutral-400 m-0">
                      Photographs, video recordings, audio captures, and aerial drone footage recorded during contracted client assignments (e.g. weddings, engagements, corporate events, portrait sessions).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h3 className="legal-subsection-title">C. Technical &amp; Diagnostic Telemetry</h3>
                    <p className="text-sm text-neutral-400 m-0">
                      Internet Protocol (IP) addresses, device user-agent strings, session cookies, and referrer headers collected automatically for site security, spam prevention, and operational integrity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Principal Rights */}
              <div className="legal-card-panel border-amber-500/20">
                <h2 className="legal-section-title text-amber-200">4. Your Statutory Rights under DPDP Act, 2023</h2>
                <p className="mb-4 text-sm text-neutral-300">
                  As a Data Principal under Indian law, you are endowed with the following statutory rights, enforceable without undue charge:
                </p>
                <div className="space-y-3.5 text-sm">
                  <div>
                    <strong className="text-amber-300 block">Right to Access Information (Section 11):</strong>
                    <span className="text-neutral-400">You may request a summary of the personal data being processed by us and the identities of any third-party processors (e.g., cloud delivery providers) with whom it has been shared.</span>
                  </div>
                  <div>
                    <strong className="text-amber-300 block">Right to Correction &amp; Erasure (Section 12):</strong>
                    <span className="text-neutral-400">You may request the correction of inaccurate or misleading data, completion of incomplete data, or erasure of personal data that is no longer necessary for the purpose it was collected.</span>
                  </div>
                  <div>
                    <strong className="text-amber-300 block">Right of Grievance Redressal (Section 13):</strong>
                    <span className="text-neutral-400">You have an unhindered right to have your grievances resolved within statutory timelines through our designated Grievance Officer.</span>
                  </div>
                  <div>
                    <strong className="text-amber-300 block">Right to Nominate (Section 14):</strong>
                    <span className="text-neutral-400">You have the right to nominate any other individual who shall, in the event of your death or incapacity, exercise your data rights.</span>
                  </div>
                  <div>
                    <strong className="text-amber-300 block">Right to Withdraw Consent:</strong>
                    <span className="text-neutral-400">Where processing is based on consent (such as public portfolio display or marketing communications), you may withdraw consent at any time with comparable ease.</span>
                  </div>
                </div>
              </div>

              {/* Data Retention & Security */}
              <div>
                <h2 className="legal-section-title">5. Storage, Retention &amp; Reasonable Security Practices</h2>
                <p className="mb-3 text-sm text-neutral-300">
                  Under the <em>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</em>:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-400 text-sm">
                  <li>Client media files and RAW captures are stored across encrypted external hardware and high-security enterprise cloud storage with strict role-based access.</li>
                  <li>Client delivery galleries remain active for a contracted duration (standard 90 to 180 days post-final release) after which raw working caches are safely purged.</li>
                  <li>Inquiry correspondence and billing receipts are retained for the minimum period necessitated by Indian taxation and audit requirements.</li>
                </ul>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="legal-section-title">6. Protection of Minors (Section 9 Compliance)</h2>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  We do not knowingly process personal data of children (individuals under 18 years of age) without verifiable parental or lawful guardian consent. Photography or videography capturing children during family events or weddings is conducted strictly under the auspices of the contracted adult guardians.
                </p>
              </div>

              {/* Statutory Grievance Redressal Mechanism */}
              <div className="legal-card-panel">
                <h2 className="legal-section-title">7. Grievance Officer &amp; Redressal Mechanism</h2>
                <p className="text-sm mb-4 text-neutral-300">
                  In compliance with Section 13 of the DPDP Act 2023 and Rule 5(9) of the Information Technology Rules, any grievance, complaint, or exercise of Data Principal rights must be addressed to our designated Grievance Officer:
                </p>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono text-neutral-300">
                  <div><strong className="text-white">Designation:</strong> Grievance Officer &amp; Data Protection Officer</div>
                  <div><strong className="text-white">Entity:</strong> The SR Pictures</div>
                  <div><strong className="text-white">Address:</strong> Bengaluru, Karnataka - 560076, India</div>
                  <div><strong className="text-white">Email:</strong> thesrpictures@gmail.com (Subject: DPDP Grievance Notice)</div>
                  <div><strong className="text-white">Hotline:</strong> +91 99861 55516</div>
                </div>
                <p className="text-xs text-neutral-400 mt-4 leading-relaxed">
                  Grievances will be formally acknowledged within <strong>24 hours</strong> of receipt and addressed within the statutory window of <strong>15 to 30 calendar days</strong>. If not resolved satisfactorily, you hold the statutory right to escalate your complaint to the <strong>Data Protection Board of India (DPBI)</strong>.
                </p>
              </div>

              {/* Cross-Border Transfers & Links */}
              <div>
                <h2 className="legal-section-title">8. Cross-Border Data Transfers &amp; Third-Party Services</h2>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  We do not transfer personal data to any foreign territories restricted by Central Government notifications. Third-party cloud service providers (such as AWS, Google Cloud, WhatsApp Business API) utilized for gallery distribution or messaging comply with rigorous global encryption and data localization standards.
                </p>
              </div>

              {/* Updates to this Policy */}
              <div>
                <h2 className="legal-section-title">9. Amendments to this Policy</h2>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  The SR Pictures reserves the right to amend this Privacy Policy periodically to reflect technological, operational, or statutory changes issued by the Ministry of Electronics and Information Technology (MeitY) or the Data Protection Board of India. Updated notices will be published directly on this URL with an updated revision date.
                </p>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                <div className="text-xs text-neutral-500 font-mono">
                  THE SR PICTURES • BENGALURU, KARNATAKA
                </div>
                <div className="flex gap-4 text-xs font-mono">
                  <Link to="/terms-of-service" className="text-amber-400 hover:underline">Terms of Service</Link>
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
