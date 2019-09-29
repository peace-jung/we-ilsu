const ADD_LEDGER_LIST = 'ADD_LEDGER_LIST';
const UPDATE_ONE_LEDGER = 'UPDATE_ONE_LEDGER';
const DELETE_LEDGER_ITEM = 'DELETE_LEDGER_ITEM';

const initialState = {
  list: [
    {
      title: 'default',
      type: 'individual',
      key: String(Date.now()),
      history: []
    }
  ]
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LEDGER_LIST:
      return addLedgerList(state, action);
    case UPDATE_ONE_LEDGER:
      return updateOneLedger(state, action);
    case DELETE_LEDGER_ITEM:
      return deleteLedgerItem(state, action);
    default:
      return state;
  }
}

const addLedgerList = (state, action) => {
  const { list } = state;

  if (!newLedger && !newLedger.title && !newLedger.type && !newLedger.key)
    return;
  list.push(action.newLedger);

  return {
    list
  };
};

const updateOneLedger = (state, action) => {
  const { list } = state;
  const { newLedger } = action;
  const newList = list.map(item => {
    if (item.key === newLedger.key) {
      return {
        ...item,
        ...newLedger
      };
    } else return item;
  });

  console.log(newList);

  return {
    list: newList
  };
};

const deleteLedgerItem = (state, action) => {
  const { list } = state;
  const { items } = action;
  const newList = list.filter(
    i => items.filter(l => l.key === i.key).length === 0
  );

  // console.log(newList);

  return {
    list: newList
  };
};

export const actionCreators = {};

export default reducer;
