import { notFound } from "next/navigation";

export default function UnwrapPage() {
  if (process.env.NEXT_UNWRAP_AVAILABLE !== "true") {
    return notFound();
  }
  return (
    <div>
      <h1>Unwrap</h1>
    </div>
  );
}
