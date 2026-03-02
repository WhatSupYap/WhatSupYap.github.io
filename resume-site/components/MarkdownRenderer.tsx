import React from 'react';

interface Props {
    contentHtml?: string | null;
    className?: string;
}

export default function MarkdownRenderer({ contentHtml, className = '' }: Props) {
    if (!contentHtml) return null;

    return (
        <article
            className={`
                prose prose-slate max-w-none dark:prose-invert 
                prose-headings:font-bold prose-a:text-blue-600 
                prose-blockquote:not-italic prose-blockquote:font-normal
                prose-blockquote:border-l-4 prose-blockquote:border-slate-300 dark:prose-blockquote:border-slate-700
                prose-blockquote:!py-0 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                [&_blockquote_p]:whitespace-pre-line
                [&_blockquote_p]:!mt-0 [&_blockquote_p]:!mb-0
                [&_blockquote_p:first-of-type::before]:content-none
                [&_blockquote_p:last-of-type::after]:content-none
                
                prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md 
                prose-code:bg-slate-200 dark:prose-code:bg-slate-700/80
                prose-code:text-slate-800 dark:prose-code:text-slate-100 
                prose-code:font-mono prose-code:text-[0.85em]
                prose-code:font-medium
                [&_code::before]:content-none [&_code::after]:content-none
                ${className}
            `}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
    );
}
