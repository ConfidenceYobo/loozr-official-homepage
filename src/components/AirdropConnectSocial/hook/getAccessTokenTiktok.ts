export async function getAccessTokenTiktok(code: string): Promise<string> {
    const clientId = "awnyt7o7i329y8lt";
    const clientSecret = "j7OPwdxz7WzYm8n8npBiGHA0Tup1S3Ro";
    const verifier = sessionStorage.getItem("tiktokAuth");
  
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/callback");
    params.append("code_verifier", verifier!);
  
    const result = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
  
    const { access_token } = await result.json();
    return access_token;
  }
  