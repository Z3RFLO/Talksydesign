import React, { useState } from 'react';
import { X, Zap, Hash, Globe } from 'lucide-react';

export default function CreateModal({ isOpen, onClose, onPost }) {
  // 1. This holds the text you type
  const [text, setText] = useState(""); 

  if (!isOpen) return null;

  // 2. This runs when you click "Post"
  const handleSubmit = () => {
    if (text.trim()) {
      onPost(text); // Send text to the App
      setText("");  // Clear the box
      onClose();    // Close the window
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0a0a0a] w-full max-w-2xl rounded-[32px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.9)] p-8 relative transform transition-all scale-100">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Transmit</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Input Area - NOW CONNECTED */}
        <div className="flex gap-4">
           <div className="w-12 h-12 rounded-2xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-white font-bold shrink-0">Y</div>
           <textarea 
             autoFocus
             value={text}
             onChange={(e) => setText(e.target.value)} // This updates the text as you type
             placeholder="What is happening in the void?"
             className="w-full h-40 bg-transparent text-xl text-white placeholder-gray-600 outline-none resize-none border-none p-2"
           />
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
          <div className="flex gap-4 text-gray-500">
             <button className="hover:text-yellow-400 hover:bg-yellow-400/10 p-2 rounded-full transition-all"><Zap size={20}/></button>
             <button className="hover:text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-all"><Hash size={20}/></button>
             <button className="hover:text-green-400 hover:bg-green-400/10 p-2 rounded-full transition-all"><Globe size={20}/></button>
          </div>
          
          {/* Post Button - NOW CLICKABLE */}
          <button 
            onClick={handleSubmit} // This calls the submit function
            className="bg-white text-black px-8 py-2.5 rounded-full font-bold text-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all active:scale-95"
          >
            Post
          </button>
        </div>

      </div>
    </div>
  );
}