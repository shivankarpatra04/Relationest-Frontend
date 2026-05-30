import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Trash2, MessageSquare, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

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

    return (
        <main className="container mx-auto max-w-6xl flex-grow px-4 py-10">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Your Conversations</h1>
                    <p className="mt-1 text-sm text-slate-500">Revisit the advice from your past sessions.</p>
                </div>
                <button onClick={() => router.push('/main')} className="btn-ghost text-sm">
                    <ArrowLeft className="h-4 w-4" /> New chat
                </button>
            </div>

            {error && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center py-20 text-slate-500">
                    <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
                    <p className="mt-4">Loading your chats...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* List */}
                    <div className="lg:col-span-1">
                        <div className="card-glass max-h-[70vh] overflow-y-auto p-4">
                            <div className="space-y-2">
                                {chats.map((chat) => {
                                    const active = selectedChat?._id === chat._id;
                                    return (
                                        <div
                                            key={chat._id}
                                            onClick={() => handleChatClick(chat._id)}
                                            className={`group cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                                                active
                                                    ? 'border-purple-300 bg-purple-50 shadow-sm'
                                                    : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-semibold text-slate-900">{chat.partnerName}</h3>
                                                <button
                                                    onClick={(e) => handleDeleteChat(chat._id, e)}
                                                    className="rounded-md p-1 text-slate-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
                                                    aria-label="Delete chat"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <p className="mb-2 mt-1 line-clamp-2 text-sm text-slate-600">{chat.concern}</p>
                                            <p className="text-xs text-slate-400">{new Date(chat.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    );
                                })}
                                {chats.length === 0 && (
                                    <div className="flex flex-col items-center py-12 text-center text-slate-400">
                                        <MessageSquare className="mb-3 h-10 w-10" />
                                        <p className="text-sm">No conversations yet.</p>
                                        <button onClick={() => router.push('/main')} className="mt-3 text-sm font-medium text-purple-600 hover:text-purple-800">
                                            Start your first chat
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Conversation */}
                    <div className="lg:col-span-2">
                        {selectedChat ? (
                            <div className="card-glass animate-fade-up p-6 sm:p-8">
                                <div className="mb-6 border-b border-slate-100 pb-4">
                                    <h2 className="text-2xl font-bold text-slate-900">{selectedChat.partnerName}</h2>
                                    <p className="mt-1 text-slate-500">{selectedChat.concern}</p>
                                </div>
                                <div className="space-y-4">
                                    {selectedChat.messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`max-w-[85%] rounded-2xl p-4 ${
                                                message.fromUser
                                                    ? 'ml-auto bg-gradient-to-br from-rose-500 to-purple-600 text-white'
                                                    : 'mr-auto border border-slate-100 bg-white'
                                            }`}
                                        >
                                            <p className={`mb-1 text-xs font-semibold ${message.fromUser ? 'text-white/80' : 'text-purple-600'}`}>
                                                {formatMessageSender(message, selectedChat)}
                                            </p>
                                            <div className={`prose prose-sm max-w-none prose-strong:font-semibold prose-li:my-0.5 ${message.fromUser ? 'prose-invert text-white' : 'text-slate-700'}`}>
                                                <ReactMarkdown>{message.text}</ReactMarkdown>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="card-glass flex flex-col items-center justify-center p-16 text-center text-slate-400">
                                <MessageSquare className="mb-4 h-12 w-12" />
                                <p>Select a conversation to view the advice.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
};

export default ChatHistory;