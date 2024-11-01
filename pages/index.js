import { useRouter } from 'next/router';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                jwtDecode(token);
                router.push('/main');
            } catch (error) {
                console.error('Invalid token', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const handleGettingStarted = () => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/main');
        } else {
            router.push('/login');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                                RelatioNest
                            </span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <button
                                onClick={() => router.push('/about')}
                                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                About
                            </button>
                            <button
                                onClick={() => router.push('/faq')}
                                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                FAQ
                            </button>
                            <button
                                onClick={() => router.push('/login')}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
                            >
                                Login
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl flex flex-col justify-center items-center text-center min-h-screen">
                <h1 className="text-4xl font-bold text-slate-800 mb-4">
                    Welcome to <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">RelatioNest</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                    Empowering stronger relationships with personalized insights.
                </p>
                <div className="space-x-4">
                    <button
                        onClick={handleGettingStarted}
                        className="px-8 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg shadow hover:from-rose-600 hover:to-purple-700 transition"
                    >
                        Get Started
                    </button>
                    <button
                        onClick={() => router.push('/signup')}
                        className="px-8 py-3 bg-slate-600 text-white rounded-lg shadow hover:bg-slate-700 transition"
                    >
                        Sign Up
                    </button>
                </div>
            </main>

        </div>
    );
}
