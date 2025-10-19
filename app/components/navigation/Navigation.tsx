
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiscordStatus } from "@/components/navigation/DiscordStatus";
import { NowPlaying } from "@/components/navigation/NowPlaying";
import GlassSurface from "@/components/GlassSurface";

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
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl px-1 sm:px-2 lg:px-3">
      <GlassSurface
        width="100%"
        height={isMobileMenuOpen ? "auto" : "64px"}
        borderRadius={32}
        backgroundOpacity={0.1}
        blur={12}
        brightness={isScrolled ? 50 : 30}
        opacity={0.9}
        className="transition-all duration-300"
      >
  <div className="flex items-center justify-between py-3 px-0">
          {/* Left side - Discord Status as Logo */}
          <div className={`flex items-center absolute left-8 ${isMobileMenuOpen ? 'hidden md:block' : ''}`}>
            <DiscordStatus />
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                onClick={() => scrollToSection(item.href)}
                className="font-medium hover:bg-background/20 transition-colors duration-200"
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Right side - Now Playing and Mobile Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <NowPlaying />
            </div>
            <div className="md:hidden absolute right-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:bg-background/20 transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 px-0 border-t border-border/20">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="justify-start py-2 hover:bg-background/20 transition-colors duration-200"
                  onClick={() => scrollToSection(item.href)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </GlassSurface>
    </nav>
  );
};