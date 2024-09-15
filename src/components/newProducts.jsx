import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addtoCart } from '../redux/slide/cartSlice'; // Import hành động addtoCart
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Swal from 'sweetalert2';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Khởi tạo hook useDispatch

  // Fetch dữ liệu từ JSON Server
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Hàm xử lý sự kiện khi nhấn vào sản phẩm
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Điều hướng tới trang chi tiết sản phẩm
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    dispatch(addtoCart(product)); // Dispatch hành động thêm vào giỏ hàng
    console.log('Sản phẩm đã được thêm vào giỏ hàng:', product);
  };

   // Hàm hiển thị thông báo bảo trì khi click vào nút "Buy Now"
   const handleBuyNowClick = () => {
    Swal.fire({
      icon: 'info',
      title: 'Thông báo',
      text: 'Chức năng Mua ngay hiện đang được bảo trì. Vui lòng quay lại sau!',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 item-center">HOT PRODUCT</h1>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative cursor-pointer"
            >
              {/* Hình ảnh sản phẩm */}
              <div 
                className="w-[275px] h-[412px] overflow-hidden rounded-md bg-gray-200 relative"
                onClick={() => handleProductClick(product.id)} // Điều hướng khi nhấn vào hình ảnh
              >
                {/* Ảnh gốc */}
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                />
                {/* Ảnh khi hover */}
                <img
                  src={product.imageHoverSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center absolute top-0 left-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                />
              </div>

              {/* Thông tin sản phẩm */}
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900 pr-6">{product.price}</p>
              </div>

              {/* Nút Add to Cart (thay bằng icon giỏ hàng) và Buy Now */}
              <div className="mt-4 flex space-x-2">
                <button 
                  className="w-full bg-gray-200 text-gray-900 text-sm py-2 px-4 rounded hover:bg-gray-300 transition flex items-center justify-center"
                  onClick={() => handleAddToCart(product)} // Thêm sản phẩm vào giỏ hàng
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                </button>
                <button
                  className="w-full bg-red-500 text-white text-sm py-2 px-4 rounded hover:bg-green-600 transition"
                  onClick={handleBuyNowClick} // Gọi hàm hiển thị thông báo bảo trì
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
