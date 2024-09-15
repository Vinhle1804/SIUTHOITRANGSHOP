import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Test3() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSmall(true);
      } else {
        setIsSmall(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-10 transition-all duration-300 ${
          isSmall ? 'bg-black text-white py-2' : 'bg-white text-gray-600 py-4'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo và mục điều hướng */}
          <div className="flex items-center space-x-4">
            <img
              src="https://routine.vn/media/amasty/webp/logo/websites/1/logo-black-2x_png.webp"
              alt="Logo"
              className="h-10"
            />
            <ul className="flex space-x-6 text-lg font-medium">
              <li className="hover:text-gray-300 cursor-pointer transition">NAM</li>
              <li className="hover:text-gray-300 cursor-pointer transition">NỮ</li>
              <li className="hover:text-gray-300 cursor-pointer transition">NEW</li>
              <li className="hover:text-gray-300 cursor-pointer transition">BEST</li>
            </ul>
          </div>

          {/* Thanh tìm kiếm */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                className="border-b border-gray-500 rounded-none px-9 py-2 w-64 focus:outline-none focus:ring-0 focus:border-blue-300 transition" 
                placeholder="Tìm kiếm" 
              />
              <button className="absolute left-3 top-2">
                <SearchIcon className="text-gray-900" />
              </button>
            </div>
          </div>

          {/* Các biểu tượng bên trái */}
          <div className="flex items-center space-x-6">
            <button className="hover:text-gray-300 transition">
              <PersonIcon className="w-6 h-6" />
            </button>
            <button className="hover:text-gray-300 transition">
              <FavoriteIcon className="w-6 h-6" />
            </button>
            <button className="hover:text-gray-300 transition">
              <ShoppingCartIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Nội dung bên dưới để có thể cuộn trang */}
      <div style={{ height: '2000px', paddingTop: '80px' }}>
        <h1 className="text-center mt-10">Nội dung trang</h1>
      </div>
    </>
  );
}

export default Test3;
