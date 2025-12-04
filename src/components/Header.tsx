import Image from "next/image";
import { images } from "@/lib/images";

export default function Header() {
  return (
    <header className="flex h-[104px] items-center justify-between px-16 py-[13px] w-full max-w-[1440px] mx-auto shrink-0">
      <div className="relative h-[78px] w-[252px]">
        <Image
          src={images.logo}
          alt="Logo"
          fill
          className="object-contain object-left"
          priority
          unoptimized
        />
      </div>
      <div className="flex gap-3 items-center">
        <p className="font-dm font-semibold text-[#1b2826] text-[16px] text-right tracking-[1.6px] uppercase leading-[24px]">
          Powered by
        </p>
        <div className="relative h-[18px] w-[57px]">
          <Image
            src={images.union}
            alt="Union"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
    </header>
  );
}
