"use client"
import * as React from "react";
import LoadingBox from "./components/loading-box";
import OptimisticMessage from "./components/optimistic-message";
import FormStatus from "./components/form-status";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around">
      <LoadingBox />
      <OptimisticMessage />
      <FormStatus />
    </main>
  );
}
