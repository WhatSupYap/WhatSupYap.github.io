'use client';

import { Printer } from 'lucide-react';
import { useEffect } from 'react';

export default function PrintButton() {
    useEffect(() => {
        // Optional: Auto-print when page loads
        // window.print();
    }, []);

    return (
        <button
            onClick={() => window.print()}
            className="print:hidden fixed top-8 right-8 bg-neutral-900 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-neutral-800 transition-colors flex items-center gap-2 z-50"
        >
            <Printer size={20} />
            이력서 인쇄하기
        </button>
    );
}
