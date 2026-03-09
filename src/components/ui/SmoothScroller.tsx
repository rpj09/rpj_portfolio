'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroller({ children }: { children: any }) {
    return (
        <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
