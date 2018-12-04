import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import onClickOutside from 'react-onclickoutside';
import TextType from '../nested/text_type';
import 'app/../static/css/global.css';

export interface ISelectMediaProps {
  title: string;
  list: any[];
  toggleItem?: (list: any[]) => void;
  titleHelper: string;
  labelValue: { label: string | number; value: any };
}

export interface ISelectMediaState {
  list: any[];
  listOpen: boolean;
  headerTitle: any;
}

export class SelectMedia extends Component<ISelectMediaProps, ISelectMediaState> {
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
    this.setState({ list: this.props.list });
  }

  handleClickOutside() {
    // tslint:disable-next-line
    console.log('handleClickOutside');
    this.setState({
      listOpen: false
    });
  }

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
  //  value={lessonEntity.questions ? lessonEntity.questions.map(o => o.id).join(',') : ''}
  render() {
    const { list, listOpen, headerTitle } = this.state;
    return (
      <div className="dd-wrapper">
        <div className="dd-header" onClick={this.toggleList}>
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen ? <FontAwesomeIcon icon="arrow-circle-up" size="1x" /> : <FontAwesomeIcon icon="arrow-circle-down" size="1x" />}
        </div>
        {listOpen && (
          <ol className="dd-list">
            {list.map(item => (
              <li
                className={'dd-list-item' + (item.selected ? ' selected' : '')}
                onClick={this.itemHandler(item[this.props.labelValue.value || 'id'])}
                key={item[this.props.labelValue.value || 'id']}
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
// export default onClickOutside(SelectMedia);
export default SelectMedia;
