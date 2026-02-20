import React from 'react';

interface Props {
    contentHtml?: string | null;
    className?: string;
}

export default function MarkdownRenderer({ contentHtml, className = '' }: Props) {
    if (!contentHtml) return null;

    return (
        <article
            className={`prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 ${className}`}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
    );
}
