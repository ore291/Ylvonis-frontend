import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import CustomInput from "../forms/CustomInput";
import { Formik, Form } from "formik";
import * as yup from "yup";


function MainPage() {
  const user = {
    profileImg: "/ckay2.png",
    name: "ckay ckay",
    posts:'',
    followers: '',
    following:''
  };

  const settings = [
    "data saver",
    "worldview",
    "language",
    "sound",
    "content",
    "device",
    "car",
    "privacy",
    "streaming",
    "storage",
    "notifications",
    "targeted ads",
    "about",
  ];

  const validationSchema = yup.object({
    username: yup.string(),
    // .required('Email is required')
    homeTown: yup.string(),
    biography: yup.string().max(400, "You can only use 400 words"),
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <main>
      {/* mobile settings view */}
      <section className="md:hidden">
        <div className="row-container p-2 my-4 gap-3">
          <div className=" relative h-20 w-20">
            <Image
              src={user.profileImg}
              alt=""
              sizes=""
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="rounded-full "
            />
          </div>
          <div className="mt- flex flex-col gap-0">
            <h1 className="text-xl font-bold capitalize">{user.name}</h1>
            <Link href={"/settings/profile"}>
              <span className="text-xsm text-utilGray ">view profile</span>
            </Link>
          </div>
          <div className="ml-auto cursor-pointer text-utilGray">
            <Link href={"/settings/profile"}>
              <BsChevronRight size={30} />
            </Link>
          </div>
        </div>
        <div>
          {settings.map((setting, index) => (
            <div
              className="row-container p-2 capitalize py-4 border-b-[0.5px] border-solid border-utilGray "
              key={index}
            >
              <div className="text-lg font-bold ">{setting}</div>
              <div className="ml-auto cursor-pointer text-utilGray">
                <Link href={`/settings/#`}>
                  <BsChevronRight size={30} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* desktop settings view */}
      <section className="hidden py-10 md:flex gap-2">
        <div className="w-1/4 overflow-scroll max-h-[68vh] rounded-md bg-bgGray">
          <div className="row-container p-2 capitalize py-4 cursor-pointer border-b-[0.5px] border-solid border-utilGray ">
            <div className="text-sm font-normal gradText ">
              Profile Settings
            </div>
            <div className="ml-auto cursor-pointer text-utilGray">
              <Link href={`/settings/profile`}>
                <BsChevronRight size={20} />
              </Link>
            </div>
          </div>

          {settings.map((setting, index) => (
            <div
              className="row-container p-2 capitalize cursor-pointer py-4 border-b-[0.5px] border-solid border-utilGray "
              key={index}
            >
              <div className="text-sm font-normal text-utilGray ">
                {setting}
              </div>
              <div className="ml-auto cursor-pointer text-utilGray">
                <Link href={`/settings/#`}>
                  <BsChevronRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="w-3/4 overflow-scroll max-h-[68vh] rounded-md bg-bgGray ">
          <div className="row-container p-2 my-4 gap-3">
            <div className=" relative h-20 w-20">
              <Image
                src={user.profileImg}
                alt=""
                sizes=""
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="rounded-full "
              />
            </div>
            <div className="mt- flex flex-col gap-0">
              <h1 className="text-xl font-bold capitalize">{user.name}</h1>
            </div>
            <div className="ml-auto mb-auto  flex  gap-2 cursor-pointer  text-utilGray">
              <button
                className="gradButton rounded-md  px-2 py-1 block !text-xs  capitalize"
                type="submit"
              >
                update profile
              </button>
              <button className="bg-transparent capitalize mr-2 border-purple-600 border-solid border-2 p-1 hover:bg-purple-500 hover:text-white !text-xs rounded">
                cancel
              </button>
            </div>
          </div>
          <Formik
            initialValues={{
              username: "",
              hometown: "",
              biography:""
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {() => {
              return (
                <Form action="">
                  <div className="flex justify-between mx-5 gap-4">
                    <CustomInput name="username" label="Username" type="text" />
                    <CustomInput
                      name="homeTown"
                      label="Home Town"
                      type="text"
                    />
                  </div>
                  <div className="mx-5 ">
                    <CustomInput
                      name="biography"
                      label="Short Biography"
                      type="textBox"
                    />
                  </div>

                  <div className="mx-5">
                    
                    <label className="block text-gray-400 text-sm pb-1 font-medium" htmlFor=''>
                      Genre

                    </label>
                    <select name="cars" id="cars" className="shadow capitalize bg-inputBg outline-none !ring-0 !ring-none !focus:ring-0 !appearance-none  rounded-lg w-full py-3 px-3 text-white leading-tight !focus:outline-none !focus:shadow-outline !border-0 child-hover:bg-transparent">
                      <option value="1">Afro Beat</option>
                      <option value="2">Hip Pop</option>
                      <option value="3">Volvo</option>
                      </select>
                    </div>
                  
                </Form>
              );
            }}
          </Formik>
          {/* */}
        </div>
      </section>
    </main>
  );
}

export default MainPage;
