import React, { useState } from 'react'
import Photo from '../components/Photo'
import { useSelector } from 'react-redux';
import { AppState } from '../state/store';
import Verify from "../assets/svg/verify.svg";
import MusicCover1 from '../assets/img/artists/hbaa.png'
import MusicCover2 from '../assets/img/artists/hb.png'
import Comment from '../assets/svg/comment.svg'
import Retweet from '../assets/svg/retweet.svg'
import Share from '../assets/svg/share.svg'
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import Play from "../assets/svg/controls/play.svg";
import Pause from "../assets/svg/controls/pause.svg";

export default function FeedsCard() {

    const user = useSelector((state: AppState) => state.user.userInfo);
    const [playButton, setPlayButton] = useState(false)
    const [like, setLike] = useState(false)

    return (
        <div className='my-2 ml-[16px] md:!ml-0 w-full'>
            <div className='flex gap-4 items-start h-fit'>
                <div className='flex flex-col items-center gap-4 h-full'>
                    <div className="relative w-fit ">
                        <div className=" w-12 h-12 flex">
                            <Photo
                                alt=""
                                src={user?.photo}
                                userId={user?.accountPrincipal}
                                className="object-cover w-12 h-12 flex justify-center items-center rounded-full  "
                            />
                        </div>
                        <img src={Verify} alt="" className="absolute bottom-0 right-0 w-4 " />
                    </div>
                    <div className="h-[360px] md:h-[300px] w-[1px] lg:w-[1px] bg-muted-50 mt-1 mb-1" />
                </div>
                <div className='flex flex-col w-full gap-5 items-left'>
                    <div className='flex flex-col md:flex-row md:items-center items-left gap-2 md:gap-4 pr-[12px]'>
                        <div className='flex flex-col gap-[4px]'>
                            <h2 className='font-[600] text-[14px]'>yobo_z <span className='text-[#536079] text-[14px] font-normal'>bought</span> 0.143264 $DAVIDO <span className='text-[14px] font-normal'>artist coins.</span></h2>
                        </div>
                        <p className='text-muted text-[12px]'>5 mins ago</p>
                    </div>
                    <div className='flex items-center gap-4 '>
                        <div className="bg-new-100 text-[#F3EC4E] text-[12px] py-1 px-2 rounded-full">3.8732 $LZR</div>
                        <div className='bg-[#141922] py-2 px-3 w-fit font-medium rounded-xl text-[10px] md:text-[12px]'>BUY COIN</div>
                    </div>
                    <div className="flex gap-4 overflow-x-auto md:overflow-x-none">
                        <div className="relative flex-shrink-0" onMouseEnter={() => setPlayButton(true)} onMouseLeave={() => setPlayButton(false)}>
                            <img src={MusicCover1} alt="" className='w-[230px] h-[230px] rounded-[14px]' />
                            {playButton && (
                                <div className='absolute grid place-items-center top-0 left-0 w-full h-full'>
                                    <button
                                        style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                                        className="w-[50px] h-[50px] relative z-20 rounded-full flex justify-center items-center"
                                        onClick={() => setPlayButton(true)}
                                    >
                                        <img src={Play} alt="" className="cursor-pointer  w-4 h-6" />
                                    </button>
                                    {/* {playButton ? (
                                        <button
                                            style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                                            className="w-[50px] h-[50px] relative rounded-full flex justify-center items-center"
                                            onClick={() => setPlayButton(false)}
                                        >
                                            <img src={Pause} alt="" className="cursor-pointer w-4 h-5" />
                                        </button>
                                    ) : (
                                        <button
                                            style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                                            className="w-[50px] h-[50px] relative z-20 rounded-full flex justify-center items-center"
                                            onClick={() => setPlayButton(true)}
                                        >
                                            <img src={Play} alt="" className="cursor-pointer  w-4 h-6" />
                                        </button>
                                    )} */}
                                </div>
                            )}
                        </div>
                        <div className="relative flex-shrink-0" onMouseEnter={() => setPlayButton(true)} onMouseLeave={() => setPlayButton(false)}>
                            <img src={MusicCover2} alt="" className='w-[230px] h-[230px] rounded-[14px]' />
                            {playButton && (
                                <div className='absolute grid place-items-center top-0 left-0 w-full h-full'>
                                    <button
                                        style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                                        className="w-[50px] h-[50px] relative z-20 rounded-full flex justify-center items-center"
                                        onClick={() => setPlayButton(true)}
                                    >
                                        <img src={Play} alt="" className="cursor-pointer  w-4 h-6" />
                                    </button>
                                    {/* {playButton ? (
                                        <button
                                            style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                                            className="w-[50px] h-[50px] relative rounded-full flex justify-center items-center"
                                            onClick={() => setPlayButton(false)}
                                        >
                                            <img src={Pause} alt="" className="cursor-pointer w-4 h-5" />
                                        </button>
                                    ) : (
                                        <button
                                            style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                                            className="w-[50px] h-[50px] relative z-20 rounded-full flex justify-center items-center"
                                            onClick={() => setPlayButton(true)}
                                        >
                                            <img src={Play} alt="" className="cursor-pointer  w-4 h-6" />
                                        </button>
                                    )} */}
                                </div>
                            )}
                        </div>
                        <div className="flex-shrink-0 w-4 md:w-0"></div>
                    </div>
                    <div className='flex items-center gap-4 w-full'>
                        {like ? (
                            <div onClick={() => setLike(false)}>
                                <BsHeartFill size={20} color='#FF1744' />
                            </div>
                        ) : (
                            <div onClick={() => setLike(true)}>
                                    <BsHeart size={20} />
                            </div>
                        )}
                        <img src={Comment} alt="" className='w-[20px]' />
                        <img src={Retweet} alt="" className='w-[20px]' />
                        <img src={Share} alt="" className='w-[20px]' />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 items-center my-2">
                <div className="flex">
                    <img src={MusicCover1} alt="" className='w-[30px] h-[30px] rounded-full border-sm border-color-[#0C0F15]' />
                    <img src={MusicCover1} alt="" className='w-[30px] h-[30px] rounded-full border-sm border-color-[#0C0F15] ml-[-16px] ' />
                </div>
                <p className='text-xs font-normal text-muted'>200 holders <span><div className='w-[6px] h-[6px] mx-2 bg-muted rounded-full'></div></span> 3.1k likes</p>
            </div>
            <div className="h-px w-full lg:w-full bg-[#141922] mb-3" />
        </div>
    )
}
