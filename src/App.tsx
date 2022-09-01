import "./App.css";
import Bookings from "./components/Bookings/Bookings";
import { Wrapper } from "./components/common/Wrapper/Wrapper";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Form />
        <Bookings/>
      </Wrapper>
    </div>
  );
}

export default App;
