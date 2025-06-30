import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, X } from "lucide-react";

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export const AskMeAnythingBubble = () => {
    const [open, setOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
    const [isAIAvailable, setIsAIAvailable] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Check AI availability on component mount
    useEffect(() => {
        const checkAIAvailability = async () => {
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: 'test', conversationHistory: [] }),
                });
                
                if (response.status === 500) {
                    const errorData = await response.json();
                    if (errorData.error?.includes('not configured')) {
                        setIsAIAvailable(false);
                    }
                }
            } catch (error) {
                console.log('AI service not available:', error);
                setIsAIAvailable(false);
            }
        };
        
        checkAIAvailability();
    }, []);

    // Close popup when clicking outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                handleClose();
            }
        };
        if (open) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    // Focus input when open
    useEffect(() => {
        if (open && !isClosing) {
            // Small delay to ensure animation starts first
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [open, isClosing]);

    // Focus input after reply is received
    useEffect(() => {
        if (open && !isLoading && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isLoading, open]);

    // Scroll to bottom when new messages arrive (only within chat container)
    useEffect(() => {
        if (messagesContainerRef.current && messages.length > 0) {
            const container = messagesContainerRef.current;
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    const handleOpen = () => {
        setIsClosing(false);
        setShouldRender(true);
        setOpen(true);
    };

    const handleClose = () => {
        if (!open || isClosing) return;
        
        setIsClosing(true);
        
        // Wait for exit animation to complete before hiding
        setTimeout(() => {
            setOpen(false);
            setIsClosing(false);
            setShouldRender(false);
            // Reset conversation when closing
            setMessages([]);
            setConversationHistory([]);
            setInputValue("");
        }, 200);
    };

    const handleToggle = () => {
        if (open && !isClosing) {
            handleClose();
        } else if (!open) {
            handleOpen();
        }
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setInputValue("");
        
        // Add user message to UI immediately
        const newUserMessage: Message = { role: 'user', content: userMessage };
        setMessages(prev => [...prev, newUserMessage]);
        setIsLoading(true);

        // If AI is not available, provide fallback responses
        if (!isAIAvailable) {
            setTimeout(() => {
                const fallbackResponse = getFallbackResponse(userMessage);
                const fallbackMessage: Message = { role: 'assistant', content: fallbackResponse };
                setMessages(prev => [...prev, fallbackMessage]);
                setIsLoading(false);
            }, 1000);
            return;
        }

        try {
            console.log('Sending chat request:', { message: userMessage, conversationHistoryLength: conversationHistory.length });
            
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversationHistory: conversationHistory
                }),
            });

            console.log('Chat response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                console.error('Chat API error:', errorData);
                throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Chat response data:', data);
            
            // Add AI response to UI
            const aiMessage: Message = { role: 'assistant', content: data.response };
            setMessages(prev => [...prev, aiMessage]);
            setConversationHistory(data.conversationHistory);

        } catch (error) {
            console.error('Chat error:', error);
            
            let errorMessage = 'Sorry, I encountered an error. Please try again.';
            
            if (error instanceof Error) {
                if (error.message.includes('OpenAI API key is not configured')) {
                    errorMessage = 'AI service is not configured. Please contact the administrator.';
                } else if (error.message.includes('Invalid OpenAI API key')) {
                    errorMessage = 'AI service authentication failed. Please contact the administrator.';
                } else if (error.message.includes('Rate limit exceeded')) {
                    errorMessage = 'Too many requests. Please wait a moment and try again.';
                } else if (error.message.includes('Unable to connect')) {
                    errorMessage = 'Network error. Please check your internet connection and try again.';
                } else {
                    errorMessage = `Error: ${error.message}`;
                }
            }
            
            // Add error message
            const errorMessageObj: Message = { 
                role: 'assistant', 
                content: errorMessage
            };
            setMessages(prev => [...prev, errorMessageObj]);
        } finally {
            setIsLoading(false);
        }
    };

    const getFallbackResponse = (message: string): string => {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! I'm Rafid Rahman, a Software Engineer from Dhaka, Bangladesh. I specialize in full-stack development with React, Next.js, and modern web technologies. Feel free to ask me about my work or check out my portfolio!";
        }
        
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
            return "I'm proficient in React, Next.js, Node.js, TypeScript, and modern web frameworks. I also have experience with cloud platforms like AWS, Docker, and CI/CD pipelines. I love working with databases (both SQL and NoSQL) and building scalable applications.";
        }
        
        if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('project')) {
            return "I have experience in full-stack development, focusing on creating user-friendly web applications. I've worked on various projects involving React, Next.js, and cloud technologies. I'm passionate about clean code, user experience, and continuous learning.";
        }
        
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return "You can reach me through the contact form on this website, or connect with me on LinkedIn and GitHub. I'm always open to discussing new opportunities and collaborations!";
        }
        
        if (lowerMessage.includes('github') || lowerMessage.includes('portfolio') || lowerMessage.includes('project')) {
            return "You can check out my GitHub profile to see my projects and contributions. I'm active in the open-source community and love sharing my work. Feel free to explore my repositories!";
        }
        
        return "Thanks for your message! I'm currently not available for real-time chat, but I'd love to hear from you. You can use the contact form on this website to send me a message, and I'll get back to you via email. Feel free to ask about my work, skills, or any collaboration opportunities!";
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="relative flex items-center" ref={containerRef}>
            {/* Chat Bubble Button */}
            {!shouldRender && (
                <button
                    aria-label="Ask Me Anything"
                    onClick={handleToggle}
                    className="flex items-center gap-2 bg-background shadow-md rounded-full px-4 py-2 text-sm font-semibold text-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                    <span className={`text-lg transition-transform duration-200 ${open ? 'animate-pulse' : 'animate-bounce'}`}>💬</span>
                    <span>Ask Me</span>
                </button>
            )}
            
            {/* Popup Bubble */}
            {shouldRender && (
                <div
                    className={`left-full ml-4 top-0 z-20
                        bg-background rounded-none sm:rounded-2xl shadow-2xl border border-border p-0 sm:p-4 max-w-xs mx-auto sm:w-80 max-h-[100dvh] sm:max-h-96
                        ${isClosing ? 'animate-pop-out' : 'animate-pop-in'}
                        transform origin-left flex flex-col
                        sm:rounded-2xl sm:p-4 sm:w-80 sm:max-h-96
                        transition-all duration-200
                    `}
                    style={{ minWidth: "0", maxWidth: "100vw" }}
                >
                    <div className="bubble-tail hidden sm:block"></div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3 px-4 pt-4 sm:px-0 sm:pt-0">
                        <div className="font-semibold text-foreground flex items-center gap-2 text-base sm:text-lg">
                            <span className="text-primary animate-pulse">🤔</span>
                            Ask Me Anything
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div 
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-auto mb-3 max-h-[60dvh] sm:max-h-64 space-y-2 chat-scrollbar px-4 sm:px-0"
                    >
                        {messages.length === 0 ? (
                            <div className="text-sm text-muted-foreground text-center py-4">
                                {isAIAvailable 
                                    ? "Ask me anything about my work, skills, or experience!"
                                    : "AI chat is currently unavailable. You can still send me a message and I'll get back to you via email!"
                                }
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex message-slide-in ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] px-3 py-2 rounded-lg text-sm sm:text-base ${
                                            message.role === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted text-muted-foreground'
                                        }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))
                        )}
                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="typing-dots">Thinking</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="flex gap-2 px-4 pb-4 sm:px-0 sm:pb-0">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your question..."
                            className="flex-1 px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 hover:border-ring text-sm placeholder:text-muted-foreground"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isLoading}
                            className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
