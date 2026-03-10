'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function ProblemSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const splineWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                end: 'center center',
                scrub: 1,
            }
        });

        tl.fromTo(
            textRef.current,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
        );

        tl.fromTo(
            splineWrapperRef.current,
            { x: 100, opacity: 0, scale: 0.8 },
            { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
            '<'
        );

    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-32 z-[60] bg-background-base"
        >
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">

                {/* Left column: Narrative Text */}
                <div ref={textRef} className="flex flex-col gap-6 max-w-xl">
                    <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 w-fit backdrop-blur-sm mb-6">
                        <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-text-secondary">
                            The Problem
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-text-secondary mb-4">
                        Your AI Is Held Together With <br />
                        <span className="text-white/40">
                            API Calls &amp; Prayers.
                        </span>
                    </h2>

                    <p className="text-text-secondary text-lg leading-relaxed font-sans">
                        Most &ldquo;AI products&rdquo; are thin wrappers around OpenAI. One rate limit, one
                        policy change, one outage — and your entire system folds.
                        I build the opposite: custom-trained models you own, multi-agent
                        orchestration that self-heals, and infrastructure that scales
                        without a single vendor lock-in.
                    </p>

                    {/* Stats from real resume data */}
                    <div className="grid grid-cols-2 gap-6 mt-8">
                        <div className="flex flex-col gap-1 border-l-2 border-accent-primary pl-4">
                            <AnimatedCounter end={95} suffix="%" className="text-3xl font-heading font-bold text-text-primary" />
                            <span className="text-sm font-mono text-text-secondary uppercase">Validation Accuracy</span>
                        </div>
                        <div className="flex flex-col gap-1 border-l-2 border-accent-gold pl-4">
                            <AnimatedCounter end={70} prefix="-" suffix="%" className="text-3xl font-heading font-bold text-text-primary" />
                            <span className="text-sm font-mono text-text-secondary uppercase">Inference Cost</span>
                        </div>
                        <div className="flex flex-col gap-1 border-l-2 border-accent-primary pl-4">
                            <AnimatedCounter end={10} suffix="K+" className="text-3xl font-heading font-bold text-text-primary" />
                            <span className="text-sm font-mono text-text-secondary uppercase">Daily API Requests</span>
                        </div>
                        <div className="flex flex-col gap-1 border-l-2 border-accent-gold pl-4">
                            <AnimatedCounter end={40} suffix="%" className="text-3xl font-heading font-bold text-text-primary" />
                            <span className="text-sm font-mono text-text-secondary uppercase">Faster Inference</span>
                        </div>
                    </div>
                </div>

                {/* Right column: Stack visualization */}
                <div
                    ref={splineWrapperRef}
                    className="relative w-full aspect-square rounded-2xl border border-white/10 bg-surface/20 backdrop-blur-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,240,255,0.05)] pointer-events-none z-10" />

                    {/* Stack comparison cards */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-center gap-6">
                        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                            <span className="font-mono text-xs text-red-400 uppercase tracking-wider">❌ What most do</span>
                            <p className="text-white/60 text-sm mt-2 font-mono">openai.chat.completions.create()</p>
                            <p className="text-white/30 text-xs mt-1">Vendor-locked. No fallback. No ownership.</p>
                        </div>
                        <div className="w-full flex justify-center">
                            <span className="text-white/20 text-2xl">↓</span>
                        </div>
                        <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5">
                            <span className="font-mono text-xs text-green-400 uppercase tracking-wider">✓ What I build</span>
                            <p className="text-white/80 text-sm mt-2 font-mono">LoRA → vLLM → KServe → K8s → Prometheus</p>
                            <p className="text-white/40 text-xs mt-1">Custom models. Your data. Your infrastructure. Zero lock-in.</p>
                        </div>
                    </div>

                    <div className="absolute top-6 right-6 px-4 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md pointer-events-none z-20">
                        <span className="font-mono text-xs text-white/70">Your stack vs. mine</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
