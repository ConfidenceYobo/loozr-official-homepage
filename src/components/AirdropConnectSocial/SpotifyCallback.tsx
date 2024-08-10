// Assume using React Router
import { useEffect } from "react";
import { VStack, Spinner, Text } from "@chakra-ui/react";

function SpotifyCallback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const token = localStorage.getItem("jwtToken");

    console.log("code", code);

    if (code) {
      fetch("https://api.loozr.io/api/users/spotify-callback", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("User spotify logged in:", data);
          localStorage.setItem("userSpotifyProfile", JSON.stringify(data));
          window.location.href = "/feeds";
        })
        .catch((error) => console.error("Error:", error));
    }
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
