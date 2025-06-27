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

  // Calculate number of active device icons
  const activeDeviceCount = [devices.web, devices.desktop, devices.mobile].filter(Boolean).length;
  // Each icon is about 20px wide + 4px margin, so 24px per icon
  const iconOffset = -(activeDeviceCount * 24);

  return (
      <div className="flex items-center space-x-1 relative min-w-[130px]">
        <DiscordLogo />
        <span
            className={`w-3 h-3 rounded-full ${statusColor(
                status
            )} transition-colors`}
        />
        {loading ? (
            <span className="text-xs text-muted-foreground ">Loading...</span>
        ) : (
            <>
              <span className="text-xs capitalize">{status}</span>
              {/* Always show device icons inline with status text */}
              {deviceIcons(devices.web, devices.desktop, devices.mobile)}
            </>
        )}
        {/* Show the button to the right of the icons when online */}
        {showButton && (
          <div className="ml-2">
            <Button
                asChild
                className="bg-[#5865F2] text-white rounded-full shadow font-medium border-0 text-xs hover:bg-[#4752c4] transition"
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
        )}
      </div>
  );
}
