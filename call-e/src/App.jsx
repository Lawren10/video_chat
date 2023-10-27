import AppRoute from "./appRoute";
import TopNav from "./sharedComps/navigation/TopNav";
import Controls from "./sharedComps/navigation/Controls";
import Participants from "./sharedComps/sidebars/Participants";
import Chat from "./sharedComps/sidebars/Chat";

function App() {
  return (
    <>
      <main className="Container">
        <div className="mainbg"></div>
        <TopNav />
        <AppRoute />
        <Controls />
        <Participants />
        <Chat />
      </main>
    </>
  );
}

export default App;
