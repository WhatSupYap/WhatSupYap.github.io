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

    return (
        <div className="font-sans">
            <PrintButton />

            {/* 브라우저 미리보기: A4 세로 컨테이너 */}
            <div className="bg-slate-200 min-h-screen py-10 px-6 print:p-0 print:bg-white">
                <div className="w-[210mm] mx-auto bg-white shadow-2xl print:shadow-none print:w-full print:mx-0 min-h-[297mm] px-[18mm] py-[15mm] print:px-0 print:py-0">

                    {/* 페이지 상단 헤더 */}
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
                        <div className="flex flex-wrap items-center gap-1.5 mb-3">
                            {data.period && (
                                <span
                                    className="text-xs font-medium px-2.5 py-1 rounded-full !bg-slate-100 text-slate-600 whitespace-nowrap"
                                    style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
                                >
                                    {data.period}
                                </span>
                            )}
                            {(data.badges as string[] | undefined)?.map((badge: string) => {
                                const isAiOrInfra = ['python', 'fastapi', 'aws', 'docker', 'langgraph', 'rag', 'llm', 'sllm'].some(keyword => badge.toLowerCase().includes(keyword));
                                const isLegacy = ['c#', 'asp.net', 'windows'].some(keyword => badge.toLowerCase().includes(keyword));

                                let badgeStyle = "!bg-slate-100 text-slate-600 border-slate-200";
                                if (isAiOrInfra) {
                                    badgeStyle = "!bg-indigo-600 !text-white border-indigo-700";
                                } else if (isLegacy) {
                                    badgeStyle = "!bg-slate-500 !text-white border-slate-600";
                                }

                                return (
                                    <span
                                        key={badge}
                                        className={`text-[10px] font-medium px-2 py-0.5 rounded border ${badgeStyle}`}
                                        style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
                                    >
                                        {badge}
                                    </span>
                                );
                            })}
                        </div>

                        {/* GitHub */}
                        {data.github && (
                            <p className="text-[10px] font-mono text-slate-400">
                                🔗 {data.github.replace('https://', '')}
                            </p>
                        )}
                    </div>

                    {/* 구분선 */}
                    {/* <hr className="border-slate-200 mb-6" /> */}

                    {/* 마크다운 본문 */}
                    <div
                        className="
                            text-[11.5px] leading-relaxed text-slate-700
                            overflow-hidden break-words
                            [&_*]:max-w-full
                            [&_h2]:text-[14px] [&_h2]:font-bold [&_h2]:text-slate-900
                            [&_h2]:mt-7 [&_h2]:mb-2 [&_h2]:first:mt-0
                            [&_h2]:pb-1 [&_h2]:border-b [&_h2]:border-slate-200
                            [&_h3]:text-[12px] [&_h3]:font-bold [&_h3]:text-slate-900
                            [&_h3]:mt-4 [&_h3]:mb-1.5
                            [&_h4]:text-[11.5px] [&_h4]:font-bold [&_h4]:text-slate-900
                            [&_h4]:mt-3 [&_h4]:mb-1
                            [&_ul]:list-disc [&_ul]:ml-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-0.5
                            [&_ol]:list-decimal [&_ol]:ml-4 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-0.5
                            [&_li]:text-[11px] [&_li]:text-slate-600 [&_li]:leading-snug [&_li]:break-words
                            [&_p]:text-[11px] [&_p]:text-slate-600 [&_p]:mb-1.5 [&_p]:break-words
                            [&_strong]:text-slate-900 [&_strong]:font-bold
                            [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:bg-slate-50 [&_blockquote]:px-3 [&_blockquote]:!py-0 [&_blockquote]:my-4 [&_blockquote]:text-slate-600 [&_blockquote]:italic
                            [&_blockquote_p]:whitespace-pre-line [&_blockquote_p]:mb-1
                            [&_code]:!bg-slate-200 [&_code]:text-[10px] [&_code]:font-mono [&_code]:px-1.5 [&_code]:py-0 [&_code]:rounded [&_code]:text-slate-800 [&_code]:font-medium
                            [&_code::before]:content-none [&_code::after]:content-none
                            [&_h1]:hidden
                            [&_table]:w-full [&_table]:max-w-full [&_table]:table-fixed
                            [&_table]:border-collapse [&_table]:text-[10.5px] [&_table]:my-3
                            [&_th]:bg-slate-100 [&_th]:text-slate-700 [&_th]:font-semibold
                            [&_th]:px-2 [&_th]:py-1.5 [&_th]:border [&_th]:border-slate-200 [&_th]:text-center
                            [&_th]:break-words [&_th]:align-middle
                            [&_td]:px-2 [&_td]:py-1.5 [&_td]:border [&_td]:border-slate-200 [&_td]:text-slate-600
                            [&_td]:break-words [&_td]:align-middle [&_td]:text-center
                            [&_table_img]:max-w-[calc(100%-8px)] [&_table_img]:mx-auto [&_table_img]:block
                        "
                        dangerouslySetInnerHTML={{ __html: contentHtml || '' }}
                    />

                </div>
            </div>
        </div>
    );
}
