// ==============================|| ICIMS WEBSITE UTILITIES ||============================== //

// Scroll to section utility
export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Form validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateIC = (ic: string): boolean => {
  // Basic Malaysian IC validation (12 digits)
  const icRegex = /^\d{12}$/;
  return icRegex.test(ic.replace(/[-\s]/g, ''));
};

export const validatePhone = (phone: string): boolean => {
  // Basic Malaysian phone number validation
  const phoneRegex = /^(\+?6?01[0-9]{8,9}|0[0-9]{8,9})$/;
  return phoneRegex.test(phone.replace(/[-\s]/g, ''));
};

// Format utilities
export const formatIC = (ic: string): string => {
  const cleaned = ic.replace(/[-\s]/g, '');
  if (cleaned.length === 12) {
    return `${cleaned.slice(0, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8)}`;
  }
  return ic;
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/[-\s]/g, '');
  if (cleaned.startsWith('60')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+6${cleaned}`;
  }
  return phone;
};

// Custom event utilities
export const triggerRegistrationDialog = () => {
  const event = new CustomEvent('openRegistration');
  window.dispatchEvent(event);
};

export const triggerContactDialog = () => {
  const event = new CustomEvent('openContact');
  window.dispatchEvent(event);
};
