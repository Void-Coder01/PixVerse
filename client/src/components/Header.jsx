import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
    return(
        <div className='flex flex-col justify-center items-center text-center my-20'>
            <div className='inline-flex text-stone-500 text-center gap-2 border border-neutral-500 rounded-full bg-white px-6 py-1'>
                <p>Best text to image generator</p>
                <img src={assets.star_icon} alt="" />
            </div>

            <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Turn text to <span className='text-blue-600'>
                image</span>, in seconds</h1>

            <p className='text-center max-w-xl mx-auto mt-5 font-medium'>Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen</p>

            <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-3 flex items-center gap-2 rounded-full cursor-pointer'>
                Generate image
                <img className='h-6' src={assets.star_group} alt="" />
            </button>

            <div className='flex flex-wrap justify-center gap-3 mt-16'>
                {Array(6).fill('').map((item,index) => (
                    <React.Fragment key={index}>
                        <img src={index%2 === 0 ? 
                            assets.sample_img_2 : assets.sample_img_1
                        } 
                        alt="sample_img" key={index} width={70} className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' />
                    </React.Fragment>
                ))}
            </div>

            <p className='text-neutral-600 mt-2 '>Generated images from imagify</p>
        </div>
    )
}

export default Header;