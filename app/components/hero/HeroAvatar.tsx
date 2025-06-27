import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const HeroAvatar = () => (
    <div className="flex justify-center mt-12 mb-2 sm:mb-4">
        <Avatar className="w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 ring-4 ring-primary/20 shadow-2xl hover:scale-105 transition-all duration-500 hover:ring-primary/40">
            <AvatarImage
                src="https://lh3.googleusercontent.com/a/ACg8ocKD9J1t89kCMvX4aD1tzyVfXmilQnwaiwVHVJfP2aIjZOUN-44dDw=s288-c-no"
                alt="Rafid Rahman"
                className="object-cover"
            />
            <AvatarFallback className="text-lg xs:text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                RR
            </AvatarFallback>
        </Avatar>
    </div>
);
