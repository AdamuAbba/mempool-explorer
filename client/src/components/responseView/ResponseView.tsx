import { useAppSelector } from "../../hooks";
import { useSearchForTransactionQuery } from "../../services";
import { selectTxId } from "../../store/slices";
import { PropagateLoader } from "react-spinners";

const ResponseView = () => {
  const txId = useAppSelector(selectTxId);
  const { data, error, isFetching } = useSearchForTransactionQuery(txId);
  console.log(data);

  if (!txId) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <p>Enter transaction ID above to proceed</p>
      </div>
    );
  }

  if (error) {
    return <p>There was an error</p>;
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
      <div className="ml-4 my-7 w-full space-y-5 overflow-y-scroll">
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>in active chain</b>
          </p>
          <p className="w-[80%]">{data?.in_active_chain || "null"}</p>
        </div>
        <div className="flex flex-row space-x-16 border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>hex</b>
          </p>
          <p className="text-wrap break-words w-[90%]">{data?.hex}</p>
        </div>
        <div className="flex flex-row space-x-16 border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>txid</b>
          </p>
          <p className="text-wrap break-words w-[90%]">{data?.txid}</p>
        </div>
        <div className="flex flex-row space-x-16 border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>hash</b>
          </p>
          <p className="text-wrap break-words w-[90%]">{data?.hash}</p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>size</b>
          </p>
          <p className="w-[80%]">{data?.size}</p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>vsize</b>
          </p>
          <p className="w-[80%]">{data?.vsize}</p>
        </div>
        <div className="flex flex-row space-x-16 border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>version</b>
          </p>
          <p>{data?.version}</p>
        </div>
        <div className="flex flex-row space-x-16 border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>locktime</b>
          </p>
          <p>{data?.locktime}</p>
        </div>
        <div className="flex flex-row space-x-16 border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>blockhash</b>
          </p>
          <p>{data?.blockhash || "null"}</p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>confirmations</b>
          </p>
          <p className="w-[80%]">{data?.confirmations || "null"}</p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>time</b>
          </p>
          <p className="w-[80%]">{data?.time || "null"}</p>
        </div>
        <div className="flex flex-row justify-between border-y-2 border-gray-400 py-3 w-[80%]">
          <p>
            <b>blocktime</b>
          </p>
          <p className="w-[80%]">{data?.blocktime || "null"}</p>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default ResponseView;
