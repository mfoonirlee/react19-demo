"use client"
import * as React from "react";
import LoadingBox from "./components/loading-box";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoadingBox />
    </main>
  );
}
