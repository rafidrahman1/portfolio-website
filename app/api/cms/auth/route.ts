import { NextRequest, NextResponse } from "next/server";
import { createSignedOAuthState } from "@/lib/oauth-state";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse("Missing GITHUB_OAUTH_CLIENT_ID or GITHUB_OAUTH_CLIENT_SECRET", {
      status: 500,
    });
  }

  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope") || "public_repo,user";
  const origin = request.nextUrl.origin;
  const redirectUri = `${origin}/api/cms/callback`;
  const state = createSignedOAuthState(clientSecret);

  const github = new URL("https://github.com/login/oauth/authorize");
  github.searchParams.set("client_id", clientId);
  github.searchParams.set("scope", scope);
  github.searchParams.set("redirect_uri", redirectUri);
  github.searchParams.set("state", state);

  return NextResponse.redirect(github.toString());
}
