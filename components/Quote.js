// components/Quote.js
export default function Quote() {
    return (
        <div className="mb-8 bg-gradient-to-r from-rose-50 to-purple-50 rounded-lg p-6 shadow-sm">
            <blockquote className="text-center">
                <p className="text-xl font-serif italic text-slate-700 mb-2">
                    "The quality of your life is the quality of your relationships"
                </p>
                <footer className="text-sm text-slate-500">- Tony Robbins</footer>
            </blockquote>
        </div>
    );
}