"use client";

import Link from 'next/link';
import { Printer } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GlobalPrintButton() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render on print page or until mounted
    if (!mounted || pathname.startsWith('/print')) {
        return null;
    }

    return (
        <Link
            href="/print"
            target="_blank"
            className="p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all text-neutral-800 dark:text-neutral-200 print:hidden"
            aria-label="Print Resume"
            title="이력서 인쇄하기 (PDF)"
        >
            <Printer className="h-5 w-5" />
        </Link>
    );
}
