// // import React, { createContext, useContext, useReducer } from "react";
// // import reducer from "./reducer";

// // // Define the types for the state and the context value\
// // type User = {
// //     id: string;
// //     name: string;
   
// //     // Add other user properties as needed
// //   };
// // type State = {
// //     currentUser: User | null; // Replace 'any' with a specific type if you have it
// // };

// // type ContextType = {
// //     state: State;
// //     dispatch: React.Dispatch<never>; // You can replace 'any' with a more specific type for your actions
// // };

// // // Initialize the state
// // const initialState: State = {
// //     currentUser: null,
// // };

// // // Create the context with the correct type
// // const Context = createContext<ContextType>({
// //     state: initialState,
// //     dispatch: () => null, // Provide a default no-op dispatch function
// // });

// // // Custom hook to use the context
// // export const useValue = () => {
// //     return useContext(Context);
// // };

// // // Context provider component
// // const ContextProvider = ({ children }: { children: React.ReactNode }) => {
//   // const [state, dispatch] = useReducer(reducer, initialState);

// //     return (
// //         <Context.Provider value={{ state, dispatch }}>
// //             {children}
// //         </Context.Provider>
// //     );
// // };

// // export default ContextProvider;
// import { createContext, useContext, useReducer } from 'react';
// import reducer from './reducer';

// const initialState = {
//   currentUser: null,
//   openLogin:false,
// };

// const Context = createContext(initialState);

// export const useValue = () => {
//   return useContext(Context);
// };

// const ContextProvider = ({ children }: { children: React.ReactNode }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//      <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
//   );
// };

// export default ContextProvider;