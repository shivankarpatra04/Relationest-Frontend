import { useEffect, useState } from 'react';

const TypingResponse = ({ text, onComplete }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!text) return;

        const timer = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            } else {
                clearInterval(timer);
                onComplete?.();
            }
        }, 20);

        return () => clearInterval(timer);
    }, [text, currentIndex]);

    const formatText = (text) => {
        return text.split('\n').map((line, i) => (
            <p key={i} className="mb-2">
                {line.split('**').map((part, j) => (
                    j % 2 === 0 ? part : <strong key={j}>{part}</strong>
                ))}
            </p>
        ));
    };

    return (
        <div className="prose max-w-none">
            <div className="relative p-6 bg-gradient-to-r from-purple-50 to-rose-50 rounded-lg shadow-sm">
                {currentIndex < text?.length && (
                    <div className="absolute top-4 right-4 flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-75" />
                        <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-150" />
                    </div>
                )}
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {formatText(displayText)}
                </div>
            </div>
        </div>
    );
};

export default TypingResponse;