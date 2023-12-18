// import { Button } from "./ui/Button";
import { ReserveCalendar } from "./ui/ReserveCalendar";
// import { useQuery } from '@tanstack/react-query'

export default function Home() {
  return (
    <div className="flex justify-center w-full mt-10">
      <div className="w-full max-w-[1140px]">
        <ReserveCalendar />
      </div>
    </div>
  );
}
