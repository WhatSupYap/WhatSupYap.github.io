import { getSectionData, getAllPortfolioItems } from '@/lib/markdown';
import PrintButton from '../PrintButton';

export default async function PortfolioPrintPage() {
    const leftItems = await getSectionData('left');
    const profile = leftItems.find(item => item.slug.includes('profile'));

    const rightItems = await getSectionData('right');
    const portfolioFolder = rightItems.find(item => item.slug.includes('portfolio'));
    const portfolioMeta = portfolioFolder?.data ?? {};

    const portfolioItems = await getAllPortfolioItems();

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <style>{`
                @page { size: A4; margin: 10mm 14mm; }
                @media print {
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    button[aria-label="Toggle theme"] { display: none !important; }
                }
                button[aria-label="Toggle theme"] { display: none !important; }
            `}</style>

            <PrintButton />

            <div className="w-[210mm] mx-auto bg-white shadow-xl print:shadow-none print:w-full px-[14mm] py-[10mm]">

                {/* 헤더 */}
                <header className="border-b-2 border-slate-800 pb-3 mb-4">
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">
                        {portfolioMeta.title || '포트폴리오'}
                    </h1>
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
                    {portfolioMeta.description && (
                        <p className="mt-1 text-[11px] text-slate-500">{portfolioMeta.description}</p>
                    )}
                </header>

                {/* 프로젝트 그리드: 브라우저=1열, 인쇄=2열 */}
                <div className="grid grid-cols-1 print:grid-cols-2 gap-5 print:gap-3">
                    {portfolioItems.map((item, idx) => (
                        <section
                            key={item.slug}
                            className="break-inside-avoid border border-slate-200 rounded-lg overflow-hidden shadow-sm"
                        >
                            {/* 프로젝트 헤더 */}
                            <div className="bg-slate-800 text-white px-3 py-2.5 flex justify-between items-start gap-2">
                                <div className="min-w-0">
                                    <div className="text-[9px] text-slate-400 font-mono mb-0.5">
                                        PROJECT {String(idx + 1).padStart(2, '0')}
                                    </div>
                                    <h2 className="text-[12px] font-bold leading-tight">{item.data.title}</h2>
                                    {item.data.slogan && (
                                        <p className="text-[10px] text-slate-300 mt-0.5 italic truncate">
                                            &ldquo;{item.data.slogan}&rdquo;
                                        </p>
                                    )}
                                </div>
                                <div className="text-right shrink-0">
                                    {item.data.period && (
                                        <span className="text-[9px] font-mono text-slate-300 whitespace-nowrap block">
                                            {item.data.period}
                                        </span>
                                    )}
                                    <div className="flex flex-wrap gap-0.5 justify-end mt-1">
                                        {(item.data.badges as string[] | undefined)?.map((badge: string) => (
                                            <span key={badge} className="text-[7px] bg-slate-600 text-slate-200 px-1 py-0.5 rounded">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 프로젝트 내용 */}
                            <div className="p-3 flex gap-3">
                                {/* 썸네일: 브라우저에서만 표시, 인쇄 시 숨김(2열에서 너비 부족) */}
                                {(item.data.thumbnail || item.data.image) && (
                                    <div className="shrink-0 print:hidden">
                                        <img
                                            src={item.data.thumbnail || item.data.image}
                                            alt={item.data.title}
                                            className="w-24 h-16 object-cover rounded border border-slate-200"
                                        />
                                    </div>
                                )}
                                <div
                                    className="flex-1 text-[10px] leading-snug text-slate-700
                                        [&_h2]:text-[10px] [&_h2]:font-bold [&_h2]:text-slate-800 [&_h2]:mt-2.5 [&_h2]:mb-0.5 [&_h2]:first:mt-0
                                        [&_h1]:hidden
                                        [&_ul]:list-disc [&_ul]:ml-3 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-0
                                        [&_ol]:list-decimal [&_ol]:ml-3 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-0
                                        [&_li]:text-[9.5px] [&_li]:text-slate-600 [&_li]:leading-snug
                                        [&_blockquote]:hidden
                                        [&_p]:text-[9.5px] [&_p]:text-slate-600 [&_p]:mb-0.5
                                        [&_strong]:text-slate-800 [&_strong]:font-semibold"
                                    dangerouslySetInnerHTML={{ __html: item.contentHtml || '' }}
                                />
                            </div>

                            {/* GitHub 링크 */}
                            {item.data.github && (
                                <div className="px-3 pb-2 border-t border-slate-100 pt-1">
                                    <span className="text-[8px] text-slate-400 font-mono">
                                        🔗 {item.data.github.replace('https://', '')}
                                    </span>
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {/* 푸터 */}
                <footer className="mt-6 pt-3 border-t border-slate-200 text-center text-[9px] text-slate-400">
                    {[
                        profile?.data.name,
                        profile?.data.email,
                        profile?.data.phone,
                        profile?.data.github,
                    ].filter(Boolean).join(' | ')}
                </footer>
            </div>
        </div>
    );
}
