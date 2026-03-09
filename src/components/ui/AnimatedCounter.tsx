'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
    end: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export default function AnimatedCounter({
    end,
    suffix = '',
    prefix = '',
    duration = 2,
    className = '',
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || hasAnimated) return;

        const trigger = ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => {
                setHasAnimated(true);
                const counter = { val: 0 };
                gsap.to(counter, {
                    val: end,
                    duration,
                    ease: 'power2.out',
                    onUpdate: () => {
                        if (el) {
                            el.textContent = `${prefix}${Math.round(counter.val).toLocaleString()}${suffix}`;
                        }
                    },
                });
            },
        });

        return () => trigger.kill();
    }, [end, suffix, prefix, duration, hasAnimated]);

    return (
        <span ref={ref} className={className}>
            {prefix}0{suffix}
        </span>
    );
}
