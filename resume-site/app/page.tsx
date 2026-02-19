import { getSectionData } from '@/lib/markdown';
import Sidebar from '@/components/Sidebar';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';

export default async function Home() {
  const leftItems = await getSectionData('left');
  const rightItems = await getSectionData('right');

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-100">
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-12 lg:gap-24">
        {/* Left Column (Fixed Width) */}
        <Sidebar items={leftItems} />

        {/* Right Column (Fluid) */}
        <div className="flex-1 min-w-0 space-y-20">
          {rightItems.map((item) => (
            <section key={item.slug} className="scroll-mt-20">
              {item.type === 'file' && item.contentHtml ? (
                // Single File Rendering (e.g. Intro, Education)
                <div className="space-y-6">
                  {/* Optional: if file has title in frontmatter, show it? 
                        Usually markdown content has only body. 
                        Let's rely on markdown headers for now.
                    */}
                  <MarkdownRenderer contentHtml={item.contentHtml} />
                </div>
              ) : (
                // Folder Rendering (e.g. Projects)
                <div className="space-y-8">
                  <div className="flex items-baseline justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {item.name === '03-portfolio' || item.data.title === 'Portfolio' ? (
                        <Link href="/portfolio" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                          {item.data.title || item.name}
                          <span className="text-sm font-normal text-neutral-400">View All &rarr;</span>
                        </Link>
                      ) : (
                        item.data.title || item.name
                      )}
                    </h2>
                    {item.data.description && (
                      <span className="text-sm text-neutral-500">{item.data.description}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {item.items?.map((subItem) => (
                      <ProjectCard key={subItem.slug} item={subItem} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
