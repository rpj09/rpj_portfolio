'use client';

import { useEffect, useState } from 'react';

// Components
import CustomCursor from '@/components/ui/CustomCursor';
import AudioController from '@/components/ui/AudioController';
import HeroIntroFlow from '@/components/sections/HeroIntroFlow';
import ProblemSection from '@/components/sections/ProblemSection';
import ForgeSection from '@/components/sections/ForgeSection';
import SystemSection from '@/components/sections/SystemSection';
import JourneySection from '@/components/sections/JourneySection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Easter egg: DevTools console message
    console.log(
      '%c Looking under the hood? I like you already. \n Let\'s talk: repunjaysingh@gmail.com',
      'color: #00F0FF; font-size: 16px; font-weight: bold; background: #0A0A0F; padding: 10px; border-radius: 5px;'
    );
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-background-base overflow-x-hidden selection:bg-accent-primary/30 selection:text-accent-primary">
      {/* UI & Immersion Layer */}
      {mounted && <CustomCursor />}
      {mounted && <AudioController />}

      {/* FOREGROUND CONTENT STRIP */}
      <div className="relative z-10 w-full flex flex-col pointer-events-auto">
        {/* Act 1 & 2: The Continuous Cinematic Flow */}
        <HeroIntroFlow />

        {/* Act 2: The Problem */}
        <ProblemSection />

        {/* Act 3: The Forge */}
        <ForgeSection />

        {/* Act 4: The System */}
        <SystemSection />

        {/* Act 5: The Journey */}
        <JourneySection />

        {/* Act 6: The Invitation */}
        <CTASection />
      </div>
    </main>
  );
}
