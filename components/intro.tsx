"use client";

import { useState } from "react";
import { Splash } from "@/components/splash";
import { Hero } from "@/components/hero";

/** Client island: splash gate + hero share introReady. Rest of home stays RSC. */
export function Intro() {
  const [introReady, setIntroReady] = useState(false);

  return (
    <>
      <Splash onDone={() => setIntroReady(true)} />
      <Hero introReady={introReady} />
    </>
  );
}
