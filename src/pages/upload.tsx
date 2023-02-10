import LabelInput from '@/components/forms/LabelInput'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import React, { useState, useRef, useEffect } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { BsPlusCircleFill } from 'react-icons/bs'
import {
  MdArrowRight,
  MdArrowRightAlt,
  MdDelete,
  MdOutlineArrowForward,
} from 'react-icons/md'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Label, TextInput } from 'flowbite-react'
import { useSession } from 'next-auth/react'
import { FaCamera } from 'react-icons/fa'
import Image from 'next/image'
import Select from 'react-tailwindcss-select'
import { useGetGenresQuery, useUploadSongMutation } from '@/store/api/song'
import Loading from '@/components/utils/Loading'
import { roundToNearestMinutes } from 'date-fns'
import { useRouter } from 'next/router'
import useAuth from '@/hooks/useAuth'

const fileTypes = ['MP3', 'FLAC', 'WAV', 'AIFF', 'OGG', 'M4A']

// onDrop: (file) => {
// 	Object.assign(file[0], {
// 		preview: URL.createObjectURL(file[0])
// 	});

// 	const video = document.createElement("video");
// 	video.src = file[0].preview;

// 	video.addEventListener("loadedmetadata", () => {
// 		console.log(video.duration);
// 	});
// }

