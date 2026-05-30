import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';
import PublicHeader from '../components/PublicHeader';

export default function SignupPage() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col">
            <PublicHeader
                links={[
                    { label: 'About', path: '/about' },
                    { label: 'FAQ', path: '/faq' },
                    { label: 'Login', path: '/login', primary: true },
                ]}
            />

            <main className="container mx-auto flex max-w-md flex-grow items-center justify-center px-4 py-12">
                <div className="w-full animate-fade-up">
                    <div className="card-glass p-8">
                        <AuthForm mode="signup" />
                    </div>
                    <p className="mt-6 text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <button onClick={() => router.push('/login')} className="font-semibold text-purple-600 transition-colors hover:text-purple-800">
                            Login
                        </button>
                    </p>
                </div>
            </main>
        </div>
    );
}
