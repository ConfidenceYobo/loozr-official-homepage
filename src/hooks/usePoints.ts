import HttpClient from "../utils/httpHelper";

export function useClaimPointCallback() {
  const handleClaimPointCall = async (): Promise<any> => {
    const httpClient = new HttpClient();
    const result = await httpClient.axiosInstance.post(
      `/users/claim-points`,
      {}
    );
    return result.data;
  };
  return { handleClaimPointCall };
}
