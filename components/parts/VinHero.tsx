"use client";

import { useRouter } from "next/navigation";
import PartsHero from "./PartsHero";

/** The parts hero on the VIN page: a manual vehicle choice opens the parts list for it. */
export default function VinHero() {
  const router = useRouter();
  return <PartsHero vehicle={null} onCheck={(id) => router.push(`/parts?vehicle=${id}#all-parts`)} onClear={() => {}} />;
}
