import Link from 'next/link';
import { getProjectBySlug, getAllCertificateItems, getSectionData } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Navigation from '@/components/Navigation';
import FloatingTOC from '@/components/FloatingTOC';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{
        slug: string[];
    }>;
}

// Generate static params for all items
export async function generateStaticParams() {
    const items = await getAllCertificateItems();
    return items.map((item) => ({
        slug: item.slug.split('/'),
    }));
}

export default async function CertificateDetailPage({ params }: Props) {
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
            <Navigation />
            <FloatingTOC navItems={navItems} />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <article>
                    <header className="mb-12 border-b border-neutral-100 dark:border-neutral-800 pb-8">
                        {data.image && (
                            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-neutral-100 dark:bg-neutral-900">
                                <img
                                    src={data.image}
                                    alt={data.title || item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                                {data.title || item.name}
                            </h1>
                            {data.period && (
                                <span className="text-lg font-medium text-neutral-500 whitespace-nowrap">
                                    {data.period}
                                </span>
                            )}
                        </div>
                    </header>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <MarkdownRenderer contentHtml={contentHtml} />
                    </div>
                </article>
            </main>
        </div>
    );
}
