import React from 'react';
import BasicTextFields from '../components/testField';
import { Link, useNavigate } from 'react-router-dom'; // Nhập useNavigate
import { useFormik } from 'formik';
import * as yup from 'yup';

function Register() {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const validationSchema = yup.object({
    email: yup.string().email().required('Please input email again'),
    username: yup
      .string()
      .required('Please input username')
      .min(3, 'Minimum is 3 characters'),
    password: yup
      .string()
      .required('Please input password')
      .min(6, 'Minimum is 6 characters')
      .max(255, 'Maximum is 255 characters'),
    confirmPassword: yup
      .string()
      .required('Please input password')
      .min(6, 'Minimum is 6 characters')
      .max(255, 'Maximum is 255 characters')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3000/userList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
          }),
        });

        if (!response.ok) {
          throw new Error('Đăng ký không thành công');
        }

        alert('Đăng ký thành công');
        formik.resetForm();
        navigate('/login'); // Chuyển hướng đến trang đăng nhập
      } catch (error) {
        alert(error.message);
      }
    },
  });

  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xs mx-auto">
        <h1 className="text-center text-red-600 font-bold text-xl mb-4">Đăng Ký</h1>
        <form onSubmit={formik.handleSubmit} className="register-form">
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
            label="Email"
            placeholder="example@gmail.com"
            name="email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            required={true}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
          <BasicTextFields
            label="Confirm password"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            required={true}
            error={Boolean(
              formik.touched.confirmPassword && formik.errors.confirmPassword
            )}
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Đăng Ký
            </button>
          </div>
          <p className="text-center mt-4 text-gray-600 text-sm">
            Bạn đã có tài khoản?{' '}
            <Link to="/login" className="text-red-500 hover:text-red-700 font-bold">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
