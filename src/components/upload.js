"use client"

import React, { useState } from 'react'
import axios from 'axios';


const Upload = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [backgoundImage, setVackgroundImage] = useState(null);
    const [resultImage, setResultImage] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleBackgroundChange = (event) => {
        setVackgroundImage(event.target.files[0])
    }

    const handleUpload = async () => {
        if(!selectedFile){
            alert('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('image_file', selectedFile);

        if(backgoundImage){
            formData.append('bg_image_file', backgoundImage);
        }

        try {
            const response = await axios.post(
                'https://api.remove.bg/v1.0/removebg',
                formData,
                {
                   headers: {
                    'X-Api-Key': 'jUymH95eq9dijb4Y3meSb7ug'
                   },
                   responseType: 'arraybuffer' 
                }
            )

            setResultImage(URL.createObjectURL(new Blob([response.data])))
        } catch (error) {
            console.error('Error removing background:', error);
            alert('Error removing background. Please try again.')
        }
    }

  return (
    <div>
        <div>
        <h3>Image</h3>
        <input type='file' onChange={handleFileChange} />
        </div>
        <div>
            <h3>Background Image (Optional):</h3>
            <input type='file' onChange={handleBackgroundChange} />
        </div>
        <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={handleUpload}>Remove background</button>
        {
            resultImage && (
                <div>
                    <h2>Result:</h2>
                        <img src={resultImage} alt='Result with background removed' />
                    <a href={resultImage} download='background_removed.png'>Download</a>
                </div>
            )
        }
    </div>
  )
}

export default Upload