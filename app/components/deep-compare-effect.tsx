import { useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

type IVal = {
  value?: string;
};

async function fetchData(): Promise<IVal> {
  let returnVal: IVal = {};
  return await new Promise((reslove) =>
    setTimeout(() => {
      reslove(generateRandomValue());
    }, 1000)
  );
}

async function generateRandomValue() {
  return {
    // value: Math.random().toString().slice(2, 10),
    value: "hello world",
  };
}

export default function DeepCompareEffect() {
  const [params, setParams] = useState<IVal>({});
  useDeepCompareEffect(() => {
    // maybe this comparsation is not accurate
    fetchData().then((res) => {
      console.log(`params change by useDeepCompareEffect: ${JSON.stringify(params)} => ${JSON.stringify(res)}`);
      setParams(res);
    });
  }, [params]);

  useEffect(() => {
    fetchData().then((res) => {
      console.log(`params change by useEffect: ${JSON.stringify(params)} => ${JSON.stringify(res)}`);
      setParams(res);
    });
  }, [params]);

  return (
    <div className="h-80 inset-0 flex items-center justify-end flex-col">
      {JSON.stringify(params)}
    </div>
  );
}
