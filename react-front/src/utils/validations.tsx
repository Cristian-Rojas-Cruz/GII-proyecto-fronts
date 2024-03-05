export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export const validateUsername = (username: string) => {
  const re = /^\w+$/;
  return re.test(username);
}
