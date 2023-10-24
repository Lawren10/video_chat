import AppRoute from "./appRoute";
import TopNav from "./sharedComps/navigation/TopNav";
import Controls from "./sharedComps/navigation/Controls";

function App() {
  return (
    <>
      <main className="Container">
        <div className="mainbg"></div>
        <TopNav />
        <AppRoute />
        <Controls />
      </main>
    </>
  );
}

export default App;
