import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, combineReducers } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";

/*Reducers
  Convention: If the reducer receives an undefined state, it should return
  a suiting initial state of the application. 
  
  State properties and the way they are changed by actions are defined together
  in a reducer. To add a new state member, just define a reducer for it.
  */
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;

    /*If the reducer doesn't recognize the action, return state unchanged. 
      This leaves other reducers registered in the redux store to treat the 
      action if they wish. (Chain of responsibility pattern.)*/
    default:
      return state;
  }
};

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
    <br />
    <p>Counter: {addCounter([1, 2, 3])}</p>
    <br />
    <p>Remove counter: {removeCounter([1, 2, 3], 2)}</p>
    <br />
    <p>Increment counter: {incrementCounter([1, 2, 3], 1)}</p>
    <br />
  </div>
);

const addCounter = (list) => {
  //Doesn't modify, returns a new array.
  //return list.concat(0);
  return [...list, 0];
};

const incrementCounter = (list, index) => {
  // return list
  //   .slice(0, index)
  //   .concat([list[index] + 1])
  //   .concat(list.slice(index + 1))
  return [...list.slice(0, index), list[index] + 1, ...list.slice(index + 1)];
};

const removeCounter = (list, index) => {
  //Doesn't modify, returns a concatenated array.
  return list.slice(0, index).concat(list.slice(index + 1));
};

const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed,
  };
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map((t) => todo(t, action));
    default:
      return state;
  }
};

const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed,
      };
    default:
      return state;
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter,
});

let nextTodoId = 0;
const TodoApp = () => {
  /* Brilliantly, we can use the react-redux API (useDispatch) to access the
   *  dispatch function on the store from within functional components. */
  const dispatch = useDispatch();
  const addTodo = useCallback(
    () =>
      dispatch({
        type: "ADD_TODO",
        text: "Test",
        id: nextTodoId++,
      }),
    [dispatch]
  );

  /**useEffect may perhaps be used for populating a list from say an API... */
  // useEffect(() => {
  //   dispatch({
  //     type: "ADD_TODO",
  //     text: "Test",
  //     id: nextTodoId++,
  //   });
  // }, [dispatch]);

  const listOfTodos = useSelector((state) => state.todos);

  return (
    <div>
      <button onClick={addTodo}>Add todo</button>
      <ul>
        {listOfTodos?.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   };
// };

/* Second parameter for the redux dev extension */
const store = createStore(
  todoApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/**Here I wrapped ReactDOM.render in my own render function in order to pass
 * it to store.subscribe() as a callback. The result is that our page is
 * re-rendered every time an action is dispatched.
 */
const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      {/* Passing the store down with Provider from react-redux. */}
      <Provider store={store}>
        {/*       <Counter 
        value={store.getState()}
        onIncrement={() => store.dispatch({type: 'INCREMENT'})}
        onDecrement={() => store.dispatch({type: 'DECREMENT'})}
      /> */}
        <TodoApp />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

/**store.subscribe() lets me register a callback that will be called any
 *time an action is dispatched.
 */
store.subscribe(render);
render(); //Once to render initial state.
