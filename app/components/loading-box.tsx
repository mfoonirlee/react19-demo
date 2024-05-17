import * as React from "react";

const { useTransition, useEffect, use, useState, Suspense } = React;

interface MessageContainerProps {
  promise: Promise<unknown>;
}

async function asyncRequest() {
  return new Promise((resolve) => setTimeout(resolve, 1500, "Hello World"));
}

function Message({ promise }: MessageContainerProps) {
  const promiseContent = use(promise);

  return (
    <div className="w-32 h-32 border-4 fade-in text-center fade-in rounded-full flex items-center justify-center">
      <span>{promiseContent}</span>
    </div>
  );
}

function MessageContainer({ promise }: MessageContainerProps) {
  return (
    <Suspense
      fallback={
        <div className="w-32 h-32 border-4 text-center flex items-center justify-center"><span>Loading...</span></div>
      }
    >
      <Message promise={promise} />
    </Suspense>
  );
}

export default function LoadingBox() {
  const [promise, setPromise] = useState<Promise<unknown>>(Promise.resolve());

  useEffect(() => {
    setPromise(asyncRequest());
  }, []);

  return (
    <div className="inset-0 flex items-center justify-center">
      <MessageContainer promise={promise} />
    </div>
  );
}
