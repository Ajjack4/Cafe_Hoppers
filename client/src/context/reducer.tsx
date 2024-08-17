type User = {
    id: string;
    name: string;
    // Add other user properties as needed
  };
  
  type State = {
    currentUser: User | null;
    // Add other state properties as needed
  };
  
  type Action = { type: 'UPDATE_USER'; payload: User }
   
  
//   const reducer = (state: State, action: Action): State => {
//     switch (action.type) {
//       case 'UPDATE_USER':
//         return { ...state, currentUser: action.payload };
//       default:
//         throw new Error(`Invalid action ${action.type}`);
//     }
//   };
  
//   export default reducer;
const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'UPDATE_USER':
        return { ...state, currentUser: action.payload };
  
      default:
        throw new Error('No matched action!');
    }
  };
  
  export default reducer;