import PublicHeader from '../components/PublicHeader';
import { Lightbulb, ShieldCheck, Globe, Target, Eye } from 'lucide-react';

const values = [
    { icon: Lightbulb, title: 'Innovation', desc: 'Continuously evolving our AI to provide cutting-edge relationship guidance.' },
    { icon: ShieldCheck, title: 'Privacy', desc: 'The highest level of data protection and confidentiality for every user.' },
    { icon: Globe, title: 'Accessibility', desc: 'Making thoughtful relationship advice available to everyone, everywhere.' },
];

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <PublicHeader
                links={[
                    { label: 'FAQ', path: '/faq' },
                    { label: 'Get Started', path: '/login', primary: true },
                ]}
            />

            <main className="container mx-auto max-w-4xl flex-grow px-4 py-16">
                <section className="animate-fade-up text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                        About <span className="text-gradient">RelatioNest</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
                        An AI-powered relationship advisory platform, committed to transforming how people
                        navigate their relationships in the digital age.
                    </p>
                </section>

                <section className="mt-14 grid animate-fade-up animate-delay-100 gap-6 md:grid-cols-2">
                    <div className="card-glass p-8">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-glow">
                            <Target className="h-6 w-6" />
                        </div>
                        <h2 className="mb-2 text-xl font-semibold text-slate-900">Our Mission</h2>
                        <p className="text-slate-600">
                            To empower people with personalized, AI-driven relationship guidance while
                            maintaining the highest standards of privacy and ethics — making quality advice
                            accessible to everyone.
                        </p>
                    </div>
                    <div className="card-glass p-8">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-glow">
                            <Eye className="h-6 w-6" />
                        </div>
                        <h2 className="mb-2 text-xl font-semibold text-slate-900">Our Vision</h2>
                        <p className="text-slate-600">
                            To blend artificial intelligence with human psychology, creating a future where
                            every couple has the tools they need to build stronger, healthier relationships.
                        </p>
                    </div>
                </section>

                <section className="mt-10 animate-fade-up animate-delay-200">
                    <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">Our Core Values</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {values.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="card-glass group p-6 text-center transition-transform hover:-translate-y-1">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-100">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 font-semibold text-slate-900">{title}</h3>
                                <p className="text-sm text-slate-600">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
