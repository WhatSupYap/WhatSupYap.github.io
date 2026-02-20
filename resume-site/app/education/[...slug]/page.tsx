import Link from 'next/link';
import { getProjectBySlug, getAllEducationItems, getSectionData } from '@/lib/markdown';
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
    const items = await getAllEducationItems();
    return items.map((item) => ({
        slug: item.slug.split('/'),
    }));
}

export default async function EducationDetailPage({ params }: Props) {
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
                <header className="mb-12 border-b border-neutral-100 dark:border-neutral-800 pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title || item.name}</h1>

                    <div className="flex flex-wrap gap-4 text-neutral-500 dark:text-neutral-400 mb-6">
                        {data.period && <span>{data.period}</span>}
                    </div>

                    {data.description && (
                        <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                            {data.description}
                        </p>
                    )}
                </header>

                {contentHtml && (
                    <div className="pb-20">
                        <MarkdownRenderer contentHtml={contentHtml} />
                    </div>
                )}
            </main>
        </div>
    );
}
