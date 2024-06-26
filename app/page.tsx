"use client"
import * as React from "react";
import LoadingBox from "./components/loading-box";
import OptimisticMessage from "./components/optimistic-message";
import FormStatus from "./components/form-status";
import ActionStateForm from "./components/action-state";


export default function Home() {
  return (
    <main className="min-h-screen grid-cols-2 auto-rows-auto grid">
      <LoadingBox />
      <OptimisticMessage />
      <ActionStateForm />
      <FormStatus />
    </main>
  );
}
