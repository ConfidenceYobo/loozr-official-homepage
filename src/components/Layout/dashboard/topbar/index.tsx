import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../state/store";
import { useBecomeArtisteCallback } from "../../../../state/artist/hooks";
import { setPageLoaderStatus } from "../../../../state/misc";
import { useLocation, useNavigate } from "react-router-dom";
import Verify from "../../../../assets/svg/verify.svg";
import SearchIcon from "../../../../assets/icons/search-white.svg";
import LoozrGradient from "../../../../assets/icons/loozr-gradient.svg";
import Bell from "../../../../assets/icons/bell.svg";
import Menu from "../../../../assets/icons/menu.svg";
import Notifi from "../../../../assets/svg/notifi.svg";
import Notification from "../../../../assets/icons/notification.svg";
import { MIXER_ACCOUNT } from "../../../../config/constants";
import Photo from "../../../Photo";
import { useSearchUserCallback } from "../../../../state/user/hooks/useAccount";
import { getLZRBalanceCallback } from "../../../../state/wallet/hooks/fetchBalance";
import { formatBalanceUSD, formatNumber, getFullDisplayBalance } from "../../../../utils/formatBalance";
import { Link } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import Sidebar from "../sidebars/sidebar";

export const TopBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user.userInfo);
  const lzrAccountId = `${user?.accountId}.${MIXER_ACCOUNT}`;
  const { handleBecomeArtiste } = useBecomeArtisteCallback();
  const [searchValue, setSearchValue] = React.useState("")
  const [balanceInLzr, setLZRBalance] = useState("0.00");
  const [data, setData] = React.useState([] as any)
  const { getSearchUser } = useSearchUserCallback();

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const loadLZRBalance = async (accountId: string) => {
      const { handleGetLZRBalanace } = getLZRBalanceCallback();
      try {
        const result = await handleGetLZRBalanace(accountId);
        const balanceResult = result;
        const balanceBN = getFullDisplayBalance(balanceResult);

        setLZRBalance(formatNumber(Number(balanceBN)));
        // setBalanceUSD(formatBalanceUSD(Number(balanceBN)));
      } catch (err) {
        console.log(err);
      }
    };

    loadLZRBalance(lzrAccountId);
  }, []);

  const OnchangeHandler = async (item: any) => {
    setSearchValue(item)
    const result = await getSearchUser(item);
    setData(result)
  }

  const becomeArtist = async () => {
    dispatch(setPageLoaderStatus(true));
    try {
      await handleBecomeArtiste({});
      window.location.reload();
    } catch (err) {
      dispatch(setPageLoaderStatus(false));
    }
  };

  const ClickHandler = (item: any) => {
    navigate(item)
    setSearchValue("")
  }

  const textMap = {
    '/feeds': 'Feeds',
    '/artistes': 'Artistes',
    '/tracks': 'Tracks',
    '/wallet': 'Wallet',
    '/airdrops': 'Airdrops',
    '/notifications': 'Notifications',
  };

  const getText = () => {
    // if (!user) {
    //   return '';
    // }
    if (pathname.includes("loozr.testnet")) {
      return 'Artist Profile';
    }

    return textMap[pathname] || '';
  };



  return (
    <>
      <div className="hidden md:block w-full mb-6">
        <div className="flex gap-[20px] px-0 sm:px-4 md:mr-6 items-center">
          <div>
            <p className="font-bold text-base md:text-[24px] text-white">
              {getText()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex w-[250px] relative">
              <input
                type="text"
                value={searchValue}
                placeholder="Search artiste, fans… "
                onChange={(e) => OnchangeHandler(e.target.value)}
                className="placeholder:text-[#536079] w-full rounded-full h-[42px] text-xs font-medium"
                style={{
                  paddingLeft: "3rem",
                  paddingRight: 16,
                  background: "#141922",
                  color: "white",
                }}
              />
              <img src={SearchIcon} alt="" className="absolute w-4 h-4 object-contain inset-y-[12px] left-4" />
              {searchValue && (
                <div className=" absolute bg-[#12161F] top-[50px] overflow-y-auto max-h-[250px] z-[120] py-2 mt-2 rounded-lg px-4 w-full  ">
                  {data.map((item: any, index: any) => {
                    const domainName = item.account_id + "." + MIXER_ACCOUNT;

                    return (
                      <div
                        key={index}
                        onClick={() => ClickHandler(`/${domainName}`)}
                        className=" w-full cursor-pointer relative z-[120] flex my-3 items-center "
                      >
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
                              {item?.account_id}
                            </p>
                          </div>
                          <div className=" flex -mt-1 items-center ">
                            <p className=" text-[11px] font-semibold text-[#536079] ">
                              {domainName.slice(0, 30)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {searchValue && (
                    <div
                      className=" fixed inset-0 z-[90] "
                      onClick={() => setSearchValue("")}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="h-8 w-[1px] bg-muted-50" />
            <div className="relative">
              <img src={Notifi} alt="" />
              <p className=' rounded-full px-1.5 py-0.5 absolute bg-[#FF1744] top-0 right-0 text-[8px]'>3</p>
            </div>
            {/* <div className="h-8 w-[1px] bg-muted-50" />
          <div className="bg-[#141922] text-medium py-2.5 px-[13px] rounded-full w-fit flex gap-3 items-center" onClick={() => (user ? navigate("/wallet") : null)}>
            <img src='/coin.svg' alt='' className="w-[20px]" />
            <p className="text-[12px] text-[#F3EC4E] font-medium">
              {balanceInLzr} LZR
            </p>
          </div> */}
          </div>
        </div>
      </div>
      <div className="w-full mb-2 block relative md:hidden">
        <div className="flex w-full px-[16px] pb-[6px] pt-[12px] relative items-center justify-between">
          <div className="flex items-center gap-3">
            {!user ? (
              <Link to='/feeds'>
                <img src={LoozrGradient} alt="" className={`h-6 w-6`} />
              </Link>
            ) : (
              <div className="flex items-center gap-2 bg-[#141922] text-[#F3EC4E] text-medium py-2 px-3 rounded-full text-[11px] w-fit">
                <img src='/coin.svg' alt='' className="w-[18px]" />
                {balanceInLzr} LZR
              </div>
            )}
            {user && (
              <>
                <div className="h-7 w-[1px] bg-dark-700" />
                <div className="relative w-fit" onClick={() => (user ? navigate("/" + user.accountDomain) : null)}>
                  <div className="w-8 h-8 flex">
                    <Photo
                      alt=""
                      src={user?.photo}
                      userId={user?.accountPrincipal}
                      className="object-cover w-8 h-8 flex justify-center items-center rounded-full  "
                      style={{ border: "3px solid #141922" }}
                    />
                  </div>
                  <img src={Verify} alt="" className="absolute bottom-0 right-0 w-4 " />
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-[18px]">
            {!user && (
              <div className="flex items-center justify-center rounded-full h-[40px] w-fit px-4 bg-white text-dark-900 text-[11px] font-semibold" onClick={() => navigate("/login")}>
                Sign in
              </div>
            )}
            <div className="relative hidden md:block" onClick={() => navigate("/notifications")}>
              <img src={Notifi} alt="" className="" />
              <p className=' rounded-full px-[7px] py-[2px] absolute bg-[#FF1744] top-1 right-0 font-semibold text-[8px]'>3</p>
            </div>
            <div className="relative block md:hidden mr-2" onClick={() => navigate("/notifications")}>
              <img src={Notification} alt="" className="w-[18px] text-white" />
              <p className=' rounded-full px-[5px] py-[1px] absolute bg-[#FF1744] top-[-5px] right-[-10px] font-semibold text-[6px]'>3</p>
            </div>
            <img onClick={() => onOpen()} src={Menu} alt="" className="text-white w-5 h-5 object-contain inset-y-[12px] left-4" />
          </div>
        </div>
      </div>
      <Sidebar isOpen={isOpen} onClose={onClose} />
    </>
  );
};
