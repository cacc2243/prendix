import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "@/components/prendix/Catalog";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-prendix-bg">
      <Catalog />
    </main>
  );
}
