export async function getAccessTokenTiktok(code: string): Promise<string> {
    const clientId = "sbaw1yxy2lum6sklq2";
    const clientSecret = "PG4qSIC7Ve7O9uuAiJ4KdhvllRYmeQbT";
    const verifier = sessionStorage.getItem("tiktokAuth");
  
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "https://localhost:3000/callback");
    params.append("code_verifier", verifier!);
  
    const result = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
  
    const { access_token } = await result.json();
    return access_token;
  }
  