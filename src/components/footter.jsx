import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <div>
      <footer className="bg-gray-100 text-gray-800 pl-32">
        <div className="container mx-auto">
          <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4">Công ty TNHH ROUTINE VIETNAM</h3>
            <a href="https://routine.vn/gioi-thieu-ve-routine">  <p>Giới thiệu về ROUTINE</p> </a>
              <p>Văn phòng: tầng 5 Tòa nhà IMC, 62 Trần Quang Khải</p>
            </div>
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4">Chính sách khách hàng</h3>
              <ul>
                <li><a href="/ok" className="hover:underline">Chính sách đổi trả</a></li>
                <li><a href="/ok" className="hover:underline">Chính sách bảo hành</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4">Thông tin cửa hàng</h3>
              <ul>
                <li>Cửa hàng 34: ...</li>
                <li>Cửa hàng 33: ...</li>
              </ul>
              <a href="/ok" className="text-blue-500 hover:underline">Xem tất cả các cửa hàng</a>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <a href="/ok" className="text-2xl mx-2">
              <FacebookIcon />
            </a>
            <a href="/ok" className="text-2xl mx-2">
              <InstagramIcon />
            </a>
          </div>
          <div className="text-center mt-4">
            <p>&copy; 2023 ROUTINE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
