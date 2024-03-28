import { useRef } from "react";
import { PropagateLoader } from "react-spinners";
import { useDraggable } from "react-use-draggable-scroll";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useRecentTransactionsQuery } from "../../services";
import {
  selectRecentTxCount,
  setRecentTxCount,
  setTxid,
} from "../../store/slices";

const RecentTransactionsView = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const recentTxCount = useAppSelector(selectRecentTxCount);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
  });

  const { data, isFetching, isSuccess } =
    useRecentTransactionsQuery(recentTxCount);

  const handleOnTxCountChange = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    let value = e.currentTarget.value;
    dispatch(setRecentTxCount(value));
  };

  const handleOnTxCardClick = (txid: string) => {
    dispatch(setTxid(txid));
  };

  const Transactions = (): JSX.Element => {
    if (isFetching) {
      return (
        <div className="w-full h-36 ml-3 flex justify-center">
          <PropagateLoader color="#ffffff" />
        </div>
      );
    }

    if (isSuccess) {
      return (
        <div className="w-full  space-x-7 flex flex-row">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => handleOnTxCardClick(item)}
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
      );
    }

    return <div></div>;
  };

  return (
    <div className="w-full">
      <div className="flex flex-row space-x-4">
        <p className="text-white text-2xl pl-6 text-shadow shadow-black">
          Recent transactions
        </p>
        <select
          defaultValue={6}
          onChange={handleOnTxCountChange}
          className="w-20 rounded-md shadow-lg"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div
        className="w-full flex flex-row overflow-x-scroll py-10 scrollbar-hide hover:cursor-grab  px-6"
        {...events}
        ref={ref}
      >
        <Transactions />
      </div>
    </div>
  );
};

export default RecentTransactionsView;
