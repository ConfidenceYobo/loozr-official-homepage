import React from 'react'

export default function FeatureSection() {
    return ( 
        <> 
            <div className=' w-full bg-[#8369F4] !text-[#0C0F15] px-6 md:px-20 py-8 lg:py-0 lg:pt-20 relative ' > 
                <div className=" ">
                    <p className="wow fadeIn !text-[#0C0F15] max-w-2xl txt !font-extrabold md:!leading-[52.5px] !text-4xl " data-wow-delay=".5s">
                        Convert your monthly music
                        subscriptions into investments. 
                    </p>
                    {/* <p className="wow txt !text-[14.6px] !leading-normal tracking-[0.4px] mt-4 !font-normal text-[#0C0F15] lg:max-w-2xl" >Loozr empowers creators through various services, which they can utilize via the following features:</p> */}
                     
                </div>
                <div className=' w-full  grid grid-cols-1 lg:grid-cols-4 gap-y-3 gap-[34px] mt-8 mb-20 ' >
                    <div className=' w-full ' > 
                        <p className=' txt font-bold mt-3 text-[20px] !text-[#0C0F15] leading-tight tracking-[0.3px] ' >Instant Tokenization & Trading</p>
                        <p className='wow txt !text-[14.7px] !font-normal mt-1 !text-[#0C0F15] tracking-[0.4px]  leading-normal ' >Investible music for all. </p>
                    </div>
                    <div className=' w-full ' > 
                        <p className=' txt font-bold mt-3 text-[20px] !text-[#0C0F15] leading-tight tracking-[0.3px] ' >Community-driven ownership </p>
                        <p className='wow txt !text-[14.7px] !font-normal mt-1  !text-[#0C0F15] tracking-[0.4px]  leading-normal ' >Take control of your content, launch your own independent economy, and succeed together. </p>
                    </div>
                    <div className=' w-full ' > 
                        <p className=' txt font-bold mt-3 text-[20px] !text-[#0C0F15] leading-tight tracking-[0.3px] ' >Transparency & smart contracts</p>
                        <p className='wow txt !text-[14.7px] !font-normal mt-1  !text-[#0C0F15] tracking-[0.4px]  leading-normal ' >Decentralizing finance, contracts, and establishing a completely open royalty and streaming accounting system.</p>
                    </div>
                    <div className=' w-full ' > 
                        <p className=' txt font-bold mt-3 text-[20px] !text-[#0C0F15] leading-tight tracking-[0.3px] ' >Secure and scalable </p>
                        <p className='wow txt !text-[14.7px] !font-normal mt-1  !text-[#0C0F15] tracking-[0.4px]  leading-normal ' >Transactions are carried out using the ICP Blockchain, a reliable and secure L1 with sharding support.</p>
                    </div>
                    <div className=' w-full ' > 
                        <p className=' txt font-bold mt-3 text-[20px] !text-[#0C0F15] leading-tight tracking-[0.3px] ' >Launchpad for creators </p>
                        <p className='wow txt !text-[14.7px] !font-normal mt-1  !text-[#0C0F15] tracking-[0.4px]  leading-normal ' >Web3-native crowdinvesting platform that allows you to start, fund, and trade the Next Big Talent.</p>
                    </div>
                    <div className=' w-full ' > 
                        <p className=' txt font-bold mt-3 text-[20px] !text-[#0C0F15] leading-tight tracking-[0.3px] ' >Lightning fast and self-sustainable</p>
                        <p className='wow txt !text-[14.7px] !font-normal mt-1  !text-[#0C0F15] tracking-[0.4px]  leading-normal ' >Instant payouts, better monetization, and directly rewarding artists, fans, and creators.</p>
                    </div>
                    <div className=' w-full ' > 
                        <p className=' txt font-bold mt-3 text-[20px] !text-[#0C0F15] leading-tight tracking-[0.3px] ' >Frictionless user experience </p>
                        <p className='wow txt !text-[14.7px] !font-normal mt-1  !text-[#0C0F15] tracking-[0.4px]  leading-normal ' >Web2 frontend feel, Web3 backend integration — No knowledge of crypto needed.</p>
                    </div>
                    <div className=' w-full ' > 
                        <p className=' txt font-bold mt-3 text-[20px] !text-[#0C0F15] leading-tight tracking-[0.3px] ' >Unlimited music distribution</p>
                        <p className='wow txt !text-[14.7px] !font-normal mt-1  !text-[#0C0F15] tracking-[0.4px]  leading-normal ' >Distribute with one click to over 220+ stores globally, including Tiktok & Youtube. Decentralize your finances and stats on-chain. Keep 100% of your song's royalties and rights.</p>
                    </div>
                    <div className=' w-full ' > 
                        <p className=' txt font-bold mt-3 text-[20px] !text-[#0C0F15] leading-tight tracking-[0.3px] ' >Mining via music streaming</p>
                        <p className='wow txt !text-[14.7px] !font-normal mt-1  !text-[#0C0F15] tracking-[0.4px]  leading-normal ' >Loozr's <span className=' text-white ' >#Listen2Earn</span> model allows music lovers to earn tokens whenever their favourite music is played.</p>
                    </div>
                </div> 
                <div className=' w-full lg:block hidden md:h-[400px] ' > 
                    <div className=' w-full flex absolute right-0 bottom-0 justify-end ' > 
                        <img className=' w-full md:w-[75%] ' src='/img/Feature.png' alt='' />
                    </div>
                </div>
            </div>
            {/* <div className=' px-6 md:!px-20 my-28  ' > 
                <div className=' bg-[#11151D] h-[140px] flex lg:justify-start justify-center pl-6 md:pl-[140px] items-center ' >
                    <p className=' txt !font-medium text-xl text-white ' >ROADMAP WORKING PERFECTLY </p>
                </div>
                <div className=' bg-[#11151D] mt-4 h-[140px] flex lg:justify-start justify-center pl-6 md:pl-[140px] items-center ' >
                    <p className=' txt !font-medium text-xl text-white ' >“TEAM”  WORKING PERFECTLY </p>
                </div>
            </div> */}
        </>
    )
}
