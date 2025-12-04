"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { images } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Content animation
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        });
      }

      // Image animation
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section ref={sectionRef} className="bg-cream py-[64px] flex flex-col lg:flex-row items-center justify-between relative w-full max-w-[1320px] mx-auto">
        <div ref={contentRef} className="flex flex-col gap-[19px] items-start w-full max-w-[594px]">
           <p className="font-geist font-normal text-[14px] tracking-[1px] uppercase text-[#2b2b2b]">The Portfolio</p>
           <h1 className="font-gilda text-[80px] md:text-[128px] leading-[0.9] text-[#2b2b2b] mb-4">Shannon Gillette</h1>
           <div className="h-px w-[100px] bg-[#2b2b2b] mb-4" />
           <p className="font-geist font-light text-[20px] leading-[1.6] text-[#2b2b2b] mb-8">
            {`Experience marketing that's transparent, data-driven, and gets your home in front of serious buyers. Every campaign tracked. Every view documented. Every effort proven.`}
           </p>
           <button className="bg-[#2b2b2b] text-white font-geist font-medium text-[14px] tracking-[1px] uppercase py-[21px] px-[27px] hover:bg-black transition-colors">
            {`Let's Make Your Home Shine`}
           </button>
        </div>

        <div ref={imageRef} className="relative w-full max-w-[658px] h-[400px] md:h-[718px] mt-12 lg:mt-0 rounded-[12px] overflow-hidden">
             <Image src={images.rectangle1} alt="Footer Image" fill className="object-cover" unoptimized />
        </div>
      </section>

      <footer className="bg-cream py-[64px] flex flex-col items-center">
           <div className="flex flex-col items-center gap-[22px] max-w-[1052px]">
               <div className="relative w-[118px] h-[78px] opacity-50">
                   <Image src={images.logo} alt="Logo" fill className="object-contain" unoptimized />
               </div>
               <p className="font-geist text-[14px] tracking-[1px] uppercase opacity-50 text-[#2b2b2b]">All rights reserved. Gillette Group</p>
           </div>
      </footer>
    </>
  );
}
