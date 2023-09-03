"use client"
import React, { useState } from 'react';

const VerticalImageChanger = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageCount = images.length;

    const handleSliderChange = (event) => {
        const sliderValue = parseFloat(event.target.value);
        const newIndex = Math.round((imageCount - 1) * sliderValue);
        setCurrentImageIndex(newIndex);
    };

    return (
        <div className="flex items-center h-96">
            <div className="w-1/2 mx-auto relative">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        className={`absolute top-0 h-full ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={currentImageIndex / (imageCount - 1)}
                    onChange={handleSliderChange}
                    className="slider w-1 h-full absolute top-0 transform -translate-x-1/2 translate-y-1/2 bg-transparent"
                    style={{
                        '--webkit-slider-thumb-width': '1rem',
                        '--webkit-slider-thumb-height': '1rem',
                        '--moz-range-thumb-width': '1rem',
                        '--moz-range-thumb-height': '1rem',
                    }}
                />
            </div>
        </div>
    );
};

export default VerticalImageChanger;
