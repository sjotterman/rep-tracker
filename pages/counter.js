import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementCounter,
  incrementCounter,
} from "../redux/actions/counterActions";

const App = () => {
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(incrementCounter())}>Increment</button>
      <button onClick={() => dispatch(decrementCounter())}>Decrement</button>

      <h1>{counter}</h1>
    </div>
  );
};

// App.getInitialProps = async (ctx) => {};
export default App;
