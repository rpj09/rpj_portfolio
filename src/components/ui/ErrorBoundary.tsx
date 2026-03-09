'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Uncaught error in Spline component:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="w-full h-full flex flex-col items-center justify-center bg-surface/50 border border-white/5 rounded-2xl">
                    <div className="px-6 py-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-center">
                        <p className="text-accent-hot font-mono text-sm mb-2">3D Scene Unavailable</p>
                        <p className="text-text-secondary text-xs">Waiting for valid Spline URL</p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
