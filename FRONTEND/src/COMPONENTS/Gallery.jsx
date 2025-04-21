import Masonry from "react-masonry-css";
import React, { useState, useEffect } from 'react';
import Checkbox from "./Checkbox";
import { MoreHorizontal } from "lucide-react"; // npm i lucide-react
import { useBoardContext } from "../Contexts/BoardProvider";
import api from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Gallery({ images }) {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const nav = useNavigate();

    const handleDropdownClick = (index, e) => {
        e.stopPropagation();
        setOpenDropdownId(openDropdownId === index ? null : index);
    };

    const { boards, loading } = useBoardContext()
    

    const handleProfileSave = async (id) => {
        try {
            const response = await api.post('/features/save', { id });
            console.log(response.data.message);
            alert(response.data.message)
            setOpenDropdownId(null);
        } catch (error) {
            console.error(error);
        }
}

    const handleBoardSave = async(id,boardId)=>{

        try{

            const response = await api.post('/features/saveToBoard',{postId:id,boardId:boardId});
            alert(response.data.message)
            console.log(response.data.message);
            setOpenDropdownId(null);



        }
        catch(error)
        {
            console.error(error);
            alert("FAILED TO SAVE")

        }
        finally{
            setOpenDropdownId(null);
        }






    }


    useEffect(() => {
        const closeDropdown = () => setOpenDropdownId(null);
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, []);

    const breakpointColumnsObj = {
        default: 5,
        1100: 3,
        700: 2,
        500: 1,
    };

    return (
        <div className="p-3 mt-5">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-6"
                columnClassName="masonry-grid_column"
            >
                {images?.map((src, index) => (
                    <div key={index} className="relative group" onClick={()=> nav('/info',{state:{src}})}> 
                        <img
                            key={index}
                            src={src.picturefile}
                            alt={`Gallery Image ${index + 1}`}
                            className="w-full rounded-lg shadow-md hover:opacity-80 mt-10"
                        />



                        <div className="absolute top-1 mt-1 mr-4 right-2">
                            <div className="relative">
                                <button
                                    className="p-2 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 shadow-md border-0"
                                    onClick={(e) => handleDropdownClick(index, e)}
                                >
                                   Save
                                </button>
                                {openDropdownId === index && (
                                    <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg py-1 z-10">
                                        <p className="text-xl ml-5 text-gray-600">Save to</p>
                                        <button className="block px-4 py-2 text-sm text-white-700  w-full text-left bg-black" onClick={()=>handleProfileSave(src._id)}>
                                            Profile
                                        </button>
                                        <p className="text-xl ml-5 text-gray-600">Boards</p>
                                        {/* {DISPLAY BOARDS DYNAMICALY} */}

                                        {
                                            boards?.map((board, i) => (
                                                <div key={i} className="flex items-center px-1 py-2 text-sm text-white-700 cursor-pointer">

                                                    <button className="block px-4 py-2 text-sm text-white-700  w-full text-left bg-black" onClick={()=>handleBoardSave(src._id,board._id)}>
                                                        {board.name}
                                                    </button>


                                                </div>
                                            ))}

















                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </Masonry>
        </div>
    );
}
