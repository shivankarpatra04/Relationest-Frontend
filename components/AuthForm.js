import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { setToken } from '../utils/auth';
import { Loader2, User, Mail, Lock } from 'lucide-react';

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
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-2 text-center">
                <h1 className="text-2xl font-bold text-slate-900">
                    {mode === 'login' ? 'Welcome back' : 'Create your account'}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    {mode === 'login' ? 'Sign in to continue to RelatioNest' : 'Join RelatioNest in seconds'}
                </p>
            </div>

            {mode === 'signup' && (
                <div className="space-y-1.5">
                    <label htmlFor="username" className="text-sm font-medium text-slate-700">Username</label>
                    <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            id="username"
                            type="text"
                            placeholder="Your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field pl-10"
                            required
                            disabled={isLoading}
                        />
                    </div>
                </div>
            )}

            <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field pl-10"
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        id="password"
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field pl-10"
                        required
                        minLength="6"
                        disabled={isLoading}
                    />
                </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full">
                {isLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> {mode === 'login' ? 'Logging in...' : 'Signing up...'}</>
                ) : (
                    mode === 'login' ? 'Login' : 'Sign Up'
                )}
            </button>
        </form>
    );
};

export default AuthForm;