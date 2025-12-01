import React from 'react'
import { useSelector } from 'react-redux'

const Message = ({ message }) => {
  const { language } = useSelector((state) => state.app)

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={message.isUser ? 'message-user' : 'message-ai'}>
        <div className="text-sm mb-1">
          {message.isUser 
            ? (language === 'ar' ? 'أنت' : 'You')
            : (language === 'ar' ? 'Sil-Health' : 'Sil-Health')
          }
        </div>
        <div className="text-base leading-relaxed whitespace-pre-wrap">
          {message.text}
        </div>
        <div className={`text-xs mt-2 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  )
}

export default Message