import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import TypingResponse from '../components/TypingResponse';

export default function MainPage() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://relationest-backend.vercel.app';

    const [formData, setFormData] = useState({
        name: '',
        partnerName: '',
        concern: '',
        selectedConcern: 'other', // New state for dropdown
        message: '',
        age: '',
        apiKey: {
            gemini: '',
            openai: '',
            anthropic: ''
        }
    });

    // Define concern types
    const concernTypes = [
        'Communication Issues',
        'Trust and Loyalty',
        'Conflict Resolution',
        'Commitment and Future Goals',
        'Emotional Distance',
        'Compatibility',
        'Intimacy and Affection',
        'Financial Stress',
        'Personal Growth and Independence',
        'Family or Social Influence',
        'Mental Health and Well-being',
        'Work-life Balance',
        'Parenting and Family Planning',
        'Long-Distance Relationship',
        'Other'
    ];

    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [animatedText, setAnimatedText] = useState('');
    const [chatId, setChatId] = useState('');
    const [followUpMessage, setFollowUpMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            try {
                jwtDecode(token);
            } catch (error) {
                router.push('/main');
            }
        }
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (['gemini', 'openai', 'anthropic'].includes(name)) {
            setFormData((prev) => ({
                ...prev,
                apiKey: { ...prev.apiKey, [name]: value }
            }));
        } else if (name === 'selectedConcern') {
            setFormData((prev) => ({
                ...prev,
                selectedConcern: value,
                concern: value === 'Other' ? prev.concern : value
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const getToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        return token;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse('');
        setAnimatedText('');
        setError('');

        try {
            const token = getToken();
            const submissionData = {
                ...formData,
                concern: formData.selectedConcern === 'Other' ? formData.concern : formData.selectedConcern
            };

            const res = await axios.post(
                `${apiUrl}/api/chat/submit-form`,
                submissionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data && res.data.messages) {
                animateResponse(res.data.messages[1].text);
                setChatId(res.data._id);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Session expired. Please log in again.');
                router.push('/login');
            } else {
                setError('Failed to get response from AI. Please try again.');
            }
            console.error('Error submitting form:', error);
        }
        setLoading(false);
    };

    const handleContinueChat = async () => {
        setLoading(true);
        setResponse('');
        setAnimatedText('');
        setError('');

        try {
            const token = getToken();
            const continueChatData = {
                chatId,
                followUpMessage,
                apiKey: formData.apiKey,
            };

            const res = await axios.post(
                `${apiUrl}/api/chat/continue`,
                continueChatData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data && res.data.aiResponse) {
                animateResponse(res.data.aiResponse);
                setFollowUpMessage('');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            if (error.message === 'No token found') {
                setError('Please login to continue');
                router.push('/login');
            } else if (error.response && error.response.status === 401) {
                setError('Session expired. Please log in again.');
                router.push('/login');
            } else {
                setError('Failed to get response from AI. Please try again.');
            }
            console.error('Error continuing chat:', error);
        }
        setLoading(false);
    };

    const animateResponse = (text) => {
        setAnimatedText(text);
        setResponse('');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
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
                                onClick={() => router.push('/ChatHistory')}
                                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                History
                            </button>
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
                        </div>
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
                {/* Inspirational Quote */}
                <div className="mb-8 bg-gradient-to-r from-rose-50 to-purple-50 rounded-lg p-6 shadow-sm">
                    <blockquote className="text-center">
                        <p className="text-xl font-serif italic text-slate-700 mb-2">
                            "The quality of your life is the quality of your relationships"
                        </p>
                        <footer className="text-sm text-slate-500">- Tony Robbins</footer>
                    </blockquote>
                </div>

                {/* Main Form */}
                <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-slate-800">Share Your Story</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your Name"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                                required
                            />
                            <input
                                type="text"
                                name="partnerName"
                                value={formData.partnerName}
                                onChange={handleInputChange}
                                placeholder="Partner's Name"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                                required
                            />
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                placeholder="Your Age"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                                required
                            />
                        </div>

                        <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                            <h3 className="text-sm font-semibold text-slate-700 mb-4">API Keys (Optional)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    name="gemini"
                                    value={formData.apiKey.gemini}
                                    onChange={handleInputChange}
                                    placeholder="Gemini API Key"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                                />
                                <input
                                    type="text"
                                    name="openai"
                                    value={formData.apiKey.openai}
                                    onChange={handleInputChange}
                                    placeholder="OpenAI API Key"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                                />
                                <input
                                    type="text"
                                    name="anthropic"
                                    value={formData.apiKey.anthropic}
                                    onChange={handleInputChange}
                                    placeholder="Anthropic API Key"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="selectedConcern" className="block mb-2 text-sm font-medium text-slate-600">
                                Select Concern
                            </label>
                            <select
                                name="selectedConcern"
                                value={formData.selectedConcern}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                            >
                                {concernTypes.map((concern) => (
                                    <option key={concern} value={concern}>
                                        {concern}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {formData.selectedConcern === 'Other' && (
                            <textarea
                                name="concern"
                                value={formData.concern}
                                onChange={handleInputChange}
                                placeholder="Describe your concern"
                                className="w-full h-24 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                                required
                            />
                        )}

                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Write your message"
                            className="w-full h-32 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                        >
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </form>
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                </div>

                {response && (
                    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
                        <TypingResponse text={animatedText} />
                    </div>
                )}

                {chatId && (
                    <div className="bg-slate-50 rounded-lg p-6 mt-8">
                        <h3 className="text-lg font-medium text-slate-700 mb-4">Continue Chat</h3>
                        <textarea
                            value={followUpMessage}
                            onChange={(e) => setFollowUpMessage(e.target.value)}
                            placeholder="Write your follow-up message"
                            className="w-full h-24 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                        />
                        <button
                            onClick={handleContinueChat}
                            disabled={loading}
                            className="w-full mt-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                        >
                            {loading ? 'Loading...' : 'Send'}
                        </button>
                    </div>
                )}
            </main>

            <footer className="bg-slate-100 border-t border-slate-200 py-6 text-center text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} RelatioNest. All rights reserved.
            </footer>
        </div>
    );
}
