import React, { useState } from "react";
// components
import Banner from "./components/Banner";
import Header from "./components/Header";
import Nav from "./components/Nav";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Contact from "./components/Contact";
import axios from "axios";
import { AuthProvider } from "./AuthContext";
import Footer from "./components/Footer";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [backgoundImage, setBackgroundImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleImageClick = (image) => {
    setSelectedFile(image);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundChange = (event) => {
    setBackgroundImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!selectedFile) {
      alert("Please select an image");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image_file", selectedFile);

    if (backgoundImage) {
      formData.append("bg_image_file", backgoundImage);
    }

    try {
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          headers: {
            "X-Api-Key": "UTV4rPJxKry3ahjps7X9qzhK",
          },
          responseType: "arraybuffer",
        }
      );

      setResultImage(URL.createObjectURL(new Blob([response.data])));
      setLoading(false);
      setHideButton(true);
    } catch (error) {
      console.error("Error removing background:", error);
      alert("Error removing background. Please try again.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewImage("");
    setBackgroundImage(null);
    // // You can also clear the file input element by resetting its value
    // document.getElementById('fileInput').value = '';
  };

  return (
    <AuthProvider>
      <div className="bg-site bg-no-repeat bg-cover overflow-hidden">
        <Header
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isRegisterModalOpen={isRegisterModalOpen}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
        />
        <Banner
          handleFileChange={handleFileChange}
          selectedFile={selectedFile}
          resultImage={resultImage}
          previewImage={previewImage}
          handleUpload={handleUpload}
          loading={loading}
          hideButton={hideButton}
          handleCancel={handleCancel}
          setIsModalOpen={setIsModalOpen}
        />
        <Nav />
        <About
          handleBackgroundChange={handleBackgroundChange}
          selectedFile={selectedFile}
          resultImage={resultImage}
          previewImage={previewImage}
          handleUpload={handleUpload}
          loading={loading}
          hideButton={hideButton}
          handleImageClick={handleImageClick}
          backgoundImage={backgoundImage}
          handleCancel={handleCancel}
        />
        <Services />
        <Work />
        <Contact />
        {/* <div className="h-[4000px]"></div> */}
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
