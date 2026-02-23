import { getSectionData, getAllExperienceItems } from '@/lib/markdown';
import PrintButton from '../PrintButton';

export default async function CareerPrintPage() {
    // 개인정보: profile.md 에서 읽기 (단일 소스)
    const leftItems = await getSectionData('left');
    const profile = leftItems.find(item => item.slug.includes('profile'));

    // 경력 목록과 요약: experience/index.md + 각 경력 파일
    const rightItems = await getSectionData('right');
    const experienceFolder = rightItems.find(item => item.slug.includes('experience'));
    const experienceMeta = experienceFolder?.data ?? {};
    const experienceItems = await getAllExperienceItems();

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <style>{`
                @page { size: A4; margin: 12mm 18mm; }
                @media print {
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    button[aria-label="Toggle theme"] { display: none !important; }
                }
                button[aria-label="Toggle theme"] { display: none !important; }
            `}</style>

            <PrintButton />

            <div className="w-[210mm] mx-auto bg-white shadow-xl print:shadow-none print:w-full px-[18mm] py-[12mm]">

                {/* 헤더: profile.md 에서 읽기 */}
                <header className="border-b-2 border-slate-800 pb-4 mb-6">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">경력기술서</h1>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-slate-600">
                        {profile?.data.name && (
                            <span className="font-semibold">
                                {profile.data.name}
                                {profile.data.name_en && ` (${profile.data.name_en})`}
                            </span>
                        )}
                        {profile?.data.email && <span>{profile.data.email}</span>}
                        {profile?.data.phone && <span>{profile.data.phone}</span>}
                    </div>

                    {/* 경력 요약: experience/index.md 에서 읽기 */}
                    {(experienceMeta.summary_years || experienceMeta.summary_projects) && (
                        <p className="mt-3 text-[10px] text-slate-500 bg-slate-50 px-3 py-1.5 rounded leading-5">
                            {[
                                experienceMeta.summary_years && `총 경력 ${experienceMeta.summary_years}`,
                                experienceMeta.summary_companies,
                                experienceMeta.summary_projects,
                                experienceMeta.summary_skills && `주요기술: ${experienceMeta.summary_skills}`,
                            ].filter(Boolean).join('  ·  ')}
                        </p>
                    )}
                </header>

                {/* 경력 항목 */}
                <div className="flex flex-col gap-8">
                    {experienceItems.map((item) => (
                        <section key={item.slug} className="break-inside-avoid-page">
                            <div className="flex justify-between items-start mb-3 border-l-4 border-slate-800 pl-3">
                                <div>
                                    <h2 className="text-base font-bold text-slate-900">
                                        {item.data.company || item.data.title}
                                    </h2>
                                    {item.data.company && (
                                        <p className="text-sm print:text-xs text-slate-600">{item.data.title}</p>
                                    )}
                                </div>
                                {item.data.period && (
                                    <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded whitespace-nowrap shrink-0 ml-4">
                                        {item.data.period}
                                    </span>
                                )}
                            </div>
                            <div
                                className="text-[11px] leading-snug text-slate-700
                                    [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-4 [&_h3]:mb-1
                                    [&_h4]:text-[11px] [&_h4]:font-semibold [&_h4]:text-slate-700 [&_h4]:mt-3 [&_h4]:mb-1 [&_h4]:border-b [&_h4]:border-slate-200 [&_h4]:pb-0.5
                                    [&_h2]:text-sm [&_h2]:font-bold [&_h2]:text-slate-800 [&_h2]:mt-4 [&_h2]:mb-1
                                    [&_ul]:list-none [&_ul]:ml-0 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-0.5
                                    [&_li]:text-[10.5px] [&_li]:text-slate-600 [&_li]:leading-snug
                                    [&_hr]:hidden
                                    [&_p]:text-[10.5px] [&_p]:text-slate-600
                                    [&_strong]:text-slate-800 [&_strong]:font-semibold"
                                dangerouslySetInnerHTML={{ __html: item.contentHtml || '' }}
                            />
                        </section>
                    ))}
                </div>

                {/* 푸터: profile.md 에서 읽기 */}
                <footer className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
                    {[profile?.data.name, profile?.data.email, profile?.data.phone]
                        .filter(Boolean).join(' | ')}
                </footer>
            </div>
        </div>
    );
}
