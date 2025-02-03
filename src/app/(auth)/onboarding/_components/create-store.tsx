"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "../../../../components/ui/button";
import { StepHeader } from "./step-header";

interface CreateStoreProps {
  userId: string;
}

export function CreateStore({ userId }: CreateStoreProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isCreatePending, startCreateTransaction] = React.useTransition();

  // function onSubmit(input: CreateStoreSchema) {
  //   startCreateTransaction(async () => {
  //     const { data, error } = await createStore({ ...input, userId });

  //     if (error) {
  //       toast.error(error);
  //       return;
  //     }

  //     if (data) {
  //       const newSearchParams = new URLSearchParams(searchParams);
  //       newSearchParams.set("step", "connect");
  //       newSearchParams.set("store", data.id);
  //       router.push(`/onboarding?${newSearchParams.toString()}`);
  //     }

  //     form.reset();
  //   });
  // }

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
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
        className="flex flex-col space-y-4 rounded-xl bg-background/60 p-8"
      >
        <StepHeader
          title="Let's start by creating your store"
          description="You can update your store name and description later"
        />
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.4, type: "spring" },
            },
          }}
        >
          <Button onClick={() => router.push("/onboarding?step=connect")}>
            Blet
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
