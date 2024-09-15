import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Test2() {
  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo và mục điều hướng */}
        <div className="flex items-center space-x-4">
          <img
            src="https://routine.vn/media/amasty/webp/logo/websites/1/logo-black-2x_png.webp"
            alt="Logo"
            className="h-10" // Điều chỉnh chiều cao logo tại đây
          />
          <ul className="flex space-x-6 text-lg font-medium text-gray-600"> {/* Điều chỉnh khoảng cách giữa logo và mục điều hướng */}
            <li className="hover:text-black cursor-pointer transition">NAM</li>
            <li className="hover:text-black cursor-pointer transition">NỮ</li>
            <li className="hover:text-black cursor-pointer transition">NEW</li>
            <li className="hover:text-black cursor-pointer transition">BEST</li>
          </ul>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="flex items-center space-x-4"> {/* Điều chỉnh khoảng cách giữa thanh tìm kiếm và nhóm biểu tượng */}
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
        <div className="flex items-center space-x-6 text-gray-600"> {/* Điều chỉnh khoảng cách giữa thanh tìm kiếm và nhóm biểu tượng */}
          {/* Biểu tượng con người */}
          <button className="hover:text-black transition">
            <PersonIcon className="w-6 h-6" />
          </button>
          {/* Biểu tượng trái tim */}
          <button className="hover:text-black transition">
            <FavoriteIcon className="w-6 h-6" />
          </button>
          {/* Biểu tượng giỏ hàng */}
          <button className="hover:text-black transition">
            <ShoppingCartIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Test2;
