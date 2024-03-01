import { cookies } from "next/headers";
import { verifyAuth } from "@/lib/auth";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { createToken } from "@/lib/auth";

const getSession = async () => {
  let session = cookies().get("session")?.value;
  const authUser = session && (await verifyAuth(session).catch((ex) => {}));

  return authUser;
};

const setSession = async (data: JWTPayload) => {
  const token = await createToken(data);

  cookies().set("session", token, { httpOnly: true });
};

export { getSession, setSession };
