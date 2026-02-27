import { getProjectBySlug, getAllPortfolioItems, getSectionData } from '@/lib/markdown';
import PrintButton from '../../PrintButton';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{
        slug: string[];
    }>;
}

export async function generateStaticParams() {
    const items = await getAllPortfolioItems();
    return items.map((item) => ({
        slug: item.slug.split('/'),
    }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const item = await getProjectBySlug(slug);
    if (!item) return { title: 'Not Found' };
    return {
        title: `${item.data.title} | 포트폴리오 출력`,
        description: item.data.description,
    };
}

export default async function PortfolioPrintDetailPage({ params }: Props) {
    const { slug } = await params;
    const item = await getProjectBySlug(slug);

    if (!item) notFound();

    const leftItems = await getSectionData('left');
    const profile = leftItems.find(i => i.slug.includes('profile'));

    const { data, contentHtml } = item;
    const techStack = [
        data['Frontend'] || data['frontend'],
        data['Backend'] || data['backend'],
        data['AI & Intelligence'] || data['ai'],
        data['Data Management'] || data['db'],
        data['Cloud Infrastructure'] || data['cloud'],
    ].filter(Boolean);

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <style>{`
                @page {
                    size: A4 portrait;
                    margin: 15mm 18mm;
                }
                @media print {
                    html, body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .no-print { display: none !important; }
                    button[aria-label="Toggle theme"] { display: none !important; }
                }
                button[aria-label="Toggle theme"] { display: none !important; }
            `}</style>

            <PrintButton />

            {/* 브라우저 미리보기: A4 세로 컨테이너 */}
            <div className="max-w-[210mm] mx-auto py-8 print:py-0 print:max-w-none">
                <div className="bg-white shadow-xl print:shadow-none px-[18mm] py-[15mm] print:px-0 print:py-0">

                    {/* 매 페이지 상단 헤더 */}
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-7 text-[9px] text-slate-400 tracking-wide">
                        <span className="font-semibold text-slate-600 uppercase">Portfolio</span>
                        <span>
                            {profile?.data.name}
                            {profile?.data.email && ` · ${profile.data.email}`}
                        </span>
                    </div>

                    {/* 커버 블록 */}
                    <div className="mb-8">
                        {/* 제목 */}
                        <h1 className="text-[26px] font-black text-slate-900 tracking-tight leading-tight mb-1">
                            {data.title}
                        </h1>

                        {/* 슬로건 */}
                        {data.slogan && (
                            <p className="text-[13px] text-slate-500 italic mb-3">
                                &ldquo;{data.slogan}&rdquo;
                            </p>
                        )}

                        {/* 기간 + 배지 */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            {data.period && (
                                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                    {data.period}
                                </span>
                            )}
                            {(data.badges as string[] | undefined)?.map((badge: string) => (
                                <span
                                    key={badge}
                                    className="text-[10px] bg-slate-800 text-slate-100 px-2 py-0.5 rounded"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>

                        {/* GitHub */}
                        {data.github && (
                            <p className="text-[10px] font-mono text-slate-400">
                                🔗 {data.github.replace('https://', '')}
                            </p>
                        )}
                    </div>

                    {/* 구분선 */}
                    <hr className="border-slate-200 mb-6" />

                    {/* 마크다운 본문 */}
                    <div
                        className="
                            text-[11.5px] leading-relaxed text-slate-700
                            [&_h2]:text-[14px] [&_h2]:font-bold [&_h2]:text-slate-900
                            [&_h2]:mt-7 [&_h2]:mb-2 [&_h2]:first:mt-0
                            [&_h2]:pb-1 [&_h2]:border-b [&_h2]:border-slate-200
                            [&_h3]:text-[12px] [&_h3]:font-semibold [&_h3]:text-slate-800
                            [&_h3]:mt-4 [&_h3]:mb-1.5
                            [&_h4]:text-[11.5px] [&_h4]:font-semibold [&_h4]:text-slate-700
                            [&_h4]:mt-3 [&_h4]:mb-1
                            [&_ul]:list-disc [&_ul]:ml-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-0.5
                            [&_ol]:list-decimal [&_ol]:ml-4 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-0.5
                            [&_li]:text-[11px] [&_li]:text-slate-600 [&_li]:leading-snug
                            [&_p]:text-[11px] [&_p]:text-slate-600 [&_p]:mb-1.5
                            [&_strong]:text-slate-900 [&_strong]:font-semibold
                            [&_blockquote]:hidden
                            [&_h1]:hidden
                            [&_table]:w-full [&_table]:border-collapse [&_table]:text-[10.5px] [&_table]:my-3
                            [&_th]:bg-slate-100 [&_th]:text-slate-700 [&_th]:font-semibold
                            [&_th]:px-2 [&_th]:py-1 [&_th]:border [&_th]:border-slate-200 [&_th]:text-left
                            [&_td]:px-2 [&_td]:py-1 [&_td]:border [&_td]:border-slate-200 [&_td]:text-slate-600
                            [&_section]:break-inside-avoid
                            [&_h2]:[break-before:auto]
                        "
                        dangerouslySetInnerHTML={{ __html: contentHtml || '' }}
                    />

                </div>
            </div>
        </div>
    );
}
