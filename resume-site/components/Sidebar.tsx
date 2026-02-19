import React from 'react';
import { MarkdownItem } from '@/lib/markdown';
import MarkdownRenderer from './MarkdownRenderer';
import ContactSection from './ContactSection';

interface Props {
    items: MarkdownItem[];
}

export default function Sidebar({ items }: Props) {
    return (
        <aside className="w-full md:w-[300px] shrink-0">
            <div className="md:sticky md:top-12 flex flex-col gap-12 max-h-[calc(100vh-6rem)] hover-scrollbar pr-4">
                {items.map((item) => (
                    <div key={item.slug} className="flex flex-col gap-4">
                        {item.type === 'file' && item.contentHtml && (
                            <>
                                <MarkdownRenderer contentHtml={item.contentHtml} />
                                {/* Check for contact info in frontmatter */}
                                {(item.data.github || item.data.email) && (
                                    <ContactSection
                                        github={item.data.github}
                                        email={item.data.email}
                                    />
                                )}
                            </>
                        )}
                        {/* If folder in sidebar, maybe just list links? 
                For now assuming sidebar is mostly profile/contact files.
            */}
                    </div>
                ))}

                <div className="text-xs text-neutral-400 mt-8">
                    © {new Date().getFullYear()} All rights reserved.
                </div>
            </div>
        </aside>
    );
}
