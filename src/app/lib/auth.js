// import { cookies } from "next/headers";

function baseAuth() {
  const secret = "alehxs";

  const key = new TextEncoder().encode(secret);

  console.log(key);
}

export default baseAuth;
