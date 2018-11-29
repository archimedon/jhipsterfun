import React from 'react';
import MathJax from 'react-mathjax-preview';

export interface IText {
  textIn: string;
}

export interface ITextState {
  isReady: boolean;
}

export default class TextType extends React.Component<IText, ITextState> {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isReady: nextProps.textIn !== undefined });
  }

  componentWillUnmount() {
    this.setState({ isReady: false });
  }

  componentDidMount() {
    this.setState({ isReady: this.props.textIn !== undefined });
  }

  inspectData(textIn) {
    // todo: DTD selectivity, sanity/security checking.
    // Inject XML tags directly.
    const resary = textIn.toLowerCase().match(/<(\w+)[^>]*>/) as string[];
    const tag = resary && resary.length ? resary[1] : null;

    return tag ? (tag !== 'math' ? 'xhtml' : tag) : textIn.toLowerCase().match(/(image\/|base64)/) ? 'image' : 'raw';
  }

  render() {
    const { textIn } = this.props;
    return !this.state.isReady ? (
      <div>
        <div className="loading-indicator">Loading...</div>
      </div>
    ) : (
      this.markUpData(this.inspectData(textIn), textIn)
    );
  }

  markUpData(mime, input) {
    return {
      image: data => <img src={`data:${data}`} />,
      xhtml: data => <div dangerouslySetInnerHTML={{ __html: data }} />,
      math: data => {
        const ptr = data.toLowerCase().indexOf('<math');
        if (ptr > -1) {
          let [pre, ml] = ['', data];
          if (ptr > 0) {
            ml = data.substring(ptr);
            pre = data.substring(0, ptr);
          }
          return (
            <span>
              {pre}
              <MathJax math={ml} />
            </span>
          );
        }
      },
      raw: data => data
    }[mime](input);
  }
}
