"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials = [
    {
      src: "/image-1.jpeg",
      alt: "Customer testimonial 1",
      name: "Ashley Right",
      role: "UX Designer",
      quote:
        "Professionals in their craft! All products were super amazing with strong attention to details, comps and overall vibe",
    },
    {
      src: "image-2.jpeg",
      alt: "Customer testimonial 2",
      name: "Michael Torres",
      role: "Product Designer",
      quote:
        "Outstanding work quality and attention to detail. The team delivered exactly what we needed and more.",
    },
    {
      src: "image-3.jpeg",
      alt: "Customer testimonial 3",
      name: "David Kim",
      role: "Data Scientist",
      quote:
        "Incredible experience working with this team. They understood our vision perfectly and executed flawlessly.",
    },
    {
      src: "image-4.jpeg",
      alt: "Customer testimonial 4",
      name: "Jacob Jose",
      role: "Marketing Lead",
      quote:
        "The level of professionalism and creativity exceeded our expectations. Highly recommend their services.",
    },
    {
      src: "image-5.jpeg",
      alt: "Customer testimonial 5",
      name: "Alex Rivera",
      role: "UX Researcher",
      quote:
        "Amazing collaboration and results. The team's expertise really shows in the final product quality.",
    },
  ];

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 350);
  };

  const goToImage = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 350);
  };

  const getCarouselImages = () =>
    Array.from({ length: 5 }, (_, i) => {
      const imageIndex =
        (currentIndex - 4 + i + testimonials.length) % testimonials.length;
      return {
        ...testimonials[imageIndex],
        originalIndex: imageIndex,
        position: i,
        isActive: i === 4,
      };
    });

  return (
    <div className="flex justify-evenly items-center h-screen bg-white relative">
      <div className="pt-[15%] pb-[5%] relative z-20">
        <div className="absolute top-1/4 text-gray-600">
          {currentIndex + 1}/{testimonials.length}
        </div>
        <div className="absolute left-40 top-1/3 transform -translate-y-1/2 z-10">
          <div className="transform -rotate-90 origin-center">
            <h1 className="text-2xl md:text-3xl font-light text-gray-800 tracking-wider whitespace-nowrap">
              Reviews
            </h1>
          </div>
        </div>
        <div className="flex items-end gap-3 md:gap-4 transition-all duration-[350ms] ease-out">
          {getCarouselImages().map((image) => {
            const { isActive } = image;
            return (
              <div
                key={`carousel-${image.originalIndex}-${currentIndex}`}
                className="group relative cursor-pointer transition-all duration-[350ms] ease-out"
                onClick={() => goToImage(image.originalIndex)}
              >
                <div className="relative transition-all duration-[350ms] ease-out">
                  {isActive ? (
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      initial={{ scale: 0, x: -150, y: 100 }}
                      animate={{ scale: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="object-cover w-24 h-32 md:w-40 md:h-52 lg:w-46 lg:h-[450px]"
                    />
                  ) : (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-cover w-16 h-20 md:w-28 md:h-40 group-hover:opacity-80 transition-all duration-[350ms] ease-out"
                    />
                  )}
                  {!isActive && (
                    <div className="absolute -bottom-12 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="relative h-1 md:w-28 mx-auto overflow-hidden mt-1 mb-1">
                        <div className="h-full bg-red-300 rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                      </div>

                      <div className="text-left text-sm font-semibold text-gray-800">
                        {image.name}
                      </div>
                      <div className="text-left text-xs text-gray-500">
                        {image.role}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative flex items-start z-10 max-w-sm px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`testimonial-${currentIndex}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
                {testimonials[currentIndex].name}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                {testimonials[currentIndex].role}
              </p>
            </div>

            <blockquote className="text-gray-800 text-lg md:text-xl leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </blockquote>
          </motion.div>
        </AnimatePresence>
        <div className="absolute -bottom-40">
          <button
            onClick={nextImage}
            disabled={isTransitioning}
            className="w-12 h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-0 shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
