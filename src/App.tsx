import "./App.css";
import Router from "./components/Router";
import Route from "./components/Route";
import Root from "./pages/Root";
import About from "./pages/About";

function App() {
  return (
    <>
      <Router>
        <Route path="/" component={<Root />}></Route>
        <Route path="/about" component={<About />}></Route>
      </Router>
    </>
  );
}

export default App;
