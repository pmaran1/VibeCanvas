
import React, { useState } from 'react';
import { Sparkles, Palette, Image as ImageIcon, Loader2, Github, Cloud } from 'lucide-react';
import { generateVibeMetadata, generateVibeImage } from './services/geminiService';
import { VibeResult } from './types';
import { VibeCard } from './components/VibeCard';

const App: React.FC = () => {
  const [vibe, setVibe] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VibeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vibe.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Step 1: Generate textual metadata and palette
      const metadata = await generateVibeMetadata(vibe);
      
      // Step 2: Generate the visual representation
      const imageUrl = await generateVibeImage(vibe, metadata);

      setResult({
        ...metadata,
        imageUrl
      });
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong while channeling your vibe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation / Header */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight">VibeCanvas</span>
        </div>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://cloud.google.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
            <Cloud className="w-5 h-5" />
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 md:py-20">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter">
            Visualize your <span className="text-indigo-600">vibe.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Describe how you're feeling, a song, or a dream. Gemini AI will craft a custom color palette and unique abstract art.
          </p>
        </div>

        {/* Input Form */}
        <div className="max-w-2xl mx-auto mb-20">
          <form onSubmit={handleGenerate} className="relative">
            <input
              type="text"
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              placeholder="e.g. 'Midnight rain in Tokyo' or 'Energetic disco sunrise'"
              className="w-full px-8 py-5 rounded-full bg-white border border-slate-200 shadow-xl shadow-indigo-50/50 text-lg focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all pr-36"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !vibe.trim()}
              className="absolute right-2 top-2 bottom-2 px-8 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  Generate
                </>
              )}
            </button>
          </form>
          {error && <p className="mt-4 text-red-500 text-center text-sm">{error}</p>}
        </div>

        {/* Results Area */}
        <div className="min-h-[400px]">
          {loading && !result && (
            <div className="flex flex-col items-center justify-center space-y-6 animate-pulse">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                <ImageIcon className="text-indigo-400 w-10 h-10" />
              </div>
              <div className="text-center">
                <p className="text-slate-500 font-medium">Mixing colors and emotions...</p>
                <p className="text-slate-400 text-sm mt-1">This usually takes about 10 seconds.</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-12">
              <VibeCard result={result} />
              <div className="flex justify-center">
                <button 
                  onClick={() => setResult(null)}
                  className="text-slate-400 hover:text-slate-600 flex items-center gap-2 transition-colors"
                >
                  <Palette className="w-4 h-4" />
                  Try a different vibe
                </button>
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-40 grayscale pointer-events-none">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square bg-slate-200 rounded-2xl animate-pulse" />
               ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 gap-4">
          <p>© 2024 VibeCanvas AI. Built with Google Gemini.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Github className="w-4 h-4" /> GitHub Actions</span>
            <span className="flex items-center gap-1.5"><Cloud className="w-4 h-4" /> GCP App Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
