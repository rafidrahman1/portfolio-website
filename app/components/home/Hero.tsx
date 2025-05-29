import Image from "next/image";

export default function Hero() {
    return (
        <header className="bg-white p-8">
            <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
                <div className="row-start-2 lg:row-auto">
                    <h1 className="mb-4 text-3xl lg:text-5xl font-bold text-blue-gray-900 leading-tight">
                        Welcome to my Web <br /> Development Portfolio!
                    </h1>
                    <p className="mb-4 text-gray-500 md:pr-16 xl:pr-28">
                        Hi, I&apos;m Rafid — a fullstack developer passionate about building clean, user-focused web experiences.
                        I specialize in modern frameworks like Next.js, love experimenting with AI integrations,
                        and enjoy crafting thoughtful UI with solid backend logic. Currently leveling up in Meta
                        Graph API and AI agent workflows. Let&apos;s build something awesome together.
                    </p>
                    <div className="grid">
                        <label className="mb-2 text-gray-900 font-medium" htmlFor="email">
                            Your email
                        </label>
                        <div className="mb-2 flex w-full flex-col gap-4 md:w-10/12 md:flex-row">
                            <input
                                id="email"
                                type="email"
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                placeholder="Enter your email"
                            />
                            <button
                                type="button"
                                className="w-full md:w-[12rem] px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition"
                            >
                                Require offer
                            </button>
                        </div>
                    </div>
                    <p className="text-sm font-normal text-gray-500">
                        Read my{" "}
                        <a href="#" className="font-medium underline transition-colors hover:text-blue-700">
                            Terms and Conditions
                        </a>
                    </p>
                </div>
                <Image
                    width={1024}
                    height={1024}
                    alt="team work"
                    src="/images/profile.jpg"
                    className="h-[36rem] w-full rounded-xl object-cover"
                    priority
                />
            </div>
        </header>
    );
}
