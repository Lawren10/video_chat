import AppRoute from "./appRoute";
import TopNav from "./sharedComps/navigation/TopNav";

function App() {
  return (
    <>
      <main className="homeContainer">
        <TopNav />
        <AppRoute />
      </main>
    </>
  );
}

export default App;
