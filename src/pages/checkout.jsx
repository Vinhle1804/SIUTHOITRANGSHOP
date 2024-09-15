import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {
  const [cart, setCart] = useState([]); // Fixed state initialization
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu giỏ hàng từ localStorage
    const Cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(Cart);

    // Tính tổng giá trị giỏ hàng
    const totalPrice = Cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cart"); // Xóa giỏ hàng khỏi localStorage
    setCart([]); // Cập nhật lại state giỏ hàng
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra form đã nhập đầy đủ thông tin hay chưa
    if (!formData.name || !formData.address || !formData.phone || !formData.email) {
      Swal.fire({
        title: "Thiếu thông tin!",
        text: "Vui lòng điền đầy đủ thông tin thanh toán.",
        icon: "warning",
      });
      return;
    }

    // Kiểm tra giỏ hàng có sản phẩm không
    if (cart.length === 0) {
      Swal.fire({
        title: "Giỏ hàng trống!",
        text: "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.",
        icon: "warning",
      });
      return;
    }

    // Xác nhận thanh toán
    Swal.fire({
      title: "Xác nhận thanh toán",
      text: "Bạn có chắc chắn muốn thanh toán không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, thanh toán!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        // Tạo dữ liệu đơn hàng
        const newOrder = {
          items: cart,
          total: total,
          customerInfo: formData,
          date: new Date().toLocaleString(),
        };

        // Gửi yêu cầu POST để lưu đơn hàng lên json-server
        fetch("http://localhost:3000/ordersHistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrder),
        })
          .then((response) => response.json())
          .then((data) => {
            // Gọi hàm clearCart để xóa giỏ hàng khỏi localStorage và cập nhật state
            clearCart();

            // Thông báo thanh toán thành công
            Swal.fire("Thành công!", "Đơn hàng của bạn đã được đặt.", "success");

            // Điều hướng về trang chủ hoặc trang xác nhận đơn hàng
            navigate("/");
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire("Lỗi!", "Đã xảy ra lỗi trong quá trình thanh toán.", "error");
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Thanh toán</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Thông tin sản phẩm */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Sản phẩm trong giỏ</h2>
          {cart.length === 0 ? (
            <p>Giỏ hàng trống.</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-4 p-4 bg-gray-100 rounded-lg"
              >
                <div className="w-1/6">
                  <img
                    className="h-16 w-16 object-cover"
                    src={item.imageSrc}
                    alt={item.name}
                  />
                </div>
                <div className="w-3/6">
                  <p className="font-semibold">{item.name}</p>
                  <p>Số lượng: {item.quantity}</p>
                </div>
                <div className="w-2/6 text-right">
                  <p>{(item.price * item.quantity).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}</p>
                </div>
              </div>
            ))
          )}
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <h2 className="text-xl font-semibold">
              Tổng:{" "}
              {total.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </h2>
          </div>
        </div>

        {/* Form thanh toán */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Thông tin thanh toán</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-semibold">
                Họ và tên:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="address" className="block font-semibold">
                Địa chỉ:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-semibold">
                Số điện thoại:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Xác nhận thanh toán
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
