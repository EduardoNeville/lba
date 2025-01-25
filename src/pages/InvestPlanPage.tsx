import BuyComponent from "../components/invest/BuyComponent";
import SellComponent from "../components/invest/SellComponent";
import InvestComponent from "../components/invest/InvestComponent";
import LegalAspectComponent from "../components/invest/LegalAspectComponent";

export default function InvestPlanPage() {
  return (
    <div>
      <BuyComponent />
      <SellComponent />
      <InvestComponent />
      <LegalAspectComponent />
    </div>
  );
}
