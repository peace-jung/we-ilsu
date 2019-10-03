// NOTE Action Types
const ADD_LEDGER_LIST = 'ADD_LEDGER_LIST';
const UPDATE_ONE_LEDGER = 'UPDATE_ONE_LEDGER';
const DELETE_LEDGER_ITEM = 'DELETE_LEDGER_ITEM';
const SET_SELECTED_ITEM = 'SET_SELECTED_ITEM';

const initialState = {
  list: [
    {
      title: '장부 1',
      type: 'individual',
      key: String(Date.now()),
      history: [],
      member: {}
    }
  ],
  selected: {}
};

// ANCHOR reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LEDGER_LIST:
      return addLedgerList(state, action);
    case UPDATE_ONE_LEDGER:
      return updateOneLedger(state, action);
    case DELETE_LEDGER_ITEM:
      return deleteLedgerItem(state, action);
    case SET_SELECTED_ITEM:
      return setSelectedItem(state, action);
    default:
      return state;
  }
}

// ANCHOR addLedgerList
const addLedgerList = (state, action) => {
  const { list } = state;
  const { newLedger } = action;

  if (!newLedger && !newLedger.title && !newLedger.type && !newLedger.key)
    return;
  list.unshift(action.newLedger);

  alert('장부가 추가되었습니다.');
  return {
    ...state,
    list
  };
};

// ANCHOR updateOneLedger
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

  return {
    ...state,
    list: newList
  };
};

// ANCHOR deleteLedgerItem
const deleteLedgerItem = (state, action) => {
  const { list } = state;
  const { items } = action;
  const newList = list.filter(
    i => items.filter(l => l.key === i.key).length === 0
  );

  return {
    ...state,
    list: newList
  };
};

// ANCHOR setSelectedItem
const setSelectedItem = (state, action) => {
  const { selected } = action;

  return {
    ...state,
    selected
  };
};

export const actionCreators = {};

export default reducer;
