import * as React from "react";

const { useTransition, useEffect, use, useState, Suspense } = React;

interface MessageContainerProps {
  promise: Promise<unknown>;
}

async function asyncRequest() {
  return new Promise((resolve) => setTimeout(resolve, 15000, "Hello World"));
}

function MessageContainer({ promise }: MessageContainerProps) {
  const promiseContent = use(promise);

  console.log("promiseContent", promiseContent);


  // Something was wrong in suspense
  return (
    <Suspense fallback={<div className="w-32 h-32 border-4 fade-in text-center">Loading...</div>}>
      <div className="w-32 h-32 border-4 fade-in text-center fade-in rounded-full flex items-center justify-center">
        <span>Result: {promiseContent}</span>
      </div>
    </Suspense>
  );
}

export default function LoadingBox() {
  const [promise, setPromise] = useState<Promise<unknown>>(Promise.resolve());

  useEffect(() => {
    setPromise(asyncRequest());
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <MessageContainer promise={promise} />
    </div>
  );
}
