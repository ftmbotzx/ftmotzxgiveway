// Simple admin authentication using localStorage
const ADMIN_KEY = 'ftmbotzx_admin_auth';

export const isAdminLoggedIn = (): boolean => {
  return localStorage.getItem(ADMIN_KEY) === 'true';
};

export const loginAdmin = (username: string, password: string, config: { admin_username: string; admin_password: string }): boolean => {
  if (username === config.admin_username && password === config.admin_password) {
    localStorage.setItem(ADMIN_KEY, 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  localStorage.removeItem(ADMIN_KEY);
};
