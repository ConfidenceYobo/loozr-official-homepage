import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import ReactSwipe from "react-swipe";
import slide1 from "../../assets/img/dashboard-banner.png";
import slide2 from "../../assets/img/slider3.jpg";
import slide3 from "../../assets/img/slider2.jpeg";
// import slide4 from "../../assets/img/slider3.jpg";

const Carousel = () => {
  let reactSwipeEl;
  const directionOffset = 800;

  const boxAnimation = {
    key: "box",
    initial: {
      opacity: 0,
      x: 400
      // scale: 0.5,
    },
    animate: {
      x: 0,
      opacity: 1,
      // scale: 1,
    },
    exit: {
      opacity: 0,
      x: -400
      // scale: 0.5,
    },
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  }

  const [isShown, setIsShown] = React.useState(0)
  const images: any = [slide1, slide2, slide3]

  const image: any = [
    {
      img: slide1,
      details: 'Introducing the Loozr Name Service (LNS) on Testnet: ',
      link: "https://medium.com/@officialloozr/introducing-the-loozr-name-service-lns-on-testnet-22e9799cd753",
      month: "Nov 16"
    },
    {
      img: slide2,
      details: 'Loozr Incentivized Testnet Roadmap: ',
      link: "https://medium.com/@officialloozr/loozr-incentivized-testnet-roadmap-bd80c133b6f3",
      month: "Oct"
    },
    {
      img: slide3,
      details: 'Loozr is bringing decentralized Music Investing and Streaming to the NEAR Protocol: ',
      link: "https://medium.com/@officialloozr/loozr-is-bringing-music-investing-and-streaming-to-the-near-protocol-5c8688b07c3",
      month: "Jun"
    },
  ]


  React.useEffect(() => {
    const t1 = setTimeout(() => {
      if (isShown === images.length - 1) {
        setIsShown(0)
      } else {
        setIsShown(prev => prev + 1)
      }
    }, 8000);
    return () => {
      clearTimeout(t1);
    }
  }, [isShown])


  return (
    <div className="h-[130px] md:h-[160px] mb-6 md:w-full relative rounded-[13px] overflow-hidden mx-[16px] md:mx-0" >
      {image.map((item: any, index: any) => {
        return (
          <AnimatePresence key={index} >
            {index === isShown &&
              <a target="_blank" rel="noreferrer" href={item.link} >
                <motion.div
                  key={item}
                  className=" w-screen md:w-full h-full absolute inset-x-0 top-0 bg-no-repeat bg-cover bg-center rounded-[13px] pl-8 py-7 flex flex-col justify-end "
                  style={{ background: `url(${item.img})`, borderRadius: '13px', backgroundColor: "none", backgroundPosition: "cover" }}
                  {...boxAnimation}
                >
                  {/* <div className=" bg-black bg-opacity-40 z-10 absolute inset-0 " /> */}
                  <p className=" relative z-20 text-white " >
                    <span className="text-loozr-purple relative z-20 font-medium text-[13px]">
                      MUSIC
                    </span>{" "}
                    <span className="text-xs relative z-20">/{item.month}</span>
                  </p>
                  {/* <p className="text-white relative z-20 font-semibold text-[17px] leading-7 max-w-[450px]">
                    {item.details}
                  </p> */}
                </motion.div>
              </a>
            }
          </AnimatePresence>
        )
      })}
    </div>
  )
};

export default Carousel;
