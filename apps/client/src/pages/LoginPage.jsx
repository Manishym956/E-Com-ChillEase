// apps/client/src/pages/LoginPage.jsx
import { useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);

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
        const success = await login(response.credential);
        if (success) {
          navigate('/');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Sign In to ChillEase</h1>
        <p className="text-gray-600">Please sign in with your Google account</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6 text-center">
          <div ref={googleButtonRef} className="google-signin-button"></div>
        </div>

        <div className="text-sm text-center text-gray-600">
          <p>
            By signing in, you agree to our{' '}
            <a href="#" className="text-primary-600 hover:text-primary-800">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 hover:text-primary-800">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
