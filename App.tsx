import React, { useState, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';
import { getMockEmails } from './services/emailService';
import { classifyEmailsBatch } from './services/geminiService';
import { ClassifiedEmail } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [classifiedEmails, setClassifiedEmails] = useState<ClassifiedEmail[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setLoadingMessage('Fetching your emails...');
      // In a real app, this would be an API call to Gmail
      const emails = getMockEmails();
      
      setLoadingMessage(`Analyzing ${emails.length} emails with AI...`);
      // Simulating a short delay to make the loading feel real
      await new Promise(res => setTimeout(res, 1000));
      
      const results = await classifyEmailsBatch(emails);
      setClassifiedEmails(results);
      
      setLoadingMessage('Preparing your dashboard...');
      await new Promise(res => setTimeout(res, 500));
      
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Failed to process emails:", err);
      setError("Sorry, we couldn't analyze your emails. Please try again.");
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  const handleLinkToCalendar = useCallback((emailId: string, eventId: string, eventTitle: string) => {
    setClassifiedEmails(prevEmails => 
      prevEmails.map(email => 
        email.id === emailId 
          ? { ...email, calendarEventId: eventId, calendarEventTitle: eventTitle }
          : email
      )
    );
  }, []);

  if (isLoading) {
    return <Loader message={loadingMessage} />;
  }

  return (
    <div className="min-h-screen bg-light-bg text-dark-text font-sans">
      {isLoggedIn && classifiedEmails.length > 0 ? (
        <Dashboard 
          classifiedEmails={classifiedEmails} 
          onLinkToCalendar={handleLinkToCalendar} 
        />
      ) : (
        <LoginScreen onLogin={handleLogin} error={error} />
      )}
    </div>
  );
};

export default App;