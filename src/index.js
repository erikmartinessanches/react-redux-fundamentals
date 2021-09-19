import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
//import reportWebVitals from './reportWebVitals';

/*Reducers
  Convention: If the reducer receives an undefined state, it should return
  a suiting initial state of the application. */
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state;
  }
}

const Counter = ({value, onIncrement, onDecrement}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
  
);

const store = createStore(counterReducer);

/**Here I wrapped ReactDOM.render in my own render function in order to pass 
 * it to store.subscribe() as a callback. The result is that our page is 
 * re-rendered every time an action is dispatched.
 */
const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Counter 
        value={store.getState()}
        onIncrement={() => store.dispatch({type: 'INCREMENT'})}
        onDecrement={() => store.dispatch({type: 'DECREMENT'})}
      />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

/**store.subscribe() lets me register a callback that will be called any 
  *time an action is dispatched.
  */
 store.subscribe(render);
render();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
