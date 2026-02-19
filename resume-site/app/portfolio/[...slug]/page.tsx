import { getProjectBySlug, getAllPortfolioItems } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Navigation from '@/components/Navigation';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{
        slug: string[];
    }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
    const projects = await getAllPortfolioItems();
    return projects.map((project) => ({
        slug: project.slug.split('/'),
    }));
}

export default async function ProjectDetailPage({ params }: Props) {
    // Await params correctly for Next.js 15+
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const { data, contentHtml } = project;

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-100">
            <Navigation />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <header className="mb-12 border-b border-neutral-100 dark:border-neutral-800 pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title || project.name}</h1>

                    <div className="flex flex-wrap gap-4 text-neutral-500 dark:text-neutral-400 mb-6">
                        {data.period && <span>{data.period}</span>}
                        {/* Add more metadata if needed */}
                    </div>

                    {data.image && (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-8">
                            <img
                                src={data.image}
                                alt={data.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {data.github && (
                        <a
                            href={data.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                            View on GitHub &rarr;
                        </a>
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
