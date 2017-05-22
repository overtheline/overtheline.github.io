import React from 'react';
import ReactDOM from 'react-dom';
import { SingleSelect } from 'ihme-ui';

function getOptions(group, n) {
  const listOfOptions = [];
  for (let i = 0; i < n; i++) {
    listOfOptions.push({
      label: `${group} -- ${i + 1} -- ${group}`,
      key: i + 1,
      group,
    });
  }

  return listOfOptions;
}

const containerStyle = {
  height: '400px',
  width: '200px',
  overflowY: 'auto',
  overflowX: 'hidden',
};

const selectContainerStyle = {
  height: '70px',
};

const selectGroups = [
  'lamp eye missing',
  'chair horn head',
  'coaster fish teeth',
  'plug pine paint',
  'composting ring metal',
  'tower board pillow',
  'wine shade fyler'
];

export default class Scroll extends React.Component {
  constructor() {
    super();

    this.state = {
      settings: {},
      menuContainerStyle: {
        position: 'fixed',
        zIndex: 10,
      },
    };

    this.selectRefs = {};

    this.storeRef = this.storeRef.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  storeRef(select) {
    this.selectRefs[select.props.name] = select;
  }

  onScroll() {
    if (!this.openedSelect) return;

    const position = ReactDOM.findDOMNode(this.openedSelect).getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const top = position.top + position.height + 248 > windowHeight
      ? position.top - 248
      : position.top + position.height;
    this.setState(Object.assign(
      {},
      this.state,
      {
        menuContainerStyle: Object.assign(
          {},
          {
            position: 'fixed',
            zIndex: 10,
            top,
            left: position.left,
          }
        )
      }
    ));
  }

  setMenuContainerStyle() {
    const that = this;

    return function computeMenuContainerStyle() {
      // this = props of select that is focused.
      // that = this of Scroll class instance.

      that.openedSelect = that.selectRefs[this.name];

      const position = ReactDOM
        .findDOMNode(that.selectRefs[this.name])
        .getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const top = position.top + position.height + 248 > windowHeight
        ? position.top - 248
        : position.top + position.height;
      that.setState(Object.assign(
        {},
        that.state,
        { menuContainerStyle: Object.assign(
          {},
          {
            position: 'fixed',
            zIndex: 10,
            top,
            left: position.left,
          }
        ) }
      ));
    };
  }

  selectRenderer() {
    return selectGroups.map((selectGroup, index) => {
      const options = getOptions(selectGroup, 12);

      return (
        <div
          key={index}
          style={selectContainerStyle}
        >
        <div>{selectGroup}</div>
        <div>
          <SingleSelect
            ref={this.storeRef}
            name={selectGroup}
            labelKey="label"
            valueKey="key"
            options={options}
            width={150}
            onFocus={this.setMenuContainerStyle()}
            menuContainerStyle={this.state.menuContainerStyle}
          />
        </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div
        style={containerStyle}
        onScroll={this.onScroll}
      >
        {this.selectRenderer()}
      </div>
    );
  }
}
