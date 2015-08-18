import React from 'react';
import {SvgIcon} from 'material-ui';

export default class extends React.Component {
  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 13H5v-2h14v2z"/>
      </SvgIcon>
    );
  }
}
