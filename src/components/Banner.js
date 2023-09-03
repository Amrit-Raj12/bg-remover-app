import React from "react";
import Remove from "../assets/remove.png";
import { BsDownload } from "react-icons/bs";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { RotatingSquare } from "react-loader-spinner";
import { useAuth } from "../AuthContext";

const Banner = ({
  handleFileChange,
  selectedFile,
  resultImage,
  previewImage,
  handleUpload,
  loading,
  hideButton,
  handleCancel,
  setIsModalOpen
}) => {
  const { authToken } = useAuth();
  return (
    <section
      className="min-h-[85vh] 1g:min-h-[78vh] flex items-center"
      id="home"
    >
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12">
          <div className="flex-1 text-center font-secondary 1g: text-left">
            <motion.h1
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="text-[55px] font-bold leading-[0.8] 1g:text-[110px] mb-4"
            >
              Welcome To <span>BackgroundBeGone!</span>
            </motion.h1>
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="mb-6 text-[36px] lg:text-[60px] font-secondary font-semibold uppercase leading-[1]"
            >
              <span className="mr-4">Just</span>
              <TypeAnimation
                sequence={["Upload", 2000, "Click", 2000, "Gone", 2000]}
                speed={50}
                className="text-accent"
                wrapper="span"
                repeat={Infinity}
              />
            </motion.div>
            <motion.p
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="text-[18px] mb-8 max-w-1g mx-auto 1g:mx-0"
            >
              Say goodbye to cluttered backgrounds with our cutting-edge
              Background Removal Service.{" "}
            </motion.p>
            <motion.div
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="flex max-w-max gap-x-6 items-center mb-12
            mx-auto 1g:mx-0"
            >
              {!selectedFile && (
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="btn cursor-pointer"
                  accept="image/*"
                />
              )}
              {selectedFile && !hideButton && (
                <button className="btn btn-lg" onClick={handleUpload}>
                  Remove
                </button>
              )}
              {selectedFile && !hideButton && (
                <button className="btn btn-sm" onClick={handleCancel}>
                  Cancel
                </button>
              )}
              {/* <a href='#' className='text-gradient btn-link'>My Portfolio</a> */}
            </motion.div>
            {/* <motion.div variants={fadeIn('up', 0.7)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }} className='flex text-[20px] gap-x-6 max-w-max mx-auto lg:mx-0'>
            <a href='#'>
              <FaYoutube />
            </a>
            <a href='#'>
              <FaGithub />
            </a>
            <a href='#'>
              <FaDribbble />
            </a>
          </motion.div> */}
          </div>
          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            whileInView={"show"}
            className="block lg:flex flex-1 max-w-[320px] lg:max-w-[482px] flex items-center justify-center"
          >
            {loading && (
              <RotatingSquare
                height="100"
                width="100"
                color="#9A4CA6"
                ariaLabel="rotating-square-loading"
                strokeWidth="4"
                wrapperStyle={{}}
                wrapperClass="absolute"
                visible={true}
              />
            )}
            {!selectedFile && <img src={Remove} alt="" />}
            {!resultImage && previewImage && (
              <img
                className={`${loading && "opacity-25"}`}
                src={previewImage}
                alt=""
              />
            )}
            {resultImage && (
              <div className="block">
                <img src={resultImage} alt="" />
                <div className="flex items-center justify-center mt-5">
                  {!authToken ? (
                    <p className="text-center">
                      If you want to download this image you have to login
                      first!{" "}
                      <span className="text-gradient cursor-pointer" onClick={() => setIsModalOpen(true)}>
                        Login
                      </span>
                    </p>
                  ) : (
                    <a
                      href={resultImage}
                      download="background_removed.png"
                      className="btn btn-sm w-[200px] flex items-center"
                    >
                      Download <BsDownload className="ml-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
