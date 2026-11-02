import { NextRequest, NextResponse } from "next/server";
import { createSignedOAuthState, STATE_COOKIE } from "@/lib/oauth-state";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse("Missing GITHUB_OAUTH_CLIENT_ID or GITHUB_OAUTH_CLIENT_SECRET", {
      status: 500,
    });
  }

  // The CMS repo is public, so the narrowest scope that can commit is enough.
  const scope = process.env.GITHUB_OAUTH_SCOPE || "public_repo";
  const origin = request.nextUrl.origin;
  const redirectUri = `${origin}/api/cms/callback`;
  const state = createSignedOAuthState(clientSecret);

  const github = new URL("https://github.com/login/oauth/authorize");
  github.searchParams.set("client_id", clientId);
  github.searchParams.set("scope", scope);
  github.searchParams.set("redirect_uri", redirectUri);
  github.searchParams.set("state", state);

  const response = NextResponse.redirect(github.toString());
  // Bind the state to this browser so a leaked/forged callback URL is rejected.
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/cms",
    maxAge: 10 * 60,
  });
  return response;
}
