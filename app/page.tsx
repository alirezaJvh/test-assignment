// import { Button } from "./ui/Button";
import { ReserveCalendar } from "./ui/ReserveCalendar";
// import { useQuery } from '@tanstack/react-query'

export default function Home() {
  return (
    <div className="flex justify-center w-full mt-10">
      <div className="grid grid-cols-3 w-full max-w-[1140px] gap-8">
        <div>
          <ReserveCalendar />
        </div>
        <div className="col-span-2">salm</div>
      </div>
    </div>
  );
}
