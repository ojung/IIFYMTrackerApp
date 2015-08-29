import React from 'react';
import {FloatingActionButton} from 'material-ui';
import {Tick} from './svg-icons/SvgIcons';

export default class extends React.Component {
  render() {
    return (
      <div style={{position: 'fixed', zIndex: 2, left: '90%', top: '90%'}}>
        <FloatingActionButton {...this.props}>
          <Tick/>
        </FloatingActionButton>
      </div>
    );
  }
}
