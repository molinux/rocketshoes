import produce from 'immer';

// All Reducers hear all actions
// Let's start an empty cart
export default function cart(state = [], action) {
  console.log(state);

  // This switch make the reducer's cart listen only the cart's actions
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, (draft) => {
        const { product } = action;

        draft.push(product);
      });
    case '@cart/REMOVE':
      return produce(state, (draft) => {
        // Searching for the product on the list
        const productIndex = draft.findIndex((p) => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, (draft) => {
        // Searching for the product on the list
        const productIndex = draft.findIndex((p) => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      // Inform to all about the cart state update
      return state;
  }
}
