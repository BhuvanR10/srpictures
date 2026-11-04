import { useState } from 'react';

const WHATSAPP_NUMBER = '919632208050';
const DEFAULT_MESSAGE =
  "Hi The SR Pictures! I would like to inquire about your photography and cinematography services.";

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none">
      {/* Tooltip on hover */}
      <div
        className={`hidden sm:flex items-center px-3.5 py-1.5 rounded-full bg-zinc-900/95 border border-white/15 text-white text-xs font-medium shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2" />
        <span>Chat on WhatsApp</span>
        <span className="text-neutral-400 font-mono text-[10px] ml-1.5">+91 96322 08050</span>
      </div>

      {/* Sleek Dark Glassmorphic Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat on WhatsApp with The SR Pictures (+91 96322 08050)"
        className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-zinc-900/90 hover:bg-emerald-950/40 backdrop-blur-md border border-white/15 hover:border-emerald-500/50 text-white hover:text-emerald-300 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        {/* Subtle ambient hover tint */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors duration-300 pointer-events-none" />

        {/* Clean WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          className="relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
        >
          <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.977.574 3.824 1.564 5.385L2 22l4.734-1.528A9.99 9.99 0 0 0 12.031 22C17.567 22 22 17.505 22 12.031 22 6.495 17.567 2 12.031 2zm5.786 14.282c-.244.686-1.42 1.328-1.956 1.393-.509.062-1.168.087-3.483-.872-2.73-1.134-4.48-3.905-4.618-4.088-.137-.184-1.1-1.464-1.1-2.791 0-1.328.697-1.978.945-2.247.244-.27.533-.338.711-.338.177 0 .356.002.511.009.167.008.389-.063.608.463.227.547.777 1.9.845 2.038.068.138.114.3.023.483-.092.184-.138.298-.275.463-.137.165-.29.368-.413.494-.138.138-.282.288-.122.563.16.275.71 1.171 1.525 1.897 1.05.934 1.935 1.223 2.21 1.36.275.138.435.115.595-.069.16-.184.687-.798.87-1.073.183-.275.366-.23.618-.138.252.092 1.594.752 1.869.89.275.138.458.207.527.321.068.115.068.664-.176 1.35z" />
        </svg>
      </a>
    </div>
  );
}
