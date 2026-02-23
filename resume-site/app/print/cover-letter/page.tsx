import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import { getSectionData } from '@/lib/markdown';
import PrintButton from '../PrintButton';

async function getCoverLetterContent() {
    const dirPath = path.join(process.cwd(), 'content', 'cover-letter');
    if (!fs.existsSync(dirPath)) return [];

    const files = fs.readdirSync(dirPath)
        .filter(f => f.endsWith('.md') && f !== 'index.md')
        .sort();

    return Promise.all(files.map(async (file) => {
        const raw = fs.readFileSync(path.join(dirPath, file), 'utf-8');
        const { data, content } = matter(raw);
        const processed = await remark().use(remarkGfm).use(html).process(content);
        return { data, contentHtml: processed.toString() };
    }));
}

async function getCoverLetterMeta() {
    const indexPath = path.join(process.cwd(), 'content', 'cover-letter', 'index.md');
    if (!fs.existsSync(indexPath)) return {};
    const { data } = matter(fs.readFileSync(indexPath, 'utf-8'));
    return data;
}

export default async function CoverLetterPrintPage() {
    // 개인정보: profile.md 에서 읽기 (단일 소스)
    const leftItems = await getSectionData('left');
    const profile = leftItems.find(item => item.slug.includes('profile'));

    // 자기소개서 메타 (index.md)
    const meta = await getCoverLetterMeta();

    // 자기소개서 본문
    const items = await getCoverLetterContent();
    const cl = items[0];
    if (!cl) return <div>자기소개서 내용이 없습니다.</div>;

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <style>{`
                @page { size: A4; margin: 15mm 20mm; }
                @media print {
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    button[aria-label="Toggle theme"] { display: none !important; }
                }
                button[aria-label="Toggle theme"] { display: none !important; }
            `}</style>

            <PrintButton />

            <div className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-xl print:shadow-none print:w-full px-[20mm] py-[15mm]">

                {/* 헤더: profile.md + cover-letter/index.md 에서 읽기 */}
                <header className="border-b-2 border-slate-800 pb-4 mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        {meta.title || '자기소개서'}
                    </h1>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-600">
                        {profile?.data.name && <span className="font-semibold">{profile.data.name}</span>}
                        {/* markdown body 첫 줄(직함)은 profile.md 에서 */}
                        {profile?.data.email && <span>{profile.data.email}</span>}
                        {profile?.data.phone && <span>{profile.data.phone}</span>}
                        {profile?.data.github && <span>{profile.data.github}</span>}
                    </div>
                </header>

                {/* 본문: cover-letter/01-cover-letter.md 에서 읽기 */}
                <div
                    className="text-[13px] leading-relaxed text-slate-700
                        [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-slate-900
                        [&_h2]:border-l-4 [&_h2]:border-slate-800 [&_h2]:pl-3
                        [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:first:mt-0
                        [&_p]:leading-7 [&_p]:mb-3
                        [&_hr]:border-slate-200 [&_hr]:my-5
                        [&_strong]:text-slate-900 [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: cl.contentHtml }}
                />

            </div>
        </div>
    );
}
