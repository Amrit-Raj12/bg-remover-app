import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginModal from './Login';
import RegisterModal from './Register';
import { useAuth } from '../AuthContext';
import Logo from '../assets/favicon.png'

const Header = ({ isModalOpen, setIsModalOpen, setIsRegisterModalOpen, isRegisterModalOpen }) => {

  const { authToken, userName, logout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const handleLogout = async () => {
    setIsLoading(true);
    if (authToken) {
      // Add API call to log out from the server
      const response = await fetch('https://zany-gold-sheep-robe.cyclic.app/users/v1/logoutAll', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        console.log('Logged out successfully');
        setIsLoading(false);
      } else {
        console.error('Failed to log out');
        setIsLoading(false);
      }

      // Call the logout method from the context
      logout();
    }
  };
  return <header className='py-8'>
    <div className='container mx-auto'>
      <div className='flex justify-between items-center'>
        <p className='text-gradient btn-link uppercase text-xl lg:flex lg:items-center'>
          <img src={Logo} alt='logo' width={50} height={50} className='hidden lg:block' />
          <span>Background Be <br /></span> <span className='text-white ml-1'>Gone</span>
        </p>
        {authToken ? <div className="relative group">
          <span className="mr-4 cursor-pointer text-gradient">{userName}</span>
          {isLoading ? (<button disabled type="button" className="btn focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            Loading...
          </button>) : <button
            className="btn hidden group-hover:block bg-gray-600 text-white px-2 py-1 rounded cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>}
        </div> : <span><button onClick={openModal} className='btn btn-sm'>Sign-in</button></span>}
      </div>
    </div>
    <AnimatePresence>
      {isModalOpen && <LoginModal closeModal={closeModal} setIsRegisterModalOpen={setIsRegisterModalOpen} closeRegisterModal={closeRegisterModal} />}
    </AnimatePresence>
    <AnimatePresence>
      {isRegisterModalOpen && <RegisterModal closeModal={closeRegisterModal} setIsModalOpen={setIsModalOpen} />}
    </AnimatePresence>
  </header>;
};

export default Header;
