import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { setToken } from '../utils/auth';
import { Loader2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const AuthForm = ({ mode }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const endpoint = mode === 'signup' ? 'register' : 'login';
            const payload = mode === 'signup'
                ? { username, email, password }
                : { email, password };

            const response = await fetch(`${API_URL}/api/auth/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }

            if (!data.token) {
                throw new Error('No token received from server');
            }

            setToken(data.token);
            router.push('/main');
            toast.success(`Successfully ${mode === 'signup' ? 'registered' : 'logged in'}!`);
        } catch (error) {
            console.error('Auth error:', error);
            toast.error(error.message || 'Authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-2xl font-bold text-center text-slate-800">
                {mode === 'login' ? 'Login to RelatioNest' : 'Sign Up for RelatioNest'}
            </h1>

            {mode === 'signup' && (
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        required
                        disabled={isLoading}
                    />
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    required
                    disabled={isLoading}
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    required
                    minLength="6"
                    disabled={isLoading}
                />
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg shadow hover:from-rose-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin mr-2 h-4 w-4" />
                            {mode === 'login' ? 'Logging in...' : 'Signing up...'}
                        </>
                    ) : (
                        mode === 'login' ? 'Login' : 'Sign Up'
                    )}
                </button>
            </div>
        </form>
    );
};

export default AuthForm;