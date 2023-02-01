import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import userSlice, { login } from "../../features/twitter/userSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function Register() {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  return (
    <Formik
      validateOnChange={false}
      initialValues={{ email: "", username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(login(values));
      }}
    >
      <div className="absolute bg-gray-600/50 w-full h-full flex justify-center items-center">
        <div className="bg-black w-[500px] h-[550px] rounded-3xl flex flex-col items-center">
          <Form className="flex flex-col w-[60%] text-gray-400">
            <img
              className="mx-auto my-4"
              draggable="false"
              width="48"
              alt="Twitter-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/64px-Twitter-logo.svg.png"
            />
            <h1 className="text-3xl text-white font-semibold mb-4">Login</h1>
            <div className="flex flex-col min-h-[75.5px]">
              <Field
                className="bg-black border-gray-600 border-2 p-2 outline-none rounded-md"
                placeholder="Email"
                name="email"
              />
              <span className="bg-red-500/10 text-red-500 text-center w-1/2 mx-auto rounded-md m-1 font-medium">
                <ErrorMessage name="email" />
              </span>
            </div>
            <div className="flex flex-col min-h-[75.5px]">
              <Field
                className="bg-black border-gray-600 border-2 p-2 outline-none rounded-md"
                placeholder="username"
                name="username"
              />
              <span className="bg-red-500/10 text-red-500 text-center w-1/2 mx-auto rounded-md m-1 font-medium">
                <ErrorMessage name="username" />
              </span>
            </div>
            <div className="flex flex-col min-h-[75.5px]">
              <Field
                className="bg-black border-gray-600 border-2 p-2 outline-none rounded-md"
                placeholder="password"
                name="password"
                type="password"
              />
              <span className="bg-red-500/10 text-red-500 text-center w-1/2 mx-auto rounded-md m-1 font-medium">
                <ErrorMessage name="password" />
              </span>
            </div>
            <button
              className="bg-white p-2 rounded-xl text-black font-semibold"
              type="submit"
            >
              Login
            </button>
          </Form>
          {userReducer.user === "" && (
            <div className=" bg-red-500/50 w-[500px] h-[550px] rounded-3xl flex justify-center items-center">
              <h1 className="text-3xl text-white font-semibold">
                Invalid Credentials
              </h1>
            </div>
          )}
        </div>
      </div>
    </Formik>
  );
}

export default Register;
