import { Modal, Tooltip, Button } from "flowbite-react";
import React, { SetStateAction } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { RiImageAddFill } from "react-icons/ri";

function AddNew(props: {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}) {
  const validationSchema = yup.object({
    playistName: yup.string().max(80, "Playlist name is too long"),
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };
  
  return (
    <React.Fragment>
      <Modal
        show={props.show}
        size="md"
        position="center"
        popup={true}
        onClose={() => props.setShow(false)}
        className="child:child:bg-bgGray child:top-[30vh] md:child:!top-0"
      >
        <Modal.Header className="bg-transparent" />
        <Modal.Body className="!bg-transparent">
          <div className="space-y-6 px-4 pb- sm:pb- lg:px-4 xl:pb- bg-bgGray">
            <h3 className=" text-2xl font-semibold text-white">New Playlist</h3>
            <div className="w-full">
              <Formik
                initialValues={{
                  playListName: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {() => {
                  return (
                    <Form action="" encType="multipart/form-data" className="w-full">
                      <div className="flex gap-4 items-center">
                        <Tooltip content="Upload Playlist Image" placement="top" >
                          {" "}
                          <label className="custom-file-upload cursor-pointer text-utilGray ">
                            <input
                              type="file"
                              className="hidden"
                              accept="image/png, image/gif, image/jpeg"
                            />
                            <RiImageAddFill size={40} />
                          </label>
                        </Tooltip>

                        <input
                          type="text"
                          placeholder="Playlist Name"
                          className="bg-transparent outline-none !ring-0 !ring-none !focus:ring-0 !appearance-none  rounded w-full pt-4 pb-2 px-3 !text-white  border-0 focus:!border-b   "
                        />
                      </div>
                      <div className="flex justify-end items-center gap-3 w-full !m-0 pt-10 ml-auto">
                        <Button className=" gradButton  w-1/4" type="submit" >
                          Create
                        </Button>
                        <Button className="w-1/4 bg-transparent capitalize  border-purple-600 border-solid border-2 p-1 hover:bg-purple-500 hover:text-white !text-xs rounded" onClick={() => props.setShow(false)}>
                          cancel
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default AddNew;
