import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Navigation() {
    return (
        <nav className="w-full py-6 md:py-8 border-b border-neutral-100 dark:border-neutral-800 mb-8">
            <div className="max-w-7xl mx-auto px-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-medium">Back to Resume</span>
                </Link>
            </div>
        </nav>
    );
}
