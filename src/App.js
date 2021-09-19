import './App.css';
import { createStore } from 'redux';
/*Reducers
  Convention: If the reducer receives an undefined state, it should return
  a suiting initial state of the application. */

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state;
  }
}

const store = createStore(counter);

console.log(store.getState());

/**store.subscribe() lets us register a callback that will be called any time
 * an action is dispatched.
 */
store.subscribe(()=>{
  document.body.innerText = store.getState(); //Naive.
});

/**Any time the body is clicked, we'll dispatch an action to increment the 
 * counter. */
document.addEventListener('click', () =>{
  store.dispatch({type: 'INCREMENT'});
})

function App() {
  return (
    document.body.innerText = store.getState()
  );
}

export default App;
