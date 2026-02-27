import React from 'react';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
    weight: ['300', '400', '500', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
});

export default function PrintLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`light bg-white text-black min-h-screen ${notoSansKr.className}`}>
            <style dangerouslySetInnerHTML={{
                __html: `
                /* Force light mode variables even if .dark is on html/body */
                :root, .light {
                    --background: #ffffff !important;
                    --foreground: #000000 !important;
                }
                
                @page {
                    size: A4;
                    margin: 15mm 18mm;
                }
                
                html, body, .light, .light * {
                    background-color: white !important;
                    color: black !important;
                    color-scheme: light !important;
                    font-family: ${notoSansKr.style.fontFamily} !important;
                }

                /* Hide global theme toggle in print layout */
                button[aria-label="Toggle theme"] {
                    display: none !important;
                }

                @media print {
                    body {
                        background: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `}} />
            {children}
        </div>
    );
}
