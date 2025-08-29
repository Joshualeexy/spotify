import LoadingIcon from "./LoadingIcon"
const AppButton = ({text, onClick,className,isLoading,icon=null}) => {
  return (
  <button className={`bg-[#1DB954] hover:bg-green-600 active:opacity-70 text-center rounded-lg p-2 px-4 text-black cursor-pointer ${className}`} onClick={onClick}>
    {isLoading ? <LoadingIcon/> : text && text} {!isLoading && icon ? icon: ''}
  </button> 
  )
}

export default AppButton
