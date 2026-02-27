import Link from 'next/link';
import { getSectionData, getAllPortfolioItems } from '@/lib/markdown';

export default async function PortfolioPrintHubPage() {
    const leftItems = await getSectionData('left');
    const profile = leftItems.find(item => item.slug.includes('profile'));

    const portfolioItems = await getAllPortfolioItems();

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* 상단 헤더 */}
            <header className="bg-slate-900 text-white py-10 px-6 text-center">
                <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest font-mono">Print / Export</p>
                <h1 className="text-3xl font-black tracking-tight">포트폴리오 출력</h1>
                <p className="mt-2 text-slate-400 text-sm">
                    출력할 포트폴리오를 선택 →{' '}
                    <strong className="text-white">인쇄하기 버튼</strong> 또는{' '}
                    <kbd className="bg-slate-700 text-slate-200 px-1.5 py-0.5 rounded text-xs font-mono">Ctrl+P</kbd>
                    {' '}→{' '}
                    <strong className="text-white">PDF로 저장</strong>
                </p>
                <div className="mt-4 flex items-center justify-center gap-6">
                    <Link
                        href="/print"
                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
                    >
                        ← 출력 허브로 돌아가기
                    </Link>
                </div>
            </header>

            {/* 포트폴리오 카드 목록 */}
            <main className="max-w-3xl mx-auto px-6 py-12">
                <div className="flex flex-col gap-4">
                    {portfolioItems.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/print/portfolio/${item.slug}`}
                            className="group flex flex-col bg-white rounded-xl border border-slate-200 hover:border-slate-400 p-6 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            {/* 제목 + 슬로건 */}
                            <h2 className="text-base font-bold text-slate-900 mb-1">
                                {item.data.title}
                            </h2>
                            {item.data.slogan && (
                                <p className="text-xs text-slate-400 italic mb-2">&ldquo;{item.data.slogan}&rdquo;</p>
                            )}

                            {/* 기간 + 배지 */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                {item.data.period && (
                                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                        {item.data.period}
                                    </span>
                                )}
                                {(item.data.badges as string[] | undefined)?.map((badge: string) => (
                                    <span key={badge} className="text-[10px] bg-slate-800 text-slate-200 px-2 py-0.5 rounded">
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            {/* 설명 */}
                            <p className="text-sm text-slate-500 leading-relaxed flex-1">
                                {item.data.description}
                            </p>

                            {/* 바로가기 */}
                            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                                <span>PDF 출력 페이지 열기</span>
                                <span className="transition-transform group-hover:translate-x-0.5">→</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {portfolioItems.length === 0 && (
                    <p className="text-center text-slate-400 text-sm py-8">포트폴리오 항목이 없습니다.</p>
                )}
            </main>

            {/* 하단 */}
            <footer className="text-center text-xs text-slate-400 pb-8">
                {profile?.data.name} · {profile?.data.email} · {profile?.data.github}
            </footer>
        </div>
    );
}
