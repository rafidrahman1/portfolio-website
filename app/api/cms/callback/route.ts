import { NextRequest, NextResponse } from "next/server";
import { verifySignedOAuthState } from "@/lib/oauth-state";

export const dynamic = "force-dynamic";

function buildSuccessHtml(accessToken: string): string {
  const payloadLiteral = JSON.stringify({ token: accessToken, provider: "github" });

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><title>Authorizing…</title></head>
<body>
<script>
(function () {
  var payload = ${payloadLiteral};
  function receiveMessage() {
    window.opener.postMessage(
      "authorization:github:success:" + JSON.stringify(payload),
      "*"
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
<p>Completing GitHub sign-in… You can close this window.</p>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse("Missing GITHUB_OAUTH_CLIENT_ID or GITHUB_OAUTH_CLIENT_SECRET", {
      status: 500,
    });
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !verifySignedOAuthState(state, clientSecret)) {
    return new NextResponse("Invalid OAuth callback", { status: 400 });
  }

  const origin = request.nextUrl.origin;
  const redirectUri = `${origin}/api/cms/callback`;

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenRes.ok) {
    return new NextResponse("Token exchange failed", { status: 502 });
  }

  const tokenJson = (await tokenRes.json()) as { access_token?: string; error?: string };
  const accessToken = tokenJson.access_token;
  if (!accessToken) {
    return new NextResponse(tokenJson.error ?? "No access_token from GitHub", { status: 502 });
  }

  const html = buildSuccessHtml(accessToken);
  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
