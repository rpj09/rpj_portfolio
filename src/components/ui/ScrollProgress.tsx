'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        // Show after scrolling past hero
        const showTrigger = ScrollTrigger.create({
            trigger: document.body,
            start: 'top -100',
            onEnter: () => setVisible(true),
            onLeaveBack: () => setVisible(false),
        });

        // Update bar width based on scroll progress
        const updateProgress = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            if (bar) {
                bar.style.transform = `scaleX(${progress})`;
            }
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();

        return () => {
            showTrigger.kill();
            window.removeEventListener('scroll', updateProgress);
        };
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-[100] h-[2px] transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div
                ref={barRef}
                className="h-full origin-left"
                style={{
                    background: 'linear-gradient(90deg, rgba(0,240,255,0.8), rgba(255,255,255,0.9))',
                    boxShadow: '0 0 10px rgba(0,240,255,0.6), 0 0 30px rgba(0,240,255,0.3)',
                    transform: 'scaleX(0)',
                    willChange: 'transform',
                }}
            />
        </div>
    );
}
