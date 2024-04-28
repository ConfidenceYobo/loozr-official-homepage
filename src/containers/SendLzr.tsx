import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { toastHttpError } from "../utils/httpHelper";
import { toast } from "react-toastify";
import { MIXER_ACCOUNT, TOAST_OPTIONS, LZR_IN_USD } from "../config/constants";
import { useLZRTransferCallback } from "../utils/calls/useLZRTransferCallback";
import { useSearchUserCallback } from "../state/user/hooks/useAccount"; 
import { getLZRBalanceCallback } from "../state/wallet/hooks/fetchBalance";
import { useSelector } from "react-redux";  
import { addCase } from '../state/sendLoozr/sendLzr'
import { AppState } from "../state/store";
import { formatBalanceUSD, formatNumber, getFullDisplayBalance } from "../utils/formatBalance";
import Photo from "../components/Photo";

const SendLzr = () => {
  const [isLoading, setLoading] = useState(false);
  const { handleLZRTransfer } = useLZRTransferCallback();
  const [max, setMax] = useState(false);

  const formSchema = yup.object({
    amount: yup
      .string().required("Required"),
      account_principal: yup
      .string()
      .required("Enter account principal")
  });

  const formik = useFormik({
    initialValues: { account_principal: "", amount: 0 },
    validationSchema: formSchema,
    onSubmit: () => {},
  }); 
  
  const user = useSelector((state: AppState) => state.user.userInfo);

  const senduser = useSelector((state: any) => state.sendlzr.value ) 
  
  const lzrAccountPrincipal = `${user?.accountPrincipal}`;
  const [showModal, setShowModal] = React.useState(false)
  const [balanceInLzr, setLZRBalance] = useState("0.00");
  const [balanceUsd, setBalanceUSD] = useState("0.00");
  
  const [data, setData] = React.useState([] as any)
  const { getSearchUser } = useSearchUserCallback(); 
  const [searchValue, setSearchValue] = React.useState("")
  const [name, setName] = React.useState("")

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

  const OnchangeAcount = async (item: any)=>{  
    setSearchValue(item) 
    setName(item) 
    console.log(item);
    
    // formik.setFieldValue("account_id", item)
    const result = await getSearchUser(item); 
    setData(result)
  }  

  const handleSubmit = async () => {
    if (!formik.dirty) {
      return;
    } else if (!formik.isValid) {
      return;
    }
    setLoading(true);
    try {
      await handleLZRTransfer(formik.values);
      setLoading(false);
      toast.success("Funds sent!", TOAST_OPTIONS);
      setShowModal(false)
    } catch (err: any) {
      setLoading(false);
      toastHttpError(err);
    }
  };
  
  const ClickHandler =(item: any, index: any)=> {
    formik.setFieldValue("account_principal", index) 
    setName(item)
    setSearchValue("")
  }

  React.useEffect(()=> { 
    if(senduser){ 
      formik.setFieldValue("account_principal", senduser)
      setName(senduser) 
    }
  },[])

  return (
    <div className="w-full px-6 md:px-0 mt-16 md:mt-0">
      <p className="text-white text-2xl font-semibold mb-12">Send LZR</p>
      <div className="flex flex-col items-center justify-center md:justify-start md:items-start md:max-w-[490px]">
        <div className=" md:w-[350px] w-full mb-8">
          <p className="text-sm font-medium text-muted mb-5">
            Enter account principal to send LZR to:
          </p>
          <div className=" w-full md:w-[350px] relative " > 
            <input
              type="text"
              name="account_principal"
              autoComplete="off"
              disabled={senduser? true:false}
              value={senduser? senduser:name}
              onChange={(e)=> OnchangeAcount(e.target.value)}
              onBlur={formik.handleBlur}
              onFocus={() => formik.setFieldTouched("account_id", true, true)}
              className=" h-[60px] w-full px-6 md:w-[350px] bg-dark-800 text-sm placeholder:text-muted text-white"
              placeholder="Search by name"
              style={{ background: "#12161F" }}
            />
            {searchValue && ( 
              <div className=" absolute bg-[#12161F] top-[61px] overflow-y-auto max-h-[250px] z-[120] py-2 mt-2 rounded-lg px-4 w-full  " > 
                {data.map((item: any, index: any) => { 

                  const domainName = item.account_principal

                  return(
                    <div key={index} onClick={() => ClickHandler(domainName, domainName)} className=' w-full cursor-pointer flex my-3 items-center ' > 
                      <Photo
                        alt=""
                        className="object-contain w-10 h-10 rounded-full "
                        style={{ border: "3px solid #141922" }}
                      />
                      {/* <div className=' w-10 h-10 rounded-full bg-red-600 border-[3px] border-[#222A3B] ' /> */}
                      <div className=' ml-3 ' >
                        <div className=' flex -mt-1 items-center ' >
                          <p className=' text-[13px] font-semibold ' > {item?.username}</p>
                        </div>
                        <div className=' flex -mt-1 items-center ' >
                          <p className=' text-[11px] font-semibold text-[#536079] ' >{domainName.slice(0, 40)}</p> 
                        </div>
                      </div> 
                    </div> 
                  )
                })}  
                {data.length === 0 &&
                  <p className=" font-medium my-1 " >No record found</p>
                }
              </div>
            )}
          </div>  
          <p className="helper-text">
            Example account principal is <strong>ngu-jjuyti-abcd-efgh-xyz</strong>
          </p>
        </div>
        <div className="w-full h-auto pt-2">
          {formik.touched.account_principal && formik.errors.account_principal && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-xs font-Inter-SemiBold text-[#F25341]"
              style={{ marginTop: "-42px" }}
            >
              {formik.errors.account_principal}
            </motion.div>
          )}
        </div>
        <div className="w-full mb-8">
          <p className="text-sm font-medium text-muted mb-5">
            Amount of LZR to send:
          </p>
          <input
            type="number"
            name="amount"
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
              style={{ marginTop: "-42px" }}
            >
              {formik.errors.amount}
            </motion.div>
          )}
        </div>
        <button
          className=" h-[60px] text-white disabled:text-muted font-medium md:w-[350px] text-sm bg-gradient-ld disabled:bg-dark-800 mb-24 md:mb-11 w-full focus:outline-none"
          onClick={()=> setShowModal(true)} 
          disabled={formik.values.amount ? false: true}
        >
          {"Send Lzr"}
        </button>
      </div> 
      {showModal && (
        <div className=" fixed inset-0 flex justify-center items-center md:overflow-y-hidden bg-black bg-opacity-90 z-[70] " > 
          <div className=' w-full h-screen flex flex-col justify-center  md:w-[360px] md:h-auto relative z-[80]  md:rounded-2xl bg-[#12161F]' >
              <div className=" w-full flex justify-between items-center py-4 px-6  border-b border-[#222A3B] " >
                  <p className=" font-semibold text-[17px] text-white " >Preview</p>
                  <svg onClick={()=> setShowModal(false)} className=" cursor-pointer " width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <path d="M15.7898 1.13965L1.13867 15.7908" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M1.13867 1.13965L15.7898 15.7908" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </div>
              <div className=" w-full pt-8 flex flex-col items-center px-8 " > 
                  <p className=" font-medium text-[14px] w-[230px] " >You are sending {formik.values.amount} LZR <span className=" text-[#536079] " >(≈${(formik.values.amount * LZR_IN_USD).toFixed(2)})</span> to {name}:</p>
                   
                  <div className=" w-[230px] mt-4 " > 
                    <p className=" text-xs text-[#536079] font-normal " >Network fee</p>
                    <p className=" font-medium text-[14px] " >0.00 LZR <span className=" text-[#536079] " >(≈ $0.00)</span></p>
                  </div>
                  <div className=" w-[230px] my-4 " > 
                    <p className=" text-xs text-[#536079] font-normal " >Total required to send</p>
                    <p className=" font-medium text-[14px] " >{formik.values.amount} LZR <span className=" text-[#536079] " >(≈ ${(formik.values.amount * LZR_IN_USD).toFixed(2)})</span></p>
                  </div> 
                  <button disabled={isLoading} onClick={handleSubmit} className=" h-[50px] mt-6 flex justify-center items-center text-white  disabled:text-muted font-medium md:text-[13px] bg-gradient-ld disabled:bg-dark-800 mb-11 w-full" >
                    
                    {isLoading ? "Sending..." : "Confirm"}
                  </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendLzr;
