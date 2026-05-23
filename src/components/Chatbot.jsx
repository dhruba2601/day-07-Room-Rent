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

const getAIResponse = (input) => {
  const cleanInput = input.toLowerCase().trim()
  
  // Greeting response
  if (cleanInput.includes('hello') || cleanInput.includes('hi') || cleanInput.includes('hey') || cleanInput.includes('sup') || cleanInput.includes('greeting') || cleanInput.includes('who are you') || cleanInput.includes('namaskar')) {
    return "Namaskar! 🙏 Welcome to Keshab Room Rent, North Guwahati. I'm your virtual assistant, here to help you find the perfect room. You can ask me about room availability, pricing, amenities, location, or how to book. How may I assist you today? 😊"
  }

  // Off-topic deflection check
  const offTopicKeywords = [
    'weather', 'job', 'work', 'hire', 'employ', 'food delivery', 'restaurant', 
    'politic', 'news', 'election', 'movie', 'sport', 'game', 'medical', 'doctor', 
    'hospital', 'song', 'music', 'opinion', 'business', 'company'
  ]
  const isOffTopic = offTopicKeywords.some(keyword => cleanInput.includes(keyword))
  
  if (isOffTopic) {
    return "I'm sorry, I can only assist with questions related to Keshab Room Rent — things like room availability, pricing, amenities, and how to book. For anything else, I'm afraid I won't be of much help! 😊 Is there anything room-related I can help you with?"
  }

  // 1. LOCATION
  if (cleanInput.includes('location') || cleanInput.includes('address') || cleanInput.includes('where') || cleanInput.includes('find') || cleanInput.includes('map') || cleanInput.includes('directions') || cleanInput.includes('pincode') || cleanInput.includes('iit')) {
    return "We are located in North Guwahati, Assam, close to the IIT Guwahati campus. You can view our exact location on Google Maps here: https://www.google.com/maps/place/Keshab(Room+Rent)/@26.1908949,91.7174035,17z/ 🙏";
  }

  // 2. ROOM TYPES
  if (cleanInput.includes('type') || cleanInput.includes('single') || cleanInput.includes('sharing') || cleanInput.includes('shared') || cleanInput.includes('family') || cleanInput.includes('rooms')) {
    return "We offer three room options:\n\n🛌 Single Room (Bachelor) — private room with more privacy.\n🤝 Sharing Room (Bachelor) — shared space, more budget-friendly.\n👨‍👩‍👧‍👦 Family Room (Family) — layout for families.\n\nAll rooms are clean, well-ventilated, and semi-furnished. For availability, please contact the owner directly! 🙏";
  }

  // 3. RENT & PRICING
  if (cleanInput.includes('rent') || cleanInput.includes('price') || cleanInput.includes('pricing') || cleanInput.includes('cost') || cleanInput.includes('charge') || cleanInput.includes('deposit') || cleanInput.includes('pay') || cleanInput.includes('rate') || cleanInput.includes('electricity') || cleanInput.includes('water')) {
    return "Our room rents are:\n\n🛌 Single Room (Bachelor): ₹7,000/month\n🤝 Sharing Room (Bachelor): ₹7,500/month\n👨‍👩‍👧‍👦 Family Room (Family): ₹12,000/month\n\nAdditional Details:\n\n💧 Water: Generally included in the rent.\n⚡ Electricity: Charged separately based on usage.\n🔒 Security Deposit: Required at move-in (fully refundable). 🙏";
  }

  // 4. AMENITIES
  if (cleanInput.includes('amenit') || cleanInput.includes('facilit') || cleanInput.includes('wi-fi') || cleanInput.includes('wifi') || cleanInput.includes('kitchen') || cleanInput.includes('cook') || cleanInput.includes('bathroom') || cleanInput.includes('toilet') || cleanInput.includes('park') || cleanInput.includes('furniture')) {
    return "Our rooms are semi-furnished and include basic furniture such as a bed, fan, and basic storage. Safe vehicle parking and shared bathroom/toilet facilities are available. Regarding Wi-Fi and kitchen/cooking access, availability may vary, so please confirm these with the owner directly — he'll be happy to help! 🙏";
  }

  // 5. RULES & POLICIES / SAFETY
  if (cleanInput.includes('rules') || cleanInput.includes('policy') || cleanInput.includes('policies') || cleanInput.includes('guest') || cleanInput.includes('visitor') || cleanInput.includes('curfew') || cleanInput.includes('safety') || cleanInput.includes('safe') || cleanInput.includes('girl') || cleanInput.includes('female') || cleanInput.includes('clean')) {
    return "We prioritize a safe, peaceful, and clean environment. Day visitors are welcome during reasonable hours, but rules for overnight guests must be discussed directly with the owner. The property is safe for all tenants, including ladies and female students. For detailed guidelines, please contact the owner directly — he'll be happy to help! 🙏";
  }

  // 6. BOOKING & CONTACT / AVAILABILITY
  if (cleanInput.includes('book') || cleanInput.includes('enquir') || cleanInput.includes('contact') || cleanInput.includes('phone') || cleanInput.includes('whatsapp') || cleanInput.includes('number') || cleanInput.includes('call') || cleanInput.includes('visit') || cleanInput.includes('move-in') || cleanInput.includes('avail')) {
    return "To book a room or check availability, please contact the owner directly at +91 9365844130 (Call or WhatsApp). We encourage in-person visits to see the rooms before finalizing! 🙏";
  }

  // General fallback for unmatched inputs
  return "I'm sorry, I can only assist with questions related to Keshab Room Rent — things like room availability, pricing, amenities, and how to book. For the most accurate and up-to-date information, please contact the owner directly — he'll be happy to help! 🙏";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(() => [
    generateMessage('ai', "Namaskar! 🙏 Welcome to Keshab Room Rent, North Guwahati. I'm your virtual assistant, here to help you find the perfect room. You can ask me about room availability, pricing, amenities, location, or how to book. How may I assist you today? 😊")
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

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return

    const newUserMessage = generateMessage('user', textToSend)

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue('')
    setIsTyping(true)
    setShowSuggestions(false) // Hide suggestion options once a query has been sent

    // Simulate AI thinking delay
    setTimeout(() => {
      const responseText = getAIResponse(textToSend)
      const newAIMessage = generateMessage('ai', responseText)
      setMessages((prev) => [...prev, newAIMessage])
      setIsTyping(false)
    }, 1200)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
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
          <button className="header-close-btn" onClick={toggleChat}>
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
                  onClick={() => handleSend(sug.query)}
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
            placeholder="Ask about rooms, pricing, booking..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button 
            className="chatbot-send-btn" 
            onClick={() => handleSend(inputValue)}
            disabled={!inputValue.trim()}
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
