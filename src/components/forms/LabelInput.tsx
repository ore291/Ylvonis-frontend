// @ts-nocheck
import { spawn } from 'child_process'
import { useRef } from 'react'

const Input = (props) => {
  const {
    id,
    note = '',
    wrapperClassName = '',
    placeholder = '',
    label = '',
    type = 'text',
    error = false,
    errorText = '',
    required = false,
    ...rest
  } = props

  const inputRef = useRef()

  return (
    <div className={wrapperClassName}>
      <div
        className={`border-0 transition duration-150 ease-in-out ${
          error
            ? 'focus-within:border-red border-red-500'
            : 'focus-within:border-primary border-gray-400'
        }`}
        onClick={() => inputRef.current.focus()}
      >
        <label
          htmlFor={id}
          className="text-sm font-medium placeholder-gray-400 px-2 pt-1.5"
        >
          {label} {required && <span className="text-red-500 ">*</span>}{' '}
          {note != "" && <span className="text-xsm text-utilGray">{note}</span>}
        </label>
        <input
          ref={inputRef}
          type={type}
          className="w-full px-2 pb-1.5 bg-[#333333] text-gray-400 focus:ring-0 focus:border-brand border-0   outline-none ring-0 "
          id={id}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      {errorText && <p className="text-xs pl-2  text-red mb-4">{errorText}</p>}
    </div>
  )
}

export default Input
