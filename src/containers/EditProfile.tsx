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
import { useUpdateProfileCallback, useUpdateProfilePicCallback } from "../state/user/hooks/useAccount";
import { toast } from "react-toastify";
import { updateProfile } from "../state/user/userReducer";
import Photo from "../components/Photo";
import { jsonToUser } from "../utils";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@mui/icons-material";

const EditProfile = () => {
  const [isLoading, setLoading] = useState(false);
  const [isPhotoLoading, setPhotoLoading] = useState(false);
  const navigate = useNavigate()
  const [image, setImage] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState('');
  const dispatch = useDispatch();
  const { handleUpdateProfile } = useUpdateProfileCallback();
  const { handleUpdateProfilePic } = useUpdateProfilePicCallback();
  const user = useSelector((state: AppState) => state.user.userInfo);
  const lzrAccountPrincipal = `${user.accountPrincipal}`;

  const back = () => {
    window.history.back()
  }

  const profileEditSchema = yup.object({
    username: yup.string().required("Please enter full name").nullable(),
    website: yup.string(),
    // country: yup.string(),
    bio: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      username: user.username ?? "",
      email: user.email ?? "",
      website: user.website ?? "",
      twitter_link: user.twitterLink ?? "",
      soundcloud_link: user.soundCloudLink ?? "",
      instagram_link: user.instagramLink ?? "",
      spotify_link: user.spotifyLink ?? "",
      country: user.country ?? "",
      bio: user.bio ?? "",
    },
    validationSchema: profileEditSchema,
    onSubmit: () => { },
  });

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      username: user.username,
      website: user.website,
      bio: user.bio,
      country: user.country,
      email: user.email,
      twitter_link: user.twitterLink,
      soundcloud_link: user.soundCloudLink,
      instagram_link: user.instagramLink,
      spotify_link: user.spotifyLink,
    });
  }, [user.username, user.country, user.bio, user.website, user.country, user.email, user.twitterLink, user.soundCloudLink, user.instagramLink, user.spotifyLink]);

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
    } catch (err: any) {
      setLoading(false);
      toastHttpError(err);
    }
  };

  const handlePhotoSubmit = async () => {
    setPhotoLoading(true);
    try {
      const result = await handleUpdateProfilePic(image);
      const user = jsonToUser(result);
      toast.success("Photo updated!", TOAST_OPTIONS);
      // navigate(0)
      setPhotoLoading(false);
      setSelectedImage("")
    } catch (err: any) {
      setLoading(false);
      toastHttpError(err);
    }
  };

  const handleImageChange = (e: any) => {

    const selected = e.target.files[0];
    const TYPES = ["image/png", "image/jpg", "image/jpeg"];
    if (selected && TYPES.includes(selected.type)) {
      setImage(selected)
      console.log(selected);

      const reader: any = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(selected)
    } else {
      console.log('Error')
    }
  }

  return (
    <div className="w-full mt-[70px] md:px-0 px-6 md:mt-0">
      <div className="flex gap-5 items-center mb-12">
        <div>
          <button className="cursor-pointer text-white rounded-full bg-[#141922] py-2 px-2.5" onClick={() => back()} >
            <ArrowLeft />
          </button>
        </div>
        <p className="font-medium text-base md:text-lg text-white">
          Update Profile
        </p>
      </div>
      <div className="flex items-center mb-12">
        <div>
          <div className="relative  w-[113px] h-[113px] ">
            <Photo
              alt=""
              width={113}
              height={113}
              userId={user.accountPrincipal}
              src={!selectedImage ? user?.photo : selectedImage}
              className="rounded-full w-[113px] h-[113px] object-cover"
              style={{ border: "8px solid #141922" }}
            />
            <label className=" w-[43px] cursor-pointer absolute -bottom-2 -right-1 rounded-full bg-[#141922] h-[43px] flex justify-center items-center " >
              <img src={Edit} className=" w-[15px] h-[15px] " alt="Edit" />
              <input style={{ display: 'none' }} type="file" accept="image/*" id="input" onChange={handleImageChange} />
            </label>
          </div>
        </div>
        <div className=" ml-3 " >
          <p className="text-xl text-white font-semibold mb-2">
            {lzrAccountPrincipal}
          </p>
          <label className="text-loozr-green cursor-pointer text-small font-medium">
            change profile picture
            <input style={{ display: 'none' }} type="file" data-max-size="2048" accept="image/*" id="input" onChange={handleImageChange} />
          </label>
        </div>
      </div>

      {
        selectedImage && (
          <button
            className="py-[17px] text-white mb-20 disabled:text-muted font-medium md:text-sm bg-gradient-ld disabled:bg-dark-800 md:mb-11 w-[48%] focus:outline-none"
            onClick={() => handlePhotoSubmit()}
          // disabled={isLoading}
          >
            {isPhotoLoading ? " Uploading..." : " Upload Photo"}
          </button>
        )
      }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-start mb-10">
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
          <input
            type="text"
            className="px-7 py-2 h-11 mt-2 text-muted text-[13px] placeholder:text-muted"
            style={{ backgroundColor: "#12161F" }}
            name="twitter_link"
            defaultValue={user.twitterLink ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => formik.setFieldTouched("twitter_link", true, true)}
            placeholder="Twitter link"
          />
          <input
            type="text"
            className="px-7 py-2 h-11 mt-2 text-muted text-[13px] placeholder:text-muted"
            style={{ backgroundColor: "#12161F" }}
            name="spotify_link"
            defaultValue={user.spotifyLink ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => formik.setFieldTouched("spotify_link", true, true)}
            placeholder="Spotify link"
          />
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
          {/* <div className=" w-full h-auto pt-2" >
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
                    </div> */}
          <textarea
            className="px-[18px] h-[105px] py-3 mt-2 text-[13px] placeholder:text-muted resize-none text-white"
            style={{ backgroundColor: "#12161F" }}
            placeholder="Bio"
            defaultValue={user.bio ?? ""}
            name="bio"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => formik.setFieldTouched("bio", true, true)}
          ></textarea>
          {/* <div className=" w-full h-auto pt-2" >
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
                    </div> */}
          <input
            type="text"
            className="px-7 py-2 h-11 mt-2 text-muted text-[13px] placeholder:text-muted"
            style={{ backgroundColor: "#12161F" }}
            name="instagram_link"
            defaultValue={user.instagramLink ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => formik.setFieldTouched("instagram_link", true, true)}
            placeholder="Instagram link"
          />
          <input
            type="text"
            className="px-7 py-2 h-11 mt-2 text-muted text-[13px] placeholder:text-muted"
            style={{ backgroundColor: "#12161F" }}
            name="soundcloud_link"
            defaultValue={user.soundCloudLink ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => formik.setFieldTouched("soundcloud_link", true, true)}
            placeholder="Souncloud link"
          />
        </div>
      </div>
      {/* {hasLaunchedToken && (
        <>
          <div className="h-px bg-muted-50 mb-11" />
          <p className="font-medium text-base md:text-lg text-white mb-8">
            Artiste Details
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-start mb-10">
            <input
              type="text"
              className="px-7 py-3 font-medium text-base md:text-sm text-white placeholder:text-muted"
              style={{ backgroundColor: "#12161F" }}
              placeholder="$DAVIDO *"
              value="$DAVIDO *"
            />
            <input
              type="text"
              className="px-7 py-4 text-muted placeholder:text-muted"
              style={{ backgroundColor: "#12161F" }}
              placeholder="Souncloud link"
            />
            <input
              type="text"
              className="px-7 py-4 text-muted placeholder:text-muted"
              style={{ backgroundColor: "#12161F" }}
              placeholder="Twitter link"
            />
            <div className="flex items-center">
              <input
                type="text"
                className="max-w-[50%] mr-12 px-7 py-3 font-medium text-sm text-white placeholder:text-muted"
                style={{ backgroundColor: "#12161F" }}
                placeholder="10%"
                value={"10%"}
              />
              <ToolTip
                title={
                  <p className="text-base font-medium">
                    <span className="mb-3">
                      When someone purchases your coin, a percentage of that
                      gets allocated to you as a founder reward.
                    </span>
                    <span className="mb-3">
                      A value of 0% means you get no money when someone buys,
                      whereas a value of 100% means that no one else can ever
                      get coins because 100% of every purchase goes to you.
                    </span>
                    <span>
                      Setting this value too high will discourage buyers from
                      ever purchasing your coin. It's a delicate balance, so
                      tread carefully or stick with the default.
                    </span>
                  </p>
                }
              >
                <HelpIcon className="cursor-pointer" />
              </ToolTip>
            </div>
          </div>
        </>
      )} */}
      <button
        className="py-[17px] text-white mb-20 disabled:text-muted font-medium md:text-sm bg-gradient-ld disabled:bg-dark-800 md:mb-11 w-[48%] focus:outline-none"
        onClick={() => handleSubmit()}
      // disabled={isLoading}
      >
        {isLoading ? " Updating..." : " Update profile"}
      </button>
    </div >
  );
};

