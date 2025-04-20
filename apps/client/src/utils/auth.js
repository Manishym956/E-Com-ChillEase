export const logout = () => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('token');
  // Force reload to reset all states
  window.location.href = '/login';
};
