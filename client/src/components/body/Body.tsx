import { useAppSelector } from "../../hooks";
import { useSearchForTransactionQuery } from "../../services";
import { selectTxId } from "../../store/slices";
// import { Networks } from "../../utils";

export const Body = () => {
  const txId = useAppSelector(selectTxId);
  console.log("txId ::", txId);
  const { data, error } = useSearchForTransactionQuery(txId);
  console.log(data);

  return (
    <main className="flex flex-col h-screen">
      <form className="w-[80%] h-full flex self-center flex-col">
        <div className="space-y-6 flex flex-col grow">
          <div className="grow flex flex-col">
            <p className="text-lg font-bold text-white">Transaction Details*</p>
            <div className="flex grow rounded-lg bg-slate-200 shadow-md">
              {error ? <p>There was an error</p> : null}
            </div>
          </div>
          {/* <div className="py-4 flex flex-col">
            <p className="text-lg text-white font-bold">Network*</p>
            <select className="w-full bg-white text-black  border-slate-200 py-2  border-2 shadow-md">
              {Networks.map((item, index) => (
                <option className="text-black" key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div> */}
        </div>
      </form>
    </main>
  );
};

export default Body;
