import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

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

// API Route for Gemini AI Atelier Size & Fit Stylist
app.post('/api/ai-stylist', async (req, res) => {
  try {
    const { heightCm, weightKg, chestCm, preferredFit, movementContext } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY not configured, serving algorithmic Atelier sizing fallback.');
      return res.json({
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
      // Clean JSON if needed
      const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const resultData = JSON.parse(cleanedJson);

      return res.json({ success: true, recommendation: resultData });
    } catch (genErr: any) {
      console.warn('Gemini API call failed, using algorithmic fallback:', genErr.message);
      return res.json({
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
});

// Configure Vite middleware in dev mode or static files in production
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template = await vite.transformIndexHtml(
        url,
        fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      );
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
} else {
  const distPath = path.resolve(__dirname, 'dist');
  const staticPath = fs.existsSync(distPath) ? distPath : __dirname;
  app.use(express.static(staticPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(staticPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Atelier Server running on http://0.0.0.0:${PORT}`);
});
