import BookingWizard from "@/components/BookingWizard";
import { notFound } from "next/navigation";

const VALID_IDS = ["1", "2", "3", "4", "5"];

export function generateStaticParams() {
  return VALID_IDS.map((id) => ({ id }));
}

export default function LandingVariant({ params }: { params: { id: string } }) {
  if (!VALID_IDS.includes(params.id)) return notFound();
  return <BookingWizard />;
}
