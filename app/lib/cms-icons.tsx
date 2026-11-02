import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Bike,
  Bot,
  Circle,
  Code,
  Database,
  Github,
  MessageSquare,
  Package,
  Scale,
  Server,
  Share2,
  ShoppingCart,
  Smartphone,
  Wrench,
} from "lucide-react";

const projectIcons: Record<string, LucideIcon> = {
  Bike,
  ShoppingCart,
  Bot,
  Share2,
  MessageSquare,
  Github,
  Scale,
  Package,
  BookOpen,
};

const skillIcons: Record<string, LucideIcon> = {
  Code,
  Server,
  Database,
  Wrench,
  Smartphone,
};

export function getProjectIcon(name: string, className?: string) {
  const Icon = projectIcons[name] ?? Circle;
  return <Icon className={className ?? "h-6 w-6"} />;
}

export function getSkillIcon(name: string, className?: string) {
  const Icon = skillIcons[name] ?? Circle;
  return <Icon className={className ?? "h-4 w-4"} />;
}
