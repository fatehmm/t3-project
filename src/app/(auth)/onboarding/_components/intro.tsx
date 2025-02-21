"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { ONBOARDING_CONTENT } from "../../../../config/constants";

export function Intro() {
  const router = useRouter();
  const showText = useDebounce(true, 800);

  return (
    <motion.div
      className="flex size-full flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      {showText && (
        <motion.div
          variants={{
            show: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="mx-5 flex flex-col items-center space-y-2.5 text-center sm:mx-auto"
        >
          <motion.h1
            className="text-balance text-4xl transition-colors sm:text-5xl"
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, type: "spring" },
              },
            }}
          >
            {ONBOARDING_CONTENT.INTRO.TITLE}
          </motion.h1>
          <motion.p
            className="max-w-md text-muted-foreground transition-colors sm:text-lg"
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, type: "spring" },
              },
            }}
          >
            {ONBOARDING_CONTENT.INTRO.DESCRIPTION}
          </motion.p>
          <motion.div
            className="pt-4"
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, type: "spring" },
              },
            }}
          >
            <Button onClick={() => router.push("/onboarding?step=create")}>
              {ONBOARDING_CONTENT.INTRO.CTA_BUTTON}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
