'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });
    const followerPos = useRef({ x: 0, y: 0 });
    const isHovering = useRef(false);
    const rafId = useRef<number>(0);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isVisible) setIsVisible(true);
        mousePos.current = { x: e.clientX, y: e.clientY };
    }, [isVisible]);

    useEffect(() => {
        // Hide default cursor
        document.documentElement.style.cursor = 'none';

        // Ensure all elements also have cursor:none
        const style = document.createElement('style');
        style.textContent = '*, *::before, *::after { cursor: none !important; }';
        document.head.appendChild(style);

        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        const animate = () => {
            // Tight follow for dot (fast lerp)
            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.25;
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.25;

            // Lazy follow for ring (slow lerp = trailing effect)
            followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.08;
            followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.08;

            cursor.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px) translate(-50%, -50%)`;
            follower.style.transform = `translate(${followerPos.current.x}px, ${followerPos.current.y}px) translate(-50%, -50%) scale(${isHovering.current ? 1.8 : 1})`;

            rafId.current = requestAnimationFrame(animate);
        };

        // Interactive element detection
        const handleEnter = (e: Event) => {
            const target = e.currentTarget as HTMLElement;
            isHovering.current = true;

            // Expand + show label
            gsap.to(cursor, { scale: 0, duration: 0.2 });
            gsap.to(follower, {
                width: 80,
                height: 80,
                borderColor: 'rgba(255, 255, 255, 0.4)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                duration: 0.4,
                ease: 'power2.out',
            });

            // Show contextual label
            const label = labelRef.current;
            if (label) {
                if (target.tagName === 'A' || target.closest('a')) {
                    label.textContent = 'View';
                } else if (target.tagName === 'BUTTON' || target.closest('button')) {
                    label.textContent = 'Click';
                } else {
                    label.textContent = 'Explore';
                }
                gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 });
            }

            // Magnetic pull effect — only if element is small enough
            const rect = target.getBoundingClientRect();
            if (rect.width < 300 && rect.height < 100) {
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const pullX = (mousePos.current.x - centerX) * 0.15;
                const pullY = (mousePos.current.y - centerY) * 0.15;
                gsap.to(target, {
                    x: pullX,
                    y: pullY,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            }
        };

        const handleLeave = (e: Event) => {
            const target = e.currentTarget as HTMLElement;
            isHovering.current = false;

            gsap.to(cursor, { scale: 1, duration: 0.2 });
            gsap.to(follower, {
                width: 40,
                height: 40,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                backgroundColor: 'transparent',
                duration: 0.4,
                ease: 'power2.out',
            });

            // Hide label
            const label = labelRef.current;
            if (label) {
                gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2 });
            }

            // Release magnetic pull
            gsap.to(target, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        };

        // Attach listeners to interactive elements
        const attachListeners = () => {
            const interactives = document.querySelectorAll('a, button, [role="button"], .cursor-interact');
            interactives.forEach((el) => {
                el.addEventListener('mouseenter', handleEnter);
                el.addEventListener('mouseleave', handleLeave);
            });
            return interactives;
        };

        const interactives = attachListeners();

        // Re-attach on DOM changes (for dynamically loaded content)
        const observer = new MutationObserver(() => {
            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', handleEnter);
                el.removeEventListener('mouseleave', handleLeave);
            });
            attachListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        window.addEventListener('mousemove', handleMouseMove);
        rafId.current = requestAnimationFrame(animate);

        // Hide on mouse leave window
        const handleMouseLeave = () => {
            gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
        };
        const handleMouseEnterWindow = () => {
            gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
        };
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnterWindow);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnterWindow);
            cancelAnimationFrame(rafId.current);
            observer.disconnect();
            document.documentElement.style.cursor = 'auto';
            style.remove();

            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', handleEnter);
                el.removeEventListener('mouseleave', handleLeave);
            });
        };
    }, [handleMouseMove]);

    if (!isVisible) return null;

    return (
        <>
            {/* Dot — center point with mix-blend-difference for visibility on all backgrounds */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{ willChange: 'transform' }}
            >
                <div className="w-3 h-3 rounded-full bg-white mix-blend-difference" />
            </div>

            {/* Follower ring — trails behind with magnetic expand on hover */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    willChange: 'transform',
                    transition: 'width 0.4s, height 0.4s',
                    mixBlendMode: 'difference',
                }}
            >
                {/* Contextual label inside the ring */}
                <span
                    ref={labelRef}
                    className="font-mono text-[10px] text-white uppercase tracking-widest opacity-0 scale-75 pointer-events-none"
                    style={{ willChange: 'opacity, transform' }}
                />
            </div>
        </>
    );
}
