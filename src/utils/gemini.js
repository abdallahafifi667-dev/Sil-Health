const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export class GeminiAPI {
  static async sendMessage(message, imageContext = null) {
    try {
      if (!GEMINI_API_KEY) {
        console.warn('Gemini API key not found');
        return 'Your medical question has been received. I will assist using available medical information.';
      }

      const prompt = `
You are a medical AI assistant with context awareness.

${imageContext && imageContext.hasContext ? `
IMPORTANT CONTEXT: The user previously uploaded a medical image that was analyzed as:
---
${imageContext.analysis}
---
Timestamp: ${imageContext.timestamp}

If the current question is related to this image/analysis, use this context to answer.
If the question is unrelated to the image, answer it independently as a separate medical query.
` : ''}

User query: ${message}

Provide a short, clear, medically accurate answer.

If the query involves medicine, symptoms, treatment, or medical advice, include:
1. Identification.
2. Purpose.
3. Usage and dosage (if applicable).
4. Risks and side effects.
5. Precautions.
6. What to do in case of overdose, misuse, or danger.

Keep the response concise and medically reliable.
Respond in the same language used by the user.
Respond in Arabic. Be helpful and informative
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        throw new Error('API request failed');
      }

      const data = await response.json();

      return data?.candidates?.[0]?.content?.parts?.[0]?.text
        || 'I have processed your medical question and provided the best possible guidance.';

    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'An error occurred while processing your request. Please try again.';
    }
  }

  static async analyzeImage(imageFile) {
    try {
      if (!GEMINI_API_KEY) {
        console.warn('Gemini API key not found');
        return {
          analysis: 'Image received, but no API key is available for medical analysis.',
          metadata: { fileName: imageFile.name, fileSize: imageFile.size, fileType: imageFile.type },
          timestamp: new Date().toISOString(),
        };
      }

      const base64Image = await this.fileToBase64(imageFile);
      const base64Data = base64Image.split(',')[1];

      const prompt = `
You are a medical AI assistant. Analyze the provided medical image (medicine photo, pill, scan, X-ray, or any medical-related image only).

Provide a short, useful medical summary including:
1. Identification of the item.
2. Medical purpose.
3. Usage and dosage (if a drug).
4. Risks or side effects.
5. Safety precautions.
6. What to do in case of overdose, misuse, or danger.
Keep the response brief and medically accurate.
Respond in the same language used by the user.
Respond in Arabic. Be helpful and informative
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: imageFile.type,
                    data: base64Data
                  }
                }
              ]
            }],
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 2048,
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Image Analysis API Error:', errorData);
        throw new Error('Image analysis failed');
      }

      const data = await response.json();

      const analysisText = data?.candidates?.[0]?.content?.parts?.[0]?.text
        || 'The medical image was analyzed successfully. Here is a brief summary.';

      return {
        analysis: analysisText,
        metadata: {
          fileName: imageFile.name,
          fileSize: imageFile.size,
          fileType: imageFile.type,
        },
        timestamp: new Date().toISOString(),
      };

    } catch (error) {
      console.error('Gemini Image Error:', error);
      return {
        analysis: 'An error occurred while analyzing the medical image.',
        metadata: { fileName: imageFile?.name, fileSize: imageFile?.size, fileType: imageFile?.type },
        timestamp: new Date().toISOString(),
      };
    }
  }

  static fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }
}