import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

// import TicketEvent from "./components/TicketEvent";

import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      {/* <TicketEvent /> */}
      <Footer />
    </div>
  );
}

export default App;
