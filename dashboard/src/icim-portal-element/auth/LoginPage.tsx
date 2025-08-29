import React from 'react';
import Login from 'icim-portal-element/auth/Login';

const LoginPage = () => {
  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: 8 }}>
      <Login />
    </div>
  );
};

export default LoginPage;
