import BookingWizard, { CampaignVariant } from "@/components/BookingWizard";
import { notFound } from "next/navigation";

const VARIANT_MAP: Record<string, CampaignVariant> = {
  "1": "A",
  "2": "B",
  "3": "C",
  "4": "A",
  "5": "A",
};

export function generateStaticParams() {
  return Object.keys(VARIANT_MAP).map((id) => ({ id }));
}

export default function LandingVariant({ params }: { params: { id: string } }) {
  const variant = VARIANT_MAP[params.id];
  if (!variant) return notFound();
  return <BookingWizard variant={variant} />;
}
