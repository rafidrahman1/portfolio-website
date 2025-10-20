import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ElectricBorder from "../ElectricBorder";

interface Message {
    id: string;
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
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const messageIdCounterRef = useRef(0);

    const generateMessageId = () => {
        messageIdCounterRef.current += 1;
        return `${Date.now()}-${messageIdCounterRef.current}`;
    };

    // Check AI availability on component mount
    useEffect(() => {
        const checkAIAvailability = async () => {
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ healthCheck: true }),
                });
                const data = await response.json().catch(() => ({}));
                if (!response.ok || data?.ok !== true) setIsAIAvailable(false);
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

        const addMessage = (message: Message) => {
            setMessages(prev => [...prev, message]);
        };

        const addAssistantMessage = (content: string) => {
            addMessage({ id: generateMessageId(), role: 'assistant', content });
        };

        const callChatApi = async (message: string) => {
            return fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    // Only send role/content to API
                    conversationHistory: conversationHistory.map(({ role, content }) => ({ role, content }))
                })
            });
        };

        const getErrorMessageFromBadResponse = async (response: Response): Promise<string> => {
            const errorStatus = response.status;
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));

            if (errorStatus === 429) {
                if (typeof errorData?.error === 'string' && errorData.error.length > 0) {
                    return errorData.error;
                }
                if (typeof errorData?.retryAfterHuman === 'string') {
                    return `You have reached the maximum number of questions for this session (10). Try again in ${errorData.retryAfterHuman}.`;
                }
                return 'Too many requests. Please wait and try again.';
            }

            return (typeof errorData?.error === 'string' && errorData.error)
                || `HTTP ${response.status}: ${response.statusText}`;
        };

        const getErrorMessageFromException = (error: unknown): string => {
            if (!(error instanceof Error)) {
                return 'Sorry, I encountered an error. Please try again.';
            }
            const message = error.message;
            if (message.includes('OpenAI API key is not configured')) {
                return 'AI service is not configured. Please contact the administrator.';
            }
            if (message.includes('Invalid OpenAI API key')) {
                return 'AI service authentication failed. Please contact the administrator.';
            }
            if (message.includes('Rate limit exceeded')) {
                return 'Too many requests. Please wait a moment and try again.';
            }
            if (message.includes('Unable to connect')) {
                return 'Network error. Please check your internet connection and try again.';
            }
            return `Error: ${message}`;
        };

        const respondWithFallback = (message: string) => {
            setTimeout(() => {
                const fallbackResponse = getFallbackResponse(message);
                addAssistantMessage(fallbackResponse);
                setIsLoading(false);
            }, 1000);
        };

        // Add user message to UI immediately
        addMessage({ id: generateMessageId(), role: 'user', content: userMessage });
        setIsLoading(true);

        // If AI is not available, provide fallback responses
        if (!isAIAvailable) {
            respondWithFallback(userMessage);
            return;
        }

        try {
            console.log('Sending chat request:', { message: userMessage, conversationHistoryLength: conversationHistory.length });
            const response = await callChatApi(userMessage);
            console.log('Chat response status:', response.status);

            if (!response.ok) {
                const errorMessage = await getErrorMessageFromBadResponse(response);
                console.error('Chat API error:', { status: response.status });
                addAssistantMessage(errorMessage);
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            console.log('Chat response data:', data);
            addAssistantMessage(data.response);
            // Store conversation history with generated ids for stable keys
            setConversationHistory(
                (data.conversationHistory || []).map((m: { role: 'user' | 'assistant'; content: string }) => ({
                    id: generateMessageId(),
                    role: m.role,
                    content: m.content
                }))
            );
        } catch (error) {
            console.error('Chat error:', error);
            addAssistantMessage(getErrorMessageFromException(error));
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
            {!shouldRender && (
                <ElectricBorder color="#7df9ff" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 20, padding: 4, paddingTop: 6} }>
                <Button
                    aria-label="Ask Me Anything"
                    onClick={handleToggle}
                    variant="outline"
                    className="rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2"
                >
                    <span className={`text-lg transition-transform duration-200`}>💬</span>
                    <span>Ask Me</span>
                </Button>
                </ElectricBorder>
            )}
            
            {/* Popup Bubble */}
            {shouldRender && (
                <div
                    className={`left-full ml-4 top-0 z-20
                        bg-background rounded-2xl shadow-2xl border border-border p-0 sm:p-4 w-80 mx-auto sm:w-80 max-h-[100dvh] sm:max-h-96
                        ${isClosing ? 'animate-pop-out' : 'animate-pop-in'}
                        transform origin-left flex flex-col
                        sm:rounded-2xl sm:p-4 sm:w-full sm:max-h-96
                        transition-all duration-200
                    `}
                    style={{ minWidth: "0", maxWidth: "100vw" }}
                >
                    <div className="bubble-tail hidden sm:block"></div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3 px-4 pt-4 sm:px-0 sm:pt-0">
                        <div className="font-semibold text-foreground flex items-center gap-2 text-base sm:text-lg">
                            <span className="text-primary animate-pulse">🤔</span>
                            <span>Ask Me Anything</span>
                        </div>
                        <Button
                            onClick={handleClose}
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <X size={18} />
                        </Button>
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
                            messages.map((message) => (
                                <div
                                    key={message.id}
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
                        <Input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your question..."
                            className="flex-1 text-sm"
                            disabled={isLoading}
                        />
                        <Button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isLoading}
                            className="px-3"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
