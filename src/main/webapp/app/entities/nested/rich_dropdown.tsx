import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import onClickOutside from 'react-onclickoutside';
import TextType from 'app/entities/nested/text_type';
import 'app/entities/nested/css/rich_dropdown.css';

export interface IRichDropdownProps {
  itemId?: string;
  title: string;
  list: any[];
  toggleItem?: (list: any[]) => void;
  titleHelper: string;
  labelValue: { label: string | number; value: any };
}

export interface IMenuItem {
  selected: boolean;
  label?: () => string | string;
  value?: () => any | any;
}

export interface IRichDropdownState {
  list: any[];
  listOpen: boolean;
  headerTitle: any;
}

export class RichDropdown extends Component<IRichDropdownProps, IRichDropdownState> {
  static makeMenuItem<T>(entity: T, cval = false): T & IMenuItem {
    // tslint:disable-next-line
    return Object.assign({}, entity, { selected: cval });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const count = nextProps.list ? nextProps.list.filter(a => a.selected).length : 0;

    // tslint:disable-next-line
    console.log(`count: ${count}`);
    const update = { list: nextProps.list, headerTitle: nextProps.title };
    if (count) {
      update.headerTitle = count === 1 ? `${count} ${nextProps.titleHelper}` : `${count} ${nextProps.titleHelper}s`;
    }
    return update;
  }

  constructor(props) {
    super(props);
    this.state = {
      // selected items are reflected in this list
      list: [...this.props.list],
      listOpen: false,
      headerTitle: this.props.title
    };
    // This binding is necessary to make `this` work in the callback
    this.toggleList = this.toggleList.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.itemHandler = this.itemHandler.bind(this);
  }

  componentDidMount() {
    // tslint:disable-next-line
    console.log('componentDidMount');
    this.setState({ list: this.props.list });
  }

  componentDidUpdate() {
    // tslint:disable-next-line
    console.log('componentDidUpdate');

    if (this.props.list && this.props.list.length) {
      // tslint:disable-next-line
      console.log('componentDidUpdate items:', this.props.list);
      this.props.toggleItem(this.props.list.filter(it => it.selected));
    }
  }

  handleClickOutside = () => {
    // tslint:disable-next-line
    console.log('handleClickOutside');
    if (this.props.toggleItem) this.props.toggleItem(this.props.list.filter(it => it.selected));
    this.state.listOpen &&
      this.setState({
        listOpen: false
      });
  };

  toggleList = () => {
    // tslint:disable-next-line
    console.log('toggleList');
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  };

  itemHandler = itemId => {
    // tslint:disable-next-line
    console.log('itemHandler');
    // tslint:disable-next-line
    console.log('itemId: ', itemId);
    return e => {
      const buf = this.state.list.map(element => {
        if (element[this.props.labelValue.value || 'id'] === itemId) {
          element.selected = !element.selected;
        }
        return element;
      });
      // tslint:disable-next-line
      console.log('buf: ', buf);
      if (this.props.toggleItem) this.props.toggleItem(buf.filter(it => it.selected));
      // update
      this.setState({ list: buf });
    };
  };

  render() {
    const { list, listOpen, headerTitle } = this.state;
    // if (this.props.list) {
    //   // tslint:disable-next-line
    //   console.log('IF list: ', this.props.list);
    //   // this.props.toggleItem(this.props.list.filter(it => it.selected));
    // }
    const idref = this.props.labelValue.value || 'id';

    return (
      <div id={this.props.itemId || 'rich_dropdown'} className="dd-wrapper" onMouseLeave={this.handleClickOutside}>
        <div className="dd-header" onClick={this.toggleList}>
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen ? <FontAwesomeIcon icon="arrow-circle-up" size="1x" /> : <FontAwesomeIcon icon="arrow-circle-down" size="1x" />}
        </div>
        {listOpen && (
          <ol className="dd-list">
            {list.map(item => (
              <li
                className={'dd-list-item' + (item.selected ? ' selected' : '')}
                onClick={this.itemHandler(item[idref])}
                key={item[idref]}
                ref={item[idref]}
              >
                <TextType textIn={item[this.props.labelValue.label || 'name']} />
                {
                  // item.selected && <FontAwesomeIcon icon="check-circle" />
                }
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }
}
// export default onClickOutside(RichDropdown);
export default RichDropdown;
