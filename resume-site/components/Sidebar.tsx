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
            <div className="md:sticky md:top-12 flex flex-col gap-12 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto hover-scrollbar pr-4">
                {items.map((item) => (
                    <div key={item.slug} className="flex flex-col gap-4">
                        {item.type === 'file' && item.contentHtml && (
                            <>
                                {item.data.image && (
                                    <div className="w-48 h-48 mb-6 rounded-full overflow-hidden border-2 border-neutral-100 dark:border-neutral-800 shrink-0 mx-auto md:mx-0">
                                        <img
                                            src={item.data.image}
                                            alt={item.data.title || "Profile"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}


                                {(item.data.name || item.data.name_en) && (
                                    <div className="mb-4 text-center md:text-left">
                                        {item.data.name && (
                                            <h1 className="text-3xl font-bold mb-1">{item.data.name}</h1>
                                        )}
                                        {item.data.name_en && (
                                            <h2 className="text-xl font-semibold text-neutral-500 dark:text-neutral-400 mt-0">
                                                {item.data.name_en}
                                            </h2>
                                        )}
                                    </div>
                                )}



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
        </aside >
    );
}
