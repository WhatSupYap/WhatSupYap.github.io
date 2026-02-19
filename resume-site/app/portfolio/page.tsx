import { getAllPortfolioItems } from '@/lib/markdown';
import ProjectCard from '@/components/ProjectCard';
import Navigation from '@/components/Navigation';

export default async function PortfolioPage() {
    const projects = await getAllPortfolioItems();

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-100">
            <Navigation />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-12">Portfolio</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.slug} item={project} />
                    ))}
                </div>

                {projects.length === 0 && (
                    <p className="text-neutral-500">No portfolio items found.</p>
                )}
            </main>
        </div>
    );
}
