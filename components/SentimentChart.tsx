import React from 'react';
import { Sentiment } from '../types';

interface SentimentChartProps {
    sentimentCounts: Record<Sentiment, number>;
}

const SENTIMENT_COLORS: Record<Sentiment, string> = {
    [Sentiment.POSITIVE]: 'text-green-500',
    [Sentiment.NEGATIVE]: 'text-red-500',
    [Sentiment.NEUTRAL]: 'text-yellow-500',
};

const SENTIMENT_BG_COLORS: Record<Sentiment, string> = {
    [Sentiment.POSITIVE]: '#22c55e',
    [Sentiment.NEGATIVE]: '#ef4444',
    [Sentiment.NEUTRAL]: '#eab308',
};

const SentimentChart: React.FC<SentimentChartProps> = ({ sentimentCounts }) => {
    // FIX: Make the summation robust by ensuring each value is treated as a number.
    // This prevents type errors in downstream calculations if the input data is not clean.
    const total = Object.values(sentimentCounts).reduce((sum, count) => sum + (Number(count) || 0), 0);
    if (total === 0) {
        return <div className="text-center p-4">No sentiment data available.</div>;
    }

    let accumulatedPercentage = 0;

    const segments = (Object.keys(sentimentCounts) as Sentiment[]).map(key => {
        const count = sentimentCounts[key];
        const percentage = (count / total) * 100;
        const segment = {
            key,
            percentage,
            color: SENTIMENT_BG_COLORS[key],
            startAngle: accumulatedPercentage,
        };
        accumulatedPercentage += percentage;
        return segment;
    });

    const circumference = 2 * Math.PI * 40; // 40 is radius
    
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center">
            <h3 className="text-lg font-bold text-dark-text mb-4 self-start">Sentiment Analysis</h3>
            <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="10" />
                    {segments.map(s => (
                        <circle
                            key={s.key}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke={s.color}
                            strokeWidth="10"
                            strokeDasharray={`${(s.percentage / 100) * circumference} ${circumference}`}
                            strokeDashoffset={-((s.startAngle / 100) * circumference)}
                        />
                    ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-dark-text">{total}</span>
                    <span className="text-sm text-medium-text">Total Mails</span>
                </div>
            </div>
            <div className="mt-4 w-full">
                {segments.map(s => (
                    <div key={s.key} className="flex justify-between items-center text-sm py-1">
                        <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: s.color }}></span>
                            <span className="text-medium-text">{s.key}</span>
                        </div>
                        <span className="font-semibold text-dark-text">{s.percentage.toFixed(0)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SentimentChart;