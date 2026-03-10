'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import { Github, Linkedin, Mail, Award, BookOpen } from 'lucide-react';

const DitheringBackground = dynamic(() => import('../ui/dithering-background'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black" />,
});

const experience = [
    {
        company: 'Visa2fly',
        role: 'AI Engineer',
        period: 'Dec 2024 → Present',
        highlight: 'Multi-Agent Systems, Custom LLMs, Production ML',
    },
    {
        company: 'Visa2fly',
        role: 'Backend Engineer',
        period: 'Dec 2023 → Nov 2024',
        highlight: 'SpringBoot, Microservices, CI/CD',
    },
    {
        company: 'Visa2fly',
        role: 'SpringBoot Intern',
        period: 'Jun 2023 → Nov 2023',
        highlight: 'API Development, Agile',
    },
];

const education = {
    institution: 'Bennett University',
    degree: 'B.Tech Computer Science',
    period: '2022 → 2026',
    gpa: '8.54 CGPA',
};

const achievements = [
    { icon: Award, text: 'MLH Hackathon Winner — Asia-Pacific' },
    { icon: Award, text: 'AWS Certified Cloud Practitioner' },
    { icon: BookOpen, text: '2 Research Publications in Distributed AI' },
    { icon: Award, text: 'Microsoft Learn Student Ambassador' },
];

const links = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/rpj09' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rpj09/' },
    { icon: Mail, label: 'Email', href: 'mailto:singhripunjay09@gmail.com' },
];

export default function JourneySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Animation state for hover "shatter"
    const [ditherProps, setDitherProps] = useState({ pxSize: 3, scale: 0.7 });
    const isHovering = useRef(false);

    useEffect(() => {
        let animationFrameId: number;
        let currentPxSize = 3;
        let currentScale = 0.7;

        const renderLoop = () => {
            const targetPxSize = isHovering.current ? 8 : 3;
            const targetScale = 0.7; // Keep scale fixed

            // Smoothly interpolate towards targets (spring-like)
            currentPxSize += (targetPxSize - currentPxSize) * 0.1;
            currentScale += (targetScale - currentScale) * 0.1;

            // Only update react state if we are actually animating (reduces render churn)
            if (Math.abs(targetPxSize - currentPxSize) > 0.01 || Math.abs(targetScale - currentScale) > 0.001) {
                setDitherProps({ pxSize: currentPxSize, scale: currentScale });
            }

            animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    useEffect(() => {
        gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: -60 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'center center',
                    scrub: 0.5,
                },
            }
        );

        timelineRefs.current.forEach((el, i) => {
            if (!el) return;
            gsap.fromTo(
                el,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        end: 'top 60%',
                        scrub: 0.3,
                    },
                }
            );
        });
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden z-10">

            {/* Left Panel: Content */}
            <div
                ref={contentRef}
                className="w-full lg:w-1/2 relative z-10 bg-black p-8 md:p-16 font-mono flex flex-col justify-between min-h-screen lg:min-h-0"
            >
                {/* Header */}
                <div className="mb-12">
                    <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 w-fit backdrop-blur-sm mb-8">
                        <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-text-secondary">
                            The Journey
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2">
                        Ripunjay Singh
                    </h2>
                    <p className="text-text-secondary text-lg font-heading">AI Engineer &amp; Systems Architect</p>
                </div>

                {/* Experience Timeline */}
                <div className="flex-1 space-y-1">
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-text-secondary mb-4">Experience</h3>
                    {experience.map((exp, i) => (
                        <div
                            key={i}
                            ref={el => { timelineRefs.current[i] = el; }}
                            className="group flex flex-col py-4 border-b border-white/10 transition-colors hover:border-white/30"
                        >
                            <div className="flex items-baseline justify-between gap-4">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-white/90 font-heading font-bold text-lg">{exp.company}</span>
                                    <span className="text-white/40">·</span>
                                    <span className="text-white/60 text-sm">{exp.role}</span>
                                </div>
                                <span className="text-white/30 text-xs whitespace-nowrap">{exp.period}</span>
                            </div>
                            <span className="text-white/25 text-xs mt-1 transition-colors group-hover:text-white/50">{exp.highlight}</span>
                        </div>
                    ))}

                    {/* Education */}
                    <div className="mt-8">
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-text-secondary mb-4">Education</h3>
                        <div
                            ref={el => { timelineRefs.current[experience.length] = el; }}
                            className="flex flex-col py-4 border-b border-white/10"
                        >
                            <div className="flex items-baseline justify-between gap-4">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-white/90 font-heading font-bold text-lg">{education.institution}</span>
                                    <span className="text-white/40">·</span>
                                    <span className="text-white/60 text-sm">{education.degree}</span>
                                </div>
                                <span className="text-white/30 text-xs whitespace-nowrap">{education.period}</span>
                            </div>
                            <span className="text-white/25 text-xs mt-1">{education.gpa}</span>
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="mt-8">
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-text-secondary mb-4">Recognition</h3>
                        <div className="space-y-3">
                            {achievements.map((a, i) => (
                                <div
                                    key={i}
                                    ref={el => { timelineRefs.current[experience.length + 1 + i] = el; }}
                                    className="flex items-center gap-3 text-white/50 text-sm"
                                >
                                    <a.icon className="w-4 h-4 text-white/30 flex-shrink-0" />
                                    <span>{a.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex gap-6">
                        {links.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors"
                            >
                                <link.icon className="w-4 h-4" />
                                <span>{link.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel: Dithering Shader */}
            <div
                className="w-full h-[60vh] lg:h-auto lg:w-1/2 relative cursor-pointer overflow-hidden bg-[#050505]"
                onMouseEnter={() => { isHovering.current = true; }}
                onMouseLeave={() => { isHovering.current = false; }}
            >
                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                    {/* Optional optional pulsing ring or hint text can go here in future */}
                </div>
                <DitheringBackground
                    colorFront="hsl(220, 80%, 60%)"
                    shape="sphere"
                    pxSize={ditherProps.pxSize}
                    scale={ditherProps.scale}
                />
            </div>

        </section>
    );
}
