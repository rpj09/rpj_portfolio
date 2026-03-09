'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AiHeroBackground } from '../ui/ai-hero-background';

gsap.registerPlugin(ScrollTrigger);

// "RIPUNJAY SINGH" — R(0), P(2), J(5) are the "RPJ" base letters
const FULL_TEXT = 'RIPUNJAY SINGH';
const BASE_INDICES = new Set([0, 2, 5]); // R, P, J

export default function HeroIntroFlow() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasWrapperRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const nameInnerRef = useRef<HTMLDivElement>(null);
    const introContentRef = useRef<HTMLDivElement>(null);
    const textRevealRefs = useRef<(HTMLElement | null)[]>([]);
    const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // --- Measure natural widths of hidden characters ---
            // Temporarily expand hidden chars, measure, then collapse
            const widths: number[] = [];

            charRefs.current.forEach((el, i) => {
                if (!el) return;
                if (!BASE_INDICES.has(i)) {
                    // Temporarily show to measure
                    el.style.width = 'auto';
                    el.style.opacity = '1';
                }
            });

            // Force reflow to get accurate measurements
            charRefs.current.forEach((el, i) => {
                if (el) widths[i] = el.getBoundingClientRect().width;
            });

            // Collapse hidden chars back
            charRefs.current.forEach((el, i) => {
                if (!el || BASE_INDICES.has(i)) return;
                gsap.set(el, { width: 0, opacity: 0 });
            });

            // Set initial scale on the name container (makes RPJ look big)
            gsap.set(nameInnerRef.current, { scale: 2.2 });

            // --- Build the scroll timeline ---
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * 2.5}`,
                    scrub: 0.5,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                }
            });

            // --- PHASE 1: RPJ expands into RIPUNJAY SINGH (0 → 0.25) ---

            // Step 1a: Expand hidden chars in "RIPUNJAY" (indices 1, 3, 4, 6, 7)
            const ripunjayHidden = charRefs.current
                .map((el, i) => ({ el, i, w: widths[i] }))
                .filter(item => item.el && !BASE_INDICES.has(item.i) && item.i < 8);

            ripunjayHidden.forEach((item, idx) => {
                tl.to(item.el!, {
                    width: item.w,
                    opacity: 1,
                    duration: 0.12,
                    ease: 'power2.out',
                }, idx * 0.018);
            });

            // Step 1b: Expand " SINGH" (indices 8-13) — slightly after RIPUNJAY
            const singhChars = charRefs.current
                .map((el, i) => ({ el, i, w: widths[i] }))
                .filter(item => item.el && item.i >= 8);

            singhChars.forEach((item, idx) => {
                tl.to(item.el!, {
                    width: item.w,
                    opacity: 1,
                    duration: 0.1,
                    ease: 'power2.out',
                }, 0.09 + idx * 0.015);
            });

            // Step 1c: Scale the container down as text expands (keeps visual weight)
            tl.to(nameInnerRef.current, {
                scale: 1,
                duration: 0.25,
                ease: 'power2.inOut',
            }, 0);

            // --- PHASE 2: Hold at full size (0.25 → 0.4) ---
            // No animation — just breathing room to read the full name

            // --- PHASE 3: Shrink to corner + reveal intro (0.4 → 0.75) ---
            tl.to(nameRef.current, {
                scale: 0.25,
                x: '-38vw',
                y: '-40vh',
                duration: 0.35,
                ease: 'power2.inOut',
            }, 0.4);

            // Dots fade slightly but stay visible for continuity
            tl.to(canvasWrapperRef.current, {
                opacity: 0.5,
                duration: 0.6,
                ease: 'power2.inOut',
            }, 0);

            // --- PHASE 4: Intro content fades in ---
            tl.fromTo(introContentRef.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                0.4
            );

            // Stagger the individual text elements
            tl.fromTo(textRevealRefs.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.06, duration: 0.35, ease: 'power2.out' },
                0.5
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full h-screen bg-black z-[70]">

            {/* 1. The 3D Dot Background */}
            <div ref={canvasWrapperRef} className="absolute inset-0 z-0 origin-center">
                <AiHeroBackground />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none" />
            </div>

            {/* 2. The Hero Name — RPJ expands into RIPUNJAY SINGH */}
            <h1
                ref={nameRef}
                className="absolute inset-0 z-30 flex items-center justify-center select-none pointer-events-none"
                style={{ willChange: 'transform' }}
            >
                <div
                    ref={nameInnerRef}
                    className="whitespace-nowrap"
                    style={{ willChange: 'transform' }}
                >
                    {FULL_TEXT.split('').map((char, i) => {
                        const isBase = BASE_INDICES.has(i);
                        return (
                            <span
                                key={i}
                                ref={el => { charRefs.current[i] = el; }}
                                className="inline-block text-[5.5vw] font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 tracking-[-0.02em] leading-none"
                                style={isBase ? {} : { width: 0, opacity: 0, overflow: 'hidden' }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        );
                    })}
                </div>
            </h1>

            {/* 3. The Intro Content — starts invisible, revealed by GSAP */}
            <div
                ref={introContentRef}
                className="absolute inset-0 z-20 flex flex-col justify-center pointer-events-none opacity-0 px-6 md:px-16 pt-24"
            >
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pointer-events-auto">

                        {/* Left Column */}
                        <div className="md:col-span-6 flex flex-col gap-6">
                            <h2
                                ref={el => { textRevealRefs.current[0] = el; }}
                                className="text-4xl md:text-5xl xl:text-6xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500"
                            >
                                I Don&apos;t Build <br /> Wrappers. I Build <br /> Infrastructure.
                            </h2>
                            <p
                                ref={el => { textRevealRefs.current[1] = el; }}
                                className="text-gray-400 text-lg md:text-xl leading-relaxed font-sans font-light border-l border-zinc-800 pl-6"
                            >
                                Production multi-agent systems. Custom LoRA-tuned LLMs. Distributed inference pipelines processing 10,000+ daily requests. I architect the AI infrastructure that enterprise clients trust to ship.
                            </p>
                        </div>

                        {/* Right Column: Competencies */}
                        <div className="md:col-span-5 md:col-start-8 flex flex-col justify-center gap-6">
                            {[
                                { title: 'Multi-Agent Systems', desc: 'LangGraph, LangChain, LlamaIndex' },
                                { title: 'Custom LLM Training', desc: 'LoRA, vLLM, KServe, MLflow' },
                                { title: 'Cloud & DevOps', desc: 'AWS, Kubernetes, Terraform, Docker' },
                                { title: 'Production Backend', desc: 'FastAPI, Neo4j, Redis, Celery' },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    ref={el => { textRevealRefs.current[i + 2] = el; }}
                                    className="group relative border-b border-zinc-800/80 pb-3 transition-colors duration-500 hover:border-gray-400"
                                >
                                    <h3 className="text-gray-300 font-heading font-bold text-xl md:text-2xl mb-1 transition-transform duration-500 group-hover:translate-x-4 group-hover:text-white">
                                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity absolute -left-4 top-0.5 text-sm">▹</span>
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 font-mono text-xs tracking-widest uppercase transition-transform duration-500 group-hover:translate-x-4">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </section>
    );
}
