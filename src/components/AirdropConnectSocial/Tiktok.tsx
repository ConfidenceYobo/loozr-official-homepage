import { Flex, Image, Text } from "@chakra-ui/react";
import { ChevronRightOutlined, Logout } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Tiktok from "../../assets/tiktok.svg";

const CLIENT_ID = "awnyt7o7i329y8lt";
const REDIRECT_URI = "https://localhost:3000/callback";
const SCOPES = "user.info.basic";
const csrfState = Math.random().toString(36).substring(2);
const AUTH_URL = `https://www.tiktok.com/v2/auth/authorize/client_key=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&state=${csrfState}`;

const TiktokLogin = () => {
  const [userData, setUserData] = useState(null);

  const handleLoginTiktok = () => {
    sessionStorage.setItem("tiktokAuth", csrfState);
    window.location.href = AUTH_URL;
  };

  useEffect(() => {
    const userProfile = localStorage.getItem("userTiktokProfile");
    setUserData(userProfile ? JSON.parse(userProfile) : null);
  }, []);

  const LogOut = () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userAccessToken");
    window.location.reload();
  };

  return (
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
      onClick={userData ? undefined : handleLoginTiktok}
    >
      <Flex align="center" gap="16px">
        <Image
          src={userData ? userData?.images[1].url : Tiktok}
          w="32px"
          h="32px"
          rounded="full"
        />
        <Text color="white">
          {userData ? `${userData?.display_name}` : "Link Tiktok Account"}
        </Text>
      </Flex>
      {userData ? (
        <Logout onClick={() => LogOut()} />
      ) : (
        <ChevronRightOutlined />
      )}
    </Flex>
  );
};

export default TiktokLogin;
