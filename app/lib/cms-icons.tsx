import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Circle,
  Code,
  Database,
  Github,
  MessageSquare,
  Server,
  Share2,
  Wrench,
} from "lucide-react";

const projectIcons: Record<string, LucideIcon> = {
  Bot,
  Share2,
  MessageSquare,
  Github,
};

const skillIcons: Record<string, LucideIcon> = {
  Code,
  Server,
  Database,
  Wrench,
};

export function getProjectIcon(name: string, className?: string) {
  const Icon = projectIcons[name] ?? Circle;
  return <Icon className={className ?? "h-6 w-6"} />;
}

export function getSkillIcon(name: string, className?: string) {
  const Icon = skillIcons[name] ?? Circle;
  return <Icon className={className ?? "h-4 w-4"} />;
}
