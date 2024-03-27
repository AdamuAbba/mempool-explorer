import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

const transactions = [
  "02a741f336aed3ed524531b63201599f0eb73caced090a3f3515199a9daaa6bc",
  "02a741f336aed3ed524531b63201599f0eb73caced090a3f3515199a9daaa6bc",
  "02a741f336aed3ed524531b63201599f0eb73caced090a3f3515199a9daaa6bc",
  "02a741f336aed3ed524531b63201599f0eb73caced090a3f3515199a9daaa6bc",
  "02a741f336aed3ed524531b63201599f0eb73caced090a3f3515199a9daaa6bc",
  "02a741f336aed3ed524531b63201599f0eb73caced090a3f3515199a9daaa6bc",
  "02a741f336aed3ed524531b63201599f0eb73caced090a3f3515199a9daaa6bc",
  "02a741f336aed3ed524531b63201599f0eb73caced090a3f3515199a9daaa6bc",
  "02a741f336aed3ed524531b63201599f0eb73caced090a3f3515199a9daaa6bc",
  "02a741f336aed3ed524531b63201599f0eb73caced090a3f3515199a9daaa6bc",
];

const RecentTransactionsView = (): JSX.Element => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
  });

  return (
    <div className="w-full">
      <p className="text-white text-2xl pl-6 text-shadow shadow-black">
        Recent transactions
      </p>
      <div
        className="w-full space-x-7 flex flex-row overflow-x-scroll py-10 scrollbar-hide hover:cursor-grab  px-6"
        {...events}
        ref={ref}
      >
        {transactions.map((item, index) => (
          <div
            key={index}
            className="bg-slate-200 shadow-xl h-36 w-36 p-2 rounded-md"
          >
            <div className="flex flex-row flex-wrap">
              <p className="text-sm">
                <b>txid:</b>
              </p>
              <p className="text-sm break-words text-wrap w-[90%]">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactionsView;
