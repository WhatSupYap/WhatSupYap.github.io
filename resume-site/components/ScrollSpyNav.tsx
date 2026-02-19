'use client';

import { useEffect, useState } from 'react';

interface NavItem {
    id: string;
    label: string;
}

interface Props {
    navItems: NavItem[];
}

export default function ScrollSpyNav({ navItems }: Props) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px', // Adjust trigger point
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
    }, [navItems]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80, // Offset for sticky header if any, or general padding
                behavior: 'smooth'
            });
            setActiveId(id);
        }
    };

    if (navItems.length === 0) return null;

    return (
        <nav className="hidden md:flex flex-col gap-2 mt-8 border-l border-neutral-200 dark:border-neutral-800 pl-4">
            {navItems.map((item) => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={`text-sm transition-colors duration-200 border-l-2 -ml-[17px] pl-4 py-1
                        ${activeId === item.id
                            ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-medium'
                            : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
                        }`}
                >
                    {item.label}
                </a>
            ))}
        </nav>
    );
}
