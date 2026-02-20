import Link from 'next/link';
import { ArrowLeft, Grid } from 'lucide-react';

interface Props {
    viewAllHref?: string;
    viewAllLabel?: string;
    maxWidthClass?: string;
}

export default function Navigation({
    viewAllHref,
    viewAllLabel = 'View All',
    maxWidthClass = 'max-w-7xl'
}: Props) {
    return (
        <nav className="w-full py-6 md:py-8 border-b border-neutral-100 dark:border-neutral-800 mb-8">
            <div className={`${maxWidthClass} mx-auto px-6 flex items-center justify-between`}>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-medium">Back to Resume</span>
                </Link>

                {viewAllHref && (
                    <Link
                        href={viewAllHref}
                        className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        <Grid className="w-4 h-4" />
                        <span className="font-medium">{viewAllLabel}</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}
