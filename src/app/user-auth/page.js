import { Suspense } from "react";
import UserAuth from "./UserAuth";

export const dynamic = "force-dynamic"; 

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserAuth />
    </Suspense>
  );
}
