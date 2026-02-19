"use client";

import React, { useState } from 'react';
import { Github, Mail, Copy, ExternalLink, Check } from 'lucide-react';

interface Props {
    github?: string;
    email?: string;
}

export default function ContactSection({ github, email }: Props) {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        if (!email) return;
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!github && !email) return null;

    return (
        <div className="flex flex-col gap-3 mt-2">
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100">Contact</h3>

            {github && (
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Github className="w-4 h-4" />
                    <span className="flex-1 truncate">{github}</span>
                    <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                        title="Open in new tab"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            )}

            {email && (
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Mail className="w-4 h-4" />
                    <span className="flex-1 truncate">{email}</span>
                    <button
                        onClick={handleCopyEmail}
                        className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                        title="Copy email"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            )}
        </div>
    );
}
