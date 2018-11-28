import React, { Component } from 'react';

const baseUri = 'https://api.iextrading.com/1.0';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export interface IFileForm {
  isLoaded: Boolean;
  path: String;
  mime: String;
}

export default class FileUploadForm extends React.Component<IFileForm> {
  render() {
    const { isLoaded, path, mime } = this.props;

    return isLoaded ? (
      <div>
        {isLoaded + ' : ' + path + ' : ' + mime}
        <input id="file_data" type="file" />
      </div>
    ) : (
      <div className="ticker">
        {isLoaded + ' : ' + path + ' : ' + mime}
        <div className="loading-indicator">Loading...</div>
      </div>
    );
  }
}
