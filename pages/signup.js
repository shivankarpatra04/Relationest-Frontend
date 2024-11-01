import AuthForm from '../components/AuthForm';
import { useRouter } from 'next/router';

export default function SignupPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <span
                                onClick={() => router.push('/')}
                                className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80"
                            >
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
            <main className="flex-grow container mx-auto px-4 py-12 max-w-lg flex items-center justify-center">
                <div className="w-full">
                    <p className="text-center text-slate-600 mb-8">
                        Create your account and start managing your relationships.
                    </p>

                    {/* AuthForm Component for Signup */}
                    <div className="bg-white p-8 shadow-md rounded-lg border border-slate-200">
                        <AuthForm mode="signup" />
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-slate-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => router.push('/login')}
                                className="text-purple-600 hover:text-purple-800 transition-colors"
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </div>
            </main>

        </div>
    );
}