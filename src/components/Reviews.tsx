"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { images } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        });
      }

      // Text animation - word by word
      if (textRef.current) {
        gsap.from(textRef.current.querySelectorAll("span"), {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
          },
        });
      }

      // Pills animation
      if (pillsRef.current) {
        gsap.from(pillsRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pillsRef.current,
            start: "top 85%",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-[#2b2b2b] text-white py-[128px] flex flex-col gap-[72px] items-center w-full">
         {/* Header */}
         <div ref={headerRef} className="flex flex-col gap-[48px] w-full max-w-[1320px] mx-auto">
             {/* Title */}
             <div className="flex flex-wrap items-center gap-[16px]">
                 <div className="relative w-[44px] h-[44px] shrink-0">
                     <Image src={images.aiIcon} alt="" fill className="object-contain" unoptimized />
                 </div>
                 <h2 className="font-gilda text-[32px] md:text-[48px] whitespace-nowrap">AI Analysis of 68 Reviews</h2>
                 <div className="flex items-center gap-2 ml-0 md:ml-4">
                     <div className="relative w-[40px] h-[40px] md:w-[56px] md:h-[56px] shrink-0 rounded-full overflow-hidden bg-white/10">
                         <Image src={images.googleLogo} alt="Google" fill className="object-contain p-2" unoptimized />
                     </div>
                     <span className="font-gilda text-[32px] md:text-[48px]">Google</span>
                 </div>
                 <div className="flex items-center gap-2 ml-0 md:ml-4">
                     <div className="relative w-[40px] h-[40px] md:w-[56px] md:h-[56px] shrink-0">
                         <Image src={images.zillowIcon} alt="Zillow" fill className="object-contain" unoptimized />
                     </div>
                     <span className="font-gilda text-[32px] md:text-[48px]">Zillow</span>
                 </div>
             </div>

             {/* Text */}
             <div ref={textRef} className="font-gilda text-[24px] md:text-[32px] leading-[1.5] text-[#f4f1ea] flex flex-wrap gap-x-2">
                 {"Shannon consistently receives praise for her sophisticated marketing approach, transparent communication through Beacon reports, and ability to generate significantly higher visibility than competing agents. Clients specifically highlight her data-driven strategy, professional presentation materials, and the peace of mind that comes from seeing every marketing effort documented in real-time. Average rating: 4.9/5.0".split(" ").map((word, i) => (
                     <span key={i}>{word}</span>
                 ))}
             </div>
         </div>

         {/* Pills */}
         <div ref={pillsRef} className="flex flex-wrap gap-[16px] w-full max-w-[1320px] mx-auto">
             <ReviewPill label="Responsiveness mentioned" count="16" />
             <ReviewPill label="Market knowledge referenced" count="14" />
             <ReviewPill label="Guidance/education emphasized" count="15" />
             <ReviewPill label="Problem-solving or above and beyond mentioned" count="15" />
             <ReviewPill label="Speed of sale explicitly stated" count="15" />
             <ReviewPill label="Multiple transactions with same agent mentioned" count="15" />
             <ReviewPill label="Emotional support highlighted" count="9" />
         </div>
    </section>
  )
}

function ReviewPill({ label, count }: { label: string, count: string }) {
    return (
        <div className="bg-[rgba(255,255,255,0.05)] flex flex-wrap gap-[7px] items-center px-[20px] py-[6px] rounded-[58px]">
            <span className="font-geist font-normal text-[16px] md:text-[20px] text-white">{label}</span>
            <div className="bg-[#2b2b2b] px-[12px] py-0 rounded-[40px] min-w-[40px] text-center">
                <span className="font-gilda text-[20px] md:text-[24px] text-[#f4f1ea]">{count}</span>
            </div>
            <span className="font-geist font-normal text-[16px] md:text-[20px] text-white">times</span>
        </div>
    )
}
