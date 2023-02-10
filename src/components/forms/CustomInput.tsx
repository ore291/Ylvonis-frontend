import React from 'react'

import { useField, ErrorMessage } from 'formik'

type CustomInputProps = {
  name: string
  label: string
  type?: string
  props?: any
  required?: boolean
  value?: string
  border? : boolean
}

const CustomInput = ({
  name,
  label,
  type,
  required,
  value,
  border,
  ...props
}: CustomInputProps) => {
  const [field, meta] = useField(name)
  return (
    <div className="mb-4 w-full">
      <label
        className="block text-gray-400 text-sm pb-1 font-medium"
        htmlFor={field.name}
      >
        {label}
      </label>
      <input
        autoComplete="off"
        className={`${
          meta.error && meta.touched ? '!border-red-500' : ''
        } ${
          border ? '!border !border-gray-50' : ''
        } shadow bg-inputBg outline-none !ring-0 !ring-none !focus:ring-0 !appearance-none  rounded-lg w-full py-3 px-3 text-white leading-tight !focus:outline-none !focus:shadow-outline !border-0`}
        {...field}
        {...props}
        required={required || false}
        type={type}
     
      />
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-300 text-xs"
      />
    </div>
  )
}

export default CustomInput
