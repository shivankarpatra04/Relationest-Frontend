import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ChatHistory = () => {
    const router = useRouter();
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchChats();
        }
    }, []);

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const fetchChats = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/chats`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setChats(res.data);
        } catch (error) {
            console.error('Error fetching chats:', error);
            setError('Failed to fetch chats. Please try again.');
        }
        setLoading(false);
    };

    const handleChatClick = async (chatId) => {
        try {
            const token = getToken();
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/chats/${chatId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSelectedChat(res.data);
        } catch (error) {
            console.error('Error fetching chat details:', error);
            setError('Failed to fetch chat details. Please try again.');
        }
    };

    const handleDeleteChat = async (chatId, e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this chat?')) {
            try {
                const token = getToken();
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/chats/${chatId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setChats(chats.filter(chat => chat._id !== chatId));
                if (selectedChat && selectedChat._id === chatId) {
                    setSelectedChat(null);
                }
            } catch (error) {
                console.error('Error deleting chat:', error);
                setError('Failed to delete chat. Please try again.');
            }
        }
    };

    const formatMessageSender = (message, chatData) => {
        if (message.fromUser) {
            return chatData.name || 'User';
        }
        return 'AI Advisor';
    };

    const formatText = (text) => {
        return text.split('\n').map((line, i) => (
            <p key={i} className="mb-2">
                {line.split('**').map((part, j) => (
                    j % 2 === 0 ? part : <strong key={j}>{part}</strong>
                ))}
            </p>
        ));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <span onClick={() => router.push('/')} className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80">
                                RelatioNest
                            </span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <button
                                onClick={() => router.push('/main')}
                                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Back to Main
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                        <p className="mt-4 text-slate-600">Loading chats...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Your Conversations</h2>
                                <div className="space-y-3">
                                    {chats.map((chat) => (
                                        <div
                                            key={chat._id}
                                            onClick={() => handleChatClick(chat._id)}
                                            className={`border rounded-lg p-4 cursor-pointer hover:bg-slate-50 transition-colors duration-200 relative ${selectedChat?._id === chat._id ? 'bg-purple-50 border-purple-500' : ''
                                                }`}
                                        >
                                            <h3 className="font-bold text-lg mb-1">{chat.partnerName}</h3>
                                            <p className="text-slate-600 text-sm mb-2 line-clamp-2">{chat.concern}</p>
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs text-slate-500">
                                                    {new Date(chat.createdAt).toLocaleDateString()}
                                                </p>
                                                <button
                                                    onClick={(e) => handleDeleteChat(chat._id, e)}
                                                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {chats.length === 0 && (
                                        <p className="text-slate-500 text-center py-4">No chats found</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            {selectedChat ? (
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <div className="border-b pb-4 mb-4">
                                        <h2 className="text-2xl font-semibold text-slate-800">{selectedChat.partnerName}</h2>
                                        <p className="text-slate-600 mt-1">{selectedChat.concern}</p>
                                    </div>
                                    <div className="space-y-4">
                                        {selectedChat.messages.map((message, index) => (
                                            <div
                                                key={index}
                                                className={`p-4 rounded-lg ${message.fromUser
                                                    ? 'bg-purple-50 ml-auto max-w-[80%]'
                                                    : 'bg-slate-50 mr-auto max-w-[80%]'
                                                    }`}
                                            >
                                                <p className={`font-semibold text-sm mb-1 ${message.fromUser ? 'text-purple-700' : 'text-slate-700'
                                                    }`}>
                                                    {formatMessageSender(message, selectedChat)}
                                                </p>
                                                <div className="text-slate-800 whitespace-pre-wrap">{formatText(message.text)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow-lg p-8 text-center text-slate-500">
                                    Select a chat to view the conversation
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            <footer className="bg-slate-900 text-slate-200 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">RelatioNest</h3>
                            <p className="text-slate-400">Empowering stronger connections through understanding</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button onClick={() => router.push('/about')} className="text-slate-400 hover:text-white transition-colors">
                                        About Us
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => router.push('/contact')} className="text-slate-400 hover:text-white transition-colors">
                                        Contact
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => router.push('/privacy')} className="text-slate-400 hover:text-white transition-colors">
                                        Privacy Policy
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                            <p className="text-slate-400">support@relationshipadvisor.com</p>
                            <p className="text-slate-400">(555) 123-4567</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
                        <p>© {new Date().getFullYear()} Relationship Advisor. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatHistory;