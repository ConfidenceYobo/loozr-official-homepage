import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Notifi from "../../../../assets/svg/notifi.svg";
import SuggestedUser from "../../../SuggestedUser"
import SearchIcon from "../../../../assets/icons/search-white.svg";
import { MIXER_ACCOUNT } from "../../../../config/constants";
import { useNavigate } from 'react-router-dom';
import { useSearchUserCallback } from '../../../../state/user/hooks/useAccount';
import Photo from '../../../Photo';
import { BsChevronRight } from 'react-icons/bs';


export default function Sidebar({ isOpen, onClose }) {

    // const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate();
    const [searchValue, setSearchValue] = React.useState("")
    const [data, setData] = React.useState([])
    const { getSearchUser } = useSearchUserCallback();

    const OnchangeHandler = async (item) => {
        setSearchValue(item)
        const result = await getSearchUser(item);
        setData(result)
    }

    const ClickHandler = (item) => {
        navigate(item)
        setSearchValue("")
    }

    return (
        <Box>
            <Drawer isOpen={isOpen} onClose={onClose} size={'full'}>
                <DrawerOverlay />
                <DrawerContent bg='#0C0F15'>
                    <DrawerCloseButton />
                    <DrawerBody mt='50px'>
                        <VStack w='full' align='left'>
                            <Flex w='full' align='center' gap='8px'>
                                <div className="w-full relative">
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
                                            {data.map((item, index) => {
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
                                {/* <div className="relative">
                                    <img src={Notifi} alt="" />
                                    <p className=' rounded-full px-1.5 py-0.5 absolute bg-[#FF1744] top-0 right-0 text-[8px]'>3</p>
                                </div> */}
                            </Flex>
                            <VStack w='full' align='left' pt='40px'>
                                <Flex w='full' align='center' justify='space-between'>
                                    <Flex gap='14px' align='top'>
                                        <div className=" w-[33px] h-[33px] rounded-lg flex bg-[#12161F] justify-center items-center " >
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.00391 1V11" stroke="#536079" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M11.01 6H1" stroke="#536079" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <VStack gap='0' align='left'>
                                            <Text fontWeight='600' fontSize='14px'>Upload song</Text>
                                            <Text pt='-10px' color='#536079' fontSize='12px' maxW='200px'>Release your music and get crowdfunded</Text>
                                        </VStack>
                                    </Flex>
                                    <BsChevronRight size={25} color='#536079' />
                                </Flex>
                                <Flex w='full' align='center' justify='space-between'>
                                    <Flex gap='14px' align='top'>
                                        <div className=" w-[33px] h-[33px] rounded-lg flex bg-[#12161F] justify-center items-center " >
                                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.67646 14.0002C3.1544 14.0002 1 13.6187 1 12.0912C1 10.5636 3.14051 9.17432 5.67646 9.17432C8.19852 9.17432 10.3529 10.5504 10.3529 12.0773C10.3529 13.6041 8.21241 14.0002 5.67646 14.0002Z" stroke="#536079" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.67724 6.99502C7.33238 6.99502 8.67475 5.65266 8.67475 3.99751C8.67475 2.34171 7.33238 1 5.67724 1C4.02209 1 2.67971 2.34171 2.67971 3.99751C2.67378 5.6467 4.00688 6.98907 5.65608 6.99502H5.67724Z" stroke="#536079" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M11.7656 4.95264V7.60431" stroke="#536079" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M13.1186 6.27979H10.4141" stroke="#536079" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <VStack gap='0' align='left'>
                                            <Text fontWeight='600' fontSize='14px'>Edit profile</Text>
                                            <Text pt='-10px' color='#536079' fontSize='12px' maxW='200px'>Customize your account</Text>
                                        </VStack>
                                    </Flex>
                                    <BsChevronRight size={25} color='#536079' />
                                </Flex>
                            </VStack>
                            <Box w='full' pt='30px'>
                                <p className=" font-bold text-sm text-white my-2 " >Suggested for you </p>
                                <SuggestedUser />
                            </Box>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}
