import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage, toggleDarkMode } from '../../store/slices/appSlice'

const Header = () => {
  const { darkMode, language } = useSelector((state) => state.app)
  const dispatch = useDispatch()

  const handleLanguageChange = () => {
    const newLang = language === 'ar' ? 'en' : 'ar'
    dispatch(setLanguage(newLang))
    document.documentElement.lang = newLang
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
  }

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode())
  }

  return (
    <header className="flex justify-between items-center py-6 border-b border-gray-300 dark:border-gray-700 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src="/unnamed.jpg"
            alt="Sil-Health"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Sil-Health</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={handleThemeToggle}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? (
            <i className="fas fa-sun text-xl"></i>
          ) : (
            <i className="fas fa-moon text-xl"></i>
          )}
        </button>
        
        <button
          onClick={handleLanguageChange}
          className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <i className="fas fa-language"></i>
          <span>{language === 'ar' ? 'EN' : 'AR'}</span>
        </button>
      </div>
    </header>
  )
}

export default Header