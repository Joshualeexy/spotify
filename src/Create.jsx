import AppButton from "./components/AppButton"
import { useState, useEffect } from "react"
import { ChevronDownIcon, PlusIcon, QuestionMarkCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"
import Modal from "./components/Modal"
import LoadingIcon from "./components/LoadingIcon"


const Create = ({ isLoading, setIsLoading, createPlaylist, name }) => {
    const [showModal, setShowModal] = useState(true)
    const cancel = () => {
        setIsLoading(false)
        setShowModal(false)
    }

    return (
        <>
            {showModal &&
                <Modal>
                    <div className="bg-black sm:w-5/12 w-10/12 shadow-inner shadow-green-700 rounded-lg p-6 space-y-8 max-w-md text-center">
                        <div className="flex w-full justify-between items-center px-6">
                            <QuestionMarkCircleIcon className="text-green-500 w-7" />
                            <h2 className="text-gray-400 font-bold">Create Playlist</h2>
                            <XCircleIcon className="text-red-600 w-7 hover:cursor-pointer" onClick={cancel} />
                        </div>
                        <div className="">
                            <input type="text" className="shadow-inner rounded-sm focus:border-0 focus:ring-0 focus:outline-0 text-white text-sm shadow-green-700 placeholder:text-gray-4  00 w-10/12 p-3" placeholder="Enter Playlist Name " />
                        </div>
                        <AppButton onClick={createPlaylist} text={`${isLoading ? 'Creating' : 'Create playlist'}`} className="font-medium  mt-4 flex mx-auto" icon={isLoading ? <LoadingIcon className="ml-1 my-auto !w-4 !h-4"/> : <PlusIcon className="ml-1 text-black w-5" />} />
                    </div>
                </Modal>
            }
            <div className=" w-full h-20 -mt-10 flex justify-between items-center px-10  ">
                <div className="">
                    <img src="/logo.png" className="w-30 mx-auto" alt="" />
                </div>
                <div className="">
                    <AppButton icon={<ChevronDownIcon className="w-5 ml-1" />} text={name} className="flex items-center " />
                </div>
            </div>

            <section className="space-y-4 mx-auto w-10/12 sm:w-6/12 h-full flex flex-col pt-30 items-center font-mono ddtracking-widest">
                <div className="text-gray-200 text-2xl sm:text-5xl font-extrabold">
                    <h1 className="sm:-ml-14 -ml-8">Welcome Back {name}! </h1>
                </div>

                <div className="text-center tracking-tighterw">
                    <p className="text-gray-200">Instantly turn your liked songs on spotify into a playlist.</p>
                </div>
                <div className="w-full text-center">
                    <AppButton onClick={() => { setShowModal(true) }} isLoading={isLoading} text={`Convert Liked Songs ➡  Playlist Now`} className="tracking-tighter shadow-inner shadow-white font-bold sm:text-xl py-3" />
                </div>
            </section>
        </>
    )
}

export default Create
