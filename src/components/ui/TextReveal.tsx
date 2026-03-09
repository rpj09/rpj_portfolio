'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    delay?: number;
    stagger?: number;
    splitBy?: 'chars' | 'words' | 'lines';
}

export default function TextReveal({
    children,
    className = '',
    as: Tag = 'h2',
    delay = 0,
    stagger = 0.03,
    splitBy = 'chars',
}: TextRevealProps) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Split the text
        const split = new SplitType(el, { types: splitBy });
        const targets = split[splitBy];

        if (!targets || targets.length === 0) return;

        // Set initial state
        gsap.set(targets, { opacity: 0, y: 20 });

        // Animate on scroll
        const anim = gsap.to(targets, {
            opacity: 1,
            y: 0,
            stagger,
            duration: 0.6,
            ease: 'power3.out',
            delay,
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play none none none',
            },
        });

        return () => {
            anim.kill();
            split.revert();
        };
    }, [children, delay, stagger, splitBy]);

    return (
        // @ts-expect-error - dynamic tag
        <Tag ref={ref} className={className}>
            {children}
        </Tag>
    );
}
