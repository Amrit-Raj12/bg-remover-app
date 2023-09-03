/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'

const BackgroundGallery = ({selectedFile, setSelectedFile, handleImageClick}) => {

    const images = [
        'portfolio-img3.png',
        'portfolio-img3.png',
        'portfolio-img3.png',
        'portfolio-img3.png',
        'portfolio-img3.png',
        'portfolio-img3.png',
    ]

  return (
    <div className='p-4'>
        <h2 className='text-3xl font-bold mb-4'>Select any backgound</h2>
        <div className='grid grid-cols-3 gap-4'>
            {
                images?.map((image, index) => (
                    <img 
                    key={index}
                    src={(`./${image}`)}
                    alt={`Image ${index +1}`}
                    className='cursor-pointer rounded-lg'
                    onClick={() => handleImageClick(image)}
                    />
                ))
            }
        </div>
        {
            selectedFile && (
                <div className='mt-8'>
                    <h3 className='text-3xl font-bold mb-4'>Select Image</h3>
                    <img
                    src={require(`./${selectedFile}`).default}
                    alt='Selected'
                    className='rounded-lg shadow-lg'
                    />
                </div>
            )
        }
    </div>
  )
}

export default BackgroundGallery