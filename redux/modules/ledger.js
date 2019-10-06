// NOTE Action Types
const ADD_LEDGER_LIST = 'ADD_LEDGER_LIST';
const UPDATE_ONE_LEDGER = 'UPDATE_ONE_LEDGER';
const DELETE_LEDGER_ITEM = 'DELETE_LEDGER_ITEM';
const SET_SELECTED_ITEM = 'SET_SELECTED_ITEM';
const ADD_HISTORY_ITEM = 'ADD_HISTORY_ITEM';

const initialState = {
  list: {
    [String(Date.now())]: {
      title: '장부 1',
      type: 'individual',
      history: {},
      member: {}
    }
  },
  // list: [
  //   {
  //     title: '장부 1',
  //     type: 'individual',
  //     key: String(Date.now()),
  //     history: {},
  //     member: {}
  //   }
  // ],
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
    case ADD_HISTORY_ITEM:
      return addHistoryItem(state, action);
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

  alert('장부가 추가되었습니다.');
  return {
    ...state,
    list: {
      ...list,
      ...newLedger
    }
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

  const newList = JSON.parse(JSON.stringify(list));
  for (let i in items) {
    delete newList[items[i]];
  }

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

// ANCHOR addHistoryItem
const addHistoryItem = (state, action) => {
  const { list, selected } = state;
  const { selectedDate, data } = action;

  const newList = JSON.parse(JSON.stringify(list));
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const date = selectedDate.getDate();

  // Check Object is undefind
  if (!newList[selected].history[year]) newList[selected].history[year] = {};
  if (!newList[selected].history[year][month])
    newList[selected].history[year][month] = {};
  if (!newList[selected].history[year][month][date])
    newList[selected].history[year][month][date] = [];
  newList[selected].history[year][month][date].push(data);

  return {
    ...state,
    list: newList
  };
};

export const actionCreators = {};

export default reducer;
