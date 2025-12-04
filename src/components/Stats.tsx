"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { images } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current.querySelectorAll("span:not(.underline-border)"), {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        });

        // Animate underlines from left to right
        const underlines = headerRef.current.querySelectorAll(".underline-border");
        if (underlines.length > 0) {
          gsap.fromTo(underlines,
            { scaleX: 0, transformOrigin: "left" },
            {
              scaleX: 1,
              duration: 0.8,
              stagger: 0.1,
              delay: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 80%",
              },
            }
          );
        }
      }

      // Cards animation
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        });
      }

      // Carousel animation
      if (carouselRef.current) {
        gsap.from(carouselRef.current.querySelectorAll(".dark-card"), {
          x: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 80%",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-[#2b2b2b] text-white py-[120px] flex flex-col gap-[64px] items-center justify-center relative w-full">
        {/* Background Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-[223px] bg-gradient-to-b from-transparent to-[#2b2b2b] pointer-events-none z-10" />

        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center gap-[41px] text-center w-full max-w-[1320px] mx-auto">
             <p className="font-geist font-medium text-[16px] tracking-[1px] uppercase opacity-40">Performance</p>
             <div className="flex flex-wrap justify-center gap-x-2 font-gilda text-[32px] md:text-[48px] leading-[1.2]">
                <span>Our</span>
                <span>Most</span>
                <span>Viral</span>
                <span>Open</span>
                <span>House</span>
                <span>on</span>
                <span className="px-2 relative inline-block">
                    <span>November</span>
                    <span className="underline-border absolute bottom-0 left-0 w-full h-[3px] bg-[#444444] origin-left" />
                </span>
                <span className="px-2 relative inline-block">
                    <span>30th</span>
                    <span className="underline-border absolute bottom-0 left-0 w-full h-[3px] bg-[#444444] origin-left" />
                </span>
                <div className="w-full md:w-auto flex justify-center gap-x-2">
                    <span>on</span>
                    <span className="px-2 relative inline-block">
                        <span>123 Main street</span>
                        <span className="underline-border absolute bottom-0 left-0 w-full h-[3px] bg-[#444444] origin-left" />
                    </span>
                </div>
                <div className="w-full md:w-auto flex justify-center gap-x-2">
                    <span>had</span>
                    <span className="px-2 relative inline-block">
                        <span>32 Attendees</span>
                        <span className="underline-border absolute bottom-0 left-0 w-full h-[3px] bg-[#444444] origin-left" />
                    </span>
                </div>
             </div>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="flex flex-col md:flex-row w-full max-w-[1320px] mx-auto border border-[#484848] rounded-[12px] overflow-hidden bg-[#2b2b2b]">
            {/* Social Media */}
            <div className="flex-1 border-b md:border-b-0 md:border-r border-[#484848] p-8 md:p-[48px] flex flex-col gap-[48px]">
                <div className="flex flex-col gap-6 items-center text-center">
                    <p className="font-geist font-medium text-[16px] tracking-[1px] uppercase opacity-40">Social Media Views</p>
                    <p className="font-gilda text-[60px] md:text-[96px] leading-[1] tracking-[-2.88px]">260,000</p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                     <StatRow icon={images.instagramLogo} bg="#ff850f" label="Instagram" value="34,852" />
                     <Divider />
                     <StatRow icon={images.facebook} label="Facebook" value="45,783" />
                     <Divider />
                     <StatRow icon={images.youtube} bg="#d72228" label="Youtube" value="28,573" />
                     <Divider />
                     <StatRow icon={images.tiktok} label="Tiktok" value="39,586" />
                </div>
            </div>

            {/* Online Portals */}
            <div className="flex-1 p-8 md:p-[48px] flex flex-col gap-[48px]">
                <div className="flex flex-col gap-6 items-center text-center">
                    <p className="font-geist font-medium text-[16px] tracking-[1px] uppercase opacity-40">Online Portals Views</p>
                    <p className="font-gilda text-[60px] md:text-[96px] leading-[1] tracking-[-2.88px]">2,503,000</p>
                </div>
                 <div className="flex flex-col gap-4 w-full">
                     <StatRow icon={images.homesCom} bg="#ff850f" label="Homes.com" value="40,320" />
                     <Divider />
                     <StatRow icon={images.realtorCom} bg="#d72228" label="realtor.com" value="32,957" />
                     <Divider />
                     <StatRow icon={images.zillow} label="Zillow" value="48,573" />
                     <Divider />
                     <StatRow icon={images.redfin} label="Redfin" value="29,573" />
                </div>
            </div>
        </div>

        {/* Carousel of Cards (Bottom) */}
        <div ref={carouselRef} className="w-full max-w-[1320px] mx-auto overflow-x-auto pb-4 no-scrollbar">
             <div className="flex gap-[30px] min-w-max px-4 justify-center">
                 <DarkCard />
                 <DarkCard />
                 <DarkCard />
                 <DarkCard />
             </div>
        </div>
    </section>
  )
}

function StatRow({ icon, bg, label, value }: { icon: string; bg?: string; label: string; value: string }) {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-[14px]">
                <div className={`relative w-[24px] h-[24px] rounded-[4px] flex items-center justify-center overflow-hidden`} style={{ backgroundColor: bg || 'transparent' }}>
                     <div className="relative w-full h-full">
                        <Image src={icon} alt={label} fill className="object-contain" unoptimized />
                     </div>
                </div>
                <p className="font-geist font-medium text-[16px] tracking-[1px] uppercase opacity-40">{label}</p>
            </div>
            <p className="font-gilda text-[24px]">{value}</p>
        </div>
    )
}

function Divider() {
    return <div className="h-px w-full bg-[#3f3f3f]" />
}

function DarkCard() {
    return (
        <div className="dark-card bg-[#323232] p-[12px] rounded-[6px] w-[386px] shrink-0 flex flex-col gap-[15px] shadow-lg">
             <div className="h-[434px] w-[364px] bg-[#3d3d3d] relative overflow-hidden rounded-[4px]">
                 <Image src={images.rectangle161124858} alt="" fill className="object-cover opacity-80" unoptimized />
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.7)]" />
             </div>
             <div className="flex gap-2 items-start">
                 <div className="relative w-[24px] h-[24px] shrink-0">
                     <Image src={images.instagramLogo2} alt="" fill className="object-contain" unoptimized />
                 </div>
                 <div className="font-geist text-[16px] leading-[24px] text-white">
                    Going viral on Zillow with <span className="font-bold">3500 views</span> and <span className="font-bold">170 saves.</span>
                 </div>
             </div>
        </div>
    )
}
