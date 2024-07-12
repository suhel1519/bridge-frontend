import BridgeBox from "@/components/modals/bridgeBox";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <main className="flex min-h-screen flex-col items-center space-y-6 p-24">
        <h1 className="text-white text-3xl">Bridge</h1>
        <BridgeBox />
      </main>
    </Suspense>
  );
}
