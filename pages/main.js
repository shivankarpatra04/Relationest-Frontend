import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import TypingResponse from '../components/TypingResponse';
import { getToken, setToken, removeToken, isAuthenticated } from '../utils/auth';
import Quote from '../components/Quote';
import withAuth from '../utils/withAuth';

function MainPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        partnerName: '',
        concern: '',
        selectedConcern: 'Other',
        message: '',
        age: '',
        apiKey: {
            gemini: '',
            openai: '',
            anthropic: ''
        }
    });

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

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://relationest-backend.vercel.app';

    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [animatedText, setAnimatedText] = useState('');
    const [chatId, setChatId] = useState('');
    const [followUpMessage, setFollowUpMessage] = useState('');
    const [error, setError] = useState('');

    // Configure axios defaults and interceptors
    useEffect(() => {
        axios.defaults.baseURL = apiUrl;

        // Request interceptor
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                const token = getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                console.log('Request config:', {
                    url: config.url,
                    headers: config.headers,
                    method: config.method
                });
                return config;
            },
            (error) => {
                console.error('Request interceptor error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        const responseInterceptor = axios.interceptors.response.use(
            (response) => {
                console.log('Response received:', {
                    status: response.status,
                    data: response.data
                });
                return response;
            },
            (error) => {
                console.error('Response interceptor error:', error.response);
                if (error.response?.status === 401) {
                    removeToken();
                    router.push('/login');
                }
                return Promise.reject(error);
            }
        );

        // Cleanup
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [apiUrl, router]);

    // Authentication check
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = getToken();
                if (!token) {
                    router.push('/login');
                    return;
                }

                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    console.log('Token expired');
                    removeToken();
                    router.push('/login');
                } else {
                    console.log('Token valid until:', new Date(decoded.exp * 1000));
                }
            } catch (error) {
                console.error('Auth check error:', error);
                removeToken();
                router.push('/login');
            }
        };

        checkAuth();
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (['gemini', 'openai', 'anthropic'].includes(name)) {
            setFormData(prev => ({
                ...prev,
                apiKey: { ...prev.apiKey, [name]: value }
            }));
        } else if (name === 'selectedConcern') {
            setFormData(prev => ({
                ...prev,
                selectedConcern: value,
                concern: value === 'Other' ? prev.concern : value
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse('');
        setAnimatedText('');
        setError('');

        try {
            const token = getToken();
            if (!token) {
                throw new Error('No authentication token found');
            }

            console.log('Submitting with token:', token);

            const submissionData = {
                partnerName: formData.partnerName,
                name: formData.name,
                age: formData.age,
                concern: formData.selectedConcern === 'Other' ? formData.concern : formData.selectedConcern,
                message: formData.message,
                apiKey: formData.apiKey
            };

            console.log('Sending data:', submissionData);

            const res = await axios.post('/api/chat/submit-form', submissionData);
            console.log('Response received:', res.data);

            if (res.data) {
                if (res.data._id) {
                    setChatId(res.data._id);
                }
                if (res.data.messages?.length > 0) {
                    const lastMessage = res.data.messages[res.data.messages.length - 1];
                    animateResponse(lastMessage.text);
                } else if (res.data.text) {
                    animateResponse(res.data.text);
                }
                setResponse(res.data);
            }

        } catch (error) {
            console.error('Submit error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred';

            if (error.response?.status === 401) {
                removeToken();
                router.push('/login');
                setError('Session expired. Please login again.');
            } else {
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleContinueChat = async () => {
        setLoading(true);
        setResponse('');
        setAnimatedText('');
        setError('');

        try {
            const token = getToken();
            if (!token) {
                throw new Error('No authentication token found');
            }

            const continueChatData = {
                chatId,
                followUpMessage,
                apiKey: formData.apiKey,
            };

            console.log('Continuing chat with data:', continueChatData);

            const res = await axios.post('/api/chat/continue', continueChatData);
            console.log('Continue chat response:', res.data);

            if (res.data?.aiResponse) {
                animateResponse(res.data.aiResponse);
                setFollowUpMessage('');
            } else {
                throw new Error('Invalid response format from server');
            }
        } catch (error) {
            console.error('Continue chat error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to continue chat';

            if (error.response?.status === 401) {
                removeToken();
                router.push('/login');
                setError('Session expired. Please login again.');
            } else {
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const animateResponse = (text) => {
        console.log('Animating response:', text);
        setAnimatedText(text);
        setResponse('');
    };




    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <Quote />

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

                    <div className="space-y-4">
                        <select
                            name="selectedConcern"
                            value={formData.selectedConcern}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors bg-white"
                            required
                        >
                            <option value="">Select your concern</option>
                            {concernTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>

                        {formData.selectedConcern === 'Other' && (
                            <textarea
                                name="concern"
                                value={formData.concern}
                                onChange={handleInputChange}
                                placeholder="Please describe your concern..."
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors min-h-[120px]"
                                required
                            />
                        )}
                    </div>

                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your message..."
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors min-h-[80px]"
                        required
                    />

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                    px-8 py-3 rounded-lg text-white font-medium
                                    bg-gradient-to-r from-rose-500 to-purple-600
                                    hover:from-rose-600 hover:to-purple-700
                                    focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                                    transform transition-all
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    flex items-center space-x-2
                                `}
                        >
                            {loading ? (
                                <span className="inline-flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                'Get Advice'
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {/* AI Response */}
            {(animatedText || response) && (
                <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-slate-800 mb-4">AI Response</h2>

                    <TypingResponse
                        text={animatedText}
                        onComplete={() => setResponse(animatedText)}
                    />

                    {response && (
                        <div className="space-y-4">
                            <textarea
                                value={followUpMessage}
                                onChange={(e) => setFollowUpMessage(e.target.value)}
                                placeholder="Your follow-up message..."
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors min-h-[100px]"
                            />
                            <button
                                onClick={handleContinueChat}
                                disabled={loading || !followUpMessage}
                                className={`
                        px-6 py-2 rounded-lg text-white font-medium
                        bg-purple-600 hover:bg-purple-700
                        focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                        transform transition-all
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center space-x-2
                    `}
                            >
                                {loading ? (
                                    <span className="inline-flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    'Continue Chat'
                                )}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default withAuth(MainPage);