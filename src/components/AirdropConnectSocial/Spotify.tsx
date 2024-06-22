import { Flex, Image, Text } from "@chakra-ui/react";
import { ChevronRightOutlined, Logout } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Spotify from "../../assets/spotify.svg";

export default function SpotifyButton() {
  const CLIENT_ID = "e4397413a7ca44aaa463721856b398d3";
  const REDIRECT_URI = "http://localhost:3000/callback";
  const SCOPE = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "playlist-read-private",
    "user-library-read",
    "user-top-read",
  ];
  const [userData, setUserData] = useState(null);

  const handleSpotifyLogin = () => {
    const state = Math.random().toString(36).substring(7);

    const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE.join(
      "%20"
    )}&state=${state}&show_dialog=true`;
    sessionStorage.setItem("spotifyAuth", state);
    window.location.href = spotifyURL;
  };

  //
  useEffect(() => {
    const userProfile = localStorage.getItem("userProfile");
    setUserData(userProfile ? JSON.parse(userProfile) : null);
  }, []);

  const LogOut = () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userAccessToken");
    window.location.reload();
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
        onClick={userData ? undefined : handleSpotifyLogin}
      >
        <Flex align="center" gap="16px">
          <Image
            src={userData ? userData?.images[1].url : Spotify}
            w="32px"
            h="32px"
            rounded="full"
          />
          <Text color="white">
            {userData ? `${userData?.display_name}` : "Link Spotify Account"}
          </Text>
        </Flex>
        {userData ? (
          <Logout onClick={() => LogOut()} />
        ) : (
          <ChevronRightOutlined />
        )}
      </Flex>
    </>
  );
}
