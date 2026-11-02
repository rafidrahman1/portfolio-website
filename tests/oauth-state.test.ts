import { describe, expect, it } from "vitest";
import { createSignedOAuthState, verifySignedOAuthState } from "@/lib/oauth-state";

describe("oauth state", () => {
  it("accepts a state signed with the same secret", () => {
    expect(verifySignedOAuthState(createSignedOAuthState("s3cret"), "s3cret")).toBe(true);
  });

  it("rejects a different secret, tampering and malformed input", () => {
    const state = createSignedOAuthState("s3cret");
    expect(verifySignedOAuthState(state, "other")).toBe(false);
    expect(verifySignedOAuthState(`${state}x`, "s3cret")).toBe(false);
    expect(verifySignedOAuthState("nodot", "s3cret")).toBe(false);
    expect(verifySignedOAuthState(null, "s3cret")).toBe(false);
  });
});
