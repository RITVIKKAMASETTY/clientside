// export default function middeleware(request)
// {
//     console.log(request)
// }
// middleware.ts
// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/account"], // protect only /account route
// };
// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/account"], // protect only /account route
// };
import {auth} from "@/app/_lib/auth";
export default  middleware=auth;
export const config={
  matcher:["/account"]
}