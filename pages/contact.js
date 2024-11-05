import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

export default function ContactPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            // Add validation
            if (!formData.name || !formData.email || !formData.message) {
                setMessage({
                    type: 'error',
                    text: 'Please fill in all fields'
                });
                setLoading(false);
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setMessage({
                    type: 'error',
                    text: 'Please enter a valid email address'
                });
                setLoading(false);
                return;
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/submit`, formData);
            if (response.data.success) {
                setMessage({
                    type: 'success',
                    text: 'Message sent successfully! We will get back to you soon.'
                });
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            } else {
                setMessage({
                    type: 'error',
                    text: response.data.message || 'Failed to send message'
                });
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || error.message || 'Failed to send message. Please try again.'
            });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            <header className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-between items-center h-16">
                        <span onClick={() => router.push('/')}
                            className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent cursor-pointer">
                            RelatioNest
                        </span>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold text-slate-800 mb-8">Contact Us</h1>
                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.text}
                    </div>
                )}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                Name
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    autoComplete="name"
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                Email
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    autoComplete="email"
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                                Message
                                <textarea
                                    id="message"
                                    name="message"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[150px]"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-medium rounded-lg hover:from-rose-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}