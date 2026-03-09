'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { VaporizeTextCycle, Tag } from '../ui/vapour-text-effect';

export default function IntroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRevealRefs = useRef<(HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement | null)[]>([]);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Timeline for staggered reveal of the intro content
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                end: 'center center',
                scrub: 1,
            }
        });

        tl.fromTo(
            textRevealRefs.current,
            { y: 50, opacity: 0, rotateX: 10 },
            { y: 0, opacity: 1, rotateX: 0, stagger: 0.1, duration: 1, ease: 'power2.out' }
        );

        if (lineRef.current) {
            tl.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, duration: 1 }, "<");
        }
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full min-h-[150vh] bg-transparent z-20 pt-24 pb-48">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl flex flex-col justify-between h-full">

                {/* Staggered Intro Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 pt-24">
                    <div className="md:col-span-5 flex flex-col gap-8 relative">
                        <div ref={lineRef} className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/30 to-transparent origin-top hidden md:block" />

                        <h2
                            ref={el => { textRevealRefs.current[0] = el; }}
                            className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 pl-0 md:pl-8"
                        >
                            The <br /> Architecture <br /> of Intelligence.
                        </h2>

                        <p
                            ref={el => { textRevealRefs.current[1] = el; }}
                            className="text-gray-400 text-lg md:text-xl leading-relaxed font-sans font-light pl-0 md:pl-8"
                        >
                            I design systems that process, orchestrate, and act. Moving beyond experimental AI, I build enterprise-grade distributed infrastructure tailored for massive scale and speed.
                        </p>
                    </div>

                    <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center gap-10">
                        {/* Interactive competency items */}
                        {[
                            { title: 'LLM Orchestration', desc: 'LangGraph, AutoGen, CrewAI' },
                            { title: 'Production AI', desc: 'vLLM, Ray, TensorRT-LLM' },
                            { title: 'Distributed Systems', desc: 'Kubernetes, High-Availability Data' },
                            { title: 'Immersive Interfaces', desc: 'React, WebGL, GSAP' },
                        ].map((item, i) => (
                            <div
                                key={i}
                                ref={el => { textRevealRefs.current[i + 2] = el; }}
                                className="group relative border-b border-zinc-800 pb-6 transition-colors duration-500 hover:border-gray-300 cursor-default"
                            >
                                <h3 className="text-gray-300 font-heading font-bold text-2xl md:text-4xl mb-2 transition-transform duration-500 group-hover:translate-x-6 group-hover:text-white">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity absolute -left-6 top-1">▹</span>
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 font-mono text-sm tracking-widest uppercase transition-transform duration-500 group-hover:translate-x-6">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* The Vaporize Transition Trigger at the bottom of the section */}
                <div className="mt-48 mb-12 relative h-[40vh] w-full flex items-center justify-center pointer-events-auto">
                    <VaporizeTextCycle
                        texts={["Build systems.", "Shatter limits.", "Welcome to the Forge."]}
                        font={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "6vw",
                            fontWeight: 800
                        }}
                        color="rgb(220, 220, 230)"
                        spread={4}
                        density={1} // We've hard-capped max particles in the component to guarantee 60fps
                        animation={{
                            vaporizeDuration: 2.5,
                            fadeInDuration: 1.5,
                            waitDuration: 3
                        }}
                        direction="left-to-right"
                        alignment="center"
                        tag={Tag.H2}
                    />
                </div>
            </div>
        </section>
    );
}
