import { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Reveals the response a few words at a time. Word-chunked (rather than the old
// char-by-char) means ~6x fewer re-renders, so even a long answer finishes
// in a couple of seconds and feels fast. Renders proper markdown.
const WORDS_PER_TICK = 3;
const TICK_MS = 30;

const TypingResponse = ({ text, onComplete }) => {
    const [wordCount, setWordCount] = useState(0);
    const words = useMemo(() => (text ? text.split(/(\s+)/) : []), [text]);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    // Reset when a new response arrives.
    useEffect(() => {
        setWordCount(0);
    }, [text]);

    useEffect(() => {
        if (!text) return;
        if (wordCount >= words.length) {
            onCompleteRef.current?.();
            return;
        }
        const timer = setTimeout(() => {
            setWordCount((prev) => Math.min(prev + WORDS_PER_TICK, words.length));
        }, TICK_MS);
        return () => clearTimeout(timer);
    }, [text, words, wordCount]);

    const isTyping = wordCount < words.length;
    const visibleText = words.slice(0, wordCount).join('');

    return (
        <div className="prose max-w-none">
            <div className="relative p-6 bg-gradient-to-r from-purple-50 to-rose-50 rounded-lg shadow-sm">
                {isTyping && (
                    <div className="absolute top-4 right-4 flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-75" />
                        <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-150" />
                    </div>
                )}
                <div className="text-slate-700 leading-relaxed prose-headings:text-slate-800 prose-strong:text-slate-900 prose-li:my-0.5">
                    <ReactMarkdown>{visibleText}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default TypingResponse;
