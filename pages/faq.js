import { useState } from 'react';
import PublicHeader from '../components/PublicHeader';
import { ChevronDown } from 'lucide-react';

const faqs = [
    { question: 'What is RelatioNest?', answer: 'RelatioNest is a relationship guidance platform that combines artificial intelligence with established relationship psychology to provide personalized advice and support for couples and individuals.' },
    { question: 'How does RelatioNest work?', answer: 'You share your situation, and our AI analyzes your concern and responds with warm, structured, practical guidance grounded in relationship psychology — tailored to you and your partner.' },
    { question: 'Is my information secure?', answer: 'Absolutely. Data is encrypted using industry-standard protocols and stored securely. We never share your personal information with third parties, and your conversations stay confidential.' },
    { question: 'What types of issues can it help with?', answer: 'Communication, trust building, conflict resolution, emotional intimacy, commitment, long-distance challenges, and personal growth within relationships — among many others.' },
    { question: 'Can I use my own AI API keys?', answer: 'Yes. You can optionally provide your own Gemini, OpenAI, or Anthropic key under "Advanced" on the main page. Leave it blank to use the built-in advisor.' },
    { question: 'How much does RelatioNest cost?', answer: 'RelatioNest is free to get started. Just create an account and begin your first conversation right away.' },
];

export default function FAQPage() {
    const [open, setOpen] = useState(0);

    return (
        <div className="flex min-h-screen flex-col">
            <PublicHeader
                links={[
                    { label: 'About', path: '/about' },
                    { label: 'Get Started', path: '/login', primary: true },
                ]}
            />

            <main className="container mx-auto max-w-3xl flex-grow px-4 py-16">
                <div className="animate-fade-up text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-slate-600">
                        Everything you need to know about RelatioNest and how it works.
                    </p>
                </div>

                <div className="mt-12 space-y-3">
                    {faqs.map((faq, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={i} className="card-glass animate-fade-up overflow-hidden" style={{ animationDelay: `${i * 0.05}s` }}>
                                <button
                                    onClick={() => setOpen(isOpen ? -1 : i)}
                                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                                >
                                    <span className="font-semibold text-slate-900">{faq.question}</span>
                                    <ChevronDown className={`h-5 w-5 flex-shrink-0 text-purple-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-5 leading-relaxed text-slate-600">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
