import React, { useMemo, useState } from 'react';
import { ClassifiedEmail, DashboardStats, EmailCategory, Sentiment } from '../types';
import StatCard from './StatCard';
import SentimentChart from './SentimentChart';
import EmailListItem from './EmailListItem';
import CalendarLinkModal from './CalendarLinkModal';
import { CalendarIcon } from './icons';

interface DashboardProps {
    classifiedEmails: ClassifiedEmail[];
    onLinkToCalendar: (emailId: string, eventId: string, eventTitle: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ classifiedEmails, onLinkToCalendar }) => {
    const [emailToLink, setEmailToLink] = useState<ClassifiedEmail | null>(null);

    const stats: DashboardStats = useMemo(() => {
        const initialCategoryCounts = Object.values(EmailCategory).reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {} as Record<EmailCategory, number>);
        const initialSentimentCounts = Object.values(Sentiment).reduce((acc, sent) => ({ ...acc, [sent]: 0 }), {} as Record<Sentiment, number>);
        
        return classifiedEmails.reduce((acc, email) => {
            acc.categoryCounts[email.classification.category]++;
            acc.sentimentCounts[email.classification.sentiment]++;
            if (email.classification.category === EmailCategory.MISSED_SLOT) {
                acc.missedSlots++;
            }
            return acc;
        }, {
            totalEmails: classifiedEmails.length,
            categoryCounts: initialCategoryCounts,
            sentimentCounts: initialSentimentCounts,
            complaintTrend: 0, // Mocked for now
            missedSlots: 0,
        });
    }, [classifiedEmails]);

    return (
        <>
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-dark-text">Dashboard</h1>
                    <p className="text-medium-text">Your weekly email insights at a glance.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Emails Analyzed" value={stats.totalEmails} color="bg-blue-100 text-blue-600" icon={<span className="text-2xl">📧</span>}/>
                    <StatCard title="Complaints Found" value={stats.categoryCounts[EmailCategory.COMPLAINT]} color="bg-red-100 text-red-600" icon={<span className="text-2xl">😡</span>}/>
                    <StatCard title="Missed Appointments" value={stats.missedSlots} color="bg-yellow-100 text-yellow-600" icon={<CalendarIcon className="w-6 h-6"/>}/>
                    <StatCard title="Urgent Emails" value={stats.categoryCounts[EmailCategory.URGENT]} color="bg-orange-100 text-orange-600" icon={<span className="text-2xl">❗</span>}/>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Email List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold text-dark-text mb-4">Classified Emails</h2>
                        <div className="space-y-4">
                            {classifiedEmails.map(email => (
                                <EmailListItem key={email.id} email={email} onLinkClick={setEmailToLink} />
                            ))}
                        </div>
                    </div>
                    {/* Sidebar with Charts */}
                    <div className="lg:col-span-1">
                         <h2 className="text-xl font-bold text-dark-text mb-4">Analytics</h2>
                         <div className="space-y-6">
                            <SentimentChart sentimentCounts={stats.sentimentCounts} />
                            {/* Another chart could go here, e.g., category breakdown */}
                         </div>
                    </div>
                </div>
            </main>

            <CalendarLinkModal 
                email={emailToLink} 
                onClose={() => setEmailToLink(null)} 
                onLink={onLinkToCalendar}
            />
        </>
    );
};

export default Dashboard;