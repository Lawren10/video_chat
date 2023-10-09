import AppRoute from "./appRoute";
import TopNav from "./sharedComps/navigation/TopNav";

function App() {
  return (
    <>
      <main className="Container">
        <div className="mainbg"></div>
        <TopNav />
        <AppRoute />
      </main>
    </>
  );
}

export default App;
