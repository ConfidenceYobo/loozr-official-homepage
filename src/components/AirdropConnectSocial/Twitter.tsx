import { Flex, Image, Text } from "@chakra-ui/react";
import { ChevronRightOutlined } from "@mui/icons-material";
import React from "react";

export default function TwitterLogin() {
  const token = localStorage.getItem("jwtToken");
  console.log(token);

  const handleLogin = () => {
    fetch("https://api.loozr.io/api/users/twitter-login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.authorization_url) {
          window.location.href = data.authorization_url;
        } else {
          console.error("Authorization URL not received");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
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
        onClick={handleLogin}
      >
        <Flex align="center" gap="16px">
          {/* <Image
            src={userData ? userData?.images[1].url : Tiktok}
            w="32px"
            h="32px"
            rounded="full"
          /> */}
          <Text color="white">
            Link X(Twitter) Account
            {/* {userData ? `${userData?.display_name}` : "Link Tiktok Account"} */}
          </Text>
        </Flex>
        {/* {userData ? (
          <Logout onClick={() => LogOut()} />
        ) : (
          <ChevronRightOutlined />
          )} */}
        <ChevronRightOutlined />
      </Flex>
    </>
  );
}
