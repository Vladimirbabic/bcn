"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Calendar() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Text animation
      if (textRef.current) {
        gsap.from(textRef.current.querySelectorAll("span, div"), {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        });
      }

      // Calendar grid animation - use fromTo to ensure cells start visible
      if (calendarRef.current) {
        const cells = calendarRef.current.querySelectorAll(".calendar-cell");
        // Ensure cells are visible initially
        gsap.set(cells, { opacity: 1, scale: 1, immediateRender: false });
        
        // Animate from hidden to visible on scroll
        gsap.fromTo(cells, 
          {
            scale: 0.8,
            opacity: 0,
            immediateRender: false, // Don't apply initial state immediately
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.03,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: calendarRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-cream text-[#2b2b2b] py-[88px] px-4 md:px-[96px] flex justify-center w-full">
      <div className="flex flex-col xl:flex-row gap-[60px] xl:gap-[120px] items-start justify-center w-full max-w-[1320px]">
        {/* Text */}
        <div ref={textRef} className="flex-1 flex flex-col justify-center w-full">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 font-gilda text-[40px] md:text-[56px] leading-[64px]">
                <span>In</span>
                <span>November,</span>
                <span>we</span>
                <span>held</span>
                <div className="bg-orange text-white px-2 py-2 rounded-[12px] inline-flex gap-2 items-end">
                    <span>73</span>
                    <span>private</span>
                    <span>showings</span>
                </div>
                <span>and</span>
                <div className="bg-beige text-white px-2 py-2 rounded-[12px] inline-flex gap-2 items-center">
                     <span>130</span>
                     <span>Open</span>
                     <span>Houses</span>
                </div>
            </div>
        </div>

        {/* Calendar Grid */}
        <div ref={calendarRef} className="flex flex-col gap-1 items-center shrink-0">
             {/* Days Header */}
             <div className="flex justify-between w-full gap-[6.487px] font-geist font-light text-[#929292] text-[20px] leading-[32.5px]">
                 {['M','T','W','T','F','S','S'].map((d, i) => (
                     <span key={i} className="w-[64.868px] text-center">{d}</span>
                 ))}
             </div>
             {/* Grid */}
             <div className="flex flex-col gap-[6.487px] w-[493px]">
                 <div className="flex gap-[6px]">
                     <Cell type="empty" />
                     <Cell type="empty" />
                     <Cell type="empty" />
                     <Cell type="empty" />
                     <Cell type="empty" />
                     <Cell type="empty" />
                     <Cell type="border" />
                 </div>
                 <div className="flex gap-[6px]">
                     <Cell type="border" />
                     <Cell type="orange" />
                     <Cell type="beige-num" number="12" />
                     <Cell type="border" />
                     <Cell type="orange" />
                     <Cell type="border" />
                     <Cell type="border" />
                 </div>
                 <div className="flex gap-[6px]">
                     <Cell type="beige" />
                     <Cell type="beige" />
                     <Cell type="beige-num" number="2" />
                     <Cell type="orange" />
                     <Cell type="beige-num" number="2" />
                     <Cell type="orange" />
                     <Cell type="border" />
                 </div>
                 <div className="flex gap-[6px]">
                     <Cell type="border" />
                     <Cell type="orange-num" number="8" />
                     <Cell type="beige" />
                     <Cell type="orange" />
                     <Cell type="border" />
                     <Cell type="beige" />
                     <Cell type="orange" />
                 </div>
                 <div className="flex gap-[6px]">
                     <Cell type="border" />
                     <Cell type="border" />
                     <Cell type="beige" />
                     <Cell type="orange" />
                     <Cell type="orange-num" number="2" />
                     <Cell type="border" />
                     <Cell type="beige" />
                 </div>
                  <div className="flex gap-[6px]">
                     <Cell type="border" />
                     <Cell type="empty" />
                     <Cell type="empty" />
                     <Cell type="empty" />
                     <Cell type="empty" />
                     <Cell type="empty" />
                     <Cell type="empty" />
                 </div>
             </div>
        </div>
      </div>
    </section>
  )
}

function Cell({ type = 'empty', number }: { type?: 'empty' | 'border' | 'orange' | 'beige' | 'beige-num' | 'orange-num' | 'mixed', number?: string }) {
    const base = "calendar-cell w-[64.868px] h-[64.868px] rounded-[10.811px] shrink-0 relative flex items-center justify-center transition-all";
    
    if (type === 'empty') return <div className={base} />;
    if (type === 'border') return <div className={`${base} border-[2.162px] border-beige`} />;
    if (type === 'orange') return <div className={`${base} bg-orange`} />;
    if (type === 'beige') return <div className={`${base} bg-beige`} />;
    if (type === 'beige-num') return (
        <div className={`${base} bg-beige relative`}>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-geist font-medium text-[32px] leading-[40px]">{number}</span>
        </div>
    );
    if (type === 'orange-num') return (
        <div className={`${base} bg-orange relative`}>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-geist font-medium text-[32px] leading-[40px]">{number}</span>
        </div>
    );
    
    return <div className={base} />;
}
