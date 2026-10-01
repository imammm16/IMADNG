import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

function getFallbackRecommendation(heightCm: number, weightKg: number, preferredFit: string) {
  let size = '2 (M)';
  if (heightCm < 170 || weightKg < 65) {
    size = '1 (S)';
  } else if (heightCm >= 185 || weightKg >= 85) {
    size = '4 (XL)';
  } else if (heightCm >= 178 || weightKg >= 76) {
    size = '3 (L)';
  }

  let idealGarment = 'ImmAdNgrh. Signature Tee (320 GSM)';
  if (preferredFit && preferredFit.toLowerCase().includes('oversized')) {
    idealGarment = 'ImmAdNgrh. Studio Boxy Tee (360 GSM)';
  } else if (preferredFit && preferredFit.toLowerCase().includes('fitted')) {
    idealGarment = 'ImmAdNgrh. Atelier Drape Tee';
  }

  return {
    recommendedSize: size,
    fitAnalysis: 'Calibrated for an anatomical drape with zero-torque bias along the vertical grain. The heavyweight combed jersey drops cleanly with structured shoulders and architectural silhouette.',
    idealGarment,
    textileEngineeringTip: 'Cold wash below 30°C and flat dry in shade to preserve textile density and garment geometry.'
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { heightCm, weightKg, chestCm, preferredFit, movementContext } = req.body || {};

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        success: true,
        recommendation: getFallbackRecommendation(Number(heightCm) || 175, Number(weightKg) || 70, preferredFit || '')
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `You are the Head Textile Engineer & Master Sartorial Cutter at Atelier ImmAdNgrh. (a high-end luxury architectural streetwear brand).
A client has submitted their anatomical measurements and drape preferences for custom garment allocation:

- Height: ${heightCm} cm
- Weight: ${weightKg} kg
- Chest: ${chestCm || 'Standard'} cm
- Preferred Drape Style: ${preferredFit} (Options: Sculptural Ergonomic / Fluid Oversized / Fitted Atelier)
- Activity / Context: ${movementContext || 'Everyday architectural wear'}

Provide a precise, high-fashion architectural size and garment recommendation in JSON format with the following fields:
1. "recommendedSize": "1 (S)", "2 (M)", "3 (L)", or "4 (XL)"
2. "fitAnalysis": A 2-sentence technical sartorial breakdown of how 320 GSM French Terry / 360 GSM Heavyweight Jersey will drape on their frame (shoulder drop, hem posture, zero-torque bias).
3. "idealGarment": Name of the recommended ImmAdNgrh piece (e.g., "ImmAdNgrh. Signature Tee (320 GSM)", "ImmAdNgrh. Studio Boxy Tee (360 GSM)", or "ImmAdNgrh. Atelier Drape Tee").
4. "textileEngineeringTip": A 1-sentence care & washing advice to maintain 0% shrinkage and structural rigidity.

Respond ONLY with valid JSON, no markdown codeblocks or extra text outside JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const resultData = JSON.parse(cleanedJson);

      return res.status(200).json({ success: true, recommendation: resultData });
    } catch (genErr: any) {
      console.warn('Gemini API call failed, using fallback:', genErr.message);
      return res.status(200).json({
        success: true,
        recommendation: getFallbackRecommendation(Number(heightCm) || 175, Number(weightKg) || 70, preferredFit || '')
      });
    }
  } catch (err: any) {
    console.error('Error in /api/ai-stylist:', err);
    return res.status(500).json({
      error: 'Failed to generate size recommendation from Atelier AI.',
      details: err.message || String(err)
    });
  }
}
