'use client';

import { useState, useCallback, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    images: string[];
}

export default function ImageGallery({ images }: Props) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [scale, setScale] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);

    // Pan state
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const openModal = (index: number) => {
        setSelectedIndex(index);
        setScale(1);
        setIsZoomed(false);
        setPosition({ x: 0, y: 0 });
        document.body.style.overflow = 'hidden';
    };

    const closeModal = useCallback(() => {
        setSelectedIndex(null);
        setScale(1);
        setIsZoomed(false);
        setPosition({ x: 0, y: 0 });
        document.body.style.overflow = 'unset';
    }, []);

    const navigate = useCallback((direction: number) => {
        setSelectedIndex((prevIndex) => {
            if (prevIndex === null) return null;
            return (prevIndex + direction + images.length) % images.length;
        });
        setScale(1);
        setIsZoomed(false);
        setPosition({ x: 0, y: 0 });
    }, [images.length]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (selectedIndex === null) return;

        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    }, [selectedIndex, closeModal, navigate]);

    useEffect(() => {
        if (selectedIndex !== null) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [selectedIndex, handleKeyDown]);

    const toggleZoom = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isDragging) return;

        if (isZoomed) {
            setScale(1);
            setIsZoomed(false);
            setPosition({ x: 0, y: 0 });
        } else {
            setScale(2); // 2x zoom
            setIsZoomed(true);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isZoomed) return;
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !isZoomed) return;
        e.preventDefault();
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    if (!images || images.length === 0) return null;

    return (
        <div className="">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800 group"
                        onClick={() => openModal(index)}
                    >
                        <img
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md w-8 h-8" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal / Curtain Effect */}
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
                    onClick={closeModal}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* Controls */}
                    <button
                        className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-[110]"
                        onClick={(e) => { e.stopPropagation(); closeModal(); }}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden md:block z-[110]"
                        onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden md:block z-[110]"
                        onClick={(e) => { e.stopPropagation(); navigate(1); }}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden"
                        onMouseUp={(e) => e.stopPropagation()}
                    >
                        <div
                            className={`relative transition-transform duration-300 ease-out`}
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                                cursor: isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                            }}
                            onClick={toggleZoom}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                        >
                            <img
                                src={images[selectedIndex]}
                                alt={`Full view ${selectedIndex + 1}`}
                                className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl rounded-sm draggable-none select-none"
                                draggable={false}
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white text-sm backdrop-blur-sm z-[60]">
                        {selectedIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </div>
    );
}
