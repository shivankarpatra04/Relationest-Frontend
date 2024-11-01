import { useRouter } from 'next/router';

export default function FAQPage() {
    const router = useRouter();

    const faqs = [
        {
            question: "What is RelatioNest?",
            answer: "RelatioNest is a cutting-edge relationship guidance platform that combines artificial intelligence with established relationship psychology principles to provide personalized advice and support for couples and individuals."
        },
        {
            question: "How does RelatioNest work?",
            answer: "RelatioNest uses advanced AI technology to analyze your relationship concerns and provide personalized advice based on relationship psychology and expert knowledge. Our platform processes your inputs and delivers tailored guidance to help improve your relationships."
        },
        {
            question: "Is my information secure?",
            answer: "Absolutely. We take your privacy seriously. All data is encrypted using industry-standard protocols and stored securely on protected servers. We never share your personal information with third parties, and all conversations are completely confidential."
        },
        {
            question: "What types of relationship issues can RelatioNest help with?",
            answer: "RelatioNest can assist with a wide range of relationship matters, including communication issues, trust building, conflict resolution, emotional intimacy, and personal growth within relationships."
        },
        {
            question: "Can I use my own AI API keys?",
            answer: "Yes, you can optionally provide your own API keys for Gemini, OpenAI, or Anthropic to use their services directly. This gives you more control over your experience while maintaining the same level of service quality."
        },
        {
            question: "How much does RelatioNest cost?",
            answer: "RelatioNest offers flexible pricing plans to suit different needs. Visit our pricing page to view our current subscription options and choose the plan that best fits your requirements."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-between items-center h-16">
                        <span onClick={() => router.push('/')}
                            className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                            RelatioNest
                        </span>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h1>
                <p className="text-slate-600 mb-8">Find answers to common questions about RelatioNest and our services.</p>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">{faq.question}</h3>
                            <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
