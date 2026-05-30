import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import PublicHeader from '../components/PublicHeader';
import { Heart, MessageCircleHeart, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

const features = [
    {
        icon: MessageCircleHeart,
        title: 'Personalized Advice',
        desc: 'Share your situation and get warm, practical guidance tailored to you and your partner.',
    },
    {
        icon: Sparkles,
        title: 'Instant & Thoughtful',
        desc: 'Fast, structured answers you can actually act on — no fluff, no waiting.',
    },
    {
        icon: ShieldCheck,
        title: 'Private & Secure',
        desc: 'Your conversations are encrypted and confidential. They stay between you and us.',
    },
];

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                jwtDecode(token);
                router.push('/main');
            } catch {
                localStorage.removeItem('token');
            }
        }
    }, []);

    const getStarted = () => {
        const token = localStorage.getItem('token');
        router.push(token ? '/main' : '/login');
    };

    return (
        <div className="flex min-h-screen flex-col">
            <PublicHeader
                links={[
                    { label: 'About', path: '/about' },
                    { label: 'FAQ', path: '/faq' },
                    { label: 'Login', path: '/login', primary: true },
                ]}
            />

            <main className="relative z-10 flex flex-grow flex-col">
                {/* Hero */}
                <section className="container mx-auto flex flex-col items-center px-4 pb-16 pt-20 text-center md:pt-28">
                    <span className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-purple-700 shadow-sm backdrop-blur">
                        <Sparkles className="h-4 w-4" />
                        AI-powered relationship guidance
                    </span>

                    <h1 className="max-w-4xl animate-fade-up animate-delay-100 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
                        Build a stronger relationship,{' '}
                        <span className="text-gradient">one conversation at a time</span>
                    </h1>

                    <p className="mt-6 max-w-2xl animate-fade-up animate-delay-200 text-lg text-slate-600 md:text-xl">
                        RelatioNest gives you personalized, judgment-free advice to navigate the moments
                        that matter — communication, trust, conflict, and everything in between.
                    </p>

                    <div className="mt-10 flex animate-fade-up animate-delay-300 flex-col gap-4 sm:flex-row">
                        <button onClick={getStarted} className="btn-primary group text-base">
                            Get Started
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                        <button onClick={() => router.push('/signup')} className="btn-ghost text-base">
                            Create free account
                        </button>
                    </div>

                    <div className="mt-12 flex animate-fade-in animate-delay-500 items-center gap-2 text-sm text-slate-500">
                        <Heart className="h-4 w-4 fill-rose-400 text-rose-400" />
                        Trusted guidance, available whenever you need it
                    </div>
                </section>

                {/* Features */}
                <section className="container mx-auto px-4 pb-24">
                    <div className="grid gap-6 md:grid-cols-3">
                        {features.map(({ icon: Icon, title, desc }, i) => (
                            <div
                                key={title}
                                className="card-glass group animate-fade-up p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow"
                                style={{ animationDelay: `${0.15 * i + 0.2}s` }}
                            >
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-glow transition-transform group-hover:scale-110">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
                                <p className="text-slate-600">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
