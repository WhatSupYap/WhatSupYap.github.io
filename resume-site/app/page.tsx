import FloatingTOC from '@/components/FloatingTOC';
import { getSectionData } from '@/lib/markdown';
import Sidebar from '@/components/Sidebar';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';

export default async function Home() {
  const leftItems = await getSectionData('left');
  const rightItems = await getSectionData('right');

  // Prepare navigation items for ScrollSpy
  const navItems = rightItems.map((item) => ({
    id: item.slug.split('/').pop() || '', // Use the last part of slug as ID
    label: item.data.title || item.name // Use title or folder name
  })).filter(item => item.id !== '');

  return (
    <div className="min-h-screen font-sans text-neutral-900 dark:text-neutral-100 relative">
      <FloatingTOC navItems={navItems} />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-12 lg:gap-24">
        {/* Left Column (Fixed Width) */}
        <Sidebar items={leftItems} />

        {/* Right Column (Fluid) */}
        <div className="flex-1 min-w-0 space-y-20">
          {rightItems.map((item) => {
            const sectionId = item.slug.split('/').pop() || '';
            return (
              <section key={item.slug} id={sectionId} className="scroll-mt-20">
                {item.type === 'file' && item.contentHtml ? (
                  // Single File Rendering (e.g. Intro, Education)
                  <div className="space-y-6">
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

                    {/* Render Items (Cards) */}
                    <div className="flex flex-col gap-2">
                      {item.items?.map((subItem) => (
                        <ProjectCard key={subItem.slug} item={subItem} />
                      ))}
                    </div>
                  </div>
                )
                }
              </section>
            );
          })}
        </div>
      </main >
    </div >
  );
}
