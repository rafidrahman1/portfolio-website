export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                            404 - Page Not Found
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            The page you are looking for does not exist.
                        </p>
                    </div>
                </div>
            </main>
        </div>

    );
}
