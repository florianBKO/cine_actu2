"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Interface pour le carousel
interface Carousel {
  poster_path: string;
}

// Interface pour les props du composant
interface CarouselProps {
  DataCarousel: Carousel[];
}

export default function Carousel({ DataCarousel }: CarouselProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h4 className="flex justify-center mt-4 bg-indigo-600">Les films du moments</h4>
      <Swiper
  modules={[Autoplay, Pagination, Navigation]}
  slidesPerView={5} // Nombre d'images sur les grands écrans
  spaceBetween={10} // Espacement entre les images
  loop={true} // Permet de boucler
  autoplay={{ delay: 2500, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  navigation
  className="rounded-lg shadow-xl"
  breakpoints={{
    320: {
      slidesPerView: 1, // Sur les petits écrans (mobile), afficher 1 image
    },
    768: {
      slidesPerView: 2, // Sur les tablettes, afficher 2 images
    },
    1024: {
      slidesPerView: 5, // Sur les grands écrans, afficher 5 images
    },
  }}
>
        {DataCarousel.map((item, index) => (
          <SwiperSlide key={index} className="w-1/5">
            <div className="relative">
              <div className="absolute inset-0 bg-black/50 blur-lg rounded-lg"></div>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={`Slide ${index}`}
                className="w-full h-94 sm:h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}