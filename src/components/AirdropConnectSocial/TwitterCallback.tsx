import { Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";

const TwitterCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get("oauth_token");
    const oauthVerifier = urlParams.get("oauth_verifier");
    const token = localStorage.getItem("jwtToken");

    // console.log("oauthToken", oauthToken, "oauthVerifier", oauthVerifier);

    if (oauthToken && oauthVerifier) {
      fetch("https://api.loozr.io/api/users/twitter-callback", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oauth_token: oauthToken,
          oauth_verifier: oauthVerifier,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("User twitter logged in:", data);
          localStorage.setItem("userTwitterProfile", JSON.stringify(data));
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
};

export default TwitterCallback;
