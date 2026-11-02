import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MobileFrame } from "./MobileFrame";

/** Non-interactive phone used to compose supporting screenshots around a carousel. */
export const StaticPhone = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <MobileFrame className={className}>
    <AspectRatio ratio={9 / 19.5}>
      <Image src={src} alt={alt} fill sizes="12rem" quality={70} className="object-cover object-top" />
    </AspectRatio>
  </MobileFrame>
);
