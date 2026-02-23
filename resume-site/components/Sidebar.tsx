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
            <div className="md:sticky md:top-12 flex flex-col gap-6 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto hover-scrollbar pr-4">
                {items.map((item) => (
                    <div key={item.slug} className="flex flex-col gap-4">
                        {/* Profile & Contact Handling (Files) */}
                        {item.type === 'file' && item.slug.includes('profile') && item.contentHtml && (
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

                                {(item.data.github || item.data.email) && (
                                    <ContactSection
                                        github={item.data.github}
                                        email={item.data.email}
                                    />
                                )}
                            </>
                        )}

                        {/* Skills Section (File) - Show Description Only */}
                        {item.type === 'file' && item.slug.includes('skills') && (
                            <div className="mt-2">
                                <h3 className="text-lg font-bold border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-4 text-neutral-900 dark:text-neutral-100">
                                    Skills
                                </h3>
                                <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
                                    {item.data.description}
                                </div>
                            </div>
                        )}

                        {/* Education Section (Folder) */}
                        {item.type === 'folder' && item.slug.includes('education') && (
                            <div className="mt-2">
                                <h3 className="text-lg font-bold border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-4 text-neutral-900 dark:text-neutral-100">
                                    Education
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {item.items?.map((subItem) => (
                                        <div key={subItem.slug} className="text-sm">
                                            <h4 className="block font-medium text-neutral-800 dark:text-neutral-200">{subItem.data.title || subItem.name}</h4>
                                            {subItem.data.description && (
                                                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{subItem.data.description}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Certificate Section (Folder) */}
                        {item.type === 'folder' && item.slug.includes('certificate') && (
                            <div className="mt-2">
                                <h3 className="text-lg font-bold border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-4 text-neutral-900 dark:text-neutral-100">
                                    Certificate
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {item.items?.map((subItem) => (
                                        <div key={subItem.slug} className="text-sm">
                                            <h4 className="block font-medium text-neutral-800 dark:text-neutral-200">{subItem.data.title || subItem.name}</h4>
                                            {subItem.data.description && (
                                                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{subItem.data.description}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}


                <div className="text-xs text-neutral-400 mt-8">
                    © {new Date().getFullYear()} All rights reserved.
                </div>
            </div>
        </aside >
    );
}
