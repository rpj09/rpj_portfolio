'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Terminal, Activity, Server, Cpu, Shield, Zap } from 'lucide-react';

export default function SystemSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const dashboardRef = useRef<HTMLDivElement>(null);
    const [logs, setLogs] = useState<string[]>([
        '> Initializing production cluster...',
        '> Connecting to observability stack...',
    ]);

    useEffect(() => {
        gsap.fromTo(
            dashboardRef.current,
            { y: 150, opacity: 0, rotateX: 10 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                    end: 'center center',
                    scrub: 1
                }
            }
        );

        const newLogs = [
            '> docker compose up -d [OK]',
            '> kubectl apply -f deployment.yaml [OK]',
            '> nginx reverse proxy configured [OK]',
            '> Prometheus scraping metrics...',
            '> Grafana dashboards live',
            '> Celery workers: 8/8 active',
            '> Flower monitoring: port 5555',
            '> Health check: 200 OK',
            '> Latency P99: 42ms',
            '> Memory: 3.2GB / 8GB (40%)',
            '> System secure. All agents operational.',
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < newLogs.length) {
                setLogs(prev => [...prev, newLogs[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen py-32 flex flex-col items-center overflow-hidden z-10">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 text-center max-w-4xl mb-24 relative z-10">
                <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 w-fit backdrop-blur-sm mb-6">
                    <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-text-secondary">
                        Production Infrastructure
                    </span>
                </div>
                <h2 className="text-[clamp(3rem,8vw,8rem)] leading-[0.85] font-heading font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                    Ship It. <br />Keep It Alive.
                </h2>
                <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                    Building is 10% of the work. The other 90% is keeping it alive under load.
                    Automated CI/CD, real-time observability, auto-scaling infrastructure,
                    and zero-downtime deployments — all battle-tested at scale.
                </p>
            </div>

            <div
                ref={dashboardRef}
                className="relative w-[90%] max-w-6xl aspect-[16/9] md:aspect-[21/9] rounded-2xl border border-white/10 bg-surface/80 backdrop-blur-xl shadow-2xl shadow-white/5 overflow-hidden flex"
            >
                {/* Left Side: Terminal */}
                <div className="hidden md:flex flex-col w-1/3 border-r border-white/10 bg-black/40 p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Terminal className="w-5 h-5 text-green-400" />
                        <span className="font-mono text-sm text-text-primary">production.log</span>
                    </div>
                    <div className="flex flex-col gap-2 font-mono text-xs text-green-400/80 overflow-y-auto">
                        {logs.map((log, i) => (
                            <span key={i} className="animate-fade-in">{log}</span>
                        ))}
                        <span className="animate-pulse">_</span>
                    </div>
                </div>

                {/* Right Side: Metrics */}
                <div className="flex-1 relative flex flex-col p-6">
                    <div className="grid grid-cols-3 gap-4 mb-6 z-10 pointer-events-none">
                        <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex items-center justify-between backdrop-blur-md">
                            <div className="flex flex-col">
                                <span className="text-xs text-text-secondary font-mono">Daily Requests</span>
                                <span className="text-xl font-bold text-white">10K+</span>
                            </div>
                            <Zap className="w-6 h-6 text-yellow-400/50" />
                        </div>
                        <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex items-center justify-between backdrop-blur-md">
                            <div className="flex flex-col">
                                <span className="text-xs text-text-secondary font-mono">Latency P99</span>
                                <span className="text-xl font-bold text-green-400">42ms</span>
                            </div>
                            <Activity className="w-6 h-6 text-green-400/50" />
                        </div>
                        <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex items-center justify-between backdrop-blur-md">
                            <div className="flex flex-col">
                                <span className="text-xs text-text-secondary font-mono">Uptime</span>
                                <span className="text-xl font-bold text-green-400">99.9%</span>
                            </div>
                            <Shield className="w-6 h-6 text-green-400/50" />
                        </div>
                    </div>

                    {/* Additional metrics row */}
                    <div className="grid grid-cols-3 gap-4 z-10 pointer-events-none">
                        <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex items-center justify-between backdrop-blur-md">
                            <div className="flex flex-col">
                                <span className="text-xs text-text-secondary font-mono">Active Agents</span>
                                <span className="text-xl font-bold text-white">7</span>
                            </div>
                            <Cpu className="w-6 h-6 text-white/30" />
                        </div>
                        <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex items-center justify-between backdrop-blur-md">
                            <div className="flex flex-col">
                                <span className="text-xs text-text-secondary font-mono">Celery Workers</span>
                                <span className="text-xl font-bold text-white">8/8</span>
                            </div>
                            <Server className="w-6 h-6 text-white/30" />
                        </div>
                        <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex items-center justify-between backdrop-blur-md">
                            <div className="flex flex-col">
                                <span className="text-xs text-text-secondary font-mono">Daily Reports</span>
                                <span className="text-xl font-bold text-white">150+</span>
                            </div>
                            <Activity className="w-6 h-6 text-white/30" />
                        </div>
                    </div>

                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-transparent mix-blend-overlay border-[1px] border-white/5 rounded-r-2xl pointer-events-none" />
                </div>

            </div>

            {/* Infrastructure Stack */}
            <div className="container mx-auto px-6 mt-16 flex flex-wrap justify-center gap-3">
                {['Docker', 'Kubernetes', 'Nginx', 'Jenkins', 'Terraform', 'Prometheus', 'Grafana', 'Flower', 'Supervisord', 'AWS'].map(tool => (
                    <span key={tool} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-white/40">
                        {tool}
                    </span>
                ))}
            </div>
        </section>
    );
}
