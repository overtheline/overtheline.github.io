import React from 'react';
import { List } from 'react-virtualized';
import { SingleSelect } from 'ihme-ui';

function getList(n, strId = 'A') {
  const listOfItems = [];
  for (let i = 0; i < n; i++) {
    listOfItems.push({ item: `${strId} Item - ${i + 1}` });
  }

  return listOfItems;
}

export default class Scroll extends React.Component {
  constructor() {
    super();
    this.list = getList(100);
    this.subList = getList(20, 'SuperlongSuperlong');
    this.rowRenderer = this.rowRenderer.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);

    this.state = {
      selectValue: null
    };
  }

  onChangeSelect(selection) {
    this.setState({
      selectValue: selection
    });
  }

  rowRenderer({
    key,
    index,
    isScrolling,
    isVisible,
    style,
  }) {
    Object.assign(style, { direction: 'ltr', paddingLeft: '20px', border: '1px solid #cdc' });
    return (
      <div
        key={key}
        style={style}
      >
        <div>
          {this.list[index].item}
          {isVisible ? ' V' : null}
          {isScrolling ? ' S' : null}
        </div>
        <SingleSelect
          labelKey="item"
          valueKey="item"
          options={this.subList}
          onChange={this.onChangeSelect}
          value={this.state.selectValue}
          width={150}
        />
      </div>
    );
  }

  render() {
    return (
      <List
        width={300}
        height={300}
        rowCount={this.list.length}
        rowHeight={60}
        rowRenderer={this.rowRenderer}
        selectValue={this.state.selectValue}
        style={{ direction: 'rtl', textAlign: 'left', border: '1px solid #dcd' }}
      />
    );
  }
}
