import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageHoverSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageHoverSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
];

export default function Test() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              {/* Hình ảnh sản phẩm */}
              <div className="w-[275px] h-[412px] overflow-hidden rounded-md bg-gray-200 relative">
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
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>

              {/* Nút Add to Cart (thay bằng icon giỏ hàng) và Buy Now */}
              <div className="mt-4 flex space-x-2">
                <button className="w-full bg-gray-200 text-gray-900 text-sm py-2 px-4 rounded hover:bg-gray-300 transition flex items-center justify-center">
                  <ShoppingCartIcon className="w-5 h-5" />
                </button>
                <button className="w-full bg-red-500 text-white text-sm py-2 px-4 rounded hover:bg-green-600 transition">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
