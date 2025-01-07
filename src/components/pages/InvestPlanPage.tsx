import BuyComponent from "../invest/BuyComponent";
import SellComponent from "../invest/SellComponent";
import InvestComponent from "../invest/InvestComponent";
import LegalAspectComponent from "../invest/LegalAspectComponent";

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
