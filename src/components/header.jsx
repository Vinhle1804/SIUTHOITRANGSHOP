import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../redux/slide/cartSlice';
import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
  const [isSmall, setIsSmall] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false); 
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsSmall(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(id));
    } else {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
        text: 'Sản phẩm sẽ được xóa khỏi giỏ hàng!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có, xóa!',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removeItem(id));
        }
      });
    }
  };

  const handleRemoveItem = (id) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      text: 'Sản phẩm sẽ được xóa khỏi giỏ hàng!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, xóa!',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeItem(id));
      }
    });
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Xóa thông tin người dùng
    setShowUserMenu(false); // Đóng menu người dùng
    alert('Đăng xuất thành công'); // Thông báo
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isLoggedIn = !!localStorage.getItem('user'); // Kiểm tra xem người dùng đã đăng nhập hay chưa

  return (
    <>
      <header
        className={`fixed w-full top-0 z-10 transition-all duration-300 ${isSmall ? 'bg-white text-black py-3' : 'bg-transparent text-white py-4'}`}
      >
        <div className={`container mx-auto px-6 flex items-center ${isSmall ? 'justify-between' : 'justify-end'}`}>
          <div className={`flex items-center space-x-4 ${isSmall ? 'justify-center' : ''}`}>
          <a href="/"> 
            <img
            src={isSmall ? '/utils/logo-black-2_png.webp' : '/utils/logo-white-1_png.webp'}
            alt="Logo"
            className={`h-10 ${isSmall ? 'mx-auto' : ''}`}
          />
            </a>
            <ul className={`flex space-x-6 text-lg font-medium ${isSmall ? 'mx-4' : 'opacity-0 bg-transparent'}`}>
              <li className="hover:text-gray-300 cursor-pointer transition"><a href="/nam">NAM</a></li>
              <li className="hover:text-gray-300 cursor-pointer transition">NỮ</li>
              <li className="hover:text-gray-300 cursor-pointer transition">NEW</li>
            <a href="https://www.facebook.com/hi.all.people/"> <li className="hover:text-gray-300 cursor-pointer transition">CONTACT</li> </a>
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                className="border-b border-gray-500 rounded-none px-9 py-2 w-64 focus:outline-none focus:ring-0 focus:border-blue-300 transition bg-transparent" 
                placeholder="Tìm kiếm" 
              />
              <button className="absolute left-3 top-2">
                <SearchIcon className="text-gray-900" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={toggleUserMenu} className="hover:text-gray-300 transition">
              <PersonIcon className="w-6 h-6" />
            </button>
            <button className="hover:text-gray-300 transition">
              <FavoriteIcon className="w-6 h-6" />
            </button>
            <button onClick={() => setShowCart(!showCart)} className="hover:text-gray-300 transition">
              <ShoppingCartIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu người dùng */}
      {showUserMenu && (
        <div className="fixed right-0 top-16 w-40 bg-white shadow-lg z-20 p-4">
          {isLoggedIn ? (
            <>
              <a href="/user-info" className="block py-2 hover:text-red-500">Thông tin</a>
              <button onClick={handleLogout} className="block py-2 hover:text-red-500">Đăng xuất</button>
            </>
          ) : (
            <>
              <a href="/register" className="block py-2 hover:text-red-500">Đăng ký</a>
              <a href="/login" className="block py-2 hover:text-red-500">Đăng nhập</a>
            </>
          )}
        </div>
      )}

      {showCart && (
        <div className="fixed right-0 top-0 w-[400px] h-full bg-white shadow-lg z-20 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Giỏ hàng</h2>
            <button onClick={() => setShowCart(false)} className="text-red-500 font-bold">
              Đóng
            </button>
          </div>
          <div className="flex flex-col overflow-y-auto max-h-[500px]">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-4 p-4 bg-white shadow-sm">
                <div className="w-1/6">
                  <p className="font-semibold">{index + 1}</p>
                </div>
                <div className="w-1/6">
                  <img className="h-28 w-12 object-cover" src={item.imageSrc} alt={item.name} />
                </div>
                <div className="w-2/6">
                  <p className="font-semibold">{item.name}</p>

                  <button
                    onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                    className="px-2 py-1 text-gray-700 border border-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    className="px-2 py-1 text-gray-700 border border-gray-300 rounded"
                  >
                    +
                  </button>

                  <p>{(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
               
 
                </div>
                
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:underline ml-4"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-white shadow-sm">
            <h2 className="font-semibold text-xl">Tổng: {total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h2>
            <a href="/checkout">
              <button className="bg-indigo-500 text-white py-2 px-4 mt-2">Thanh toán</button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
