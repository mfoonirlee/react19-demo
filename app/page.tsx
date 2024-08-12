"use client"
import * as React from "react";
import LoadingBox from "./components/loading-box";
import OptimisticMessage from "./components/optimistic-message";
import FormStatus from "./components/form-status";
import ActionStateForm from "./components/action-state";
import DeepCompareEffect from "./components/deep-compare-effect";
import JumpGame from "./components/jump-game";
import Todo from "./components/todo";


export default function Home() {
  return (
    <main className="min-h-screen grid-cols-2 auto-rows-auto grid">
      <LoadingBox />
      <OptimisticMessage />
      <ActionStateForm />
      <FormStatus />
      <DeepCompareEffect />
      <JumpGame suppressHydrationWarning />
      <Todo />
    </main>
  );
}
