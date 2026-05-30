import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import TypingResponse from '../components/TypingResponse';
import { getToken, setToken, removeToken, isAuthenticated } from '../utils/auth';
import Quote from '../components/Quote';
import withAuth from '../utils/withAuth';
import { Sparkles, Loader2, Send, AlertCircle, MessageSquareHeart } from 'lucide-react';

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
    const [showApiKeys, setShowApiKeys] = useState(false);

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
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
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

            const submissionData = {
                partnerName: formData.partnerName,
                name: formData.name,
                age: formData.age,
                concern: formData.selectedConcern === 'Other' ? formData.concern : formData.selectedConcern,
                message: formData.message,
                apiKey: formData.apiKey
            };

            const res = await axios.post('/api/chat/submit-form', submissionData);

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

            const res = await axios.post('/api/chat/continue', continueChatData);

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
        <div className="container mx-auto max-w-3xl px-4 py-10">
            <Quote />

            {/* Main Form */}
            <div className="card-glass animate-fade-up p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-glow">
                        <MessageSquareHeart className="h-6 w-6" />
                    </span>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Share Your Story</h2>
                        <p className="text-sm text-slate-500">Tell us what's going on — we'll help you figure out the next step.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700">Your name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Alex" className="input-field" required />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700">Partner's name</label>
                            <input type="text" name="partnerName" value={formData.partnerName} onChange={handleInputChange} placeholder="e.g. Sam" className="input-field" required />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700">Your age</label>
                            <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="e.g. 28" className="input-field" required />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">What's your concern?</label>
                        <select name="selectedConcern" value={formData.selectedConcern} onChange={handleInputChange} className="input-field cursor-pointer" required>
                            <option value="">Select your concern</option>
                            {concernTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        {formData.selectedConcern === 'Other' && (
                            <textarea name="concern" value={formData.concern} onChange={handleInputChange} placeholder="Please describe your concern..." className="input-field mt-2 min-h-[110px] resize-y" required />
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Your message</label>
                        <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Describe the situation in your own words..." className="input-field min-h-[120px] resize-y" required />
                    </div>

                    {/* Advanced API keys */}
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60">
                        <button type="button" onClick={() => setShowApiKeys((v) => !v)} className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100/60">
                            <span>Advanced — use your own API key (optional)</span>
                            <span className={`text-slate-400 transition-transform duration-200 ${showApiKeys ? 'rotate-45' : ''}`}>+</span>
                        </button>
                        {showApiKeys && (
                            <div className="space-y-3 border-t border-slate-200 p-4">
                                <p className="text-xs text-slate-500">Leave blank to use the built-in advisor. Keys are sent securely and never stored.</p>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                    <input type="password" autoComplete="off" name="gemini" value={formData.apiKey.gemini} onChange={handleInputChange} placeholder="Gemini API Key" className="input-field py-2.5 text-sm" />
                                    <input type="password" autoComplete="off" name="openai" value={formData.apiKey.openai} onChange={handleInputChange} placeholder="OpenAI API Key" className="input-field py-2.5 text-sm" />
                                    <input type="password" autoComplete="off" name="anthropic" value={formData.apiKey.anthropic} onChange={handleInputChange} placeholder="Anthropic API Key" className="input-field py-2.5 text-sm" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center pt-2">
                        <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
                            {loading ? (
                                <><Loader2 className="h-5 w-5 animate-spin" /> Thinking...</>
                            ) : (
                                <><Sparkles className="h-5 w-5" /> Get Advice</>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-6 flex animate-fade-up items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {/* AI Response */}
            {(animatedText || response) && (
                <div className="card-glass mt-8 animate-fade-up p-6 sm:p-8">
                    <div className="mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        <h2 className="text-xl font-bold text-slate-900">Your Advice</h2>
                    </div>

                    <TypingResponse text={animatedText} onComplete={() => setResponse(animatedText)} />

                    {response && (
                        <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                            <label className="text-sm font-medium text-slate-700">Ask a follow-up</label>
                            <textarea
                                value={followUpMessage}
                                onChange={(e) => setFollowUpMessage(e.target.value)}
                                placeholder="Anything you'd like to dig into further?"
                                className="input-field min-h-[90px] resize-y"
                            />
                            <button onClick={handleContinueChat} disabled={loading || !followUpMessage} className="btn-primary">
                                {loading ? (
                                    <><Loader2 className="h-5 w-5 animate-spin" /> Thinking...</>
                                ) : (
                                    <><Send className="h-4 w-4" /> Continue Chat</>
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