const Upload = () => {
  const isAuthenticated = useAuth(true)
  const { data: selectGenres, error, isLoading, isSuccess } = useGetGenresQuery(
    null,
  )

  const router = useRouter()
  const [file, setFile] = useState(null)
  const [duration, setDuration] = useState<number>(0)

  const [
    uploadSong, // This is the mutation trigger
    { isLoading: isUploading, isSuccess: isUploaded }, // This is the destructured mutation result
  ] = useUploadSongMutation()

  useEffect(() => {
    if (!isUploaded) return

    setFile(null)
    setCover(null)
    router.push('library/songs')
  }, [isUploaded])

  const handleChange = (file: any) => {
    setFile(file)
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    })
    const audio = document.createElement('audio')
    audio.src = file.preview
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
    })
  }
  const [cover, setCover] = useState(null)
  const handleImageChange = (e: any) => {
    const files = e.currentTarget.files
    setCover(files[0])
  }

  const [genres, setGenres] = useState([])

  const handleGenres = (values: any) => {
    console.log(values)

    setGenres(values)
  }

  const coverRef = useRef(null)

  const { data: session } = useSession()
  const validationSchema = yup.object({
    artist: yup.string().required('Artist is required'),
    name: yup.string().required('Required'),
    producers: yup.string(),
    featured: yup.string(),
    explicit: yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      artist: '',
      featured: '',
      producers: '',
      explicit: 'clean',
      name: '',
    },
    onSubmit: (values) => {
      if (values.artist == '' || values.name == '') {
        return alert('Artist and Song title is required')
      }
      const formData = new FormData()

      file != null && formData.append('audio', file)

      cover != null && formData.append('cover', cover)

      formData.append('trackLength', duration)
      formData.append('artist', values.artist)
      formData.append('name', values.name)
      formData.append('contentType', values.explicit)

      const featured = values.featured.split(',')

      if (featured.length > 0) {
        for (const feature in featured) {
          formData.append(`featured[${feature}]`, featured[feature])
        }
      }
      const producers = values.producers.split(',')

      if (producers.length > 0) {
        for (const producer in producers) {
          formData.append(`producers[${producer}]`, producers[producer])
        }
      }

      if (genres.length > 0) {
        for (const genre in genres) {
          formData.append(`genres[${genre}]`, genres[genre].value)
        }
      }

      uploadSong(formData)
    },
  })

  return (
    <Main
      meta={
        <Meta
          title="Ylvonis"
          description="Ylvonis Music"
        />
      }
      title="upload"
    >
      <div className="max-w-4xl md:mx-auto pt-6 mx-1 md:pt-3">
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="text-3xl font-semibold">
            Upload your music to <span className="gradText">Ylvonis!</span>
          </h2>
          <p className="text-utilGray text-sm">
            Ylvonis lets you upload for free.
          </p>
          <div className="my-5 w-full">
            <FileUploader
              multiple={false}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              maxSize={10}
              classes="file-uploader h-40"
            >
              <div className="flex flex-col space-y-2 items-center justify-center w-full max-h-min py-5 px-4 transition bg-[#1c1c1c] border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="text-xs">
                  Browse for files or drag and drop them here
                </span>
                <div className="w-48 my-3 h-12 bg-brand flex items-center justify-center space-x-1 rounded-full">
                  <BsPlusCircleFill />
                  <span className="text-sm font-semibold">
                    Browse to your file
                  </span>
                </div>
                <span className="text-xsm text-center text-utilGray">
                  Accepted file types are MP3, FLAC, WAV, AIFF, OGG, & M4A.
                  Limit of 10MB per file.
                </span>
                <span className="text-xs text-center  font-semibold leading-5 text-gray-400">
                  Uploading constitutes your acceptance of our Terms of Service
                  and Privacy Policy. Uploading music is reserved for Artists,
                  DJs, and Labels. Ylvonis is not for storing or sharing your
                  personal music collection or files. DO NOT upload any content
                  which infringes on the rights of 3rd parties. Users who upload
                  3rd party content will be banned from Ylvonis immediately.
                </span>
              </div>
            </FileUploader>
          </div>
        </div>
        {file != null ? (
          <div className="w-full bg-[#1c1c1c] pb-20">
            <div className="w-full p-2 py-5 flex items-center justify-between">
              <span className="text-white font-bold">{file?.name}</span>
              <button onClick={() => setFile(null)}>
                <MdDelete className="text-gray-400 w-6 h-6 hover:text-red-600" />
              </button>
            </div>
            <form onSubmit={formik.handleSubmit} className="w-full">
              <h2 className="text-3xl text-center font-semibold">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-1 md:p-2 md:py-10">
                <div>
                  <div className="relative inline-flex items-center justify-center w-full h-full  bg-gradient-to-r from-brand to-endBrand dark:bg-gray-600">
                    {cover ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={URL.createObjectURL(cover)}
                          className="object-fill"
                          fill
                          alt=""
                        />
                      </div>
                    ) : (
                      <span className="text-5xl font-medium text-white  dark:text-gray-300 uppercase">
                        {session?.user?.firstname.slice(0, 2)}
                      </span>
                    )}

                    <div
                      onClick={() => coverRef?.current?.click()}
                      className="cursor-pointer border-white absolute -bottom-2 inset-x-0 mx-auto rounded-full bg-green-500 w-32 z-10 h-10 flex items-center justify-center space-x-1"
                    >
                      <FaCamera />{' '}
                      <span className="text-white font-semibold text-sm">
                        Add Artwork
                      </span>
                    </div>
                    <input
                      type="file"
                      hidden
                      ref={coverRef}
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="flex w-full justify-center my-2">
                    <span className="text-center text-xsm text-gray-400  ">
                      Minimum 500x500 size,JPG or PNG
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-y-8">
                    <div className="md:col-span-2">
                      <LabelInput
                        id="artist"
                        name="artist"
                        required
                        label="Artist"
                        onChange={formik.handleChange}
                        value={formik.values.artist}
                      />
                    </div>
                    <LabelInput
                      id="name"
                      name="name"
                      required
                      label="Song Title"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    <LabelInput
                      id="featured"
                      name="featured"
                      label="Featuring"
                      note="(Separate names using commas)"
                      onChange={formik.handleChange}
                      value={formik.values.featured}
                    />
                    <LabelInput
                      id="producers"
                      name="producers"
                      label="Producer(s)"
                      note="(Separate names using commas)"
                      onChange={formik.handleChange}
                      value={formik.values.producers}
                    />
                    <div>
                      <label
                        htmlFor="explicit"
                        className="text-sm font-medium placeholder-gray-400 px-2 pt-1.5"
                      >
                        Explicit
                      </label>
                      <select
                        className="w-full px-2 pb-1.5 bg-[#333333] text-gray-400 focus:ring-0 focus:border-brand border-0   outline-none ring-0 child:text-sm"
                        id="explicit"
                        onChange={formik.handleChange}
                        value={formik.values.explicit}
                      >
                        <option value="clean">Clean</option>
                        <option value="explicit">Explicit</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:p-2 my-4">
                <Select
                  primaryColor={'violet'}
                  loading={isLoading}
                  isMultiple
                  isSearchable
                  value={genres}
                  placeholder="Select a genre"
                  onChange={handleGenres}
                  classNames={{
                    menuButton: ({ isDisabled }) =>
                      `flex bg-[#333333] mx-1 md:mx-2 text-sm text-gray-500 rounded shadow-sm focus:outline-none ${
                        isDisabled
                          ? 'bg-gray-200'
                          : 'bg-[#333333]    focus:border-0 focus:ring-0 focus:ring-0'
                      }`,
                    menu: 'bg-[#333333] !text-white',
                    list: 'overflow-hidden bg-[#333333] ',
                    listItem: ({ isSelected }) =>
                      `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                        isSelected
                          ? `text-white bg-blue-500`
                          : `text-gray-500 hover:bg-brand hover:text-white`
                      }`,
                  }}
                  options={
                    selectGenres &&
                    selectGenres.map((genre: any) => ({
                      value: genre.id,
                      label: genre.name.toUpperCase(),
                    }))
                  }
                />
              </div>

              <div className="my-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-36 h-10 rounded-full bg-brand text-white flex items-center justify-center"
                >
                  {isUploading ? (
                    <Loading w="3" h="3" />
                  ) : (
                    <span className="flex items-center justify-center space-x-1">
                      Upload <MdOutlineArrowForward className="w-6 h-6" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </Main>
  )
}

export default Upload
