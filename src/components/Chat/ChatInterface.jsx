import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setTyping } from '../../store/slices/chatSlice'
import { GeminiAPI } from '../../utils/gemini'
import Message from './Message'

const ChatInterface = () => {
  const [inputMessage, setInputMessage] = useState('')
  const dispatch = useDispatch()
  const { messages, isTyping, imageContext } = useSelector((state) => state.chat)
  const { language } = useSelector((state) => state.app)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)


  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date().toISOString(),
    }

    dispatch(addMessage(userMessage))
    setInputMessage('')


    dispatch(setTyping(true))

    try {
      // Pass imageContext to enable context-aware responses
      const response = await GeminiAPI.sendMessage(inputMessage, imageContext)

      const aiMessage = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date().toISOString(),
      }

      dispatch(addMessage(aiMessage))
    } catch (error) {
      console.error('Chat error:', error)

      const aiMessage = {
        id: Date.now() + 1,
        text: language === 'ar'
          ? 'شكراً على سؤالك الطبي. هذا موضوع مهم وأنا هنا للمساعدة بأفضل ما لدي من معلومات.'
          : 'Thank you for your medical question. This is an important topic and I am here to help with the best information I have.',
        isUser: false,
        timestamp: new Date().toISOString(),
      }

      dispatch(addMessage(aiMessage))
    } finally {
      dispatch(setTyping(false))
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="card h-[600px] flex flex-col">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <i className="fas fa-comments text-blue-500 text-xl"></i>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {language === 'ar' ? 'المساعد الطبي التفاعلي' : 'Interactive Medical Assistant'}
        </h2>
        {imageContext.hasContext && (
          <span className="ml-auto bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <i className="fas fa-image"></i>
            {language === 'ar' ? 'سياق الصورة نشط' : 'Image context active'}
          </span>
        )}
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 space-y-4 px-2 scroll-smooth"
      >
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="message-ai">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-gray-500 text-sm">
                  {language === 'ar' ? 'جاري الكتابة...' : 'Typing...'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} style={{ float: 'left', clear: 'both' }} />
      </div>

      <div className="flex gap-3 mt-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={language === 'ar' ? 'اكتب سؤالك الطبي هنا...' : 'Type your medical question here...'}
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <i className="fas fa-paper-plane"></i>
          {language === 'ar' ? 'إرسال' : 'Send'}
        </button>
      </div>
    </div>
  )
}

export default ChatInterface