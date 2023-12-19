import React from "react";
import { useSession } from "next-auth/react";

export function TheHeader() {
  const { data: session } = useSession();
  return (
    <header className="w-full h-[80px] py-6 flex justify-center border-b border-solid border-gray-300">
      <div className="flex justify-between w-full max-w-[1140px]">
        <div className="absolute w-[calc(100%-48px)] flex justify-center max-w-[1172px] z-[-1]">
          <div>Logo</div>
        </div>
        <div className="flex items-center">{session?.user?.name}</div>
      </div>
    </header>
  );
}
