import ResponseView from "../responseView";

export const Body = () => {
  return (
    <main className="flex flex-col h-auto min-h-screen">
      <form className="w-[80%] h-full flex self-center flex-col">
        <div className="space-y-6 flex flex-col grow">
          <div className="grow flex flex-col">
            <p className="text-lg font-bold text-white">Transaction Details*</p>
            <div className="flex grow rounded-lg bg-slate-200 shadow-md">
              <ResponseView />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Body;
