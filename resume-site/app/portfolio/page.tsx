import { getAllPortfolioItems } from '@/lib/markdown';
import ProjectCard from '@/components/ProjectCard';
import Navigation from '@/components/Navigation';
import FloatingTOC from '@/components/FloatingTOC';

export const metadata = {
    title: 'Portfolio | Resume Site',
    description: 'A collection of my projects and works.',
};

export default async function PortfolioPage() {
    const items = await getAllPortfolioItems();

    // Single 'Top' navigation item
    const navItems = [{ id: 'top', label: 'Top' }];

    return (
        <div id="top" className="min-h-screen font-sans text-neutral-900 dark:text-neutral-100">
            <Navigation />
            <FloatingTOC navItems={navItems} />

            <main className="max-w-screen-xl mx-auto px-6 py-12">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400">
                        주요 프로젝트 및 작업물
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((project) => (
                        <ProjectCard key={project.slug} item={project} verticalLayout={true} />
                    ))}
                </div>

                {
                    items.length === 0 && (
                        <p className="text-neutral-500">No portfolio items found.</p>
                    )
                }
            </main >
        </div >
    );
}
