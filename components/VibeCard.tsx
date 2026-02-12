
import React from 'react';
import { VibeResult } from '../types';

interface VibeCardProps {
  result: VibeResult;
}

export const VibeCard: React.FC<VibeCardProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-indigo-100 border border-indigo-50 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row">
        {/* Image Container */}
        <div className="w-full md:w-1/2 aspect-square relative group">
          <img 
            src={result.imageUrl} 
            alt={result.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none" />
        </div>

        {/* Info Container */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {result.title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8 italic">
            "{result.description}"
          </p>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Color Palette</h3>
            <div className="flex flex-wrap gap-3">
              {result.palette.map((color, idx) => (
                <div key={idx} className="group relative">
                  <div 
                    className="w-12 h-12 rounded-xl shadow-inner border border-black/5 hover:scale-110 transition-transform cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {color}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
