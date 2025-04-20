// apps/rider-pwa/src/pages/LoginPage.jsx
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Initialize Google Sign-In button
    if (window.google && !googleButtonRef.current.innerHTML) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'outline',
        size: 'large',
        width: '100%',
      });
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    if (response.credential) {
      try {
        setError('');
        const success = await login(response.credential);
        if (success) {
          navigate('/');
        } else {
          setError('You do not have rider privileges');
        }
      } catch (error) {
        setError('Login failed. Make sure you are using an approved rider email.');
        console.error('Login error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 px-4 py-12">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CoolBreeze Rider</h1>
          <p className="text-xl text-gray-600">Delivery Application</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <div className="mb-6">
            <div ref={googleButtonRef} className="google-signin-button"></div>
          </div>

          <div className="text-sm text-center text-gray-600">
            <p>
              Only approved rider accounts can access the application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;