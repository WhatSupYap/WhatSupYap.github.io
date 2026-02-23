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
                @page {
                    size: A4 landscape;
                    margin: 14mm 18mm;
                }
                @media print {
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    button[aria-label="Toggle theme"] { display: none !important; }
                    .page-break { break-after: page; }
                }
                button[aria-label="Toggle theme"] { display: none !important; }
            `}</style>

            <PrintButton />

            {/* 브라우저 미리보기: A4 landscape 컨테이너 목록 */}
            <div className="flex flex-col gap-12 py-8">
                {portfolioItems.map((item, idx) => (
                    <div
                        key={item.slug}
                        className={`w-[297mm] mx-auto bg-white shadow-xl print:shadow-none print:w-full print:mx-0 px-[18mm] py-[14mm] ${idx < portfolioItems.length - 1 ? 'page-break print:px-0 print:py-0' : ''}`}
                    >
                        {/* 각 페이지 헤더 (작게) */}
                        <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-6 text-[10px] text-slate-400">
                            <span className="font-semibold text-slate-700 tracking-wide uppercase text-[9px]">
                                {portfolioMeta.title || 'Portfolio'}
                            </span>
                            <span>
                                {profile?.data.name}
                                {profile?.data.email && ` · ${profile.data.email}`}
                            </span>
                        </div>

                        {/* 프로젝트 번호 + 제목 */}
                        <div className="mb-5">
                            <p className="text-[10px] font-mono text-slate-400 mb-1">
                                PROJECT {String(idx + 1).padStart(2, '0')} / {portfolioItems.length}
                            </p>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                                {item.data.title}
                            </h2>
                            {item.data.slogan && (
                                <p className="mt-1 text-sm text-slate-500 italic">&ldquo;{item.data.slogan}&rdquo;</p>
                            )}
                            <div className="flex items-center gap-3 mt-2">
                                {item.data.period && (
                                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                        {item.data.period}
                                    </span>
                                )}
                                {(item.data.badges as string[] | undefined)?.map((badge: string) => (
                                    <span key={badge} className="text-[10px] bg-slate-800 text-slate-200 px-2 py-0.5 rounded">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 본문: 썸네일(왼쪽) + 내용(오른쪽) — landscape 공간 활용 */}
                        <div className="flex gap-8">
                            {/* 썸네일 */}
                            {(item.data.thumbnail || item.data.image) && (
                                <div className="shrink-0 w-52">
                                    <img
                                        src={item.data.thumbnail || item.data.image}
                                        alt={item.data.title}
                                        className="w-full h-36 object-cover rounded-lg border border-slate-200"
                                    />
                                    {item.data.github && (
                                        <p className="mt-2 text-[9px] text-slate-400 font-mono break-all">
                                            🔗 {item.data.github.replace('https://', '')}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* 마크다운 내용 */}
                            <div
                                className="flex-1 text-[11px] leading-relaxed text-slate-700
                                    [&_h2]:text-sm [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-4 [&_h2]:mb-1.5 [&_h2]:first:mt-0
                                    [&_h1]:hidden
                                    [&_ul]:list-disc [&_ul]:ml-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-0.5
                                    [&_ol]:list-decimal [&_ol]:ml-4 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-0.5
                                    [&_li]:text-[10.5px] [&_li]:text-slate-600 [&_li]:leading-snug
                                    [&_blockquote]:hidden
                                    [&_p]:text-[10.5px] [&_p]:text-slate-600 [&_p]:mb-1
                                    [&_strong]:text-slate-900 [&_strong]:font-semibold"
                                dangerouslySetInnerHTML={{ __html: item.contentHtml || '' }}
                            />

                            {/* 썸네일 없는 경우 GitHub */}
                            {!item.data.thumbnail && !item.data.image && item.data.github && (
                                <div className="shrink-0 text-[9px] text-slate-400 font-mono mt-auto">
                                    🔗 {item.data.github.replace('https://', '')}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
