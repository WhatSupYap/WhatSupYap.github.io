import { getSectionData } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import PrintButton from '../PrintButton';

export default async function PrintPage() {
    const leftItems = await getSectionData('left');
    const rightItems = await getSectionData('right');

    const isAiOrInfra = (badge: string) => {
        const aiKeywords = ['python', 'fastapi', 'aws', 'docker', 'langgraph', 'rag', 'llm', 'sllm'];
        return aiKeywords.some(keyword => badge.toLowerCase().includes(keyword));
    };

    const isLegacy = (badge: string) => {
        const legacyKeywords = ['c#', 'asp.net', 'windows'];
        return legacyKeywords.some(keyword => badge.toLowerCase().includes(keyword));
    };

    const getPrintBadgeStyle = (badge: string) => {
        if (isAiOrInfra(badge)) return "bg-indigo-100 text-indigo-800 border border-indigo-200";
        if (isLegacy(badge)) return "bg-slate-200 text-slate-700 border border-slate-300";
        return "bg-blue-100 text-blue-800 border border-blue-200";
    };

    const profile = leftItems.find(item => item.slug.includes('profile'));
    const contact = leftItems.find(item => item.slug.includes('contact'));

    return (
        <div className="min-h-screen bg-white text-black font-sans box-border">
            <style>{`
                @page {
                    size: A4;
                    margin: 0;
                }
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .no-print,
                    .print-hidden,
                    button[aria-label="Toggle theme"],
                    button:has(svg.lucide-printer) {
                        display: none !important;
                    }
                }
                /* Hide Theme Toggle on Screen for this page too if desired, or just ensure it is hidden in print */
                /* For now, just print media as requested "in print page... visible again" implies during print or on the page itself? */
                /* User said "/print page... visible again". Let's hide it on the page entirely. */
                button[aria-label="Toggle theme"] {
                    display: none !important;
                }
            `}</style>

            <PrintButton />

            {/* A4 Page Container: Flex row for 2 columns */}
            <div className="w-[210mm] min-h-[297mm] mx-auto flex bg-white shadow-xl print:shadow-none print:w-full">

                {/* --- LEFT COLUMN (Dark Sidebar) --- */}
                <aside className="w-[30%] bg-slate-900 text-slate-100 p-6 flex flex-col gap-8 print:bg-slate-900 print:text-slate-100">

                    {/* Profile Image */}
                    {profile?.data.image && (
                        <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-slate-700">
                            <img
                                src={profile.data.image}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Contact Info */}
                    <div className="flex flex-col gap-4 text-sm">
                        <h3 className="text-lg font-bold border-b border-slate-700 pb-2 mb-2 text-white">Contact</h3>

                        {profile?.data.phone && (
                            <div className="break-all">
                                <span className="block text-xs text-slate-400 font-bold uppercase">Phone</span>
                                {profile.data.phone}
                            </div>
                        )}
                        {profile?.data.email && (
                            <div className="break-all">
                                <span className="block text-xs text-slate-400 font-bold uppercase">Email</span>
                                {profile.data.email}
                            </div>
                        )}
                        {profile?.data.github && (
                            <div className="break-all">
                                <span className="block text-xs text-slate-400 font-bold uppercase">GitHub</span>
                                <span className="text-[12px]">{profile.data.github}</span>
                            </div>
                        )}
                        {/* Add Address or other contact info here if available */}
                    </div>

                    {/* Education (From Left) */}
                    <div>
                        <h3 className="text-lg font-bold border-b border-slate-700 pb-2 mb-4 text-white">Education</h3>
                        <div className="flex flex-col gap-3">
                            {/* Check both file items and folder items in leftItems */}
                            {leftItems.find(item => item.slug.includes('education') && item.type === 'folder')?.items?.map((item) => (
                                <div key={item.slug} className="text-sm">
                                    <h4 className="block text-xs text-slate-400 font-bold uppercase">{item.data.title || item.name}</h4>
                                    {item.data.description && (
                                        <div className="text-[10px] text-slate-500 mt-0.5">{item.data.description}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills (from Left) */}
                    <div>
                        <h3 className="text-lg font-bold border-b border-slate-700 pb-2 mb-4 text-white">Skills</h3>
                        {leftItems.filter(item => item.slug.includes('skills')).map((item) => (
                            <div key={item.slug} className="mb-4 last:mb-0">
                                <div className="text-xs leading-normal text-slate-300 whitespace-pre-line">
                                    {item.data.description}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Certificate (From Left - After Skills) */}
                    <div>
                        <h3 className="text-lg font-bold border-b border-slate-700 pb-2 mb-4 text-white">Certificate</h3>
                        <div className="flex flex-col gap-3">
                            {leftItems.find(item => item.slug.includes('certificate') && item.type === 'folder')?.items?.map((item) => (
                                <div key={item.slug} className="text-sm">
                                    <h4 className="block text-xs text-slate-400 font-bold uppercase">{item.data.title || item.name}</h4>
                                    {item.data.description && (
                                        <div className="text-[10px] text-slate-500 mt-0.5">{item.data.description}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* --- RIGHT COLUMN (White Content) --- */}
                <main className="flex-1 bg-white p-6 pt-8 text-slate-800 print:bg-white print:text-black">

                    {/* Header Name/Role */}
                    <header className="mb-6">
                        <h1 className="text-4xl font-black mb-1 tracking-tight uppercase text-slate-900">
                            {profile?.data.name || 'Your Name'}
                        </h1>
                        <h2 className="text-lg text-slate-500 font-medium tracking-wide">
                            {profile?.data.name_en || 'POSITION / ROLE'}
                        </h2>
                    </header>

                    {/* Intro / Summary */}
                    {rightItems.filter(item => item.slug.includes('intro') && item.type !== 'folder').map((item) => (
                        <section key={item.slug} className="mb-6">
                            <h3 className="font-bold text-base text-slate-900 border-b-2 border-slate-200 pb-1 mb-2 uppercase tracking-wider">
                                {item.data.title || 'Summary'}
                            </h3>
                            <div className="text-justify text-slate-600 leading-normal text-xs whitespace-pre-line">
                                {item.data.description}
                            </div>
                        </section>
                    ))}
                    {/* Handle nested items if Intro is a folder */}
                    {rightItems.find(item => item.slug.includes('intro') && item.type === 'folder')?.items?.map((item) => (
                        <section key={item.slug} className="mb-6">
                            <h3 className="font-bold text-base text-slate-900 border-b-2 border-slate-200 pb-1 mb-2 uppercase tracking-wider">
                                {item.data.title || 'Summary'}
                            </h3>
                            <div className="text-justify text-slate-600 leading-normal text-xs whitespace-pre-line">
                                {item.data.description}
                            </div>
                        </section>
                    ))}

                    {/* Experience (Filtered: Recent 5 Years + Key Backend) */}
                    {rightItems.filter(item => item.slug.includes('experience')).map((item) => (
                        <section key={item.slug} className="mb-6">
                            <h3 className="font-bold text-base text-slate-900 border-b-2 border-slate-200 pb-1 mb-4 uppercase tracking-wider">
                                {item.data.title || 'Work Experience'}
                            </h3>
                            <div className="flex flex-col gap-4">
                                {item.items?.map((subItem) => (
                                    <div key={subItem.slug} className="break-inside-avoid relative pl-4 border-l-2 border-slate-200">
                                        {/* Timeline dot - Adjusted to -left-[7px] to align perfectly with left-2 border */}
                                        <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-slate-400 print:border-slate-500"></div>

                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                                                    {subItem.data.title || subItem.name}
                                                </h3>
                                                {subItem.data.company && (
                                                    <div className="text-xs font-semibold text-slate-700 mt-0.5">
                                                        {subItem.data.company}
                                                    </div>
                                                )}
                                            </div>
                                            {subItem.data.period && (
                                                <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 whitespace-nowrap ml-4">
                                                    {subItem.data.period}
                                                </span>
                                            )}
                                        </div>

                                        {/* Print Mode: Show Description only */}
                                        {subItem.data.description && (
                                            <div className="text-[10px] text-slate-500 mb-1 leading-snug mt-1">
                                                {subItem.data.description}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Portfolio / Projects (Filtered: Top 3 AI) */}
                    {rightItems.filter(item => item.slug.includes('portfolio')).map((item) => (
                        <section key={item.slug} className="mb-4">
                            <h3 className="font-bold text-base text-slate-900 border-b-2 border-slate-200 pb-1 mb-4 uppercase tracking-wider">
                                {item.data.title || 'Projects'}
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {item.items?.slice(0, 3).map((subItem) => ( // Top 3 only
                                    <div key={subItem.slug} className="break-inside-avoid border border-slate-100 p-2 rounded bg-slate-50/50">
                                        <div className="flex justify-between items-start mb-1 gap-2">
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm text-blue-900 mb-1">{subItem.data.title || subItem.name}</h4>
                                                {/* Badges */}
                                                <div className="flex flex-wrap gap-1">
                                                    {(subItem.data.badges as string[])?.slice(0, 4).map(badge => (
                                                        <span key={badge} className={`inline-block text-[8px] px-1.5 py-0.5 rounded ${getPrintBadgeStyle(badge)}`}>{badge}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Period */}
                                            {subItem.data.period && (
                                                <span className="text-[9px] font-mono text-slate-400 whitespace-nowrap shrink-0 mt-0.5">
                                                    {subItem.data.period}
                                                </span>
                                            )}
                                        </div>

                                        {/* Slogan if exists */}
                                        {subItem.data.slogan && (
                                            <div className="text-[10px] font-bold text-blue-800 mb-1">
                                                {subItem.data.slogan}
                                            </div>
                                        )}

                                        {subItem.data.description && (
                                            <div className="text-[10px] text-slate-600 leading-snug">
                                                {subItem.data.description}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Other Skills / Swing Dance Story */}
                    <section className="mt-6 pt-4 border-t border-slate-200">
                        <h3 className="font-bold text-xs text-slate-900 mb-1 uppercase tracking-wider">
                            Other Strengths
                        </h3>
                        <p className="text-[10px] text-slate-600 font-medium leading-snug">
                            "14년의 스윙댄스 파트너십 경험을 통해 배운 '유연한 소통'과 '배려'는, 개발팀 내 갈등을 중재하고 시너지를 이끌어내는 저만의 소프트 스킬입니다."
                        </p>
                    </section>

                </main>
            </div>
        </div>
    );
}
