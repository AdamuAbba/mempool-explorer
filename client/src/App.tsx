import { Header, Body, Footer } from "./components";

function App() {
  return (
    <div className="flex-col flex grow justify-between space-y-5 bg-[#393939]">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
