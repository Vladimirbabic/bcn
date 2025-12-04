"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { images } from "@/lib/images";

// Different text content and images for each card
const cardData = [
  {
    platform: "Zillow",
    icon: images.frame,
    views: "3500",
    saves: "170",
    address: "96 Washington Avenue,",
    city: "Garden City, NY 11530",
    image: images.rectangle161124858
  },
  {
    platform: "Realtor.com",
    icon: images.realtorCom,
    views: "2800",
    saves: "145",
    address: "123 Main Street,",
    city: "New York, NY 10001",
    image: images.rectangle161124867
  },
  {
    platform: "Homes.com",
    icon: images.homesCom,
    views: "4200",
    saves: "210",
    address: "456 Oak Avenue,",
    city: "Brooklyn, NY 11201",
    image: images.rectangle161124865
  },
  {
    platform: "Redfin",
    icon: images.redfin,
    views: "3100",
    saves: "185",
    address: "789 Pine Road,",
    city: "Queens, NY 11101",
    image: images.rectangle161124858
  },
];

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const cardImageRef = useRef<HTMLDivElement>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const currentImageIndexRef = useRef(0);
  const previousCardIndexRef = useRef(-1);

  useGSAP(
    () => {
      // Text reveal
      gsap.from(".hero-word", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      // Set initial state for underlines (hidden)
      const heroUnderline = container.current?.querySelector(".hero-underline");
      const cardUnderlines = container.current?.querySelectorAll(".card-underline");
      
      if (heroUnderline) {
        gsap.set(heroUnderline, { scaleX: 0, transformOrigin: "left" });
      }
      if (cardUnderlines) {
        gsap.set(cardUnderlines, { scaleX: 0, transformOrigin: "left" });
      }

      // Hide carousel and polaroid initially - Removed
      /*
      if (slider.current && polaroidRef.current) {
        gsap.set([slider.current, polaroidRef.current], { opacity: 0, y: 30 });
      }
      */

      // Animate underlines from left to right (only once)
      let underlineAnimated = false;
      const animateUnderlines = () => {
        if (underlineAnimated) return;
        underlineAnimated = true;
        
        // Main hero underline
        if (heroUnderline) {
          gsap.to(heroUnderline, {
            scaleX: 1,
            duration: 1.2,
            delay: 0.8, // Start after text animation
            ease: "power3.out",
          });
        }

        // Card underlines (views and saves)
        if (cardUnderlines) {
          gsap.to(cardUnderlines, {
            scaleX: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.5,
            ease: "power2.out",
          });
        }
      };

      // Trigger underline animations after text
      setTimeout(animateUnderlines, 1500);

      // Auto-scrolling carousel with snap and delay
      const sliderEl = slider.current;
      const polaroid = polaroidRef.current;
      const cardImage = cardImageRef.current;
      if (sliderEl && container.current && polaroid && cardImage) {
        const imageWidth = 364;
        const gap = 80; // Reduced gap for closer cards
        const snapDistance = imageWidth + gap;
        const totalImages = cardData.length * 3; // 3 sets of images
        const singleSetLength = cardData.length;
        
        // Store original slider position (before any transforms)
        let sliderOriginalLeft: number | null = null;
        
        // Get the polaroid's image area center position (accounting for 12px padding)
        const getPolaroidImageCenter = () => {
          const rect = polaroid.getBoundingClientRect();
          // Polaroid has 12px padding on left, image is 364px wide
          // Image center relative to polaroid: 12px + 364px/2 = 12 + 182 = 194px
          const imageCenterOffset = 12 + imageWidth / 2;
          return rect.left + imageCenterOffset;
        };
        
        // Initialize slider original position
        const initSliderPosition = () => {
          if (sliderOriginalLeft === null) {
            // Get position before any transforms
            gsap.set(sliderEl, { x: 0 });
            sliderOriginalLeft = sliderEl.getBoundingClientRect().left;
          }
        };
        
        // Function to snap to a specific image index
        const snapToImage = (targetIndex: number, callback?: () => void) => {
          // Ensure slider original position is initialized
          initSliderPosition();
          
          // Get current polaroid image center position
          const polaroidImageCenterX = getPolaroidImageCenter();
          
          // Calculate the exact position needed so the image is centered behind the polaroid
          const imagePosition = targetIndex * snapDistance;
          const imageCenterOffset = imageWidth / 2;
          const targetX = polaroidImageCenterX - (sliderOriginalLeft || 0) - imagePosition - imageCenterOffset;
          
          // Determine the logical card index (0 to singleSetLength-1)
          const logicalIndex = targetIndex % singleSetLength;

          // Animate slider to snap position with smoother, more natural easing
          gsap.to(sliderEl, {
            x: targetX,
            duration: 2.0, // Slower, more elegant movement
            ease: "expo.out", // Smooth exponential ease-out
            onComplete: () => {
              // Seamless loop check
              if (targetIndex >= 2 * singleSetLength) {
                 const resetIndex = targetIndex - singleSetLength;
                 const resetPosition = resetIndex * snapDistance;
                 const resetX = polaroidImageCenterX - (sliderOriginalLeft || 0) - resetPosition - imageCenterOffset;
                 gsap.set(sliderEl, { x: resetX });
                 currentImageIndexRef.current = resetIndex;
              }
              
              if (callback) callback();
            }
          });

          // Fade out background carousel images during movement
          const carouselImages = sliderEl.querySelectorAll(".carousel-image");
          gsap.to(carouselImages, {
            opacity: 0.3,
            duration: 0.5,
            ease: "power2.out"
          });

          // Smooth transition for the main polaroid content
          if (cardImage) {
             // 1. Fade out current content to avoid showing wrong image during move
             gsap.to(cardImage, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
             });

             // 2. Wait for slider animation to complete
             setTimeout(() => {
                 // Swap content (React state update)
                 // The fade-in will be triggered by the Image onLoad event
                 setCurrentCardIndex(logicalIndex);
                 previousCardIndexRef.current = logicalIndex;
                 
                 // Fade background images back in
                 gsap.to(carouselImages, {
                    opacity: 0.6,
                    duration: 0.8, // Faster background fade in
                    ease: "power2.out"
                 });
                 
             }, 2000); // Wait full 2.0s so animation is completely done
          }
        };
        
        // Recursive function to cycle through images
        const cycleImages = () => {
          // Always move forward to the next index
          currentImageIndexRef.current = currentImageIndexRef.current + 1;
          
          snapToImage(currentImageIndexRef.current, () => {
            // After snap completes, wait 4 seconds then continue (slower pace)
            setTimeout(() => {
              cycleImages();
            }, 4000);
          });
        };
        
        // Initial setup - position first image of MIDDLE set behind center card
        // Wait for layout to settle, then calculate initial position
        setTimeout(() => {
          initSliderPosition();
          
          // Start at the beginning of the 2nd set (index = singleSetLength)
          // This ensures there are full sets of images to both the left and right
          const startIndex = singleSetLength;
          currentImageIndexRef.current = startIndex;
          
          // Set initial position without animation for first load
          const polaroidImageCenterX = getPolaroidImageCenter();
          const imageCenterOffset = imageWidth / 2;
          const imagePosition = startIndex * snapDistance;
          const initialX = polaroidImageCenterX - (sliderOriginalLeft || 0) - imagePosition - imageCenterOffset;
          
          gsap.set(sliderEl, { x: initialX });
          setCurrentCardIndex(0); // Display first card content
          
          // Start cycling after initial delay
          setTimeout(() => {
            cycleImages();
          }, 2500);
        }, 200); // Slightly longer delay to ensure layout is fully settled
      }
    },
    { scope: container }
  );

  const currentCard = cardData[currentCardIndex];

  return (
    <section ref={container} className="relative w-full bg-cream overflow-hidden min-h-screen flex flex-col">
        {/* Text Section */}
        <div className="pt-[68px] pb-10 flex flex-col items-center z-10 relative px-4">
             <p className="font-geist font-medium text-[18px] tracking-[1px] uppercase text-[#2b2b2b] mb-8 text-center">
                235,130 views across 40+ platforms.
             </p>
             <div className="flex flex-col items-center gap-6">
                 <div className="flex flex-wrap justify-center gap-x-2 max-w-[900px] text-center font-gilda text-[50px] md:text-[80px] leading-[1.1] text-[#2b2b2b] tracking-[-2.4px]">
                    {["Our", "homes", "have", "been", "seen", "235,000", "buyers."].map((word, i) => (
                        <div key={i} className="overflow-hidden"><span className="hero-word block">{word}</span></div>
                    ))}
                 </div>
                 <div className="flex flex-wrap justify-center gap-x-2 pb-1 font-gilda text-[32px] md:text-[48px] leading-[1.1] text-[#2b2b2b] relative">
                     {["And", "that", "was", "just", "in", "last", "30", "days."].map((word, i) => (
                        <div key={i} className="overflow-hidden"><span className="hero-word block">{word}</span></div>
                    ))}
                     <div className="hero-underline absolute bottom-0 left-0 w-full h-[5px] bg-orange origin-left" />
                 </div>
             </div>
        </div>

        {/* Carousel Section */}
        <div className="relative flex-1 flex items-center justify-center w-full h-[600px] md:h-[800px] overflow-hidden">
            {/* Static Polaroid in Center - Updates when image snaps */}
            <div 
              ref={polaroidRef}
              className="absolute z-20 bg-white p-[12px] rounded-[6px] shadow-2xl w-[386px] flex flex-col gap-[12px] shrink-0 transform translate-y-[-50px] transition-all duration-500"
            >
                <div ref={cardImageRef} className="relative h-[434px] w-[364px]">
                    <Image 
                        key={currentCard.image} // Force re-mount to trigger onLoad
                        src={currentCard.image}
                        alt="Main House" 
                        fill 
                        className="object-cover"
                        unoptimized
                        priority
                        onLoad={() => {
                            // Fade in container when image is loaded
                            if (cardImageRef.current) {
                                gsap.to(cardImageRef.current, {
                                    opacity: 1,
                                    duration: 0.5,
                                    ease: "power2.out"
                                });
                            }
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.7)]" />
                    <div className="absolute bottom-[32px] left-[23px] text-white font-gilda leading-[32px]">
                        <p className="text-[30px]">{currentCard.address}</p>
                        <p className="text-[20px]">{currentCard.city}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-1 items-center text-[#4b4b4b] font-geist text-[20px]">
                    <span>Going</span>
                    <span>viral</span>
                    <span>on</span>
                    <div className="relative w-[28px] h-[28px] mx-1">
                        <Image src={currentCard.icon} alt="Icon" fill className="object-contain" unoptimized />
                    </div>
                    <span>{currentCard.platform}</span>
                    <span>with</span>
                    <span className="font-bold px-1 relative inline-block">
                        <span>{currentCard.views}</span>
                        <span className="card-underline absolute bottom-0 left-0 w-full h-[2px] bg-orange origin-left" />
                    </span>
                    <span className="font-bold">views</span>
                    <span>and</span>
                    <span className="font-bold px-1 relative inline-block">
                        <span>{currentCard.saves}</span>
                        <span className="card-underline absolute bottom-0 left-0 w-full h-[2px] bg-orange origin-left" />
                    </span>
                    <span className="font-bold">saves.</span>
                </div>
            </div>

            {/* Moving Background Images - Auto-scroll from right to left */}
            <div ref={slider} className="absolute top-[calc(50%-20px)] -translate-y-1/2 flex gap-[80px]">
                {/* Set 1 */}
                {cardData.map((card, i) => (
                    <div 
                        key={`set1-${i}`} 
                        className="carousel-image relative h-[434px] w-[364px] shrink-0 opacity-60"
                    >
                         <Image 
                            src={card.image}
                            alt={`House ${i}`}
                            fill 
                            className="object-cover rounded-sm"
                            unoptimized
                        />
                    </div>
                ))}
                {/* Set 2 (Primary) */}
                {cardData.map((card, i) => (
                    <div 
                        key={`set2-${i}`} 
                        className="carousel-image relative h-[434px] w-[364px] shrink-0 opacity-60"
                    >
                         <Image 
                            src={card.image}
                            alt={`House ${i}`}
                            fill 
                            className="object-cover rounded-sm"
                            unoptimized
                        />
                    </div>
                ))}
                {/* Set 3 */}
                {cardData.map((card, i) => (
                    <div 
                        key={`set3-${i}`} 
                        className="carousel-image relative h-[434px] w-[364px] shrink-0 opacity-60"
                    >
                         <Image 
                            src={card.image}
                            alt={`House ${i}`}
                            fill 
                            className="object-cover rounded-sm"
                            unoptimized
                        />
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
