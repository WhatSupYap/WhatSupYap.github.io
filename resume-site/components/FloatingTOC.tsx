'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface NavItem {
    id: string;
    label: string;
}

interface Props {
    navItems: NavItem[];
    basePath?: string; // e.g. "/" for home page links
}

export default function FloatingTOC({ navItems, basePath = '' }: Props) {
    const [activeId, setActiveId] = useState<string>('');
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    useEffect(() => {
        // Only run intersection observer on home page where elements exist
        if (!isHomePage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px',
                threshold: 0
            }
        );

        navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [navItems, isHomePage]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        // If we are on the home page and element exists, smooth scroll
        if (isHomePage) {
            const element = document.getElementById(id);
            if (element) {
                e.preventDefault();
                window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                });
                setActiveId(id);
            }
        }
        // Otherwise, let default navigation happen (to /#id)
    };

    if (navItems.length === 0) return null;

    return (
        <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-end gap-2">
            {navItems.map((item) => (
                <a
                    key={item.id}
                    href={`${basePath}#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={`
                        transition-all duration-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm shadow-sm border
                        ${activeId === item.id
                            ? 'bg-neutral-900/90 text-white border-neutral-900 dark:bg-white/90 dark:text-neutral-900 dark:border-white translate-x-0'
                            : 'bg-white/80 text-neutral-500 border-neutral-200 dark:bg-neutral-900/80 dark:text-neutral-400 dark:border-neutral-800 hover:bg-white dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-200'
                        }
                    `}
                >
                    {item.label}
                </a>
            ))}
        </nav>
    );
}
