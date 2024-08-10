import { Flex, Image, Text } from "@chakra-ui/react";
import { ChevronRightOutlined, Logout } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Spotify from "../../assets/spotify.svg";

export default function SpotifyButton() {
  const [userData, setUserData] = React.useState(null);

  const token = localStorage.getItem("jwtToken");
  // console.log(token);

  const handleLogin = () => {
    fetch("https://api.loozr.io/api/users/spotify-login", {
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

  useEffect(() => {
    const userSpotifyProfile = localStorage.getItem("userSpotifyProfile");
    setUserData(userSpotifyProfile ? JSON.parse(userSpotifyProfile) : null);
  }, []);

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
        onClick={userData ? undefined : handleLogin}
      >
        <Flex align="center" gap="16px">
          <Image src={Spotify} w="32px" h="32px" rounded="full" />
          <Text color="white">
            {userData ? `${userData?.spotify_account}` : "Link Spotify Account"}
          </Text>
        </Flex>
        {userData ? <Logout /> : <ChevronRightOutlined />}
      </Flex>
    </>
  );
}
