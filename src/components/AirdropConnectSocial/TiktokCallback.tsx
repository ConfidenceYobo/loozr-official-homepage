import { Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAccessTokenTiktok } from "./hook/getAccessTokenTiktok";
import { usefetchTiktokUserData } from "./hook/getFetchTiktokData";

const TiktokCallback = () => {
  const location = useLocation();

  const getCallbaxk = async () => {
    const code = new URLSearchParams(location.search).get("code");
    if (code) {
      const accessToken = await getAccessTokenTiktok(code);
      localStorage.setItem("userTiktokAccessToken", accessToken);

      const profile = await usefetchTiktokUserData(accessToken);
      localStorage.setItem("userTiktokProfile", JSON.stringify(profile));

      window.location.href = '/'
    }
  };
  useEffect(() => {
    getCallbaxk();
  }, []);

  return (
    <VStack minH="80vh" w="full" alignItems="center" justify="center">
      <VStack>
        <Spinner size={"lg"} />
        <Text>Redirecting</Text>
      </VStack>
    </VStack>
  );
};

export default TiktokCallback;
