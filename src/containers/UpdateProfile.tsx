import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { ReactComponent as HelpIcon } from "../assets/icons/help.svg";
import Edit from "../assets/Edit.png";
import ToolTip from "../components/Tooltip";
import { AppState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { MIXER_ACCOUNT, TOAST_OPTIONS } from "../config/constants";
import { toastHttpError } from "../utils/httpHelper";
import { useUpdateProfileCallback } from "../state/user/hooks/useAccount";
import { toast } from "react-toastify";
import { updateProfile } from "../state/user/userReducer";
import Photo from "../components/Photo";
import { jsonToUser } from "../utils";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
    const [isLoading, setLoading] = useState(false); 
    const [image, setImage] = React.useState('');  
    const [selectedImage, setSelectedImage] = React.useState('');  
    const dispatch = useDispatch();
    const { handleUpdateProfile } = useUpdateProfileCallback();
    const user = useSelector((state: AppState) => state.user.userInfo);
    const lzrAccountPrincipal = `${user.accountPrincipal}`;
  
    const profileEditSchema = yup.object({
      username: yup.string().required("Please enter full name").nullable(),
      website: yup.string(),
      country: yup.string(),
      bio: yup.string(),
    });
  
    const formik = useFormik({
      initialValues: {
        username: user.username ?? "",
        email: user.email ?? "",
        website: user.website ?? "",
        twitterLink: user.twitterLink ?? "", 
        soundCloudLink: user.soundCloudLink ?? "",
        instagramLink: user.instagramLink ?? "",
        spotifyLink: user.spotifyLink ?? "",   
        country: user.country ?? "",
        bio: user.bio ?? "",
      },
      validationSchema: profileEditSchema,
      onSubmit: () => {},
    });

    const navigate = useNavigate()
  
    useEffect(() => {
      formik.setValues({
        ...formik.values,
        username: user.username,
        website: user.website,
        bio: user.bio,
        country: user.country,
      });
    }, [user.username, user.country, user.bio, user.website]);
  
    const handleSubmit = async () => {
      if (!formik.dirty) {
        return;
      } else if (!formik.isValid) {
        return;
      }
      setLoading(true);
      try {
        const result = await handleUpdateProfile(formik.values);
        const user = jsonToUser(result);
        setLoading(false);
        dispatch(updateProfile(user));
        toast.success("Profile updated!", TOAST_OPTIONS);
        setShowModal(true)
      } catch (err: any) {
        setLoading(false);
        toastHttpError(err);
      }
    };

    const [showModal, setShowModal] = React.useState(false)
  
    const handleImageChange = (e: any ) => {
  
      const selected = e.target.files[0]; 
      const TYPES = ["image/png", "image/jpg", "image/jpeg" ];        
      if (selected && TYPES.includes(selected.type)) {
          setImage(selected)
          const reader: any = new FileReader();
          reader.onloadend= () => {  
            setSelectedImage(reader.result)
          }
          reader.readAsDataURL(selected)
      } else {
          console.log('Error')
      }  
  
      // setSelectedImage(selected)
    } 

    const genres = ["Acoustic", "Ambient", "Afro", "Amapiano", "Blues", "Country", "Classical", "Electric", "Emo", "Folk", "Hardcore", "Hip-hop", "Indie", "Jazz", "Latin", "Metal", "Pop", "Pop punk", "Punk", "Raggae", "R&B", "Rock", "Soul", "World"]
  
  return (
    <div className=" w-full flex flex-col items-center pt-8 md:pt-14 md:px-0 px-6 " > 
        <div className=" max-w-full md:max-w-[550px] mt-[70px] md:px-0 md:mt-0">
            <p className="font-medium text-base md:text-2xl text-white">
                Update your artist profile
            </p>
            <p className=" text-[13px] text-[#536079] font-medium mt-[4px] leading-tight md:w-[429px] mb-4" >Provide proof of your musical background to validate
                your status as an official musician.</p>
            <div className="flex items-center mb-8">
                <div className="relative  w-[90px] h-[90px] ">
                {!selectedImage && ( 
                    <Photo
                        alt="" 
                        src={selectedImage}
                        className="rounded-full w-[90px] h-[90px] object-cover"
                        style={{ border: "8px solid #141922" }}
                    />
                )}
                {selectedImage && ( 
                    <img src={selectedImage} 
                    style={{ border: "8px solid #141922" }} className="rounded-full w-[90px] h-[90px] object-cover " /> 
                )}
                <label className=" w-[33px] h-[33px] cursor-pointer absolute -bottom-2 -right-1 rounded-full bg-[#141922] flex justify-center items-center " > 
                    <img src={Edit} className=" w-[15px] h-[15px] " alt="Edit" /> 
                    <input style={{display:'none'}} type="file" accept="image/*" id="input" onChange={handleImageChange} />
                </label>
                </div>
                <div className=" ml-3 " >
                    <p className="text-lg text-white font-semibold ">
                        {lzrAccountPrincipal}
                    </p>
                    <label className="text-[#FFCD43] cursor-pointer text-[13px] font-medium">
                        change profile picture
                        <input style={{display:'none'}} type="file" accept="image/*" id="input" onChange={handleImageChange} />
                    </label>
                </div>
            </div>
            <div className="grid md:px-0 px-6 grid-cols-1 md:grid-cols-2 gap-6 justify-start mb-10">
                <div className=" flex flex-col ">
                    <input
                        type="text"
                        className="px-7 py-2 h-11 text-muted text-[13px] placeholder:text-muted"
                        style={{ backgroundColor: "#12161F" }}
                        placeholder="Enter full name"
                        name="username"
                        defaultValue={user.username ?? ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onFocus={() => formik.setFieldTouched("username", true, true)}
                    /> 
                    <div className=" w-full h-auto pt-2" >
                        {formik.touched.username && formik.errors.username && (
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-xs font-Inter-SemiBold text-[#F25341]"
                            // style={{ marginTop: "-32px" }}
                        >
                            {formik.errors.username}
                        </motion.div>
                        )}  
                    </div> 
                    <input
                        type="text"
                        className="px-7 py-2 h-11 mt-2 text-muted text-[13px] placeholder:text-muted"
                        style={{ backgroundColor: "#12161F" }}
                        name="website"
                        defaultValue={user.website ?? ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onFocus={() => formik.setFieldTouched("website", true, true)}
                        placeholder="Website link"
                    />
                    <div className=" w-full h-auto pt-2" >
                        {formik.touched.website && formik.errors.website && (
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-xs font-Inter-SemiBold text-[#F25341]"
                            // style={{ marginTop: "-32px" }}
                        >
                            {formik.errors.website}
                        </motion.div>
                        )}  
                    </div>
                    <input
                        type="text"
                        className="px-7 py-2 h-11 mt-2 text-muted text-[13px] placeholder:text-muted"
                        style={{ backgroundColor: "#12161F" }}
                        name="twitterLink"
                        defaultValue={user.twitterLink ?? ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onFocus={() => formik.setFieldTouched("twitterLink", true, true)}
                        placeholder="Twitter link"
                    />
                    <div className=" w-full h-auto pt-2" >
                        {formik.touched.twitterLink && formik.errors.twitterLink && (
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-xs font-Inter-SemiBold text-[#F25341]"
                            // style={{ marginTop: "-32px" }}
                        >
                            {formik.errors.twitterLink}
                        </motion.div>
                        )}  
                    </div>
                    <input
                        type="text"
                        className="px-7 py-2 h-11 mt-2 text-muted text-[13px] placeholder:text-muted"
                        style={{ backgroundColor: "#12161F" }}
                        name="spotifyLink"
                        defaultValue={user.spotifyLink ?? ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onFocus={() => formik.setFieldTouched("spotifyLink", true, true)}
                        placeholder="Spotify link"
                    />
                    <div className=" w-full h-auto pt-2" >
                        {formik.touched.spotifyLink && formik.errors.spotifyLink && (
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-xs font-Inter-SemiBold text-[#F25341]"
                            // style={{ marginTop: "-32px" }}
                        >
                            {formik.errors.spotifyLink}
                        </motion.div>
                        )}  
                    </div> 
                </div>
                <div
                    className="flex flex-col"
                    style={{
                        gridTemplateRows: "auto minmax(0,1fr)",
                    }}
                    >
                    <input
                        type="text"
                        className="px-7 py-2 h-11 text-white text-[13px] placeholder:text-muted"
                        style={{ backgroundColor: "#12161F" }}
                        placeholder="uneditable_input@email.com*"
                        defaultValue={user.email}
                        disabled
                    /> 
                    <div className=" w-full h-auto pt-2" >
                        {formik.touched.email && formik.errors.email && (
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-xs font-Inter-SemiBold text-[#F25341]"
                            // style={{ marginTop: "-32px" }}
                        >
                            {formik.errors.email}
                        </motion.div>
                        )}  
                    </div>
                    <textarea
                        className="px-[18px] h-[105px] py-3 mt-2 text-muted text-[13px] placeholder:text-muted resize-none"
                        style={{ backgroundColor: "#12161F" }}
                        placeholder="Bio"
                        defaultValue={user.bio ?? ""}
                        name="bio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onFocus={() => formik.setFieldTouched("bio", true, true)}
                    ></textarea>
                    <div className=" w-full h-auto pt-2" >
                        {formik.touched.bio && formik.errors.bio && (
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-xs font-Inter-SemiBold text-[#F25341]"
                            // style={{ marginTop: "-32px" }}
                        >
                            {formik.errors.bio}
                        </motion.div>
                        )}  
                    </div>
                    <input
                        type="text"
                        className="px-7 py-2 h-11 mt-2 text-muted text-[13px] placeholder:text-muted"
                        style={{ backgroundColor: "#12161F" }}
                        name="instagramLink"
                        defaultValue={user.instagramLink ?? ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onFocus={() => formik.setFieldTouched("instagramLink", true, true)}
                        placeholder="Instagram link"
                    />
                    <div className=" w-full h-auto pt-2" >
                        {formik.touched.instagramLink && formik.errors.instagramLink && (
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-xs font-Inter-SemiBold text-[#F25341]"
                            // style={{ marginTop: "-32px" }}
                        >
                            {formik.errors.instagramLink}
                        </motion.div>
                        )}  
                    </div>
                    <input
                        type="text"
                        className="px-7 py-2 h-11 mt-2 text-muted text-[13px] placeholder:text-muted"
                        style={{ backgroundColor: "#12161F" }}
                        name="soundCloudLink"
                        defaultValue={user.soundCloudLink ?? ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onFocus={() => formik.setFieldTouched("soundCloudLink", true, true)}
                        placeholder="Souncloud link"
                    />
                    <div className=" w-full h-auto pt-2" >
                        {formik.touched.soundCloudLink && formik.errors.soundCloudLink && (
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-xs font-Inter-SemiBold text-[#F25341]"
                            // style={{ marginTop: "-32px" }}
                        >
                            {formik.errors.soundCloudLink}
                        </motion.div>
                        )}  
                    </div>
                </div>
            </div> 
            <button
                className="py-[17px] text-white disabled:text-muted font-medium md:text-[13px] bg-gradient-ld disabled:bg-dark-800 mb-11 w-[48%] focus:outline-none"
                onClick={handleSubmit}
                // onClick={()=> setShowModal(true)}
                disabled={isLoading}
            >
                {isLoading ? " Updating..." : " Update profile"}
            </button>
        </div>
        {showModal && (
            <div className=" fixed inset-0 flex justify-center items-center md:overflow-y-hidden bg-black bg-opacity-90 z-[70] " > 
                <div className=' w-full h-screen flex flex-col justify-center  md:w-[360px] md:h-auto relative z-[80]  md:rounded-2xl bg-[#12161F]' >
                    <div className=" w-full flex justify-between items-center py-4 px-6  border-b border-[#222A3B] " >
                        <p className=" font-semibold text-[17px] text-white " >Verify on Twitter</p>
                        <svg onClick={()=> setShowModal(false)} className=" cursor-pointer " width="17" height="17" viewBox="0 0 17 17" fill="none">
                            <path d="M15.7898 1.13965L1.13867 15.7908" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1.13867 1.13965L15.7898 15.7908" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className=" w-full pt-8 flex flex-col items-center px-8 " >
                        <svg className=" mb-6 " width="70" height="84" viewBox="0 0 103 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100.085 2.04483C95.8152 5.05638 91.0881 7.35973 86.0853 8.86618C83.4002 5.77879 79.8317 3.59052 75.8624 2.59734C71.8931 1.60417 67.7145 1.85399 63.8918 3.31304C60.0691 4.77208 56.7867 7.36994 54.4886 10.7553C52.1905 14.1406 50.9875 18.15 51.0423 22.2414V26.6997C43.2073 26.9029 35.4436 25.1652 28.4428 21.6415C21.4419 18.1177 15.4212 12.9172 10.9168 6.50323C10.9168 6.50323 -6.91679 46.6288 33.2088 64.4623C24.0268 70.695 13.0887 73.8202 2 73.3791C42.1255 95.6711 91.1679 73.3791 91.1679 22.1076C91.1638 20.8657 91.0444 19.6269 90.8112 18.4071C95.3615 13.9197 98.5725 8.25409 100.085 2.04483V2.04483Z" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p className=" font-medium text-[14px] w-[230px] leading-snug " >Tweet your user domain name to validate your artist profile.</p>
                        <a target="_blank" href={"https://twitter.com/intent/tweet?text=Verifying%20my%20artist%20profile%20on%20%40officialloozr%20%23LoozrArtist%20%E2%9A%A1%EF%B8%8F%F0%9F%8E%A7%20https://testnet.loozr.io/"+user.accountDomain}
                            className='w-full mt-9' 
                        >
                            <div onClick={()=> navigate("/explore")} className=" h-[50px] flex justify-center items-center text-white  disabled:text-muted font-medium md:text-[13px] bg-gradient-ld disabled:bg-dark-800 mb-11 w-full" >
                                 Verify now! 
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}
