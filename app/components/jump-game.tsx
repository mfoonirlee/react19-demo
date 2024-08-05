import { useState, useEffect, useRef, useCallback } from "react";

const LENGTH = 10;

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateJumpArray(length = LENGTH) {
  return Array.from({ length }).map(() => randomInt(0, Math.floor(LENGTH / 2)));
}

export default function JumpGame() {
  const [jumpArray, setJumpArray] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPass, setIsPass] = useState<string | boolean>("...");

  const jump = useCallback(
    (localIndex: number = currentIndex) => {
      if (isPass !== true) {
        let newIndex = localIndex + jumpArray[localIndex];
        // if overflow limit or stop
        if (newIndex >= jumpArray.length || newIndex === localIndex) {
          setIsPass(false);
        } else if (newIndex == jumpArray.length - 1) {
          setCurrentIndex(newIndex);
          setIsPass(true);
        } else {
          setCurrentIndex(newIndex);
        }
      }
    },
    [currentIndex, jumpArray]
  );

  useEffect(() => {
    // should set this setter in client side
    setJumpArray(generateJumpArray());
  }, []);

  useEffect(() => {
    if (jumpArray.length > 0) {
      setTimeout(() => jump(currentIndex), 1000);
    }
  }, [jumpArray, currentIndex]);

  return (
    <div className="h-80 inset-0 flex items-center justify-end flex-col">
      <div className="flex border border-[#0ea5e9] border-r-0">
        {jumpArray.map((item, index) => (
          <span
            className="w-10 h-10 flex items-center justify-center box-border border-r border-[#0ea5e9] transition-colors"
            style={{
              backgroundColor: currentIndex === index ? "#c7d2fe" : "#fff",
            }}
            key={`${item}-${index}`}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="w-48 italic">
        Can jump to final: <strong>{String(isPass)}</strong>
      </div>
    </div>
  );
}
