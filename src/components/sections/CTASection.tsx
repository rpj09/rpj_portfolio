'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, FileText, Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function CTASection() {
    const ctaRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(
            contentRef.current,
            { y: 50, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: 'top 70%',
                    end: 'center center',
                    scrub: 1,
                }
            }
        );
    }, []);

    return (
        <section ref={ctaRef} className="relative w-full h-[120vh] flex flex-col justify-end pb-32 items-center overflow-hidden z-20">
            <div className="absolute inset-0 bg-gradient-to-t from-background-base via-transparent to-transparent -z-10" />

            <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">

                <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 w-fit backdrop-blur-sm mb-6">
                    <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-text-secondary">
                        Available for Hire
                    </span>
                </div>

                <h2 className="text-[clamp(3rem,10vw,10rem)] leading-[0.85] tracking-tighter font-heading font-black mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                    Let&apos;s Build Something <br />That Ships.
                </h2>

                <p className="text-xl text-text-secondary font-sans max-w-2xl mb-12">
                    You&apos;ve seen the infrastructure. I architect custom, production-grade
                    AI systems — multi-agent pipelines, fine-tuned LLMs, and scalable cloud
                    infrastructure. Open to relocation and remote opportunities worldwide.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
                    <a
                        href="mailto:singhripunjay09@gmail.com"
                        className="flex items-center justify-center gap-3 px-8 py-4 bg-accent-primary text-black font-bold font-heading rounded-xl hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
                    >
                        Let&apos;s Talk <ArrowRight className="w-5 h-5" />
                    </a>

                    <a
                        href="/ripunjay_singh_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-8 py-4 bg-surface/80 backdrop-blur-md border border-white/10 text-white font-bold font-heading rounded-xl hover:bg-white/10 transition-all transform hover:scale-105"
                    >
                        <FileText className="w-5 h-5 text-white/50" /> Download Resume
                    </a>
                </div>

                {/* Social Links */}
                <div className="mt-12 flex flex-wrap gap-6">
                    <a href="https://github.com/rpj09" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
                        <Github className="w-5 h-5" /> GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/rpj09/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
                        <Linkedin className="w-5 h-5" /> LinkedIn
                    </a>
                    <a href="https://x.com/_rpj09_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
                        <Twitter className="w-5 h-5" /> X / Twitter
                    </a>
                    <a href="mailto:singhripunjay09@gmail.com" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
                        <Mail className="w-5 h-5" /> singhripunjay09@gmail.com
                    </a>
                </div>

                {/* Social Proof Footer */}
                <div className="mt-24 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 pointer-events-none">
                    <div className="flex flex-col">
                        <span className="font-heading text-2xl font-bold text-white">10K+</span>
                        <span className="font-mono text-xs uppercase text-text-secondary">Daily API Requests</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-heading text-2xl font-bold text-white">7</span>
                        <span className="font-mono text-xs uppercase text-text-secondary">AI Agents in Prod</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-heading text-2xl font-bold text-white">AWS</span>
                        <span className="font-mono text-xs uppercase text-text-secondary">Certified</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-heading text-2xl font-bold text-white">Zero</span>
                        <span className="font-mono text-xs uppercase text-text-secondary">Vendor Lock-in</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
