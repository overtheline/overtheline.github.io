import React from 'react';
import ReactDOM from 'react-dom';
import { SingleSelect } from 'ihme-ui';

function getList(n, strId = 'A') {
  const listOfItems = [];
  for (let i = 0; i < n; i++) {
    listOfItems.push({ item: `${strId} Item - ${i + 1}` });
  }

  return listOfItems;
}

let menuContainerStyle = {
  position: 'absolute',
  zIndex: 50,
  border: '5px solid #dcc',
};

export default class Scroll2 extends React.Component {
  constructor() {
    super();
    this.list = getList(10);
    this.subList = getList(20, 'SuperlongSuperlong');
    this.selectComponents = [];
    this.rowRenderer = this.rowRenderer.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.getSelectComponent = this.getSelectComponent.bind(this);

    this.state = {
      selectValue: null
    };
  }

  onChangeSelect(selection) {
    this.setState({
      selectValue: selection
    });
  }

  getSelectComponent(index) {
    this.selectComponents.forEach((comp) => {
      const el = ReactDOM.findDOMNode(comp);
      console.log(el.getBoundingClientRect());
      menuContainerStyle = Object.assign({}, menuContainerStyle, { border: '1px solid black'} );
    });
    return '0px';
  }

  rowRenderer() {
    return this.list.map((listItem, index) => (
      <div
        key={index}
        style={{
          height: '70px'
        }}
      >
        <div>
          {this.list[index].item}
        </div>
        <div>
          <SingleSelect
            ref={(selectComponent) => { this.selectComponents.push(selectComponent); }}
            labelKey="item"
            valueKey="item"
            options={this.subList}
            onChange={this.onChangeSelect}
            value={this.state.selectValue}
            width={150}
            menuContainerStyle={menuContainerStyle}
            onOpen={this.getSelectComponent}
          />
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div
        style={{
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '400px',
            width: '200px',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          {this.rowRenderer()}
        </div>
      </div>
    );
  }
}
