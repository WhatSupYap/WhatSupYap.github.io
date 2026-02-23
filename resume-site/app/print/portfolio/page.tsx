import { getSectionData, getAllPortfolioItems } from '@/lib/markdown';
import PrintButton from '../PrintButton';

export default async function PortfolioPrintPage() {
    // 개인정보: profile.md 에서 읽기 (단일 소스)
    const leftItems = await getSectionData('left');
    const profile = leftItems.find(item => item.slug.includes('profile'));

    // 포트폴리오 메타: portfolio/index.md 에서 읽기
    const rightItems = await getSectionData('right');
    const portfolioFolder = rightItems.find(item => item.slug.includes('portfolio'));
    const portfolioMeta = portfolioFolder?.data ?? {};

    // 포트폴리오 항목
    const portfolioItems = await getAllPortfolioItems();

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

                {/* 헤더: profile.md + portfolio/index.md 에서 읽기 */}
                <header className="border-b-2 border-slate-800 pb-4 mb-6">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
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
                        <p className="mt-2 text-xs text-slate-500">{portfolioMeta.description}</p>
                    )}
                </header>

                {/* 포트폴리오 항목 */}
                <div className="flex flex-col gap-8">
                    {portfolioItems.map((item, idx) => (
                        <section key={item.slug} className="break-inside-avoid border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                            {/* 프로젝트 헤더 */}
                            <div className="bg-slate-800 text-white px-4 py-3 flex justify-between items-start">
                                <div>
                                    <div className="text-[10px] text-slate-400 font-mono mb-0.5">
                                        PROJECT {String(idx + 1).padStart(2, '0')}
                                    </div>
                                    <h2 className="text-sm font-bold leading-tight">{item.data.title}</h2>
                                    {item.data.slogan && (
                                        <p className="text-[11px] text-slate-300 mt-0.5 italic">&ldquo;{item.data.slogan}&rdquo;</p>
                                    )}
                                </div>
                                <div className="text-right shrink-0 ml-4">
                                    {item.data.period && (
                                        <span className="text-[10px] font-mono text-slate-300 whitespace-nowrap">
                                            {item.data.period}
                                        </span>
                                    )}
                                    <div className="flex flex-wrap gap-1 justify-end mt-1">
                                        {(item.data.badges as string[] | undefined)?.map((badge: string) => (
                                            <span key={badge} className="text-[8px] bg-slate-600 text-slate-200 px-1.5 py-0.5 rounded">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 프로젝트 내용 */}
                            <div className="p-4 flex gap-4">
                                {(item.data.thumbnail || item.data.image) && (
                                    <div className="shrink-0">
                                        <img
                                            src={item.data.thumbnail || item.data.image}
                                            alt={item.data.title}
                                            className="w-28 h-20 object-cover rounded border border-slate-200"
                                        />
                                    </div>
                                )}
                                <div
                                    className="flex-1 text-[10.5px] leading-snug text-slate-700
                                        [&_h2]:text-[11px] [&_h2]:font-bold [&_h2]:text-slate-800 [&_h2]:mt-3 [&_h2]:mb-1 [&_h2]:first:mt-0
                                        [&_h1]:hidden
                                        [&_ul]:list-disc [&_ul]:ml-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-0.5
                                        [&_ol]:list-decimal [&_ol]:ml-4 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-0.5
                                        [&_li]:text-[10px] [&_li]:text-slate-600 [&_li]:leading-snug
                                        [&_blockquote]:hidden
                                        [&_p]:text-[10px] [&_p]:text-slate-600 [&_p]:mb-1
                                        [&_strong]:text-slate-800 [&_strong]:font-semibold"
                                    dangerouslySetInnerHTML={{ __html: item.contentHtml || '' }}
                                />
                            </div>

                            {/* GitHub 링크: 항상 카드 하단 전체폭에 표시 */}
                            {item.data.github && (
                                <div className="px-4 pb-2 border-t border-slate-100 pt-1.5">
                                    <span className="text-[8px] text-slate-400 font-mono">
                                        🔗 {item.data.github.replace('https://', '')}
                                    </span>
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {/* 푸터: profile.md 에서 읽기 */}
                <footer className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
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
