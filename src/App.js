/*
 * @Author: Yang Rui
 * @Date: 2021-01-09 10:14:23
 * @LastEditTime: 2021-01-14 11:09:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vis/src/App.js
 */
import MatchSelector from "./components/match-selector/matchSelector";
import Header from "./components/header/header";
function App() {
  return (
    <div className="App">
      <Header />
      <MatchSelector />
    </div>
  );
}

export default App;
