'use client';

import { Dithering } from '@paper-design/shaders-react';

interface DitheringBackgroundProps {
    className?: string;
    colorFront?: string;
    shape?: 'simplex' | 'warp' | 'dots' | 'wave' | 'ripple' | 'swirl' | 'sphere';
}

export default function DitheringBackground({
    className = '',
    colorFront = 'hsl(200, 80%, 55%)',
    shape = 'sphere',
}: DitheringBackgroundProps) {
    return (
        <div className={`absolute inset-0 ${className}`}>
            <Dithering
                style={{ height: '100%', width: '100%' }}
                colorBack="hsl(0, 0%, 0%)"
                colorFront={colorFront}
                shape={shape}
                type="4x4"
                pxSize={3}
                offsetX={0}
                offsetY={0}
                scale={0.7}
                rotation={0}
                speed={0.08}
            />
        </div>
    );
}
