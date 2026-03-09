'use client';

import { useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioController() {
    const [isMuted, setIsMuted] = useState(true); // Start muted as per browser autoplay policies
    const [isReady, setIsReady] = useState(false);
    const droneRef = useRef<Howl | null>(null);

    useEffect(() => {
        // Initialize ambient drone
        droneRef.current = new Howl({
            // We will need to place an ambient drone mp3 in the public folder 
            // User can replace this with their preferred cinematic drone sound
            src: ['/audio/ambient-drone.mp3'],
            loop: true,
            volume: 0,
            autoplay: false,
            onload: () => setIsReady(true),
        });

        return () => {
            if (droneRef.current) {
                droneRef.current.unload();
            }
        };
    }, []);

    const toggleMute = () => {
        if (!droneRef.current || !isReady) return;

        if (isMuted) {
            droneRef.current.play();
            droneRef.current.fade(0, 0.3, 2000); // Fade in to 30% volume over 2s
            setIsMuted(false);
        } else {
            droneRef.current.fade(0.3, 0, 1000); // Fade out over 1s
            setTimeout(() => droneRef.current?.pause(), 1000);
            setIsMuted(true);
        }
    };

    return (
        <button
            onClick={toggleMute}
            className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-text-primary hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300 group"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
            {isMuted ? (
                <VolumeX className="w-5 h-5 opacity-70 group-hover:opacity-100" />
            ) : (
                <Volume2 className="w-5 h-5 opacity-70 group-hover:opacity-100" />
            )}
        </button>
    );
}
