import { Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const LogIn = () => {
  const [error, setError] = useState({ errorStatus: false, errorMessage: "" });
  const router = useRouter();

  const LoginFunction = async (values) => {
    const res = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    }).catch((e) => console.log(e));

    res.ok
      ? router.push("/Home")
      : setError({
          errorMessage: "The user or password is invalid",
          errorStatus: true,
        });
  };

  return (
    <div className="bg-black h-screen flex items-center">
      {/* Form */}
      <div className="max-w-xs mx-auto text-white p-8 border rounded  ">
        <h1 className="font-semibold text-lg">Log In</h1>
        <Formik
          onSubmit={LoginFunction}
          initialValues={{ username: "", password: "" }}
        >
          <Form>
            <label htmlFor="username">Username</label>
            <Field
              name="username"
              id="username"
              type="text"
              className="customizeForm"
              required
            />
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              id="password"
              type="password"
              className="customizeForm"
              required
            />
            <div
              className={`${error ? "block" : "hidden"} text-red-500 font-bold`}
            >
              {error.errorMessage}
            </div>

            <div className="flex justify-center">
            <button type="submit" className="bg-mygreen w-24 mt-5 p-1 rounded">
              Log In
            </button>
            </div>

          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LogIn;
