export const HeroBackground = () => (
    <>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse"></div>
        </div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float hidden sm:block"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float-delayed hidden sm:block"></div>
    </>
);
