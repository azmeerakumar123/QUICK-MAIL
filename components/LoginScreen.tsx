import React from 'react';

interface LoginScreenProps {
  onLogin: () => void;
  error: string | null;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <div className="text-center max-w-lg p-8 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-4xl font-bold text-dark-text mb-2">
          Welcome to <span className="text-primary">QuickMAIL</span>
        </h1>
        <p className="text-lg text-medium-text mb-6">
          Turn your inbox noise into actionable insights with the power of AI.
        </p>
        <button
          onClick={onLogin}
          className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Analyze My Gmail Inbox
        </button>
        {error && (
          <p className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">{error}</p>
        )}
        <p className="mt-6 text-sm text-light-text">
          By logging in, you grant read-only permission to analyze your emails. We never store your email content.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;