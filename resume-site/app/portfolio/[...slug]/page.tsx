import { getProjectBySlug, getAllPortfolioItems, getSectionData } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Navigation from '@/components/Navigation';
import FloatingTOC from '@/components/FloatingTOC';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ImageGallery from '@/components/ImageGallery';

interface Props {
    params: Promise<{
        slug: string[];
    }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
    const items = await getAllPortfolioItems();
    return items.map((item) => ({
        slug: item.slug.split('/'),
    }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const item = await getProjectBySlug(slug);

    if (!item) {
        return {
            title: 'Not Found',
        };
    }

    return {
        title: `${item.data.title} | Portfolio`,
        description: item.data.description,
    };
}

export default async function PortfolioDetailPage({ params }: Props) {
    // Await params correctly for Next.js 15+
    const { slug } = await params;
    const item = await getProjectBySlug(slug);

    // Single 'Top' navigation item
    const navItems = [{ id: 'top', label: 'Top' }];

    if (!item) {
        notFound();
    }

    const { data, contentHtml } = item;

    return (
        <div id="top" className="min-h-screen font-sans text-neutral-900 dark:text-neutral-100">
            <Navigation viewAllHref="/portfolio" />
            <FloatingTOC navItems={navItems} />


            <main className="max-w-4xl mx-auto px-6 py-12">
                <header className="mb-2 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title || item.name}</h1>

                    <div className="flex flex-wrap gap-4 text-neutral-500 dark:text-neutral-400 mb-6">
                        {data.period && <span>{data.period}</span>}
                        {/* Add more metadata if needed */}
                    </div>

                    {data.image && (
                        <div className="relative w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-6">
                            <img
                                src={data.image}
                                alt={data.title}
                                className="w-full h-auto block"
                            />
                        </div>
                    )}

                </header>

                {data.gallery && Array.isArray(data.gallery) && (
                    <div className="mb-8 mt-2">
                        <ImageGallery images={data.gallery} />
                    </div>
                )}

                {(data.github || data.youtube) && (
                    <div className="flex justify-end gap-3 mb-12">
                        {data.youtube && (
                            <a
                                href={data.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-red-600 hover:text-red-700 font-medium bg-red-50 dark:bg-red-900/30 px-4 py-2 rounded-lg transition-colors"
                            >
                                Watch on YouTube &rarr;
                            </a>
                        )}
                        {data.github && (
                            <a
                                href={data.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg transition-colors"
                            >
                                View on GitHub &rarr;
                            </a>
                        )}
                    </div>
                )}

                {contentHtml && (
                    <div className="pb-20">
                        <MarkdownRenderer contentHtml={contentHtml} />
                    </div>
                )}
            </main>
        </div>
    );
}
