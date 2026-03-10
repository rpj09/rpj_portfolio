'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import TextReveal from '../ui/TextReveal';
export default function ForgeSection() {
    const containerRef = useRef<HTMLElement>(null);
    const proj1Ref = useRef<HTMLDivElement>(null);
    const proj2Ref = useRef<HTMLDivElement>(null);
    const proj3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const projects = [proj1Ref.current, proj2Ref.current, proj3Ref.current];

        projects.forEach((proj) => {
            if (!proj) return;

            gsap.fromTo(
                proj,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: proj,
                        start: 'top 80%',
                        end: 'center center',
                        scrub: 0.5,
                    }
                }
            );
        });
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-32 z-[60] bg-background-base">

            {/* Section Header */}
            <div className="container mx-auto px-6 mb-32 text-center">
                <div className="inline-block px-6 py-3 rounded-full border border-white/10 bg-white/5 w-fit backdrop-blur-sm mb-8 relative z-10 transition-transform hover:scale-105 duration-300">
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-text-secondary">
                        Proof of Work
                    </span>
                </div>
                <TextReveal
                    as="h3"
                    className="text-[clamp(4rem,10vw,10rem)] leading-[0.85] font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40"
                    splitBy="words"
                    stagger={0.08}
                >
                    Built. Shipped. In Production.
                </TextReveal>
                <p className="text-text-secondary text-xl md:text-2xl max-w-3xl mx-auto mt-8 font-light leading-relaxed">
                    Not concept demos. Not hackathon prototypes. These systems process real data,
                    serve real users, and run 24/7 without supervision.
                </p>
            </div>

            <div className="container mx-auto px-6 flex flex-col gap-32">

                {/* Project 1: Autonomous Document Validation */}
                <div ref={proj1Ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1 h-[450px] rounded-2xl overflow-hidden bg-background-base/20 backdrop-blur-md ring-1 ring-white/10 relative shadow-[0_0_50px_rgba(255,255,255,0.03)] p-8 flex flex-col justify-between">
                        {/* Live system mock */}
                        <div className="space-y-4 font-mono text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-green-400 font-semibold">LIVE — processing documents</span>
                            </div>
                            <div className="text-white/30">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
                            <div className="text-white/70">[Agent: DocProcessor] → Extracting fields...</div>
                            <div className="text-white/70">[Agent: Normalizer] → Standardizing format...</div>
                            <div className="text-white/70">[Agent: Validator] → Cross-referencing rules...</div>
                            <div className="text-white/70">[Agent: RepairBot] → Auto-correcting entry...</div>
                            <div className="text-white/70">[Agent: Reporter] → Generating audit trail...</div>
                            <div className="text-white/30">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
                            <div className="text-green-400 font-semibold">✓ Document validated — 95% confidence</div>
                            <div className="text-white/40">150+ reports generated today</div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 flex flex-col gap-4">
                        <span className="text-white/30 font-mono text-xs tracking-widest uppercase">01</span>
                        <h4 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">Autonomous Document Validation</h4>
                        <span className="text-white/50 font-mono text-sm">Visa2fly — Production System</span>
                        <p className="text-text-secondary text-lg leading-relaxed">
                            LangGraph-powered multi-agent system that autonomously validates complex
                            visa documents across global immigration rules. Seven specialized AI agents
                            work in concert — processing, normalizing, validating, repairing, and reporting —
                            without human intervention.
                        </p>
                        <ul className="mt-4 space-y-3 font-mono text-sm">
                            <li className="flex gap-3 items-center"><span className="text-green-400 text-lg">›</span> <span className="text-white/80">95% validation accuracy</span></li>
                            <li className="flex gap-3 items-center"><span className="text-green-400 text-lg">›</span> <span className="text-white/80">100+ concurrent requests daily</span></li>
                            <li className="flex gap-3 items-center"><span className="text-green-400 text-lg">›</span> <span className="text-white/80">7 orchestrated AI agents</span></li>
                            <li className="flex gap-3 items-center"><span className="text-green-400 text-lg">›</span> <span className="text-white/80">150+ audit reports per day</span></li>
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {['LangGraph', 'FastAPI', 'Neo4j', 'Redis', 'Celery', 'MLX-VLM'].map(t => (
                                <span key={t} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-white/50">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Project 2: Custom LLM Infrastructure */}
                <div ref={proj2Ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-4">
                        <span className="text-white/30 font-mono text-xs tracking-widest uppercase">02</span>
                        <h4 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">Custom LLM Training &amp; Serving</h4>
                        <span className="text-white/50 font-mono text-sm">Inference Cost Elimination</span>
                        <p className="text-text-secondary text-lg leading-relaxed">
                            Stop burning API credits. Domain-specific language models fine-tuned with LoRA
                            on proprietary travel and visa datasets, served on an optimized vLLM/KServe
                            stack with intelligent caching via LMCache. Your model, your data, your infrastructure.
                        </p>
                        <div className="mt-6 flex items-baseline gap-6">
                            <div className="flex flex-col">
                                <span className="text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">-70%</span>
                                <span className="font-mono text-xs text-text-secondary uppercase mt-1">Inference Cost</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">+40%</span>
                                <span className="font-mono text-xs text-text-secondary uppercase mt-1">Faster Response</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {['LoRA', 'vLLM', 'KServe', 'MLflow', 'LMCache', 'Kubernetes'].map(t => (
                                <span key={t} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-white/50">{t}</span>
                            ))}
                        </div>
                    </div>
                    <div className="h-[450px] rounded-2xl overflow-hidden bg-background-base/20 backdrop-blur-md ring-1 ring-white/10 relative shadow-[0_0_50px_rgba(255,255,255,0.03)] p-8 flex flex-col justify-center gap-5">
                        {/* Cost comparison visual */}
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between text-sm font-mono mb-3">
                                    <span className="text-rose-400 font-semibold">Before: OpenAI API</span>
                                    <span className="text-rose-400">$12,000/mo</span>
                                </div>
                                <div className="h-4 rounded-full bg-rose-500/20 w-full mb-6 relative">
                                    <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]" style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-mono mb-3">
                                    <span className="text-emerald-400 font-semibold">After: Custom vLLM</span>
                                    <span className="text-emerald-400">$3,600/mo</span>
                                </div>
                                <div className="h-4 rounded-full bg-emerald-500/20 w-full relative">
                                    <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]" style={{ width: '30%' }} />
                                </div>
                            </div>
                            <div className="text-center pt-6 border-t border-white/10 mt-6">
                                <span className="text-4xl font-heading font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">$8,400</span>
                                <span className="text-white/50 text-base font-mono ml-3">saved per month</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project 3: Knowledge Graph RAG */}
                <div ref={proj3Ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1 h-[450px] rounded-2xl overflow-hidden bg-background-base/20 backdrop-blur-md ring-1 ring-white/10 relative shadow-[0_0_50px_rgba(255,255,255,0.03)] p-8 flex flex-col justify-center">
                        {/* Graph visualization mock */}
                        <div className="relative w-full h-full flex items-center justify-center scale-75 md:scale-100 origin-center transition-transform">
                            <div className="absolute w-32 h-32 rounded-full border border-white/20 bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.05)] flex items-center justify-center z-10">
                                <span className="font-mono text-xs font-bold text-white/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Query</span>
                            </div>
                            {/* Connected nodes */}
                            {[
                                { label: 'Rules', x: -100, y: -80, delay: 0 },
                                { label: 'Docs', x: 100, y: -60, delay: 1 },
                                { label: 'Context', x: -80, y: 80, delay: 2 },
                                { label: 'Response', x: 90, y: 70, delay: 0.5 },
                            ].map((node, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: node.x, y: node.y }}
                                    animate={{
                                        y: [node.y, node.y - 12, node.y],
                                        boxShadow: ['0px 0px 10px rgba(255,255,255,0.1)', '0px 0px 20px rgba(255,255,255,0.2)', '0px 0px 10px rgba(255,255,255,0.1)']
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: node.delay }}
                                    whileHover={{ scale: 1.15, boxShadow: '0px 0px 30px rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.1)', transition: { duration: 0.2 } }}
                                    className="absolute w-20 h-20 rounded-full border border-white/20 bg-white/5 flex items-center justify-center cursor-pointer transition-colors duration-300 backdrop-blur-sm z-20"
                                >
                                    <span className="font-mono text-[10px] font-medium text-white/60 pointer-events-none drop-shadow-md">{node.label}</span>
                                </motion.div>
                            ))}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-64 h-64 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: '40s' }} />
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 flex flex-col gap-4">
                        <span className="text-white/30 font-mono text-xs tracking-widest uppercase">03</span>
                        <h4 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">Context-Aware RAG System</h4>
                        <span className="text-white/50 font-mono text-sm">Neo4j Knowledge Graph</span>
                        <p className="text-text-secondary text-lg leading-relaxed">
                            Retrieval-Augmented Generation pipeline powered by a Neo4j knowledge graph
                            storing 10,000+ validation rules and document relationships. Graph-based
                            context retrieval delivers precise, regulation-compliant answers — not
                            hallucinations.
                        </p>
                        <ul className="mt-4 space-y-3 font-mono text-sm">
                            <li className="flex gap-3 items-center"><span className="text-white/50 text-lg">›</span> <span className="text-white/80">10,000+ validation rules indexed</span></li>
                            <li className="flex gap-3 items-center"><span className="text-white/50 text-lg">›</span> <span className="text-white/80">Graph-based semantic retrieval</span></li>
                            <li className="flex gap-3 items-center"><span className="text-white/50 text-lg">›</span> <span className="text-white/80">Vector + Knowledge Graph hybrid search</span></li>
                            <li className="flex gap-3 items-center"><span className="text-white/50 text-lg">›</span> <span className="text-white/80">Regulatory compliance guaranteed</span></li>
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {['Neo4j', 'Qdrant', 'LangChain', 'FastAPI', 'Redis'].map(t => (
                                <span key={t} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-white/50">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
