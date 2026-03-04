'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const validImages = images?.filter(Boolean) || [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (validImages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-[#f4f3f1]/40">No Image Available</span>
      </div>
    );
  }

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-full">
      <Image
        src={validImages[activeIndex]}
        alt={`${title} image ${activeIndex + 1}`}
        fill
        className="object-cover"
        priority
      />

      {validImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#14181f]/80 text-[#f4f3f1] p-2 rounded-full border border-[#d4a33b]/40 hover:bg-[#14181f]"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#14181f]/80 text-[#f4f3f1] p-2 rounded-full border border-[#d4a33b]/40 hover:bg-[#14181f]"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-[#14181f]/70 px-3 py-2 rounded-full">
            {validImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 w-2.5 rounded-full ${idx === activeIndex ? 'bg-[#d4a33b]' : 'bg-[#f4f3f1]/40'}`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
