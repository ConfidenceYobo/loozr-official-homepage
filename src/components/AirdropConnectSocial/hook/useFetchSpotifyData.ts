import axios from "axios";

interface SpotifyUserProfile {
  display_name?: string;
  [key: string]: unknown; // Allow for unknown properties
}

interface SpotifyUser {
  // display_name: string;
  profile?: SpotifyUserProfile | null;
}

export const usefetchSpotifyUserData = async (
  accessToken: string
): Promise<SpotifyUser> => {
  const response = await axios({
    method: "GET",
    url: "https://api.spotify.com/v1/me",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  // const data = await response.data;
  return response.data;
};
