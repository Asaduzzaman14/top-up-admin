export const getTopUpToken = () => {
  const token = localStorage.getItem('topup');

  return token;
};

export const setTopUpToken = (token: string) => {
  localStorage.setItem('topup', token);
};

export const removeTopUpToken = () => {
  localStorage.removeItem('topup');
};

export const handleLogout = () => {
  localStorage.removeItem('topup');
};
