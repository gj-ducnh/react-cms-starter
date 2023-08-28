import { useSelector } from "react-redux";
import { Router } from "./Router";
import { RoundSpinner } from "./common/components/round-spinner";
import { useCredential } from "./hooks/useCredential";
import { IStoreState } from "./interfaces/Store";

const App = () => {
  useCredential();
  const appStates = useSelector((state: IStoreState) => state.app);

  return (
    <>
      <Router profile={appStates.profile}></Router>
      {appStates.loading && <RoundSpinner />}
    </>
  );
};

export default App;
