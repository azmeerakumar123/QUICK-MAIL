import React, { useState } from 'react';
import { ClassifiedEmail } from '../types';

interface CalendarLinkModalProps {
    email: ClassifiedEmail | null;
    onClose: () => void;
    onLink: (emailId: string, eventId: string, eventTitle: string) => void;
}

// Mock calendar events for demonstration
const getMockCalendarEvents = (emailTimestamp: string) => {
    const date = new Date(emailTimestamp);
    return [
        { id: 'evt1', title: 'Project Alpha Sync', time: `${date.getHours() - 2}:00` },
        { id: 'evt2', title: 'Thesis Review with Dr. Smith', time: `${date.getHours() - 1}:30` },
        { id: 'evt3', title: 'Student Mentoring Session', time: `${date.getHours()}:00` },
        { id: 'evt4', title: 'Department Meeting', time: `${date.getHours() + 1}:00` },
    ];
};

const CalendarLinkModal: React.FC<CalendarLinkModalProps> = ({ email, onClose, onLink }) => {
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    if (!email) return null;

    const mockEvents = getMockCalendarEvents(email.timestamp);

    const handleLink = () => {
        const selectedEvent = mockEvents.find(e => e.id === selectedEventId);
        if (selectedEvent) {
            onLink(email.id, selectedEvent.id, selectedEvent.title);
            onClose();
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-dark-text mb-2">Link to Calendar Event</h2>
                <p className="text-medium-text mb-4">Select the calendar event related to this missed appointment email.</p>
                <div className="mb-4">
                    <p className="text-sm font-semibold">Email:</p>
                    <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded-md">
                        <strong>From:</strong> {email.sender}<br/>
                        <strong>Subject:</strong> {email.subject}
                    </p>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {mockEvents.map(event => (
                        <div
                            key={event.id}
                            onClick={() => setSelectedEventId(event.id)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedEventId === event.id ? 'bg-primary/10 border-primary ring-2 ring-primary' : 'bg-white hover:bg-gray-50'}`}
                        >
                            <p className="font-semibold text-dark-text">{event.title}</p>
                            <p className="text-sm text-medium-text">Time: {event.time}</p>
                        </div>
                    ))}
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300">Cancel</button>
                    <button 
                        onClick={handleLink}
                        disabled={!selectedEventId} 
                        className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Link Event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarLinkModal;