import { useEffect } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { PropagateLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  useRecentTransactionsQuery,
  useSearchForTransactionQuery,
} from "../../services";
import { selectRecentTxCount, selectTxId, setTxid } from "../../store/slices";
import moment from "moment";

const ResponseView = () => {
  const txId = useAppSelector(selectTxId);
  const recentTxCount = useAppSelector(selectRecentTxCount);
  const dispatch = useAppDispatch();

  const convertTimeFromUnix = (timestamp: number | null) => {
    if (!timestamp) {
      return "null";
    }
    return moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss");
  };

  const { data: latestTransaction, isLoading } =
    useRecentTransactionsQuery(recentTxCount);

  useEffect(() => {
    if (txId === null && !isLoading) dispatch(setTxid(latestTransaction![0]));
  }, [dispatch, latestTransaction, txId, isLoading]);

  const { data, isFetching, isError } = useSearchForTransactionQuery(txId);
  console.log(data);

  if (!txId) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <p>Enter transaction ID above to proceed</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center h-screen bg-transparent">
        <p>oops! there was an error</p>
      </div>
    );
  }
  if (isFetching) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <PropagateLoader color="#000000" />
      </div>
    );
  }
  if (data) {
    return (
      <div className="ml-4 my-7 w-full space-y-5 bg-transparent overflow-y-scroll">
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>in mempool</b>
          </p>
          <p className="text-wrap break-words w-[80%]">
            {data.in_mempool ? "true" : "false"}
          </p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>in active chain</b>
          </p>
          <p className="text-wrap break-words w-[80%]">
            {data?.raw_transaction.in_active_chain || "null"}
          </p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>hex</b>
          </p>
          <p className="text-wrap break-words w-[80%]">
            {data?.raw_transaction.hex}
          </p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>txid</b>
          </p>
          <p className="text-wrap break-words w-[80%]">
            {data?.raw_transaction.txid}
          </p>
        </div>
        <div className="flex flex-row justify-between  border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>hash</b>
          </p>
          <p className="text-wrap break-words w-[80%]">
            {data?.raw_transaction.hash}
          </p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>size</b>
          </p>
          <p className="text-wrap break-words w-[80%]">
            {data?.raw_transaction.size}B
          </p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>vsize</b>
          </p>
          <p className="text-wrap break-words w-[80%]">
            {data?.raw_transaction.vsize}vB
          </p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>version</b>
          </p>
          <p className="text-wrap break-words w-[80%]">
            {data?.raw_transaction.version}
          </p>
        </div>
        <div className="flex flex-row justify-between  border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>locktime</b>
          </p>
          <p className="text-wrap break-words w-[80%]">
            {data?.raw_transaction.locktime}
          </p>
        </div>
        <div className="flex flex-row justify-between  border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>blockhash</b>
          </p>
          <p className="text-wrap break-words w-[80%]">
            {data?.raw_transaction.blockhash || "null"}
          </p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>confirmations</b>
          </p>
          <p className="text-wrap break-words w-[80%]">
            {data?.raw_transaction.confirmations || "null"}
          </p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>time</b>
          </p>
          <p className="text-wrap break-words w-[80%]">
            {convertTimeFromUnix(data?.raw_transaction.time)}
          </p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>blocktime</b>
          </p>
          <p className="text-wrap break-words w-[80%]">
            {convertTimeFromUnix(data?.raw_transaction.blocktime)}
          </p>
        </div>
        <div className="flex justify-center items-center py-3 w-full">
          <p>
            <b>Additional Details</b>
          </p>
        </div>
        <div className="flex flex-row w-full justify-around items-center">
          <div>
            <p>
              <b>INPUT</b>
            </p>
            <div className="space-y-7">
              {data.raw_transaction.vin.map((item, index) => (
                <div
                  className="flex flex-col justify-center  bg-slate-400 rounded-md shadow-xl w-80 h-32 p-3"
                  key={index}
                >
                  <div className="flex flex-row space-x-2">
                    <p>
                      <b>txid:</b>
                    </p>
                    <p className="text-wrap break-words w-[80%]">{item.txid}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <IoMdArrowRoundForward size={40} />
          <div>
            <div>
              <p>
                <b>OUTPUT</b>
              </p>
              <div className="space-y-7">
                {data.raw_transaction.vout.map((item, index) => (
                  <div
                    className="flex flex-col justify-center  bg-slate-400 rounded-md shadow-xl w-80 max-h-max min-h-32 p-3"
                    key={index}
                  >
                    <div className="flex flex-row space-x-2">
                      <p>
                        <b>value:</b>
                      </p>
                      <p className="text-wrap break-words w-[80%]">
                        {item.value} BTC
                      </p>
                    </div>
                    <div className="flex flex-row space-x-2">
                      <p>
                        <b>address:</b>
                      </p>
                      <p className="text-wrap break-words w-[80%]">
                        {item.scriptPubKey.address}
                      </p>
                    </div>
                    <div className="flex flex-row space-x-2">
                      <p>
                        <b>hex:</b>
                      </p>
                      <p className="text-wrap break-words w-[80%]">
                        {item.scriptPubKey.hex}
                      </p>
                    </div>
                    <div className="flex flex-row space-x-2">
                      <p>
                        <b>type:</b>
                      </p>
                      <p className="text-wrap break-words w-[80%]">
                        {item.scriptPubKey.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default ResponseView;
