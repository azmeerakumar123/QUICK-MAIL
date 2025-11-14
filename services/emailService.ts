import { Email } from '../types';

export const getMockEmails = (): Email[] => {
  return [
    {
      id: '1',
      sender: 'student.a@university.edu',
      subject: 'Issue with WiFi in Hostel Block C',
      body: 'Dear Sir, The WiFi in Hostel Block C has been very slow for the past 3 days. We are unable to attend online classes properly. Please look into this matter urgently.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      sender: 'student.b@university.edu',
      subject: 'Re: Missed Project Discussion',
      body: 'Hello Professor, I am so sorry I missed our scheduled project discussion today at 2 PM. I had a medical emergency. Can we please reschedule?',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      sender: 'admin@university.edu',
      subject: 'URGENT: Faculty Meeting Tomorrow',
      body: 'This is a reminder that there is a mandatory faculty meeting tomorrow at 10 AM in the main conference room to discuss the new curriculum changes. Please be present.',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '4',
      sender: 'conference.updates@ieee.org',
      subject: 'Reminder: Paper Submission Deadline',
      body: 'Dear author, this is a friendly reminder that the deadline for paper submission for the AISC 2024 conference is this Friday. We look forward to your submission.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '5',
      sender: 'student.c@university.edu',
      subject: 'Regarding library book return',
      body: 'Hello, I wanted to inquire about the procedure for returning a book I borrowed last month. Can I do it online or do I need to visit the library? Thanks.',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '6',
        sender: 'student.d@university.edu',
        subject: 'Great lecture today!',
        body: 'Hi Professor, I just wanted to say that I really enjoyed your lecture on quantum computing today. It was very insightful and inspiring. Thank you for the great class!',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '7',
        sender: 'hr@university.edu',
        subject: 'Monthly Payslip Information',
        body: 'Dear Faculty Member, Your payslip for the month of August is now available on the employee portal. Please log in to view and download it.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '8',
        sender: 'student.e@university.edu',
        subject: 'Request for extension on assignment 2',
        body: 'Dear Professor, I am writing to request a short extension for assignment 2. I have been unwell for the past few days and I am slightly behind. Would it be possible to get an extension until Friday? I would really appreciate it. This is causing me a lot of stress.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '9',
      sender: 'it.support@university.edu',
      subject: 'Unsanitary conditions in Lab 4',
      body: 'To whom it may concern, Several students have reported that the computers and desks in Lab 4 are not being cleaned regularly. There are dust and food wrappers left behind. This is a health concern. Please address this issue.',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '10',
      sender: 'student.f@university.edu',
      subject: 'Apology for missing the 11 AM meeting',
      body: 'Professor, my sincere apologies for missing our meeting slot this morning at 11 AM. I completely forgot about it due to exam stress. I am very sorry for the inconvenience. Is there any possibility we could reschedule?',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    }
  ];
};