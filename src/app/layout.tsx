import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import SmoothScroller from '@/components/ui/SmoothScroller';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  adjustFontFallback: false,
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'Ripunjay Singh | Architecting Autonomous AI Systems',
  description: 'Portfolio of Ripunjay Singh, building custom, secure, and distributed AI pipelines that scale.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased selection:bg-accent-primary/30 selection:text-accent-primary">
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
