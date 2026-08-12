"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageLoaderProps {
    images: string[];
}
export default function AcceptRejectImages({ images: initialImages }: ImageLoaderProps) {
    const [images, setImages] = useState<string[]>(initialImages);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            {/* Image previews */}
            <div className="flex flex-wrap gap-5">
                {images.map((image, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        className="relative w-[100px] h-[100px] cursor-pointer"
                    >
                        <Image
                            height={100}
                            width={100}
                            src={image}
                            alt="product image"
                            className="w-full h-full object-cover rounded-lg border"
                        />
                    </button>
                ))}
            </div>

            {/* Full-size image */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-w-[90vw] max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt="Full size product image"
                            width={1200}
                            height={1200}
                            className="max-h-[90vh] w-auto object-contain rounded-lg"
                        />

                        <button
                            type="button"
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-gray-200"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}