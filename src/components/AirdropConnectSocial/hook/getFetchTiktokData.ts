import axios from "axios";

interface TiktokUserProfile {
  display_name?: string;
  [key: string]: unknown; // Allow for unknown properties
}

interface TiktokUser {
  // display_name: string;
  profile?: TiktokUserProfile | null;
}

export const usefetchTiktokUserData = async (
  accessToken: string
): Promise<TiktokUser> => {
  const response = await axios({
    method: "GET",
    url: "https://open.tiktokapis.com/v2/user/info/",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  // const data = await response.data;
  return response.data;
};
