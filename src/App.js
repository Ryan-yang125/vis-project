/*
 * @Author: Yang Rui
 * @Date: 2021-01-09 10:14:23
 * @LastEditTime: 2021-01-11 22:36:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vis/src/App.js
 */
import MatchSelector from "./components/match-selector/matchSelector";
import ClusterView from "./components/clusterView/clusterView";
function App() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <MatchSelector />
      <ClusterView />
    </div>
  );
}

export default App;
