import { IPackage } from "@/types";
import Banner from "./Banner";
import PowerFullFeture from "./PowerFullFeture";
import Pricing from "./Pricing";


const HomePage = async ({ pricing }: { pricing: IPackage[] }) => {
  return (
    <>
      <Banner />
      <Pricing pricing={pricing} />
      <PowerFullFeture />
    </>
  );
}

export default HomePage;