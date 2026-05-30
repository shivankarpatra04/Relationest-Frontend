import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';
import PublicHeader from '../components/PublicHeader';

export default function LoginPage() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col">
            <PublicHeader
                links={[
                    { label: 'About', path: '/about' },
                    { label: 'FAQ', path: '/faq' },
                    { label: 'Sign Up', path: '/signup', primary: true },
                ]}
            />

            <main className="container mx-auto flex max-w-md flex-grow items-center justify-center px-4 py-12">
                <div className="w-full animate-fade-up">
                    <div className="card-glass p-8">
                        <AuthForm mode="login" />
                    </div>
                    <p className="mt-6 text-center text-sm text-slate-600">
                        Don&apos;t have an account?{' '}
                        <button onClick={() => router.push('/signup')} className="font-semibold text-purple-600 transition-colors hover:text-purple-800">
                            Sign Up
                        </button>
                    </p>
                </div>
            </main>
        </div>
    );
}
