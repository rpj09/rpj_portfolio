'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AiHeroBackground } from '../ui/ai-hero-background';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const textWrapperRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Simple, highly performant scaling zoom into the text
        gsap.to(textWrapperRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
            scale: 6, // Massive zoom
            opacity: 0,
            ease: "power2.inOut"
        });
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full h-[150vh]">
            <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none z-10 px-4 md:px-12 overflow-hidden">

                {/* Custom Three.js Hex/Bloom Background */}
                <AiHeroBackground />

                {/* Dark vignette overlay to make text pop against 3D */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none -z-10" />

                {/* Foreground Name (Clean, Premium, No Lag) */}
                <div ref={textWrapperRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto">
                    <h1 className="text-[12vw] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 tracking-tighter mix-blend-difference select-none text-center">
                        <span className="block">RIPUNJAY</span>
                        <span className="block -mt-4">SINGH</span>
                    </h1>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none">
                <span className="font-mono text-xs tracking-widest uppercase">Scroll to Dive</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-text-primary to-transparent" />
            </div>
        </section>
    );
}
