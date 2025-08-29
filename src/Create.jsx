import AppButton from "./components/AppButton"
import { useState, useEffect } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import axios from "axios"


const Create = ({ isLoading, onClick,name }) => {
    const name = "Joshua"
    return (
        <>
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
                    <AppButton onClick={onClick} isLoading={isLoading} text={`Convert Liked Songs ➡  Playlist Now`} className="tracking-tighter shadow-inner shadow-white font-bold sm:text-xl py-3" />
                </div>
            </section>
        </>
    )
}

export default Create
