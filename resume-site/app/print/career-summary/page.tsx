import { getSectionData, getAllExperienceItems } from '@/lib/markdown';
import PrintButton from '../PrintButton';

/** contentHtml에서 h4 (프로젝트 단위) 개수 계산 */
function countProjects(html: string): number {
    return (html.match(/<h4/g) ?? []).length;
}

export default async function CareerSummaryPrintPage() {
    const leftItems = await getSectionData('left');
    const profile = leftItems.find(item => item.slug.includes('profile'));

    const rightItems = await getSectionData('right');
    const experienceFolder = rightItems.find(item => item.slug.includes('experience'));
    const experienceMeta = experienceFolder?.data ?? {};
    const experienceItems = await getAllExperienceItems();

    // 전체 프로젝트 수 집계
    const totalProjects = experienceItems.reduce(
        (sum, item) => sum + countProjects(item.contentHtml || ''),
        0
    );

    return (
        <div className="font-sans">

            <PrintButton />

            <div className="w-[210mm] mx-auto bg-white shadow-xl print:shadow-none print:w-full px-[18mm] py-[12mm]">

                {/* 헤더 */}
                <header className="border-b-2 border-slate-800 pb-4 mb-6">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">경력기술서 (요약)</h1>
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

                    {/* 경력 요약 바 */}
                    <p className="mt-3 text-[10px] text-slate-500 bg-slate-50 px-3 py-1.5 rounded leading-5">
                        {[
                            experienceMeta.summary_years && `총 경력 ${experienceMeta.summary_years}`,
                            `${experienceItems.length}개사 재직`,
                            `${totalProjects}개 프로젝트 수행`,
                            experienceMeta.summary_skills && `주요기술: ${experienceMeta.summary_skills}`,
                        ].filter(Boolean).join('  ·  ')}
                    </p>
                </header>

                {/* 경력 항목 — 상세 페이지와 동일한 스타일, 내용만 요약 */}
                <div className="flex flex-col gap-6">
                    {experienceItems.map((item) => {
                        const projectCount = countProjects(item.contentHtml || '');
                        return (
                            <section key={item.slug} className="break-inside-avoid-page">
                                {/* 회사 헤더 */}
                                <div className="flex justify-between items-start mb-2 border-l-4 border-slate-800 pl-3">
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

                                {/* 주요 업무 요약 (description 프론트매터) */}
                                {item.data.description && (
                                    <p className="text-[11px] text-slate-700 leading-relaxed ml-3 mt-1">
                                        {item.data.description}
                                    </p>
                                )}

                                {/* 프로젝트 수 뱃지 */}
                                {projectCount > 0 && (
                                    <p className="ml-3 mt-1.5 text-[10px] text-slate-400">
                                        총 {projectCount}개 프로젝트 수행
                                    </p>
                                )}
                            </section>
                        );
                    })}
                </div>

                {/* 상세 경력기술서 안내 */}
                <p className="mt-8 text-[10px] text-slate-400 text-center border-t border-slate-100 pt-4">
                    상세 경력기술서 →{' '}
                    {profile?.data.github
                        ? `${profile.data.github.replace('https://', '')}/print/career`
                        : '/print/career'}
                </p>

                <footer className="mt-3 text-center text-[10px] text-slate-400">
                    {[profile?.data.name, profile?.data.email, profile?.data.phone].filter(Boolean).join(' | ')}
                </footer>
            </div>
        </div>
    );
}
