import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import onClickOutside from 'react-onclickoutside';
import TextType from 'app/entities/nested/text_type';
import 'app/entities/nested/css/rich_dropdown.css';

export interface IRichDropdownProps {
  itemId?: string;
  titles?: string[];
  dataName: string;
  list: any[];
  toggleItem?: (list: any[]) => void;
  labelValue?: { label: string | number; value: any };
}

export interface IMenuItem {
  selected: boolean;
  label?: () => string | string;
  value?: () => any | any;
}

export interface IRichDropdownState {
  list: any[];
  listOpen: boolean;
  headerTitle?: string;
}

export class RichDropdown extends Component<IRichDropdownProps, IRichDropdownState> {
  public static defaultProps = {
    itemId: 'rich_dropdown',
    titles: ['Select from list', '{count} Item selected', '{count} Items selected'],
    dataName: 'list',
    // toggleItem: list => {},
    labelValue: { label: 'name', value: 'id' }
  };

  static makeMenuItem<T>(entity: T, cval = false): T & IMenuItem {
    // tslint:disable-next-line
    return Object.assign({}, entity, { selected: cval });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const count = nextProps.list ? nextProps.list.filter(a => a.selected).length : 0;

    // tslint:disable-next-line
    console.log(nextProps.titles[Math.min(2, count)].replace(new RegExp('\\{count\\}', 'gi'), count));
    return { list: nextProps.list, headerTitle: nextProps.titles[Math.min(2, count)].replace(new RegExp('\\{count\\}', 'gi'), count) };
  }

  constructor(props) {
    super(props);
    this.state = {
      // selected items are reflected in this list
      list: [...this.props.list],
      listOpen: false,
      headerTitle: this.props.titles[0]
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
      this.setAsFormVal(this.props.list.filter(it => it.selected));
      // this.props.toggleItem(this.props.list.filter(it => it.selected));
    }
  }

  handleClickOutside = () => {
    // tslint:disable-next-line
    console.log('handleClickOutside');
    this.setAsFormVal(this.props.list.filter(it => it.selected));
    // if (this.props.toggleItem) this.props.toggleItem(this.props.list.filter(it => it.selected));
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

  // https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/4673436#18234317
  // S.O. variant of String.format()
  // formatMule = (str, ...input) => {
  //   if (input.length) {
  //     const repl = (previousValue, currentValue, currentIndex) =>
  //       previousValue.replace(new RegExp(`\\{${currentIndex}\\}`, 'gi'), currentValue);

  //     return input.reduce(repl, str);
  //   }
  //   return str;
  // };

  itemHandler = itemId => {
    // tslint:disable-next-line
    console.log('itemHandler');
    // tslint:disable-next-line
    console.log('itemId: ', itemId);
    return e => {
      const buf = this.state.list.map(element => {
        if (element[this.props.labelValue.value] === itemId) {
          element.selected = !element.selected;
        }
        return element;
      });
      // tslint:disable-next-line
      console.log('buf: ', buf);
      this.setAsFormVal(buf.filter(it => it.selected));
      if (this.props.toggleItem) this.props.toggleItem(buf.filter(it => it.selected));
      // update
      this.setState({ list: buf });
    };
  };

  setAsFormVal = list => {
    const data_store_ids = document.getElementById('data_store_ids') as HTMLInputElement;
    data_store_ids.value = list.map(item => item.id);
  };

  render() {
    const { list, listOpen, headerTitle } = this.state;
    // if (this.props.list) {
    //   // tslint:disable-next-line
    //   console.log('IF list: ', this.props.list);
    //   // this.props.toggleItem(this.props.list.filter(it => it.selected));
    // }
    const idref = this.props.labelValue.value;

    return (
      <div id={this.props.itemId} className="dd-wrapper" onMouseLeave={this.handleClickOutside}>
        <input type="hidden" name={this.props.dataName} id="data_store_ids" />
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
                <TextType textIn={item[this.props.labelValue.label]} />
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
