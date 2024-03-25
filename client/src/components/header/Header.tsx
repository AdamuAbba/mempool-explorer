import { BsSearch } from "react-icons/bs";
import { useAppDispatch } from "../../hooks";
import { setTxid } from "../../store/slices";

const Header = () => {
  const dispatch = useAppDispatch();

  const updateTxId = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const txId = (document.querySelector("#txId") as HTMLInputElement).value;
    dispatch(setTxid(txId));
  };

  return (
    <header className="bg-black flex flex-row justify-center items-center  space-x-10">
      <p className="text-4xl text-white">Mempool Explorer</p>
      <form
        onSubmit={updateTxId}
        className="w-[20%] h-20 flex flex-row space-x-5 justify-center items-center"
      >
        <input
          className="shadow-md w-full h-[60%] bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
          placeholder="TX ID"
          id="txId"
          required
          type="text"
        />
        <button type="submit">
          <BsSearch color="#ffffff" size={20} />
        </button>
      </form>
    </header>
  );
};

export default Header;
