import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return(
        <div className="flex itmes-center justify-between gap-4 py-3 mt-20"> 
            <img src={assets.pixverse_logo} alt="" width={150} onClick={() => navigate("/")} className="cursor-pointer" />

            <p className="flex-1 mt-4 pl-4 border-l border-gray-400 text-sm text-gray-500 max-sm:hidden">Copyright @Void_Coder-01 | All rights reserved.</p>

            <div className="flex gap-2.5">
                <img src={assets.facebook_icon} alt="" width={35}/>
                <img src={assets.twitter_icon} alt="" width={35}/>
                <img src={assets.instagram_icon} alt="" width={35}/>
            </div>
        </div>
    )
}

export default Footer