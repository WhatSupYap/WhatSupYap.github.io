import { getProjectBySlug, getAllExperienceItems } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Navigation from '@/components/Navigation';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{
        slug: string[];
    }>;
}

// Generate static params for all experience items
export async function generateStaticParams() {
    const items = await getAllExperienceItems();
    return items.map((item) => ({
        slug: item.slug.split('/'),
    }));
}

export default async function ExperienceDetailPage({ params }: Props) {
    const { slug } = await params;
    const item = await getProjectBySlug(slug);

    if (!item) {
        notFound();
    }

    const { data, contentHtml } = item;

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-100">
            <Navigation />

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
