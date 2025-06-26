import React, { useEffect, useState } from 'react';
import { Monitor, Smartphone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Inline SVG for Discord logo
const DiscordLogo = () => (
  <svg
    className="w-4 h-4 text-[#5865F2]"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.07.07 0 00-.073.035c-.211.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.164-.393-.405-.874-.617-1.249a.07.07 0 00-.073-.035A19.736 19.736 0 003.677 4.369a.064.064 0 00-.03.027C.533 9.09-.32 13.579.099 18.021a.08.08 0 00.031.056c2.052 1.507 4.041 2.422 5.992 3.029a.077.077 0 00.084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 00-.041-.104c-.652-.247-1.27-.549-1.872-.892a.077.077 0 01-.008-.127c.126-.094.252-.192.371-.291a.074.074 0 01.077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.245.198.372.292a.077.077 0 01-.006.127 12.298 12.298 0 01-1.873.891.076.076 0 00-.04.105c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028c1.961-.607 3.95-1.522 6.002-3.029a.077.077 0 00.031-.055c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 00-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.095 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.095 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z" />
  </svg>
);

export function DiscordStatus() {
  const statusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  // Show all active device icons (mobile, desktop, web)
  const deviceIcons = (web: boolean, desktop: boolean, mobile: boolean) => {
    const icons = [];
    if (mobile) icons.push(<span key="mobile" title="Mobile"><Smartphone className="w-4 h-4"/></span>);
    if (desktop) icons.push(<span key="desktop" title="Desktop"><Monitor className="w-4 h-4"/></span>);
    if (web) icons.push(<span key="web" title="Web"><Globe className="w-4 h-4"/></span>);
    if (icons.length === 0) icons.push(<span key="offline" title="Offline"></span>);
    return <span className="flex items-center space-x-1">{icons}</span>;
  };

  const [status, setStatus] = useState('offline');
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState({
    web: false,
    desktop: false,
    mobile: false,
  });
  const [showButton, setShowButton] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await fetch('https://api.lanyard.rest/v1/users/617332157613998091');
      const data = await res.json();
      setStatus(data.data.discord_status);
      setDevices({
        web: data.data.active_on_discord_web,
        desktop: data.data.active_on_discord_desktop,
        mobile: data.data.active_on_discord_mobile,
      });
    } catch (e) {
      setStatus('offline');
      setDevices({web: false, desktop: false, mobile: false});
    } finally {
      setLoading(false);
    }
  };

  // Handle popping animation for the button
  useEffect(() => {
    if (status === 'online') {
      // Delay to allow for pop-in animation
      setTimeout(() => setShowButton(true), 100);
    } else {
      setShowButton(false);
    }
  }, [status]);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-1 relative">
      <DiscordLogo />
      <span className={`w-3 h-3 rounded-full ${statusColor(status)} transition-colors`}/>
      {loading ? (
        <span className="text-sm">Loading...</span>
      ) : (
        <>
          {deviceIcons(devices.web, devices.desktop, devices.mobile)}
          <span className="text-sm capitalize">{status}</span>
        </>
      )}

      {/* Animated pop-out button */}
      <div
        className={`
          absolute left-full ml-4
          transition-all duration-500
          ${showButton
            ? 'opacity-100 scale-100 translate-x-0'
            : 'opacity-0 scale-90 -translate-x-8 pointer-events-none'
          }
        `}
        style={{ willChange: "transform, opacity" }}
      >
        <Button
          asChild
          className="bg-[#5865F2] text-white px-4 py-2 rounded-lg shadow-lg font-semibold border-0"
        >
          <a
            href="https://discord.com/users/617332157613998091"
            target="_blank"
            rel="noopener noreferrer"
          >
            Message Me
          </a>
        </Button>
      </div>
    </div>
  );
}
