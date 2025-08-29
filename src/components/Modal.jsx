import React from 'react'

const Modal = ({className,children}) => {
  return (
  <div className="w-full h-screen bg-black/70 fixed top-0 left-0 flex justify-center items-center backdrop-blur-sm">
    {children && children}
  </div>
  )
}

export default Modal
