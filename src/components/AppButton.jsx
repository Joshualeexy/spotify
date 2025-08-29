const AppButton = ({text, onClick,className,isLoading,icon=null}) => {
  return (
  <button className={`bg-[#1DB954] hover:bg-green-600 active:opacity-70 text-center rounded-lg p-2 px-4 text-black cursor-pointer ${className}`} onClick={onClick}>
    {isLoading ? <div className="w-6 h-6 border-1 border-black rounded-full border-t-0 mx-auto animate-spin "/> : text && text} {icon && icon}
  </button> 
  )
}

export default AppButton
