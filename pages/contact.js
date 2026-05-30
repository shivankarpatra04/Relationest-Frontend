import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import PublicHeader from '../components/PublicHeader';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

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
        <div className="flex min-h-screen flex-col">
            <PublicHeader links={[{ label: 'Back to App', path: '/main', primary: true }]} />

            <main className="container mx-auto max-w-2xl flex-grow px-4 py-12">
                <div className="animate-fade-up text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Get in <span className="text-gradient">Touch</span></h1>
                    <p className="mx-auto mt-3 max-w-md text-slate-600">Have a question or feedback? We'd love to hear from you.</p>
                </div>

                {message && (
                    <div className={`mt-8 flex items-start gap-3 rounded-xl border p-4 ${message.type === 'success' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
                        {message.type === 'success' ? <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" /> : <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />}
                        <p className="text-sm">{message.text}</p>
                    </div>
                )}

                <div className="card-glass mt-8 animate-fade-up animate-delay-100 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label htmlFor="name" className="text-sm font-medium text-slate-700">Name</label>
                            <input id="name" name="name" type="text" className="input-field" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required autoComplete="name" />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                            <input id="email" name="email" type="email" className="input-field" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required autoComplete="email" />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                            <textarea id="message" name="message" className="input-field min-h-[150px] resize-y" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary w-full">
                            {loading ? (<><Loader2 className="h-5 w-5 animate-spin" /> Sending...</>) : 'Send Message'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}