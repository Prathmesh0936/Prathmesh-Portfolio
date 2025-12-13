"use client";

import { useEffect, useState } from 'react';

export default function ClientMarquee(props) {
  const [MarqueeComponent, setMarqueeComponent] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Only import Marquee on the client side
    import('react-fast-marquee').then((mod) => {
      setMarqueeComponent(() => mod.default);
    });
  }, []);

  // Don't render anything during SSR
  if (!isMounted || !MarqueeComponent) {
    return (
      <div className="w-full my-12 h-32 flex items-center justify-center text-gray-400">
        <div className="animate-pulse">Loading skills...</div>
      </div>
    );
  }

  return <MarqueeComponent {...props} />;
}
