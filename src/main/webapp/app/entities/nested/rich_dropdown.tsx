import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import onClickOutside from 'react-onclickoutside';
import TextType from 'app/entities/nested/text_type';
import 'app/entities/nested/css/rich_dropdown.css';

export interface IRichDropdownProps {
  /** This component's htmlId */
  htmlId?: string;
  /**
   * An array of menu headers.
   *
   *  Eg: ['Select from list', '{count} Item selected', '{count} Items selected'].
   *
   *    '{count}' will be replaced by the actual number of items selected.
   */
  titles?: string[];
  /**
   * The <input> element "name".
   *
   *  Eg: <input name={dataName}/>
   */
  dataName: string;
  /**
   * A list of MenuItems
   */
  list: IMenuItem[];
  /**
   * Set a listener that receives a list of selected Items.
   */
  toggleItem?: (list: any[]) => void;
  /**
   * The property names used to access the entity's ID (or primary_key)
   * and a property for the UI-label
   */
  labelValue?: { label: string | number; value: any };
}

export interface IMenuItem {
  selected: boolean;
  label?: () => string | string;
  value?: () => any | any;
}

export interface IRichDropdownState {
  listOpen: boolean;
  headerTitle?: string;
}

export class RichDropdown extends Component<IRichDropdownProps, IRichDropdownState> {
  public static defaultProps = {
    htmlId: 'rich_dropdown',
    titles: ['Select from list', '{count} Item selected', '{count} Items selected'],
    dataName: 'list',
    toggleItem: list => {},
    labelValue: { label: 'name', value: 'id' }
  };

  static makeMenuItem<T>(entity: T, cval = false): T & IMenuItem {
    // tslint:disable-next-line
    return Object.assign({}, entity, { selected: cval });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const count = nextProps.list ? nextProps.list.filter(a => a.selected).length : 0;
    return {
      headerTitle: nextProps.titles[Math.min(2, count)].replace(new RegExp('\\{count\\}', 'gi'), count)
    };
  }

  constructor(props) {
    super(props);
    this.state = {
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
    this.setState({ listOpen: this.state.listOpen });
  }

  componentDidUpdate() {
    if (this.props.list && this.props.list.length) {
      // tslint:disable-next-line
      console.log('componentDidUpdate items:', this.props.list);
      this.setAsFormVal(this.props.list.filter(it => it.selected));
    }
  }

  handleClickOutside = () => {
    // tslint:disable-next-line
    console.log('handleClickOutside');
    this.setAsFormVal(this.props.list.filter(it => it.selected));
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
    console.log('itemHandler', itemId);
    return (event: React.MouseEvent<HTMLLIElement>) =>
      this.setAsFormVal(
        this.props.list
          .map(element => {
            if (element[this.props.labelValue.value] === itemId) {
              element.selected = !element.selected;
              element.selected ? event.currentTarget.classList.add('selected') : event.currentTarget.classList.remove('selected');
            }
            return element;
          })
          .filter(it => it.selected)
      );
  };

  setAsFormVal = list => {
    const data_store_ids = document.getElementById('data_store_ids') as HTMLInputElement;
    data_store_ids.value = list.map(item => item.id);
    if (this.props.toggleItem) this.props.toggleItem(list);
  };

  render() {
    const { listOpen, headerTitle } = this.state;
    const { list } = this.props;
    const idref = this.props.labelValue.value;

    return (
      <div id={this.props.htmlId} className="dd-wrapper" onMouseLeave={this.handleClickOutside}>
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
