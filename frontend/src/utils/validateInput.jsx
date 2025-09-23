export const validateInput = (value, type) => {
  switch (type) {
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    case 'password':
      return value.length >= 6;
    case 'number':
      return !isNaN(value) && value >= 0;
    default:
      return !!value.trim();
  }
};