import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Box,
  VStack,
  Avatar,
  Text,
  Image,
} from "@chakra-ui/react";
import { ChevronRightOutlined } from "@mui/icons-material";
import Twitter from "../assets/twitter.svg";
import Tiktok from "../assets/tiktok.svg";
import Spotify from "../assets/spotify.svg";
import SpotifyButton from "../components/AirdropConnectSocial/Spotify";

export default function Airdrop({ isOpen, onClose }) {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p="24px" bg="#12161F">
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
              <Flex w="full" bg="#141922" px="22px" py="19px" rounded="24px">
                <Avatar src="https://bit.ly/broken-link" name="" />
              </Flex>
              <VStack w="full" gap="16px" align="left">
                <h1 className="font-[700]">Connect Socials</h1>
                <Flex
                  cursor="pointer"
                  align="center"
                  justify="space-between"
                  borderColor="rgba(83, 96, 121, 0.5)"
                  borderWidth="1px"
                  rounded="full"
                  px="24px"
                  py="18px"
                  _hover={{ bg: "#141922" }}
                  color="rgba(83, 96, 121, 0.5)"
                >
                  <Flex align="center" gap="16px">
                    <Image src={Twitter} w="32px" h="32px" />
                    <Text color="white">Link X (Twitter) Account</Text>
                  </Flex>
                  <ChevronRightOutlined />
                </Flex>
                <SpotifyButton />
                <Flex
                  cursor="pointer"
                  align="center"
                  justify="space-between"
                  borderColor="rgba(83, 96, 121, 0.5)"
                  borderWidth="1px"
                  rounded="full"
                  px="24px"
                  py="18px"
                  _hover={{ bg: "#141922" }}
                  color="rgba(83, 96, 121, 0.5)"
                >
                  <Flex align="center" gap="16px">
                    <Image src={Tiktok} w="32px" h="32px" />
                    <Text color="white">Link TikTok Account</Text>
                  </Flex>
                  <ChevronRightOutlined />
                </Flex>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
