import Head from "next/head";
import styles from "@/styles/Register.module.scss";
import { Poppins } from "@next/font/google";
import Header from "@/components/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import Image from "next/image";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email().required("Email is required"),
    mobile: yup
      .number()
      .typeError("Must be a number")
      .required("Mobile Number is required")
      .positive("Must be a positive number")
      .integer("Must be an integer"),
    address: yup.string().required("Address is required"),
    question1: yup.string().nullable(true).required("This field is required"),
    question2: yup.string().required("This field is required"),
  })
  .required();

export default function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const url = "http://localhost:4000/register";

  const onSubmit = (data) => {
    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    reset();

    toast.promise(resolveAfter3Sec, {
      pending: "Your details are being submitted",
      success: "Your details have been submitted",
      error: "Error Submitting your details 🤯",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className={`${poppins.className} ${styles.main}`}>
      <Header></Header>
      <div className={styles.notify}>
        <ToastContainer />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h3>Registration Form</h3>
        {/* name */}
        <div className={styles.first}>
          <div className={styles.firstName}>
            <input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
            />
            <p className={styles.alert}>{errors.firstName?.message}</p>
          </div>
          <div className={styles.lastName}>
            <input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
            />
            <p className={styles.alert}>{errors.lastName?.message}</p>
          </div>
        </div>
        {/* email and mobile */}
        <div className={styles.second}>
          {/* email */}
          <div className={styles.email}>
            <input
              className={styles.textinput}
              {...register("email")}
              type="text"
              placeholder="Email"
            />
            <p className={styles.alert}>{errors.email?.message}</p>
          </div>
          {/* mobile */}
          <div className={styles.mobile}>
            <input
              {...register("mobile")}
              type="text"
              placeholder="Mobile Number"
            />
            <p className={styles.alert}>{errors.mobile?.message}</p>
          </div>
        </div>
        {/* address and question1 */}
        <div className={styles.third}>
          {/* address */}
          <div className={styles.address}>
            <input {...register("address")} type="text" placeholder="Address" />
            <p className={styles.alert}>{errors.address?.message}</p>
          </div>
          {/* question1 */}
          <div className={styles.question1}>
            <label htmlFor="oldStudent">Old TUP Student?</label>
            <div className={styles.options}>
              <div>
                <input
                  {...register("question1")}
                  type="radio"
                  value="Yes"
                  id="Yes"
                />
                <label htmlFor="Yes">Yes</label>
              </div>
              <div>
                <input
                  {...register("question1")}
                  type="radio"
                  value="No"
                  id="No"
                />
                <label htmlFor="No">No</label>
              </div>
            </div>
            <p className={styles.alert}>{errors.question1?.message}</p>
          </div>
        </div>
        {/* question2 */}
        <div className={styles.question2}>
          <textarea
            {...register("question2")}
            id="question2"
            cols="30"
            rows="10"
            placeholder="Why do you want to study here ?"
          ></textarea>
          <p className={styles.alert}>{errors.question2?.message}</p>
        </div>
        <button className={styles.submit} type="submit">
          Submit
        </button>
      </form>
      <div className={styles.infos}>
        <div className={styles.vision}>
          <h3>VISION</h3>
          <p>
            A premier state university with recognized excellence in engineering
            and technology education at par with leading universities in the
            ASEAN region.
          </p>
        </div>
        <div className={styles.mission}>
          <h3>MISSION</h3>
          <p>
            The University shall provide higher and advanced vocational,
            technical, industrial, technological and professional education and
            training in industries and technology, and in practical arts leading
            to certificates, diplomas and degrees. It shall provide progressive
            leadership in applied research, developmental studies in technical,
            industrial, and technological fields and production using indigenous
            materials; effect technology transfer in the countryside; and assist
            in the development of small-and-medium scale industries in
            identified growth centers.
          </p>
        </div>
      </div>
      <div className={styles.logo}>
        <Image
          src="logo.svg"
          alt="logo"
          width={450}
          height={450}
          priority
        ></Image>
      </div>
    </div>
  );
}
