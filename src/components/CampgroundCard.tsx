"use client"
import InteractiveCard from "./InteractiveCard";
import Image from 'next/image'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import campgroundService from "@/services/campground";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";


export default function CampgroundCard({campName, imgSrc, campId, isAdmin}: {campName:string, imgSrc:string, campId:string, isAdmin:boolean}){

    // const { data: session } = useSession();
    // useEffect(() => {
    //     if (session && session.user) {
    //     campgroundService.setToken(session.user.token);
    //     }
    //     console.log(session?.user?.role);
    // }, [session]);

    const handleDelete = async () => {
        try {
          if (campId) {
            if(isAdmin){
                const deletedCampground = await campgroundService.remove(campId);
                console.log("Campground deleted:", deletedCampground);
               }else{
                console.log("You don't have a permission.");
               }
          }else{
            console.log("Undefine campground id.")
          }
        } catch (error) {
          console.error("Error deleting campground:", error);
        }
    };
    console.log(isAdmin);


    return(
        <InteractiveCard contentName="Khaoyai">
            <div className=''>
                <div className='w-full h-[200px] relative'>
                    <Image
                    src={imgSrc}
                    alt='Picture'
                    fill={true}
                    className='object-cover rounded-t-lg'
                    />
                </div>
                { isAdmin ?
                    <div className='absolute right-0 flex flex-row'>
                    <Link href={{
                    pathname: `/campgrounds/create`,
                    query: {
                        campgroundId: campId,
                    },
                    }}>  
                    <EditIcon className='text-gray-500 mr-2 text-xl transition-transform duration-300 transform hover:scale-150'/></Link>
                    <div onClick={(e)=>{
                        e.stopPropagation();
                        e.preventDefault();
                        handleDelete();
                    }}><DeleteIcon className='text-red-500 text-xl transition-transform duration-300 transform hover:scale-150'/></div>
                </div> : null
                }
                <div className='h-[80px] w-full flex justify-center items-center'>
                    <p className='text-xl'>{campName}</p>
                </div>
            </div>
        </InteractiveCard>
    )
}