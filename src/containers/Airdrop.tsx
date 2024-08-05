import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Box,
  VStack,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { ChevronRightOutlined } from "@mui/icons-material";
import Twitter from "../assets/twitter.svg";
import Tiktok from "../assets/tiktok.svg";
import Spotify from "../assets/spotify.svg";
import SpotifyButton from "../components/AirdropConnectSocial/Spotify";
import { useSelector } from "react-redux";
import { AppState } from "../state/store";
import { textTruncate } from "../utils/textTruncate";
import { useNavigate } from "react-router-dom";
import Photo from "../components/Photo";
import TiktokLogin from "../components/AirdropConnectSocial/Tiktok";
import TwitterLogin from "../components/AirdropConnectSocial/Twitter";

export default function Airdrop({ isOpen, onClose }) {
  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.user.userInfo);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW="480px"
          p={["12px", "16px", "18px"]}
          rounded="24px"
          bg="#12161F"
        >
          <ModalHeader mt="18px">
            <Flex w="full" justify="space-between" align="center">
              <h1>Lp Mining</h1>
              <Box
                fontWeight={400}
                color="#536079"
                fontSize={14}
                onClick={() => onClose()}
              >
                Close
              </Box>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <VStack w="full" spacing="24px">
              <Box w="full" bg="#141922" px="22px" py="16px" rounded="24px">
                {!user ? (
                  <div className=" flex items-center justify-left gap-x-2 w-full">
                    <button
                      className="rounded-full h-[40px] w-full px-8 bg-white text-dark-900 text-xs hidden lg:block outline-none focus:outline-none"
                      onClick={() => navigate("/login")}
                    >
                      Login account
                    </button>
                  </div>
                ) : (
                  <Flex
                    w="full"
                    gap="24px"
                    justify="space-between"
                    align="center"
                    color="rgba(83, 96, 121, 0.5)"
                  >
                    <Flex w="full" gap="14px" align="center">
                      <div className="relative w-fit ">
                        <Box>
                          <Photo
                            alt=""
                            src={user?.photo}
                            userId={user?.accountPrincipal}
                            className="object-cover w-[60px] h-[60px] flex justify-center items-center rounded-full  "
                            style={{ border: "3px solid #141922" }}
                          />
                        </Box>
                      </div>
                      <VStack align="flex-start" gap="-3px">
                        <Text fontSize={16} fontWeight={400}>
                          {textTruncate(user?.accountPrincipal, 13)}
                        </Text>
                        <Text
                          fontSize={14}
                          fontWeight={600}
                          color="rgba(83, 96, 121, 0.5)"
                        >
                          view wallet
                        </Text>
                      </VStack>
                    </Flex>
                    <ChevronRightOutlined />
                  </Flex>
                )}
              </Box>
              <Box
                w="full"
                minH="200px"
                roundedTop="32px"
                overflow="hidden"
                position="relative"
                bgGradient="linear(to-b, rgba(141, 188, 239), rgba(235, 138, 255))"
              >
                <Box
                  w="full"
                  h="full"
                  pos="absolute"
                  top="0"
                  left="0"
                  bgImage="url('./noise.png')"
                  bgPosition="center"
                  bgRepeat="no-repeat"
                  bgSize="cover"
                  opacity={0.2}
                />
                <VStack w="full" pos="relative" gap="0" zIndex={22}>
                  <VStack w="full" align="flex-start" p="18px" gap="8px">
                    <Text fontWeight={500} fontSize={20} color={"white"}>
                      100% filled
                    </Text>
                    <Flex
                      w="full"
                      align="center"
                      gap="16px"
                      justify="space-between"
                    >
                      <Flex align={"center"} gap="8px">
                        <Image src="/coin-1.svg" w="48px" h="48px" />
                        <Text fontWeight={800} fontSize={24} color="white">
                          0.012500
                        </Text>
                      </Flex>
                      <Button
                        variant="solid"
                        bg="blackAlpha.400"
                        rounded="full"
                        px="28px"
                        py="24px"
                        color="white"
                        _hover={{ bg: "blackAlpha.500" }}
                      >
                        Claim LP
                      </Button>
                    </Flex>
                  </VStack>
                  <Flex
                    px="18px"
                    py="24px"
                    bg="#12161F"
                    w="full"
                    h="full"
                    align="center"
                    justify="space-between"
                    roundedTop="32px"
                  >
                    <Flex gap="12px" align="center">
                      <Text color="rgba(83, 96, 121)">LP Balance:</Text>
                      <Flex align={"center"} gap="8px">
                        <Image src="/coin-1.svg" w="24px" h="24px" />
                        <Text fontWeight={500} fontSize={14} color="white">
                          0.0000
                        </Text>
                      </Flex>
                    </Flex>
                    <Box
                      bg="blackAlpha.600"
                      color="white"
                      rounded="full"
                      px="18px"
                      py="10px"
                      fontSize={12}
                    >
                      0.015 LO/2 mins
                    </Box>
                  </Flex>
                </VStack>
              </Box>
              <VStack w="full" gap="16px" align="left">
                <h1 className="text-[14px] font-[700]">Connect Socials</h1>
                <TwitterLogin />
                <SpotifyButton />
                <TiktokLogin />
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
