import { useState, useEffect, useRef } from 'react'

const SUGGESTIONS = [
  { label: '📅 Room Availability', query: 'Room Availability' },
  { label: '💰 Rent & Pricing', query: 'Rent & Pricing' },
  { label: '🚗 Amenities', query: 'Amenities' },
  { label: '📍 Location', query: 'Location' },
  { label: '📋 Rules & Policies', query: 'Rules & Policies' },
  { label: '📞 How to Book', query: 'How to Book' }
]

const generateMessage = (sender, text) => ({
  id: `${sender}-${Date.now()}-${Math.random()}`,
  sender,
  text,
  timestamp: new Date()
})

const renderMessageText = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = text.split(urlRegex)
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a 
          key={index} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="chat-link"
        >
          {part}
        </a>
      )
    }
    return part
  })
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(() => [
    generateMessage(
      'ai',
      "Namaskar! 🙏 Welcome to Keshab Room Rent, North Guwahati. I'm your AI assistant, powered by Gemini. You can ask me about our available rooms, monthly rent, amenities, house rules, or location. How may I assist you today? 😊"
    )
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef(null)

  // Auto-scroll messages to the bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  const handleSend = async (textToSend) => {
    const trimmed = textToSend?.trim()
    // Prevent empty messages and duplicate submissions while a request is pending
    if (!trimmed || isTyping) return

    const newUserMessage = generateMessage('user', trimmed)
    setMessages((prev) => [...prev, newUserMessage])
    setInputValue('')
    setIsTyping(true)
    setShowSuggestions(false) // Hide suggestion options once a query has been sent

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: trimmed })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || `Server responded with status ${response.status}`)
      }

      const replyText = data?.reply || "I'm sorry, I couldn't generate a response. Please contact the owner at +91 9365844130."
      const newAIMessage = generateMessage('ai', replyText)
      setMessages((prev) => [...prev, newAIMessage])
    } catch (err) {
      console.error('Chat request error:', err)
      const fallbackMsg = generateMessage(
        'ai',
        "I'm having trouble connecting to the server right now. For room inquiries or availability, please reach the owner directly at +91 9365844130 (Call or WhatsApp) 🙏"
      )
      setMessages((prev) => [...prev, fallbackMsg])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      handleSend(inputValue)
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="chatbot-wrapper">
      {/* Floating Launcher Button */}
      <button 
        className={`chatbot-launcher ${isOpen ? 'active' : ''}`} 
        onClick={toggleChat}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          // Close Icon
          <svg className="icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          // AI Chat / Spark Icon
          <div className="launcher-icon-wrapper">
            <svg className="icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <svg className="icon-spark" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
            </svg>
          </div>
        )}

        {/* Pulse rings for subtle attention */}
        {!isOpen && <span className="launcher-pulse"></span>}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="header-info">
            <div className="avatar-wrapper">
              <svg className="avatar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <div className="online-indicator"></div>
            </div>
            <div className="header-texts">
              <h3>Keshab AI Assistant</h3>
              <span>Keshab Room Rent • Online</span>
            </div>
          </div>
          <button className="header-close-btn" onClick={toggleChat} aria-label="Close chat window">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages" data-lenis-prevent>
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble-container ${msg.sender}`}>
              {msg.sender === 'ai' && (
                <div className="bubble-avatar">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                  </svg>
                </div>
              )}
              <div className="chat-bubble">
                <p>{renderMessageText(msg.text)}</p>
                <span className="bubble-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="chat-bubble-container ai typing">
              <div className="bubble-avatar">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>
              </div>
              <div className="chat-bubble typing-bubble">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips - visible only before the first query is sent */}
        {showSuggestions && (
          <div className="chatbot-suggestions">
            <div className="suggestions-grid">
              {SUGGESTIONS.map((sug, idx) => (
                <button 
                  key={idx}
                  type="button"
                  className="suggestion-chip" 
                  onClick={() => !isTyping && handleSend(sug.query)}
                  disabled={isTyping}
                >
                  {sug.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <div className="chatbot-input-area">
          <input
            type="text"
            className="chatbot-input"
            placeholder={isTyping ? "Gemini is thinking..." : "Ask about rooms, pricing, booking..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isTyping}
          />
          <button 
            className="chatbot-send-btn" 
            onClick={() => handleSend(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
