import Demo from "../Components/Demo";
import Hero from "../Components/Hero";
import "./App.css";

function App() {
  return (
    <main>
      <div>
        <div className="gradient" />
      </div>
      <div className="app ">
        <Hero />
        <Demo />
      </div>
    </main>
  );
}

export default App;
