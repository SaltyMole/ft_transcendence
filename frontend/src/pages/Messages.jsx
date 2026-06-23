import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button';

function Messages() {
    const { friendId } = useParams();
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [friendInfo, setFriendInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const defaultAvatar = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadInitialData = async () => {
        if (!friendId) {
            setErrors([{ message: 'No friend selected' }]);
            setLoading(false);
            return;
        }

        try {
            const friendsRes = await fetch('/api/friends', { credentials: 'include' });
            
            if (friendsRes.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/Login';
                return;
            }

            const friendsData = await friendsRes.json();
            if (friendsRes.ok) {
                const friend = friendsData.friends?.find(f => f.id === friendId);
                if (friend) {
                    setFriendInfo(friend);
                } else {
                    setErrors([{ message: 'You are not friends with this user' }]);
                }
            }

            await fetchMessages();

        } catch (error) {
            setErrors([{ message: 'Error loading conversation' }]);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async () => {
        if (!friendId) return;
        try {
            const response = await fetch(`/api/messages/${friendId}`, { credentials: 'include' });
            
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/Login';
                return;
            }

            const data = await response.json();
            if (response.ok) {
                setMessages(data.messages || []);
            } else {
                setErrors([{ message: data.error || 'Failed to load messages' }]);
            }
        } catch (error) {
            console.error("Fetch messages error:", error);
        }
    };

    useEffect(() => {
        loadInitialData();
        
        const interval = setInterval(() => {
            fetchMessages();
        }, 5000);
        
        return () => clearInterval(interval);
    }, [friendId]);

    const handleSendMessage = async () => {
        if (!content || !content.trim()) return;

        setErrors([]);
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ receiverId: friendId, content: content.trim() })
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/Login';
                return;
            }

            const data = await response.json();
            if (response.ok) {
                setContent('');
                fetchMessages(); 
            } else {
                setErrors([{ message: data.error || 'Failed to send message' }]);
            }
        } catch (error) {
            setErrors([{ message: 'Server error while sending message' }]);
        }
    };

    // --- NEW LOGIC: Keyboard Handler ---
    const handleKeyDown = (e) => {
        // If Enter is pressed AND Shift is NOT pressed
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Stop it from creating a new line
            handleSendMessage(); // Send the message instead
        }
        // If Shift + Enter is pressed, do nothing special (it creates a new line naturally)
    };

    if (loading) {
        return (
            <main className="relative w-full flex-1 overflow-hidden">
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <div className='bg-[#FFFADE]/90 px-8 py-4 rounded-xl border-2 border-[#58508D] shadow-xl'>
                        <h1 id="homeText" className='!text-[#4D007E] !m-0'>Loading chat...</h1>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="relative w-full flex-1 overflow-hidden">
            
            <div className='absolute inset-0 flex flex-col md:p-4 lg:px-16 xl:px-32 2xl:px-48 pb-0 overflow-hidden'>
                
                <div className="flex flex-col h-full bg-[#FFFADE] md:border-2 border-t-2 border-[#58508D] md:rounded-t-2xl md:rounded-b-none overflow-hidden shadow-2xl">
                    
                    {/* Chat Header */}
                    <div className="flex items-center gap-3 md:gap-4 bg-[#c9b3ff] p-3 md:p-4 border-b-2 border-[#58508D] shrink-0">
                        {friendInfo ? (
                            <Link to={`/profile/${friendId}`} className="flex items-center gap-3 group">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-[50%] overflow-hidden border-2 border-[#58508D] bg-white shrink-0 flex items-center justify-center">
                                    <img 
                                        src={friendInfo.avatar || defaultAvatar} 
                                        alt={friendInfo.username} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <h2 className="text-[#4D007E] font-extrabold text-lg md:text-2xl uppercase tracking-wider truncate !p-0 !m-0 text-left group-hover:underline">
                                    {friendInfo.username}
                                </h2>
                            </Link>
                        ) : (
                            <h2 className="text-[#4D007E] font-extrabold text-lg md:text-2xl uppercase tracking-wider !p-0 !m-0">Messages</h2>
                        )}
                    </div>

                    {/* Main Chat Area */}
                    <div className="flex-1 overflow-y-auto p-3 md:p-4 flex flex-col gap-3 md:gap-4 relative">
                        {errors?.map((error, index) => (
                            <div key={index} className='bg-red-100 border border-red-400 text-red-700 p-2 md:p-4 rounded-lg text-center mx-auto mb-2 md:mb-4 w-fit shrink-0'>
                                {error.message}
                            </div>
                        ))}

                        {messages.length === 0 ? (
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-[#58508D] font-bold opacity-70 bg-[#c9b3ff]/30 px-6 py-3 rounded-full text-sm md:text-base">
                                    No messages yet. Say hi!
                                </p>
                            </div>
                        ) : (
                            messages.map((msg) => {
                                const isMe = msg.senderId !== friendId; 
                                return (
                                    <div key={msg.id} className={`flex flex-col shrink-0 ${isMe ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[90%] md:max-w-[75%] p-3 shadow-sm text-sm md:text-base ${
                                            isMe 
                                            ? 'bg-[#58508D] text-white rounded-2xl rounded-br-sm' 
                                            : 'bg-[#c9b3ff] text-[#4D007E] border border-[#a488eb] rounded-2xl rounded-bl-sm'
                                        }`}>
                                            {/* THE FIX: Added whitespace-pre-wrap so HTML respects the \n newlines */}
                                            <p className="break-words leading-relaxed text-left whitespace-pre-wrap">{msg.content}</p>
                                        </div>
                                        <span className={`text-xs mt-1 font-semibold ${isMe ? 'text-[#7972A3] mr-1' : 'text-[#7972A3] ml-1'}`}>
                                            {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                        </span>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} className="shrink-0 h-1" />
                    </div>

                    {/* Message Input & Send Button */}
                    <div className="bg-[#c9b3ff] p-3 md:p-4 border-t-2 border-[#58508D] flex gap-2 md:gap-3 items-end shrink-0">
                        <div className="flex-1 w-full block text-start">
                            {/* THE FIX: Swapped custom <Input> for a native <textarea> to allow multiple lines */}
                            <textarea
                                className="Input !w-full !m-0 !py-3 !px-4 !text-[#4D007E] shadow-inner rounded-xl resize-none outline-none"
                                placeholder="Type a message..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onKeyDown={handleKeyDown}
                                rows={1}
                            />
                        </div>

                        <Button 
                            value="buttonP shrink-0 !m-0 !py-3 !px-6 hover:!shadow-lg transition-all" 
                            text="Send" 
                            action={handleSendMessage} 
                        />
                    </div>

                </div>
            </div>
        </main>
    );
}

export default Messages;