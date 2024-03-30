import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import {
  useGetArtistDetailsCallback,
  useSellArtistTokenCallback,
} from "../state/artist/hooks";
import Artist from "../config/constants/models/artist";
import { jsonToArtist } from "../utils";
import { toastHttpError } from "../utils/httpHelper";
import Photo from "../components/Photo";
import { LZR_IN_USD, MIXER_ACCOUNT } from "../config/constants";
import { getLZRBalanceCallback } from "../state/wallet/hooks/fetchBalance";
import { useSelector } from "react-redux";
import { AppState } from "../state/store";
import { formatBalanceUSD, formatNumber, getFullDisplayBalance } from "../utils/formatBalance";

const SellArtistToken = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [max, setMax] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { handleGetArtists } = useGetArtistDetailsCallback();
  const { handleSellToken } = useSellArtistTokenCallback();
  const [showModal, setShowModal] = React.useState(false)
  let { id } = useParams();

  const [artistDetails, setArtistDetails] = useState<Artist>(null);
  const [pageLoading, setPageLoadingStatus] = useState(true); 

  const user = useSelector((state: AppState) => state.user.userInfo);
  const lzrAccountPrincipal = `${user?.accountPrincipal}.${MIXER_ACCOUNT}`;
  const [balanceInLzr, setLZRBalance] = useState("0.00");
  const [balanceUsd, setBalanceUSD] = useState("0.00");

  useEffect(() => {
    const loadLZRBalance = async (accountPrincipal: string) => {
      const { handleGetLZRBalanace } = getLZRBalanceCallback();
      try {
        const result = await handleGetLZRBalanace(accountPrincipal);
        const balanceResult = result;
        const balanceBN = getFullDisplayBalance(balanceResult);

        setLZRBalance(formatNumber(Number(balanceBN)));
        setBalanceUSD(formatBalanceUSD(Number(balanceBN)));
      } catch (err) {
        console.log(err);
      }
    };

    loadLZRBalance(lzrAccountPrincipal);
  }, []);

  const formSchema = yup.object({
    amount: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: { amount: 0 },
    validationSchema: formSchema,
    onSubmit: () => {},
  });

  if (isNaN(Number(id))) {
    navigate("/feeds");
  }

  const loadArtistDetails = async () => {
    try {
      const result = await handleGetArtists(Number(id));
      const artist = jsonToArtist(result);
      setArtistDetails(artist);
      setPageLoadingStatus(false);
    } catch (err) {
      setArtistDetails(null);
      setPageLoadingStatus(false);
    }
  };

  useEffect(() => {
    loadArtistDetails();
  }, []);

  const handleSubmit = async () => {
    if (!formik.dirty) {
      return;
    } else if (!formik.isValid) {
      return;
    }
    setLoading(true);
    try {
      await handleSellToken(artistDetails.id, formik.values.amount);
      setLoading(false);
      setShowModal(false)
      setSuccess(true);
    } catch (err: any) {
      setSuccess(false);
      setLoading(false);
      toastHttpError(err);
    }
  };

  if (pageLoading) {
    return <div className="text-center"> Fetching artiste information...</div>;
  }

  if (!artistDetails) {
    navigate("/feeds");
    return <></>;
  }

  return isSuccess ? (
    <div className="w-full h-full md:px-0    pt-16">
      <div className="flex flex-col items-center justify-center px-8 md:px-auto w-full max-w-5xl mx-auto text-white">
        <div
          className="bg-dark-800 text-center rounded-md w-full py-16 px-0 md:px-[107px]"
          style={{ zoom: "85%" }}
        >
          <p className="text-xl md:text-2xl mb-7 font-medium">
            Transaction complete!
          </p>

          <p className="text-lg md:text-xl font-medium text-muted">
            You exchanged {formik.values.amount}{" "}
            <strong className="uppercase">
              ${artistDetails.creatorCoinId}
            </strong>{" "}
            for LZR
          </p>
          <Link to="/feeds" className="mt-2 text-loozr-purple">
            Continue
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full mt-16 md:px-0 px-6 md:mt-0">
      <p className="text-white text-2xl font-semibold mb-12">
        Sell Artiste Token
      </p>
      <div className="max-w-[490px]">
        <div className="w-30 mb-8">
          <div className="relative mb-2">
            <Photo
              alt=""
              width={113}
              height={113}
              className="rounded-full w-[113px] h-[113px] object-contain"
              style={{ border: "8px solid #141922" }}
            />
          </div>
          <h3 className="font-semibold uppercase helper-text">
            ${artistDetails.creatorCoinId}
          </h3>
        </div>
        <div className="w-full mb-8">
          <p className="text-sm font-medium text-muted mb-5">
            Amount of{" "}
            <span className="uppercase">${artistDetails.creatorCoinId}</span> to
            exchange for LZR:
          </p>
          <input
            type="number"
            name="amount"
            onKeyPress={(e) => {
              if (e.key === "e" || e.key === "-" || e.key === "+") {
                e.preventDefault();
              }
            }}
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => formik.setFieldTouched("amount", true, true)}
            className=" h-[60px] w-full px-6 md:w-[350px] bg-dark-800 text-sm placeholder:text-muted text-white"
            placeholder="0.00"
            style={{ background: "#12161F" }}
          />
        </div>
        {max && (
          <div className="w-full h-auto pt-2">
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-xs font-Inter-SemiBold text-[#F25341]"
              style={{ marginTop: "-35px" }}
            >
              Amount must be less than your balance
            </motion.div>
          </div>
        )}
        <div className="w-full h-auto pt-2">
          {formik.touched.amount && formik.errors.amount && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-xs font-Inter-SemiBold text-[#F25341]"
              style={{ marginTop: "-35px" }}
            >
              {formik.errors.amount}
            </motion.div>
          )}
        </div>
        <div>
          <button
            className=" h-[60px] text-white disabled:text-muted font-medium md:w-[350px] text-sm bg-gradient-ld disabled:bg-dark-800 mb-24 md:mb-11 w-full sm:w-80 focus:outline-none"
            onClick={() => setShowModal(true)}
            disabled={formik.values.amount ? false : true}
          >
            {isLoading ? "Inprogress..." : "Exchange"}
          </button>
        </div>
      </div>

      {showModal && (
        <div className=" fixed inset-0 flex justify-center items-center md:overflow-y-hidden bg-black bg-opacity-90 z-[70] ">
          <div className=" w-full h-screen flex flex-col justify-center  md:w-[360px] md:h-auto relative z-[80]  md:rounded-2xl bg-[#12161F]">
            <div className=" w-full flex justify-between items-center py-4 px-6  border-b border-[#222A3B] ">
              <p className=" font-semibold text-[17px] text-white ">Preview</p>
              <svg
                onClick={() => setShowModal(false)}
                className=" cursor-pointer "
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  d="M15.7898 1.13965L1.13867 15.7908"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.13867 1.13965L15.7898 15.7908"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className=" w-full pt-8 flex flex-col items-center px-8 ">
              <p className=" font-medium text-[14px] w-[230px] ">
                You are exchanging {formik.values.amount}{" "}
                <span className=" uppercase ">
                  ${artistDetails.creatorCoinId}{" "}
                </span>{" "}
                <span className=" text-[#536079] ">
                  (≈${(formik.values.amount * LZR_IN_USD).toFixed(2)})
                </span>{" "}
                for LZR coins:
              </p>
              <div className=" w-[230px] cursor-pointer flex my-4 items-center ">
                <Photo
                  alt=""
                  className="object-contain w-10 h-10 rounded-full "
                  style={{ border: "3px solid #141922" }}
                />
                {/* <div className=' w-10 h-10 rounded-full bg-red-600 border-[3px] border-[#222A3B] ' /> */}
                <div className=" ml-3 ">
                  <div className=" flex -mt-1 items-center ">
                    <p className=" text-[13px] font-semibold ">
                      {" "}
                      {artistDetails?.user.accountPrincipal}
                    </p>
                  </div>
                  <div className=" flex -mt-1 items-center ">
                    <p className=" text-[11px] font-semibold text-[#536079] ">
                      {artistDetails?.user.tokenName} - Artist
                    </p>
                  </div>
                </div>
              </div>
              <div className=" w-[230px] ">
                <p className=" text-xs text-[#536079] font-normal ">
                  Network fee
                </p>
                <p className=" font-medium text-[14px] ">
                  0.00 LZR <span className=" text-[#536079] ">(≈ $0.00)</span>
                </p>
              </div>
              <div className=" w-[230px] my-4 ">
                <p className=" text-xs text-[#536079] font-normal ">
                  Total required to send
                </p>
                <p className=" font-medium text-[14px] ">
                  {formik.values.amount} LZR{" "}
                  <span className=" text-[#536079] ">
                    (≈ ${(formik.values.amount * LZR_IN_USD).toFixed(2)})
                  </span>
                </p>
              </div>
              <button
                disabled={isLoading ? true : false}
                onClick={handleSubmit}
                className=" h-[50px] mt-6 flex justify-center items-center text-white  disabled:text-muted font-medium md:text-[13px] bg-gradient-ld disabled:bg-dark-800 mb-11 w-full"
              >
                {isLoading ? "Inprogress..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellArtistToken;
