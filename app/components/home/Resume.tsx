import { FaChartBar, FaPuzzlePiece, FaMousePointer, FaArrowRight } from "react-icons/fa";

const RESUME_ITEMS = [
    {
        icon: FaChartBar,
        children: "Bachelor of Science in Computer Science",
    },
    {
        icon: FaPuzzlePiece,
        children: "Certified Web Developer",
    },
    {
        icon: FaMousePointer,
        children: "Frontend Framework Proficiency Certification",
    },
];

function ResumeItem({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4">
      <span className="flex items-center justify-center h-12 w-12 rounded-xl bg-gray-100">
        <Icon className="h-6 w-6 text-gray-700" />
      </span>
            <span className="text-base font-medium text-gray-800">{children}</span>
        </div>
    );
}

export default function Resume() {
    return (
        <section className="px-8 py-24">
            <div className="container mx-auto grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
                <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-blue-gray-900">My Resume</h2>
                    <p className="mb-4 mt-3 w-9/12 font-normal text-gray-500">
                        Highly skilled and creative Web Developer with 5+ years of experience in crafting visually stunning and functionally robust websites and web applications.
                    </p>
                    <button
                        type="button"
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition"
                    >
                        view more
                        <FaArrowRight className="h-4 w-4 text-gray-900" />
                    </button>
                </div>
                <div className="grid gap-y-6 lg:ml-auto pr-0 lg:pr-12 xl:pr-32">
                    {RESUME_ITEMS.map((item, idx) => (
                        <ResumeItem key={idx} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}