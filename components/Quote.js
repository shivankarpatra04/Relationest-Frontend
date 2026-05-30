// components/Quote.js
import { Quote as QuoteIcon } from 'lucide-react';

export default function Quote() {
    return (
        <div className="mb-8 animate-fade-up overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 via-fuchsia-500 to-purple-600 p-[1px] shadow-glow">
            <div className="rounded-2xl bg-white/90 px-6 py-7 backdrop-blur-xl">
                <blockquote className="flex flex-col items-center text-center">
                    <QuoteIcon className="mb-3 h-7 w-7 text-purple-400" />
                    <p className="font-display text-lg font-medium italic text-slate-800 sm:text-xl">
                        "The quality of your life is the quality of your relationships."
                    </p>
                    <footer className="mt-2 text-sm font-medium text-gradient">— Tony Robbins</footer>
                </blockquote>
            </div>
        </div>
    );
}
