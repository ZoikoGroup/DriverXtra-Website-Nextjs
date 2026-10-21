import ExplainerCards from "@/components/ui/ExplainerCards";
import { readinessChecks } from "./data";

export default function SellerReadiness() {
  return (
    <ExplainerCards
      id="seller-readiness"
      eyebrow="Seller readiness"
      title="What you may be asked for"
      description="Requirements depend on your market, your role and the method you choose. Each check is separate."
      items={readinessChecks}
    />
  );
}
