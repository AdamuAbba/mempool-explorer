export const Header = () => {
  return (
    <header className="bg-black flex flex-row justify-center items-center  space-x-10">
      <p className="text-4xl text-white">Mempool Explorer</p>
      <div className="w-[20%] h-20 flex flex-col justify-center items-center">
        <input
          className="shadow-md w-full h-[60%] bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
          placeholder="TX ID"
        />
      </div>
    </header>
  );
};

export default Header;
