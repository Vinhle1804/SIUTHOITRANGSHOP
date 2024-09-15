import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../redux/slide/cartSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Header2 from '../components/header2';

const Nam = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortType, setSortType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch dữ liệu từ JSON Server
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();

      // Lọc sản phẩm chỉ có sex là 'male'
      const maleProducts = data.filter(product => product.sex === 'male');

      setProducts(maleProducts);
      setSortedProducts(maleProducts); // Thiết lập sản phẩm đã được sắp xếp ban đầu
    };

    fetchProducts();
  }, []);

  // Hàm xử lý sắp xếp sản phẩm
  const handleSort = (e) => {
    const selectedSort = e.target.value;
    setSortType(selectedSort);

    const sorted = [...products].sort((a, b) => {
      if (selectedSort === 'A') {
        return a.price - b.price; // Giá tăng dần
      } else if (selectedSort === 'B') {
        return b.price - a.price; // Giá giảm dần
      }
      return 0;
    });

    setSortedProducts(sorted);
  };

  // Hàm xử lý khi nhấn vào hình ảnh sản phẩm
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    dispatch(addtoCart(product)); // Dispatch hành động thêm sản phẩm vào giỏ hàng
  };

  // Hàm xử lý lọc theo loại sản phẩm (quần/áo)
  const handleFilter = (type) => {
    const filtered = products.filter(product => product.type === type);
    setSortedProducts(filtered);
  };

  return (
    <div className="bg-white p-2 pt-20 text-center w-full mx-auto">
      <Header2/>
      <h1 className='font-extralight'>
        <a href="/">Trang chủ</a> / Nam
      </h1>
      <img src="utils/carousel-nam.jpg" alt="hehe" />

      {/* Nút lựa chọn loại sản phẩm (Quần / Áo) */}
      <div className='flex justify-center pt-10 pb-6'>
        <button onClick={() => handleFilter('ao')}>
          <img src="utils/pr1.webp" alt="Quần" className='h-48 w-32 mr-4 cursor-pointer' />
        </button>  
        <button onClick={() => handleFilter('quan')}>
          <img src="utils/pr2.webp" alt="Áo" className='h-48 w-32 ml-4 cursor-pointer' />
        </button>
      </div>

{/* Sắp xếp sản phẩm */}
<div className="flex justify-between items-center pr-2">
  <div className='pl-4 flex-1 text-center'>
    <h1 className='font-bold text-xl ml-48'>{sortedProducts.length} sản phẩm</h1>
  </div>

  <div>
    <label htmlFor="sort">Sắp xếp theo: </label>
    <select id="sort" value={sortType} onChange={handleSort} className="border p-2">
      <option value="">Mặc định</option>
      <option value="A">Giá tăng dần</option>
      <option value="B">Giá giảm dần</option>
    </select>
  </div>
</div>


      {/* Danh sách sản phẩm */}
      <div className="flex justify-center pt-5 pb-20">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {sortedProducts.map((product) => (
            <div key={product.id} className="group relative cursor-pointer">
              {/* Hình ảnh sản phẩm */}
              <div
                className="w-[275px] h-[412px] overflow-hidden rounded-md bg-gray-200 relative"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                />
                <img
                  src={product.imageHoverSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center absolute top-0 left-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                />
              </div>

              {/* Thông tin sản phẩm */}
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}$</p>
              </div>

              {/* Nút Add to Cart và Buy Now */}
              <div className="mt-4 flex space-x-2">
                <button
                  className="w-full bg-gray-200 text-gray-900 text-sm py-2 px-4 rounded hover:bg-gray-300 transition flex items-center justify-center"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                </button>
                <button
                  className="w-full bg-red-500 text-white text-sm py-2 px-4 rounded hover:bg-green-600 transition"
                  onClick={() => handleProductClick(product.id)}
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

export default Nam;
