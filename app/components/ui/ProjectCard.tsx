import Image from "next/image";

interface ProjectCardProps {
    img: string;
    title: string;
    desc: string;
}

export function ProjectCard({ img, title, desc }: ProjectCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="h-48 w-full relative mb-6">
                <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <div className="flex-1 flex flex-col px-4">
                <a
                    href="#"
                    className="text-blue-900 hover:text-gray-800 transition-colors font-semibold text-lg mb-2"
                >
                    {title}
                </a>
                <p className="mb-6 text-gray-500 font-normal">{desc}</p>
                <button
                    type="button"
                    className="self-start px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition hover:bg-gray-300"
                >
                    See details
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;
