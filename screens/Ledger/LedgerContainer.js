import React, { Component } from 'react';

import LedgerPresenter from './LedgerPresenter';

class LedgerContainer extends Component {
  render() {
    return <LedgerPresenter />;
  }
}

LedgerContainer.navigationOptions = {
  title: '장부'
};

export default LedgerContainer;
