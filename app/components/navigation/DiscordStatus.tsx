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
      const data = await res.json();
      setStatus(data.data.discord_status);
      setDevices({
        web: data.data.active_on_discord_web,
        desktop: data.data.active_on_discord_desktop,
        mobile: data.data.active_on_discord_mobile,
      });
    } catch (e) {
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

  // Calculate number of active device icons
  const activeDeviceCount = [devices.web, devices.desktop, devices.mobile].filter(Boolean).length;
  // Each icon is about 20px wide + 4px margin, so 24px per icon
  const iconOffset = -(activeDeviceCount * 24);

  return (
      <div 
        className="flex items-center space-x-1 relative min-w-[130px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DiscordLogo />
        {loading ? (
            <span className="text-xs text-muted-foreground ">Loading...</span>
        ) : (
            <>
              {status === "online" && showButton ? (
                // When online, show button on hover, otherwise toggle between status and button
                 (isHovered || !showStatus) ? (
                  <div className="ml-2">
                    <Button
                        asChild
                        className="bg-[#5865F2] text-white rounded-full shadow font-medium border-0 text-xs hover:bg-[#4752c4] transition h-2 px-2"
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
                ) : (
                  <>
                    <span
                      className={`w-2 h-2 rounded-full ${statusColor(status)} mr-1`}
                    />
                    <span className="text-xs capitalize">{status}</span>
                    {deviceIcons(devices.web, devices.desktop, devices.mobile)}
                  </>
                )
                ) : (
                  // For non-online status, always show status
                  <>
                    <span
                      className={`w-2 h-2 rounded-full ${statusColor(status)} mr-1`}
                    />
                    <span className="text-xs capitalize">{status}</span>
                    {deviceIcons(devices.web, devices.desktop, devices.mobile)}
                  </>
                )}
            </>
        )}
      </div>
  );
}
