// Assume using React Router
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { VStack, Spinner, Text } from "@chakra-ui/react";
import { usefetchSpotifyUserData } from "./hook/useFetchSpotifyData";
import { getAccessToken } from "./hook/useGetSpotifyAccessToken";

function SpotifyCallback() {
  const location = useLocation();

  const getCallbaxk = async () => {
    const code = new URLSearchParams(location.search).get("code");
    console.log(code);
    
    if (code) {
      const accessToken = await getAccessToken(code);
      localStorage.setItem("userAccessToken", accessToken);

      const profile = await usefetchSpotifyUserData(accessToken);
      localStorage.setItem("userProfile", JSON.stringify(profile));

      window.location.href = '/feeds'
    }
  };
  useEffect(() => {
    getCallbaxk();
  }, []);

  return (
    <>
      <VStack minH="80vh" w="full" alignItems="center" justify="center">
        <VStack>
          <Spinner size={"lg"} />
          <Text>Redirecting</Text>
        </VStack>
      </VStack>
    </>
  );
}

export default SpotifyCallback;
