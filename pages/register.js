import React, { useState } from "react";
import Head from "next/head";
import Layout from "../layout/layout";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiAtSymbol, HiFingerPrint, HiOutlinerUser } from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";

function register() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const onSubmit = async (e, { values }) => {
    console.log(formik.values);

    const data = {
      username: formik.values.username,
      email: formik.values.email,
      password: formik.values.password,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    await fetch("http://localhost:3000/api/auth/signup", options).then((res) =>
      res.json().then((data) => {
        if (data) {
          router.push("/");
        }
      })
    );
  };

  const formik = useFormik({
    initialValues: { username: "", email: "", password: "", cPassword: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Required"),
      password: Yup.string().required("Password is required").min(2).max(9),
      cPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Pls confirm your pa"),

      username: Yup.string().required("username is required").min(2).max(9),
    }),
    onSubmit,
  });
  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            officia?
          </p>
        </div>

        {/* form */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.username && formik.touched.username
                ? "!border-red-400"
                : ""
            }`}
          >
            <input
              type="text"
              placeholder="Username"
              {...formik.getFieldProps("username")}
              className={`${styles.input_text}`}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "!border-red-400"
                : ""
            }`}
          >
            <input
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
              className={`${styles.input_text} `}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "!border-red-400"
                : ""
            }`}
          >
            <input
              type={`${show ? "text" : "password"}`}
              placeholder="Password"
              className={`${styles.input_text}`}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>

          <div
            className={`${styles.input_group} ${
              formik.errors.cPassword && formik.touched.cPassword
                ? "!border-red-400"
                : ""
            }`}
          >
            <input
              type={`${show ? "text" : "password"}`}
              placeholder="Confirm Password"
              className={`${styles.input_text}`}
              {...formik.getFieldProps("cPassword")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>

          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-400 ">
          Have an account?{" "}
          <Link className="text-blue-700" href="/login">
            Sign In
          </Link>
        </p>
      </section>
    </Layout>
  );
}

export default register;
