import nextDynamic from "next/dynamic";

export const dynamic = "force-static";

const StudioClient = nextDynamic(
  () => import("@/components/studio-client").then((mod) => mod.StudioClient),
  {
    ssr: false,
  },
);

export default function StudioPage() {
  return <StudioClient />;
}
