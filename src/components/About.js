import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import { fadeIn } from '../variants';
import Change from '../assets/change.jpg';

const About = ({
  handleBackgroundChange,
  selectedFile,
  resultImage,
  previewImage,
  handleUpload,
  loading,
  hideButton,
  backgoundImage,
  handleCancel
}) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  return (
    <div className='section' id='about' ref={ref}>
      <div className='container mx-auto'>
        <div className='flex flex-col gap-y-10 lg:flex-row lg:items-center  lg:gap-x-20 lg:gap-y-0 h-screen'>
          <motion.div
            variants={fadeIn('down', 0.5)}
            initial='hidden'
            whileInView='show'
            className='block lg:flex flex-1 max-w-[320px] lg:max-w-[482px] flex items-center justify-center'
          >
            {(!resultImage && previewImage) && (
              <img className={`${loading && 'opacity-25'}`} src={previewImage} alt='' width={500} height={500} />
            )}
            {resultImage && <img src={resultImage} alt='' />}
            {!selectedFile && <img src={Change} alt='' />}
          </motion.div>

          <motion.div
            variants={fadeIn('left', 0.5)}
            initial='hidden'
            whileInView='show'
            viewport={{ once: false, amount: 0.3 }}
            className='flex-1'
          >
            <h2 className='h2'>You can also change to any <span className='text-accent'>background</span></h2>
            <h3 className='h3 mb-4'>
              Just Upload Any Background
            </h3>
            {selectedFile && <input type='file' onChange={handleBackgroundChange} className='btn' />}
            {selectedFile && !hideButton && backgoundImage && (
              <button className='btn btn-lg' onClick={handleUpload}>Change</button>
            )}
            {(selectedFile && !hideButton && backgoundImage) && <button className='btn btn-sm' onClick={handleCancel}>Cancel</button>}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
