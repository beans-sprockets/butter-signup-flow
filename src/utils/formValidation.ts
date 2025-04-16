
interface FormData {
  name: string;
  email: string;
  company: string;
  brandUrl: string;
  [key: string]: string;
}

export const validateField = (fieldName: string, value: string): boolean => {
  if (!value.trim()) {
    return false;
  }

  switch (fieldName) {
    case "email":
      return /^\S+@\S+\.\S+$/.test(value);
    case "brandUrl":
      return !!value.trim().match(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/);
    default:
      return true;
  }
};
