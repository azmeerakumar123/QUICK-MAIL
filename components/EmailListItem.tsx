import React from 'react';
import { ClassifiedEmail, EmailCategory, Sentiment } from '../types';
import { LinkIcon, TagIcon } from './icons';

interface EmailListItemProps {
    email: ClassifiedEmail;
    onLinkClick: (email: ClassifiedEmail) => void;
}

const CATEGORY_COLORS: Record<EmailCategory, string> = {
    [EmailCategory.COMPLAINT]: 'bg-red-100 text-red-800',
    [EmailCategory.MISSED_SLOT]: 'bg-yellow-100 text-yellow-800',
    [EmailCategory.URGENT]: 'bg-orange-100 text-orange-800',
    [EmailCategory.REMINDER]: 'bg-blue-100 text-blue-800',
    [EmailCategory.GENERAL]: 'bg-gray-100 text-gray-800',
    [EmailCategory.UNKNOWN]: 'bg-gray-100 text-gray-800',
};

const SENTIMENT_ICONS: Record<Sentiment, string> = {
    [Sentiment.POSITIVE]: '😊',
    [Sentiment.NEGATIVE]: '😞',
    [Sentiment.NEUTRAL]: '😐',
};

const EmailListItem: React.FC<EmailListItemProps> = ({ email, onLinkClick }) => {
    const { sender, subject, classification, calendarEventTitle } = email;
    const { category, summary, keywords, sentiment } = classification;

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${CATEGORY_COLORS[category]}`}>{category}</span>
                        <span title={`Sentiment: ${sentiment}`} className="text-lg">{SENTIMENT_ICONS[sentiment]}</span>
                    </div>
                    <p className="font-semibold text-dark-text">{subject}</p>
                    <p className="text-sm text-medium-text">{sender}</p>
                </div>
                {category === EmailCategory.MISSED_SLOT && (
                    !calendarEventTitle ? (
                        <button
                            onClick={() => onLinkClick(email)}
                            className="flex items-center space-x-2 text-sm bg-indigo-100 text-primary font-semibold px-3 py-2 rounded-lg hover:bg-indigo-200 transition-colors"
                        >
                            <LinkIcon className="w-4 h-4" />
                            <span>Link to Calendar</span>
                        </button>
                    ) : (
                        <div className="text-sm bg-green-100 text-green-800 font-semibold px-3 py-2 rounded-lg flex items-center space-x-2">
                            <LinkIcon className="w-4 h-4"/>
                            <span>Linked: {calendarEventTitle}</span>
                        </div>
                    )
                )}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-700 italic">"{summary}"</p>
                <div className="mt-3 flex items-center flex-wrap gap-2">
                    <TagIcon className="w-4 h-4 text-gray-400"/>
                    {keywords.map(kw => (
                        <span key={kw} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md">{kw}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmailListItem;