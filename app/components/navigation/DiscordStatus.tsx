import React, { useEffect, useState } from "react";
import { Monitor, Smartphone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiscordLogo } from "./DiscordLogo";

export function DiscordStatus() {
  const statusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "idle":
        return "bg-yellow-500";
      case "dnd":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const deviceIcons = (web: boolean, desktop: boolean, mobile: boolean) => {
    const icons = [];
    if (mobile)
      icons.push(
          <span key="mobile" title="Mobile">
          <Smartphone className="w-4 h-4" />
        </span>
      );
    if (desktop)
      icons.push(
          <span key="desktop" title="Desktop">
          <Monitor className="w-4 h-4" />
        </span>
      );
    if (web)
      icons.push(
          <span key="web" title="Web">
          <Globe className="w-4 h-4" />
        </span>
      );
    if (icons.length === 0)
      icons.push(<span key="offline" title="Offline"></span>);
    return <span className="flex items-center space-x-1">{icons}</span>;
  };

  const renderMessageButton = () => (
    <div className="ml-2">
      <Button
        asChild
        className="bg-transparent border border-white text-white rounded-full shadow font-medium text-xs hover:bg-[#4752c4] transition h-2 px-2"
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
  );

  const renderStatusDisplay = () => (
    <>
      <span
        className={`w-2 h-2 rounded-full ${statusColor(status)} mr-1`}
      />
      <span className="text-xs capitalize">{status}</span>
      {deviceIcons(devices.web, devices.desktop, devices.mobile)}
    </>
  );

  const renderOnlineContent = () => {
    const shouldShowButton = isHovered || !showStatus;
    return shouldShowButton ? renderMessageButton() : renderStatusDisplay();
  };

  const renderContent = () => {
    if (loading) {
      return <span className="text-xs text-muted-foreground">Loading...</span>;
    }

    if (status === "online" && showButton) {
      return renderOnlineContent();
    }

    return renderStatusDisplay();
  };

  const [status, setStatus] = useState("offline");
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState({
    web: false,
    desktop: false,
    mobile: false,
  });
  const [showButton, setShowButton] = useState(false);
  const [showStatus, setShowStatus] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await fetch(
          "https://api.lanyard.rest/v1/users/617332157613998091"
      );
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(`API error: ${data.error?.message || 'Unknown API error'}`);
      }
      
      setStatus(data.data.discord_status);
      setDevices({
        web: data.data.active_on_discord_web,
        desktop: data.data.active_on_discord_desktop,
        mobile: data.data.active_on_discord_mobile,
      });
    } catch (error) {
      // Log the error for debugging
      console.warn('Failed to fetch Discord status:', error);
      
      // Set offline status as fallback
      setStatus("offline");
      setDevices({ web: false, desktop: false, mobile: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "online") {
      setShowButton(true);
      // Toggle between status and button every 5 seconds
      const toggleInterval = setInterval(() => {
        setShowStatus(prev => !prev);
      }, 5000);
      
      return () => clearInterval(toggleInterval);
    } else {
      setShowButton(false);
      setShowStatus(true);
    }
  }, [status]);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, []);



  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsHovered(!isHovered);
    }
  };

  return (
      <button 
        className="flex items-center space-x-1 relative min-w-[130px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md bg-transparent border-none p-0"
        aria-label={`Discord status: ${status}. ${isHovered ? 'Click to show status' : 'Click to show message button'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={handleKeyDown}
        onClick={() => setIsHovered(!isHovered)}
      >
        <DiscordLogo />
        {renderContent()}
      </button>
  );
}
