import React, { useState, useRef } from 'react';

export default function AssignmentPreview() {
  const [activeTab, setActiveTab] = useState<'about' | 'experiences' | 'recommended'>('about');
  const [aboutText, setAboutText] = useState(
    `Hello! I’m Shiva, a frontend and backend developer based in Hyderabad. I’ve been building React and Tailwind apps using TypeScript and Python for the past couple of years. I specialize in troubleshooting build configurations, perfecting pixel-level layouts, and streamlining deployment workflows to deliver clean, professional results.`
  );
  const [experiencesText, setExperiencesText] = useState(`Experience:`);
  const [recommendedText, setRecommendedText] = useState(`Recommended: Connect with product team for demo.`);

  const [images, setImages] = useState<string[]>([
    'https://placehold.co/400x400/555/eee?text=Image+1',
    'https://placehold.co/400x400/555/eee?text=Image+2',
    'https://placehold.co/400x400/555/eee?text=Image+3',
  ]);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  function onAddImageClick() {
    fileRef.current?.click();
  }

  function onFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const arr: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      arr.push(url);
    }
    setImages((prev) => [...prev, ...arr]);
  }

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  function prev() {
    setStartIndex((i) => Math.max(0, i - 1));
  }

  function next() {
    setStartIndex((i) => Math.min(Math.max(0, images.length - visibleCount), i + 1));
  }

  return (
    <div className="min-h-screen bg-[#1f2528] p-8 text-gray-200 font-sans">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">

        {/* Left Section (Placeholder for Preview or Design Area) */}
        <div className="col-span-7 bg-transparent rounded-2xl p-6 min-h-[720px]">
          {/* You can later add preview content here */}
        </div>

        {/* Right Section (Tabs + Gallery) */}
        <div className="col-span-5 flex flex-col gap-6">

          {/* Tabs Section */}
          <div className="bg-[#2b3134] rounded-2xl shadow-neumorph p-6 relative">
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`px-4 py-2 rounded-xl cursor-pointer ${
                  activeTab === 'about' ? 'bg-black text-white shadow-inner' : 'bg-[#263033]/30'
                }`}
                onClick={() => setActiveTab('about')}
              >
                About Me
              </div>
              <div
                className={`px-4 py-2 rounded-xl cursor-pointer ${
                  activeTab === 'experiences' ? 'bg-black text-white shadow-inner' : 'bg-[#263033]/30'
                }`}
                onClick={() => setActiveTab('experiences')}
              >
                Experiences
              </div>
              <div
                className={`px-4 py-2 rounded-xl cursor-pointer ${
                  activeTab === 'recommended' ? 'bg-black text-white shadow-inner' : 'bg-[#263033]/30'
                }`}
                onClick={() => setActiveTab('recommended')}
              >
                Recommended
              </div>
            </div>

            {/* Tab Content */}
            <div className="h-48 overflow-y-auto pr-3 text-gray-300 leading-relaxed custom-scrollbar">
              {activeTab === 'about' && (
                <textarea
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  className="w-full bg-transparent outline-none resize-none"
                  rows={6}
                />
              )}
              {activeTab === 'experiences' && (
                <textarea
                  value={experiencesText}
                  onChange={(e) => setExperiencesText(e.target.value)}
                  className="w-full bg-transparent outline-none resize-none"
                  rows={6}
                />
              )}
              {activeTab === 'recommended' && (
                <textarea
                  value={recommendedText}
                  onChange={(e) => setRecommendedText(e.target.value)}
                  className="w-full bg-transparent outline-none resize-none"
                  rows={6}
                />
              )}
            </div>
          </div>

          {/* Gallery Section */}
          <div className="bg-[#2b3134] rounded-2xl shadow-neumorph p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="px-4 py-2 rounded-xl bg-black shadow-inner">Gallery</div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onAddImageClick}
                  className="px-4 py-2 rounded-full bg-[#3a4043] hover:brightness-105 shadow-neu-sm"
                >
                  + ADD IMAGE
                </button>
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-[#2b3134] shadow-neu-sm hover:brightness-125"
                >
                  &#8592;
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-[#2b3134] shadow-neu-sm hover:brightness-125"
                >
                  &#8594;
                </button>
              </div>
            </div>

            <input ref={fileRef} type="file" multiple accept="image/*" onChange={onFilesSelected} className="hidden" />

            <div ref={scrollContainerRef} className="grid grid-cols-3 gap-4">
              {images.slice(startIndex, startIndex + visibleCount).map((src, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden h-40 bg-gray-700 flex items-center justify-center">
                  <img src={src} alt={`img-${idx}`} className="object-cover w-full h-full transition-all duration-300 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
