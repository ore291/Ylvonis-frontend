import { Modal, Tooltip, Button, TextInput } from 'flowbite-react'
import React, { SetStateAction, useEffect, useState } from 'react'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import { RiImageAddFill } from 'react-icons/ri'
import { useCreatePlaylistMutation, useGetGenresQuery } from '@/store/api/song'
import Loading from '@/components/utils/Loading'

function AddNew(props: {
  show: boolean
  setShow: React.Dispatch<SetStateAction<boolean>>
}) {
  const [file, setFile] = useState(null)

  const [
    createPlaylist, // This is the mutation trigger
    { isLoading: isUpdating, isSuccess: isCreated }, // This is the destructured mutation result
  ] = useCreatePlaylistMutation()

  const handleSubmit = (values: any) => {
    const formData = new FormData()

    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('genre', values.genre)
    file && formData.append('file', file)

    createPlaylist(formData)
  }

  useEffect(() => {
    if (!isCreated) return

    isCreated && props.setShow(false)
  }, [isCreated])

  const formik = useFormik({
    initialValues: {
      name: '',

      genre: '',
      description: '',
    },
    onSubmit: handleSubmit,
  })

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e?.currentTarget?.files?.length > 0) {
      const image = e?.currentTarget?.files[0]
      setFile(image)
    }
  }

  const { data: genres, error, isLoading, isSuccess } = useGetGenresQuery(null)

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
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
                className="w-full"
              >
                <div className="flex gap-4 items-center">
                  <Tooltip content="Upload Playlist Image" placement="top">
                    {' '}
                    <label className="custom-file-upload cursor-pointer text-utilGray ">
                      <input
                        name="file"
                        onChange={(e) => handleFile(e)}
                        type="file"
                        className="hidden"
                        accept="image/png, image/gif, image/jpeg"
                      />
                      <RiImageAddFill size={40} />
                    </label>
                  </Tooltip>

                  <input
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Playlist Name"
                    className="bg-transparent outline-none !ring-0 !ring-none !focus:ring-0 !appearance-none  rounded w-full pt-4 pb-2 px-3 !text-white  border-0 focus:!border-b   "
                  />
                </div>
                <div className="my-2 flex flex-col space-y-2">
                  <select
                    onChange={formik.handleChange}
                    value={formik.values.genre}
                    defaultValue="choose"
                    id="genre"
                    className="bg-gray-900 border border-endBrand  text-sm rounded-lg focus:ring-brand focus:border-brand block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white bg:gray-800 text-white dark:focus:ring-brand dark:focus:border-brand"
                  >
                    <option value="choose" selected>
                      Choose a Genre
                    </option>
                    {isLoading ? (
                      <Loading w="3" h="3" />
                    ) : (
                      genres &&
                      genres.length > 0 &&
                      genres.map((genre: any) => (
                        <option
                          value={genre.id}
                          key={genre.id}
                          className="capitalize"
                        >
                          {genre.name}
                        </option>
                      ))
                    )}
                  </select>
                  <textarea
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    id="description"
                    name="description"
                    rows={2}
                    placeholder="Description..."
                    className="bg-gray-900 border border-brand  text-sm rounded-lg focus:ring-brand focus:border-brand block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white bg:gray-800 text-white dark:focus:ring-brand dark:focus:border-brand placeholder:text-gray-500 "
                  />
                </div>
                <div className="flex justify-end items-center gap-3 w-full !m-0 pt-5 ml-auto">
                  <Button
                    disabled={isUpdating}
                    className=" gradButton  w-1/4"
                    type="submit"
                  >
                    {isUpdating ? <Loading w="3" h="3" /> : 'Create'}
                  </Button>
                  <Button
                    className="w-1/4 bg-transparent capitalize  border-purple-600 border-solid border-2 p-1 hover:bg-brand hover:text-white !text-xs rounded"
                    onClick={() => props.setShow(false)}
                  >
                    cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default AddNew
