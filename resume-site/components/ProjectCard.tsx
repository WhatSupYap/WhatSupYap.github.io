import React from 'react';
import { MarkdownItem } from '@/lib/markdown';
import Link from 'next/link';

interface Props {
  item: MarkdownItem;
  verticalLayout?: boolean;
}

export default function ProjectCard({ item, verticalLayout = false }: Props) {
  const { data } = item;
  const isPortfolio = data.content_type === 'portfolio';
  const isExperience = data.content_type === 'experience';
  const isEducation = data.content_type === 'education';
  const isCertificate = data.content_type === 'certificate';
  const isIntro = data.content_type === 'intro';
  const isLinkable = isPortfolio || isExperience || isEducation || isCertificate || isIntro;

  let href = '';
  if (isPortfolio) {
    href = `/portfolio/${item.slug}`;
  } else if (isExperience) {
    href = `/experience/${item.slug}`;
  } else if (isEducation) {
    href = `/education/${item.slug}`;
  } else if (isCertificate) {
    href = `/certificate/${item.slug}`;
  } else if (isIntro) {
    href = `/intro/${item.slug}`;
  }

  const CardContent = (
    <>
      {data.image && (
        <div className="relative w-full h-48 bg-neutral-100 dark:bg-neutral-800">
          <img
            src={data.image}
            alt={data.title || item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5 flex flex-col h-full">
        {verticalLayout ? (
          // Vertical Layout: Period top-right, then Title
          <>
            {data.period && (
              <div className="flex justify-end mb-2">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                  {data.period}
                </span>
              </div>
            )}
            <div className="mb-2">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {data.title || item.name}
              </h3>
              {data.company && (
                <div className="text-md font-medium text-neutral-700 dark:text-neutral-300 mt-1">
                  {data.company}
                </div>
              )}
            </div>
          </>
        ) : (
          // Original Horizontal Layout: Title left, Period right
          <div className="flex justify-between items-start gap-4 mb-2">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {data.title || item.name}
              </h3>
              {data.company && (
                <div className="text-md font-medium text-neutral-700 dark:text-neutral-300 mt-1">
                  {data.company}
                </div>
              )}
            </div>
            {data.period && (
              <span className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 whitespace-nowrap mt-1">
                {data.period}
              </span>
            )}
          </div>
        )}

        {/* Prioritize description for the card view */}
        {(data.description) && (
          <p className="text-neutral-600 dark:text-neutral-300 text-sm line-clamp-3 leading-relaxed mt-1">
            {data.description}
          </p>
        )}

        {/* If valid GitHub link AND NOT a linkable card (since card click goes to detail), show it. */}
        {!isLinkable && data.github && (
          <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-auto pt-2 z-10">
            GitHub Repository &rarr;
          </a>
        )}
      </div>
    </>
  );

  if (isLinkable) {
    return (
      <Link
        href={href}
        className="group flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
      >
        {CardContent}
      </Link>
    );
  }

  return (
    <div className="flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
      {CardContent}
    </div>
  );
}
