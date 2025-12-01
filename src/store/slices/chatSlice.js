import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [
    {
      id: 1,
      text: 'مرحباً! أنا Sil-Health، مساعدك الطبي الذكي. كيف يمكنني مساعدتك اليوم؟',
      isUser: false,
      timestamp: new Date().toISOString(),
    },
  ],
  isTyping: false,
  imageContext: {
    hasContext: false,
    imageData: null,
    analysis: null,
    timestamp: null,
  },
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload
    },
    clearChat: (state) => {
      state.messages = [initialState.messages[0]]
    },
    setImageContext: (state, action) => {
      state.imageContext = {
        hasContext: true,
        imageData: action.payload.imageData,
        analysis: action.payload.analysis,
        timestamp: new Date().toISOString(),
      }
    },
    clearImageContext: (state) => {
      state.imageContext = {
        hasContext: false,
        imageData: null,
        analysis: null,
        timestamp: null,
      }
    },
  },
})

export const { addMessage, setTyping, clearChat, setImageContext, clearImageContext } = chatSlice.actions
export default chatSlice.reducer