export default EditProfile;



{/* <div className=" w-full border-t border-[#222A3B] pt-4 pb-16 " >
<p className=" font-semibold text-xl " >Artiste Details</p>
<div className=" mt-4 flex w-full items-center " > 
  <input
    type="text"
    className="px-7 w-full py-3 mr-4 text-muted text-sm placeholder:text-muted"
    style={{ backgroundColor: "#12161F" }}
    name="website"
    defaultValue={user.website ?? ""}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    onFocus={() => formik.setFieldTouched("website", true, true)}
    placeholder="Artist Name"
  />
  <input
    type="text"
    className="px-7 py-3 w-32 mr-2 text-muted text-sm placeholder:text-muted"
    style={{ backgroundColor: "#12161F" }}
    name="website"
    defaultValue={user.website ?? ""}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    onFocus={() => formik.setFieldTouched("website", true, true)}
    placeholder=""
  /> 
    <ToolTip 
      title={
        <p className="text-base font-medium">
          <span className="mb-3">
            When someone purchases your coin, a percentage of that
            gets allocated to you as a founder reward.
          </span>
          <span className="mb-3">
            A value of 0% means you get no money when someone buys,
            whereas a value of 100% means that no one else can ever
            get coins because 100% of every purchase goes to you.
          </span>
          <span>
            Setting this value too high will discourage buyers from
            ever purchasing your coin. It's a delicate balance, so
            tread carefully or stick with the default.
          </span>
        </p>
      }
    >
      <HelpIcon className="cursor-pointer" />
    </ToolTip>
  {/* <HelpIcon className="w-16 ml-4" /> */}
// </div>
// </div> */}