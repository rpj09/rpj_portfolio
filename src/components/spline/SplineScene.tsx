'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { ErrorBoundary } from '../ui/ErrorBoundary';

// Lazy load the base Spline component from @splinetool/react-spline
// Using the /next import dynamically causes async Client Component issues in Next 15+
const SplineNext = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-background-base">
            <Loader2 className="w-8 h-8 text-accent-primary animate-spin" />
        </div>
    ),
});

interface SplineSceneProps {
    sceneUrl: string;
    fallbackImageUrl?: string;
    className?: string;
    onLoad?: (splineApp: any) => void;
}

export default function SplineScene({
    sceneUrl,
    fallbackImageUrl,
    className = '',
    onLoad,
}: SplineSceneProps) {
    const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        setIsRendered(true);

        const isMobile = window.innerWidth < 768;
        // Check hardware capability if available.
        // If fewer than 4 cores, assume low-end device and skip Spline rendering.
        const isLowEnd =
            typeof navigator !== 'undefined' && navigator.hardwareConcurrency
                ? navigator.hardwareConcurrency < 4
                : false;

        if (!isMobile && !isLowEnd) {
            setShouldLoadSpline(true);
        }
    }, []);

    if (!isRendered) {
        // Return an initial placeholder matching the fallback to prevent hydration mismatch
        return (
            <div className={`w-full h-full bg-background-base ${className}`} />
        );
    }

    // Hard-block placeholder URLs from even attempting to mount the WebGL engine
    // to absolutely prevent the "Data read, but end of buffer not reached" error.
    const isPlaceholderUrl =
        sceneUrl.includes('6Wq1Q7YGyM-iab9i') ||
        sceneUrl.includes('Wp2bL2h3S4-7s7R8') ||
        sceneUrl.includes('REPLACE_ME');

    if (isPlaceholderUrl) {
        return (
            <div className={`relative w-full h-full flex flex-col items-center justify-center bg-surface/30 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] ${className}`}>
                {/* Premium Animated Grain & Gradient Placeholder */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-background-base via-surface to-accent-primary/10 opacity-60 z-10"></div>

                {/* Minimalist UI Pill */}
                <div className="z-20 px-8 py-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-4 shadow-2xl">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-primary"></span>
                    </span>
                    <p className="text-text-primary font-mono text-sm tracking-widest uppercase opacity-80">Awaiting 3D Asset</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative w-full h-full ${className}`}>
            {/* Fallback View - Always rendered, hidden if Spline loads */}
            <div
                className="absolute inset-0 z-0 bg-background-base bg-cover bg-center transition-opacity duration-1000"
                style={{
                    backgroundImage: fallbackImageUrl ? `url(${fallbackImageUrl})` : 'none',
                    opacity: shouldLoadSpline ? 0 : 1,
                }}
            />

            {/* Load Spline only on capable devices */}
            {shouldLoadSpline && (
                <div className="absolute inset-0 z-10">
                    <ErrorBoundary>
                        <SplineNext
                            scene={sceneUrl}
                            onLoad={onLoad}
                            className="w-full h-full"
                        />
                    </ErrorBoundary>
                </div>
            )}
        </div>
    );
}
