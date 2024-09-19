import SendMessage from "./SendMessage";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import "./Body.css";

function Body({ setStep, step }) {
  const [formData, setFormData] = useState({
    firstName: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");
  const [stepDirection, setStepDirection] = useState("next");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // `e` obyektini tekshiring

    const { firstName, phoneNumber } = formData;
    if (!firstName || !phoneNumber) {
      setMessage("Iltimos, majburiy maydonlarni to'ldiring.");
      return;
    }
    const message = `Yangi foydalanuvchi ma'lumotlari:\n\nIsm: ${firstName}\nTelefon: ${phoneNumber}`;
    try {
      await SendMessage(message);
      setMessage("Ma'lumotlar muvaffaqiyatli yuborildi!");
      setFormData({
        firstName: "",
        phoneNumber: "",
        addressTwo: "",
      });
      setStep(4);
    } catch (error) {
      setMessage("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    }
  };
  const previus = () => {
    setStepDirection("prev");
    setStep((step = 1));
  };
  const nextStep = () => {
    setStepDirection("next");
    if (step === 1 && formData.firstName.trim() === "") {
      return;
    }

    if (step === 2 && formData.phoneNumber.trim() === "") {
      return;
    }

    if (step === 3) {
      handleSubmit(); // `handleSubmit` ni to'g'ri chaqiradi
      return;
    }

    setStep(step + 1);
  };

  const variants = {
    initial: (direction) => ({
      x: direction === "next" ? "100%" : "-100%",
      opacity: 0,
    }),
    enter: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction === "next" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="container relative h-[99vh] mx-auto p-4">
      <AnimatePresence>
        <motion.div
          key={step}
          custom={stepDirection}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ type: "tween", duration: 0.5 }}
          className="page p-4 rounded"
        >
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <p className="text-center ml-[-130px] font-bold">
                  Ism familyangizni kiriting
                </p>
                <div className="flex mt-2 justify-center items-start">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Ismingizni kiriting"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="rounded-xl pb-16 pl-5 border-2 border-black w-full h-24 max-w-xs focus:outline-none focus:ring-0 autofill:bg-white autofill:text-black"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-7">
                  <button
                    type="button"
                    className="btn p-3 rounded-3xl w-full text-white bg-[#018FED] max-w-[280px]"
                    onClick={nextStep}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <p className="text-center ml-[-100px] font-bold">
                  Telefon raqamingizni kiriting
                </p>
                <div className="flex mt-2 justify-center items-start">
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Telefon raqamingiz"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="border-2 rounded-xl pl-5 border-black w-full h-24 max-w-xs pb-16 focus:outline-none focus:ring-0 autofill:bg-white autofill:text-black"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-center items-center mb-7 gap-4">
                  <button
                    type="button"
                    className="btn rounded-3xl p-3 w-full text-white bg-[#018FED] max-w-[280px]"
                    onClick={nextStep}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <div className="flex-grow justify-center items-start">
                  <p>Ma'lumotlaringiz to'g'rimi?</p>
                  <p>Ism: {formData.firstName}</p>
                  <p>Telefon: {formData.phoneNumber}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-center items-center mb-7 gap-4">
                  <button
                    type="button"
                    className="btn font-bold border-2 rounded-3xl w-full p-3 text-[#018FED] max-w-[280px]"
                    onClick={previus}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn rounded-3xl w-full p-3 text-white bg-[#018FED] max-w-[280px]"
                    onClick={nextStep}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <div className="flex flex-col items-center justify-center flex-grow">
                  <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                  <p className="text-center text-lg font-bold mb-4">
                    Tabriklaymiz! Sizning ma'lumotlaringiz jo'natildi.
                  </p>
                  <p className="text-center text-lg">
                    Tez orada mutaxassislarimiz bog'lanishadi.
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-7">
                  <a href="https://mehrigiyo.uz/uz/" className="btn-link">
                    <button
                      type="button"
                      className="btn rounded-3xl w-full p-3 text-white bg-[#018FED] max-w-[300px]"
                    >
                      Ko'proq ma'lumot olish uchun
                    </button>
                  </a>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Body;
