import AppButton from './components/AppButton';
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";

const Index = ({onClick,isLoading}) => {
  return (
        <section className="space-y-4 mx-auto w-10/12 sm:w-6/12 h-full flex flex-col pt-30 items-center font-mono ddtracking-widest">
        <div className="">
          <img src="/logo.png" className="w-40" alt="" />
        </div>
        <div className="text-gray-200 text-2xl sm:text-5xl font-extrabold">
          <h1 className="sm:-ml-14 -ml-8">Liked Songs <ArrowLongRightIcon className="w-10 inline" /> </h1>
          <h1 className="-mr-6">Playlist Finally. </h1>
        </div>

        <div className="text-center tracking-tighter">
          <p className="text-gray-200">Spotify gave us DMs before this.</p>
          <p className="text-gray-200">So we fixed it.</p>
        </div>
        <div className="text-center tracking-tighterw">
          <p className="text-gray-200">Instantly turn your liked songs into a playlist in one click.</p>
        </div>
        <div className="w-full"><AppButton onClick={onClick} isLoading={isLoading} text="Login with spotify" className="tracking-tighter shadow-inner shadow-white font-bold sm:text-xl py-3 w-full" />
        </div>
      </section>
  )
}

export default Index
