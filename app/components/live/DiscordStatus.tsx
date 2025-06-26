import React, { useEffect, useState } from "react";
import { Monitor, Smartphone, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

// Discord Logo SVG
const DiscordLogo = () => (
  <svg
    className="w-5 h-5 text-[#5865F2] mr-1"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.07.07 0 00-.073.035c-.211.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.164-.393-.405-.874-.617-1.249a.07.07 0 00-.073-.035A19.736 19.736 0 003.677 4.369a.064.064 0 00-.03.027C.533 9.09-.32 13.579.099 18.021a.08.08 0 00.031.056c2.052 1.507 4.041 2.422 5.992 3.029a.077.077 0 00.084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 00-.041-.104c-.652-.247-1.27-.549-1.872-.892a.077.077 0 01-.008-.127c.126-.094.252-.192.371-.291a.074.074 0 01.077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.245.198.372.292a.077.077 0 01-.006.127 12.298 12.298 0 01-1.873.891.076.076 0 00-.04.105c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028c1.961-.607 3.95-1.522 6.002-3.029a.077.077 0 00.031-.055c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 00-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.095 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.095 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z" />
  </svg>
);

// Discord Status Component
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

  // Show all active device icons (mobile, desktop, web)
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

  // Handle popping animation for the button
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
          {deviceIcons(devices.web, devices.desktop, devices.mobile)}
          <span className="text-xs capitalize">{status}</span>
        </>
      )}

      {/* Animated pop-out button */}
      <div
        className={`
          absolute left-full ml-2
          transition-all duration-500
          ${showButton
            ? "opacity-100 scale-100 -translate-x-4"
            : "opacity-0 scale-90 -translate-x-8 pointer-events-none"
          }
        `}
        style={{ willChange: "transform, opacity" }}
      >
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
    </div>
  );
}

// Navigation Component
export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Left: Logo/DiscordStatus */}
          <div className="flex items-center space-x-3">
            <DiscordStatus />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-sm text-foreground hover:text-primary transition-colors duration-200 font-medium px-1"
              >
                {item.label}
              </button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};