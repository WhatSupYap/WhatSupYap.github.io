import Link from 'next/link';
import { FileText, PenLine, Briefcase, LayoutGrid } from 'lucide-react';
import { getSectionData } from '@/lib/markdown';

const PRINT_DOCS = [
    {
        href: '/print/resume',
        Icon: FileText,
        title: '기본 이력서',
        description: '인적사항, 기술 스택, 경력 요약, 프로젝트 목록을 A4 1장으로 압축한 표준 이력서입니다.',
        borderColor: 'border-slate-200 hover:border-slate-400',
        iconColor: 'text-slate-600',
    },
    {
        href: '/print/cover-letter',
        Icon: PenLine,
        title: '자기소개서',
        description: '지원동기, 직무역량, 입사 후 포부 등 항목별로 서술하는 자기소개서입니다.',
        borderColor: 'border-slate-200 hover:border-slate-400',
        iconColor: 'text-slate-600',
    },
    {
        href: '/print/career',
        Icon: Briefcase,
        title: '경력기술서',
        description: '재직 회사와 담당 프로젝트를 회사별·시간순으로 정리한 상세 경력기술서입니다.',
        borderColor: 'border-slate-200 hover:border-slate-400',
        iconColor: 'text-slate-600',
    },
    {
        href: '/print/portfolio',
        Icon: LayoutGrid,
        title: '포트폴리오',
        description: '주요 프로젝트의 역할, 기술 스택, 핵심 성과를 상세히 기술한 포트폴리오입니다.',
        borderColor: 'border-slate-200 hover:border-slate-400',
        iconColor: 'text-slate-600',
    },
];

export default async function PrintHubPage() {
    const leftItems = await getSectionData('left');
    const profile = leftItems.find(item => item.slug.includes('profile'));

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* 상단 헤더 */}
            <header className="bg-slate-900 text-white py-10 px-6 text-center">
                <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest font-mono">Print / Export</p>
                <h1 className="text-3xl font-black tracking-tight">
                    {profile?.data.name || '이름'} 님의 제출 서류
                </h1>
                <p className="mt-2 text-slate-400 text-sm">
                    각 문서를 클릭 → 페이지 상단 <strong className="text-white">인쇄하기 버튼</strong> 또는{' '}
                    <kbd className="bg-slate-700 text-slate-200 px-1.5 py-0.5 rounded text-xs font-mono">Ctrl+P</kbd>{' '}
                    → <strong className="text-white">PDF로 저장</strong>
                </p>
                <div className="mt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
                    >
                        ← 이력서 사이트로 돌아가기
                    </Link>
                </div>
            </header>

            {/* 문서 카드 그리드 */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {PRINT_DOCS.map(({ href, Icon, title, description, borderColor, iconColor }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`group flex flex-col bg-white rounded-xl border ${borderColor} p-6 shadow-sm hover:shadow-md transition-all duration-200`}
                        >
                            {/* 상단: 아이콘 */}
                            <div className="mb-5">
                                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* 제목 & 설명 */}
                            <h2 className="text-base font-bold text-slate-900 mb-1.5">
                                {title}
                            </h2>
                            <p className="text-sm text-slate-500 leading-relaxed flex-1">
                                {description}
                            </p>

                            {/* 하단: 바로가기 */}
                            <div className="mt-5 flex items-center gap-1 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                                <span>열기</span>
                                <span className="transition-transform group-hover:translate-x-0.5">→</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 제출 안내 */}
                <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-700 mb-3 text-sm">ZIP 제출 방법</h3>
                    <ol className="list-decimal list-inside text-sm text-slate-500 space-y-1.5">
                        <li>각 문서 페이지에서 <strong className="text-slate-700">PDF로 저장</strong> (배경 그래픽 ✅ 체크)</li>
                        <li>저장된 PDF 4개 파일을 선택 → <strong className="text-slate-700">우클릭 → 압축</strong></li>
                        <li>ZIP 파일을 지원 프로그램에 제출</li>
                    </ol>
                </div>
            </main>

            {/* 하단 */}
            <footer className="text-center text-xs text-slate-400 pb-8">
                {profile?.data.name} · {profile?.data.email} · {profile?.data.github}
            </footer>
        </div>
    );
}
