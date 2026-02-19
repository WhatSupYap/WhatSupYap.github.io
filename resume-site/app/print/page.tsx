import { getSectionData } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import PrintButton from './PrintButton';

export default async function PrintPage() {
    const leftItems = await getSectionData('left');
    const rightItems = await getSectionData('right');

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
                    .no-print {
                        display: none !important;
                    }
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
                                {profile.data.github}
                            </div>
                        )}
                        {/* Add Address or other contact info here if available */}
                    </div>

                    {/* Education (Moved to Left) */}
                    <div>
                        <h3 className="text-lg font-bold border-b border-slate-700 pb-2 mb-4 text-white">Education</h3>
                        <div className="flex flex-col gap-6">
                            {rightItems.filter(item => item.slug.includes('education')).map((item) => (
                                <div key={item.slug} className="text-sm">
                                    <h4 className="font-bold text-white mb-1">{item.data.title || item.name}</h4>
                                    <div className="prose prose-sm prose-invert max-w-none text-xs leading-snug text-slate-300">
                                        <MarkdownRenderer contentHtml={item.contentHtml || ''} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills (from Left) */}
                    <div>
                        <h3 className="text-lg font-bold border-b border-slate-700 pb-2 mb-4 text-white">Skills</h3>
                        {leftItems.filter(item => !item.slug.includes('profile') && !item.slug.includes('contact')).map((item) => (
                            <div key={item.slug} className="mb-4 last:mb-0">
                                <div className="prose prose-sm prose-invert max-w-none text-xs leading-normal text-slate-300">
                                    <MarkdownRenderer contentHtml={item.contentHtml || ''} />
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* --- RIGHT COLUMN (White Content) --- */}
                <main className="flex-1 bg-white p-8 pt-12 text-slate-800 print:bg-white print:text-black">

                    {/* Header Name/Role */}
                    <header className="mb-10">
                        <h1 className="text-5xl font-black mb-2 tracking-tight uppercase text-slate-900">
                            {profile?.data.name || 'Your Name'}
                        </h1>
                        <h2 className="text-2xl text-slate-500 font-medium tracking-wide">
                            {profile?.data.name_en || 'POSITION / ROLE'}
                        </h2>
                        <div className="mt-4 text-sm text-slate-500 max-w-lg">
                            {/* Optional short tagline if exists */}
                        </div>
                    </header>

                    {/* Intro / Summary */}
                    {rightItems.filter(item => item.slug.includes('intro')).map((item) => (
                        <section key={item.slug} className="mb-10">
                            <h3 className="font-bold text-xl text-slate-900 border-b-2 border-slate-200 pb-2 mb-4 uppercase tracking-wider">
                                {item.data.title || 'Summary'}
                            </h3>
                            <div className="prose prose-sm prose-neutral max-w-none text-justify text-slate-600 leading-relaxed">
                                <MarkdownRenderer contentHtml={item.contentHtml || ''} />
                            </div>
                        </section>
                    ))}

                    {/* Experience (Detailed) */}
                    {rightItems.filter(item => item.slug.includes('experience')).map((item) => (
                        <section key={item.slug} className="mb-10">
                            <h3 className="font-bold text-xl text-slate-900 border-b-2 border-slate-200 pb-2 mb-6 uppercase tracking-wider">
                                {item.data.title || 'Work Experience'}
                            </h3>
                            <div className="flex flex-col gap-8">
                                {item.items?.map((subItem) => (
                                    <div key={subItem.slug} className="break-inside-avoid relative pl-4 border-l-2 border-slate-200">
                                        {/* Timeline dot */}
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-slate-300 print:border-slate-400"></div>

                                        <div className="flex justify-between items-baseline mb-2">
                                            <h4 className="font-bold text-lg text-slate-800">{subItem.data.title || subItem.name}</h4>
                                            {subItem.data.period && (
                                                <span className="text-xs font-bold text-slate-500 whitespace-nowrap bg-slate-100 px-2 py-1 rounded">
                                                    {subItem.data.period}
                                                </span>
                                            )}
                                        </div>

                                        {subItem.data.description && (
                                            <div className="text-sm font-medium text-slate-600 mb-2 block">
                                                {subItem.data.description}
                                            </div>
                                        )}

                                        {/* Print Mode: Show Summary only, hide detailed contentHtml */}
                                        {subItem.data.summary && (
                                            <div className="text-xs text-slate-500 mb-2 leading-relaxed">
                                                {subItem.data.summary}
                                            </div>
                                        )}

                                        {/* 
                                            We hide the full contentHtml in print to keep it as a summary. 
                                            If you want full content, uncomment the below or add a condition.
                                        */}
                                        {/* <div className="prose prose-sm prose-neutral max-w-none text-sm leading-relaxed text-justify text-slate-600">
                                            <MarkdownRenderer contentHtml={subItem.contentHtml || ''} />
                                        </div> */}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Portfolio / Projects (Compact) */}
                    {rightItems.filter(item => item.slug.includes('portfolio')).map((item) => (
                        <section key={item.slug} className="mb-6">
                            <h3 className="font-bold text-xl text-slate-900 border-b-2 border-slate-200 pb-2 mb-6 uppercase tracking-wider">
                                {item.data.title || 'Projects'}
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {item.items?.map((subItem) => (
                                    <div key={subItem.slug} className="break-inside-avoid">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-base text-slate-800">{subItem.data.title || subItem.name}</h4>
                                            {subItem.data.period && (
                                                <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                                                    {subItem.data.period}
                                                </span>
                                            )}
                                        </div>
                                        {subItem.data.description && (
                                            <div className="text-xs text-slate-600">
                                                {subItem.data.description}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                </main>
            </div>
        </div>
    );
}
