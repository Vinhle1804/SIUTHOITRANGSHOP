import React from 'react';
import BasicTextFields from '../components/testField';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

function Login() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    username: yup.string().required('Please input username'),
    password: yup.string().required('Please input password'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3000/userList');
        const users = await response.json();

        const user = users.find((user) => user.username === values.username && user.password === values.password);

        if (!user) {
          throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
        }

        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('user', JSON.stringify({ username: user.username }));

        alert('Đăng nhập thành công');
        formik.resetForm();
        navigate('/'); // Chuyển hướng đến trang home
      } catch (error) {
        alert(error.message);
      }
    },
  });

  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xs mx-auto">
        <h1 className="text-center text-red-600 font-bold text-xl mb-4">Đăng Nhập</h1>
        <form onSubmit={formik.handleSubmit} className="login-form">
          <BasicTextFields
            label="Username"
            placeholder="Duong Cao"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            required={true}
            error={Boolean(formik.touched.username && formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <BasicTextFields
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required={true}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Đăng Nhập
            </button>
          </div>
          <p className="text-center mt-4 text-gray-600 text-sm">
            Bạn chưa có tài khoản?{' '}
            <Link to="/register" className="text-red-500 hover:text-red-700 font-bold">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
