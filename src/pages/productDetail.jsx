import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState(null);

  // Fetch chi tiết sản phẩm dựa trên id
  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      const data = await response.json();
      console.log(data);
      setProduct(data);
    };

    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.imageSrc} alt={product.imageAlt} />
      <p>{product.description}</p>
      <p>Color: {product.color}</p>
      <p>Price: {product.price}</p>
    </div>
  );
};

export default ProductDetail;
