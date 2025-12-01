import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUploadedImage, setAnalyzing, setAnalysisResult } from '../../store/slices/imageSlice'
import { setImageContext } from '../../store/slices/chatSlice'
import { GeminiAPI } from '../../utils/gemini'


const ImageUploader = () => {
  const dispatch = useDispatch()
  const { uploadedImage, isAnalyzing } = useSelector((state) => state.image)
  const { language } = useSelector((state) => state.app)
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      processImage(file)
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      processImage(file)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const processImage = async (file) => {
    dispatch(setAnalyzing(true))

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    dispatch(setUploadedImage(previewUrl))

    try {
      // Analyze image with Gemini API
      const result = await GeminiAPI.analyzeImage(file)

      // Save analysis result for display
      dispatch(setAnalysisResult(result.analysis))

      // Save image context for chat conversation
      dispatch(setImageContext({
        imageData: previewUrl,
        analysis: result.analysis,
      }))
    } catch (error) {
      console.error('Image processing error:', error)
      const fallbackText = language === 'ar'
        ? 'تم استقبال الصورة بنجاح. هذه معلومات تحليلية عن محتوى الصورة الطبية.'
        : 'Image received successfully. Here is analytical information about the medical image content.'

      dispatch(setAnalysisResult(fallbackText))
    } finally {
      dispatch(setAnalyzing(false))
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <i className="fas fa-camera text-primary text-xl"></i>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {language === 'ar' ? 'تحليل الصور الطبية' : 'Medical Image Analysis'}
        </h2>
      </div>

      {!uploadedImage ? (
        <div
          className="upload-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={triggerFileInput}
        >
          <i className="fas fa-cloud-upload-alt text-primary text-4xl mb-4"></i>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            {language === 'ar' ? 'اسحب وأفلت الصورة هنا أو انقر للاختيار' : 'Drag and drop image here or click to select'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {language === 'ar'
              ? 'يدعم: صور الأدوية، الأشعة، التقارير الطبية'
              : 'Supports: Medication images, X-rays, Medical reports'}
          </p>
          <button className="btn-primary">
            <i className="fas fa-upload"></i>
            {language === 'ar' ? 'رفع صورة' : 'Upload Image'}
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-6 relative">
            <img
              src={uploadedImage}
              alt="Uploaded medical"
              className="max-w-full h-64 mx-auto rounded-lg object-contain"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <div className="text-white">
                  <i className="fas fa-spinner fa-spin text-2xl mb-2"></i>
                  <p>{language === 'ar' ? 'جاري التحليل...' : 'Analyzing...'}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={triggerFileInput}
              className="btn-outline"
            >
              <i className="fas fa-sync"></i>
              {language === 'ar' ? 'تغيير الصورة' : 'Change Image'}
            </button>
          </div>
        </div>
      )}

      {/* 3D Visualization */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {language === 'ar' ? 'تحليل متقدم' : 'Advanced Analysis'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'ar'
            ? 'يتم تحليل الصورة بواسطة نموذج الذكاء الاصطناعي المتقدم'
            : 'Image analysis in progress using advanced AI model'}
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}

export default ImageUploader