import { unstable_noStore as noStore } from "next/cache";

import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
export const revalidate = 0;          // no ISR, always fresh
export const dynamic = "force-dynamic"; // disable caching


async function CabinList({ filter }) {
  // noStore();

  const cabins = await getCabins();
const fixedCabins = cabins.map(cabin => ({
  ...cabin,
  image: cabin.image.replace("//cabin", "/cabin"),
}));

console.log(fixedCabins);

  if (!cabins.length) return null;

  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
