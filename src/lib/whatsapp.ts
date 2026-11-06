/**
 * Shared WhatsApp configuration and pre-built inquiry links for The SR Pictures.
 */
export const WHATSAPP_PHONE = '919986155516';

export const WHATSAPP_GET_IN_TOUCH_MESSAGE = [
  'Hello The SR Pictures! 📸',
  'I am reaching out via your portfolio website and would like to inquire about booking your photography & cinematography services for an upcoming event.',
  'Could you please share your availability and package details?',
].join('\n\n');

export const WHATSAPP_GET_IN_TOUCH_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  WHATSAPP_GET_IN_TOUCH_MESSAGE
)}`;

