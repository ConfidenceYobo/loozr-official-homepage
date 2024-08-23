export async function getAccessToken(code: string): Promise<string> {
    const clientId = "e4397413a7ca44aaa463721856b398d3";
    const clientSecret = "25424335c5bc47c0815ceddcea8630d1";
    const verifier = sessionStorage.getItem("spotifyAuth");
  
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "https://dfinity.loozr.io/callback");
    params.append("code_verifier", verifier!);
  
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
  
    const { access_token } = await result.json();
    return access_token;
  }
  