'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AiHeroBackground } from '../ui/ai-hero-background';

gsap.registerPlugin(ScrollTrigger);

export default function HeroIntroFlow() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasWrapperRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const introContentRef = useRef<HTMLDivElement>(null);
    const textRevealRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * 2.5}`, // Use a function to guarantee pixel value
                    scrub: 0.5,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                }
            });

            // --- PHASE 1: Hero name shrinks and moves to top-left ---
            // Takes first 50% of the scroll (was 40% — slower now)
            tl.to(nameRef.current, {
                scale: 0.25,
                x: '-38vw',
                y: '-40vh',
                duration: 0.5,
                ease: 'power2.inOut',
            }, 0);

            // Dots fade slightly but stay visible for continuity
            tl.to(canvasWrapperRef.current, {
                opacity: 0.5,
                duration: 0.6,
                ease: 'power2.inOut',
            }, 0);

            // --- PHASE 2: Intro content fades in ---
            // Starts at 0.35 (more gap after name movement for breathing room)
            tl.fromTo(introContentRef.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                0.35
            );

            // Stagger the individual text elements
            tl.fromTo(textRevealRefs.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.06, duration: 0.35, ease: 'power2.out' },
                0.45
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

            {/* 2. The Hero Name — starts centered */}
            <h1
                ref={nameRef}
                className="absolute inset-0 z-30 flex items-center justify-center text-[7vw] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 tracking-tighter select-none text-center pointer-events-none"
                style={{ willChange: 'transform' }}
            >
                <span>
                    <span className="block">RIPUNJAY</span>
                    <span className="block -mt-2">SINGH.</span>
                </span>
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
