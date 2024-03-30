import React from 'react'
import Photo from '../components/Photo'
import { useSelector } from 'react-redux';
import { AppState } from '../state/store';
import Verify from "../assets/svg/verify.svg";
import MusicCover1 from '../assets/img/artists/hbaa.png'
import MusicCover2 from '../assets/img/artists/hb.png'
import Comment from '../assets/svg/comment.svg'
import Retweet from '../assets/svg/retweet.svg'
import Share from '../assets/svg/share.svg'
import { BsHeart } from 'react-icons/bs';

export default function FeedsCard() {

    const user = useSelector((state: AppState) => state.user.userInfo);

    return (
        <div className='my-2'>
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
                    <div className="h-[300px] w-[1px] lg:w-[1px] bg-muted-50 mt-1 mb-1" />
                </div>
                <div className='flex flex-col items-left gap-4'>
                    <div className='flex items-center gap-4'>
                        <div>
                            <h2 className='font-[600] text-[14px]'>yobo_z <span className='text-muted'> bought</span> 0.143264 $DAVIDO <br /> <span className='font-[500]'> artist coins.</span></h2>
                        </div>
                        <button className='ml-10 bg-[#141922] py-2 px-3 rounded-xl text-[14px]'>BUY COIN</button>
                    </div>
                    <div className='flex items-center gap-4 '>
                        <div className="bg-new-100 text-[#F3EC4E] text-[12px] py-1 px-2 rounded-full">3.8732 $LZR</div>
                        <p className='text-muted text-[10px]'>5 mins ago</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <img src={MusicCover1} alt="" className='w-[250px] h-[250px] rounded-[14px]' />
                        <img src={MusicCover2} alt="" className='w-[250px] h-[250px] rounded-[14px]' />
                    </div>
                    <div className='flex items-center gap-4 w-full'>
                        <BsHeart size={25} />
                        <img src={Comment} alt="" className='w-[20px]' />
                        <img src={Retweet} alt="" className='w-[20px]' />
                        <img src={Share} alt="" className='w-[20px]' />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 items-center my-2">
                <div className="flex ">
                    <img src={MusicCover1} alt="" className='w-[30px] h-[30px] rounded-full border-sm border-color-[#0C0F15]' />
                    <img src={MusicCover1} alt="" className='w-[30px] h-[30px] rounded-full border-sm border-color-[#0C0F15] ml-[-16px] ' />
                </div>
                <p className='text-xs font-[600] text-muted'>200 holders .  3.1k likes</p>
            </div>
            <div className="h-px w-full lg:w-full bg-muted-50 mb-3" />
        </div>
    )
}
