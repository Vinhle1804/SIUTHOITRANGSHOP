import React, { useState, useEffect } from 'react';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: '/utils/carousel1.webp', alt: 'Slide 1' },
    { src: '/utils/carousel2.webp', alt: 'Slide 2' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // chuyển slide mỗi 3 giây
    return () => clearInterval(interval);
  });

  return (
    <div>
      <div className="relative w-full h-[800px] overflow-hidden">
        {/* Carousel items */}
        <div
          className="carousel-track flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div className="carousel-slide flex-shrink-0 w-full h-full" key={index}>
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white rounded-full p-2"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-full p-2"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Carousel;
