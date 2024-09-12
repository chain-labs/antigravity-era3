import { notFound } from "next/navigation";

export default function EvilAddressPage() {
  if (process.env.NEXT_EVIL_ADDRESS_AVAILABLE !== "true") {
    return notFound();
  }
  return (
    <div>
      <h1>Evil Address</h1>
    </div>
  );
}
