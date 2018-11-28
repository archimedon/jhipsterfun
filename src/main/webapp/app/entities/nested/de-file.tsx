import React, { CSSProperties } from 'react';
import MathJax from 'react-mathjax-preview';
import { HashType } from 'history';
import { IFile } from 'app/shared/model/file.model';

export interface IDeFile {
  itemId: string;
  style?: CSSProperties;
  file: IFile;
}

export interface IDeFileState {
  isReady: boolean;
}

export default class DeFile extends React.Component<IDeFile, IDeFileState> {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isReady: nextProps.file !== undefined });
  }

  componentWillUnmount() {
    this.setState({ isReady: false });
  }

  componentDidMount() {
    this.setState({ isReady: this.props.file !== undefined });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <div>
          <div className="loading-indicator">Loading...</div>
        </div>
      );
    } else {
      const { file, style, itemId } = this.props;
      if (file.dataContentType && file.data) {
        const [, kingdom, phylum] = file.dataContentType.match(/([^\/]+)\/(.+)/);
        switch (kingdom) {
          case 'image':
            return <img style={style} id={itemId} src={`data:${file.dataContentType};base64, ${file.data}`} />;
          case 'text':
            return (
              <div style={style} id={itemId}>
                {file.data}
              </div>
            );
          default:
            return file.data;
        }
      } else {
        return <span>no data</span>;
      }
    }
  }
}
