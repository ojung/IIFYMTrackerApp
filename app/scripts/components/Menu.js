import React from 'react';
import {AppBar, LeftNav, Styles} from 'material-ui';

const menuItems = [
  {route: '/meal-creator', text: 'Create Meal'},
  {route: '/tee-calculator', text: 'Calculate Tee'},
];

export default class extends React.Component {
  static contextTypes = {router: React.PropTypes.func}

  _onLeftNavChange = (_event, _key, payload) => {
    this.context.router.transitionTo(payload.route);
  }

  _onLeftIconButtonTouchTap = () => this.refs.menu.toggle()

  getStyles() {
    const {Colors, Spacing, Typography} = Styles;
    return {
      cursor: 'pointer',
      fontSize: '24px',
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: Colors.cyan500,
      paddingLeft: Spacing.desktopGutter,
      paddingTop: '0px',
      marginBottom: '8px'
    };
  }

  render() {
    return (
      <div>
        <AppBar onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}/>
        <LeftNav
          ref="menu"
          docked={false}
          isInitiallyOpen={false}
          header={<div style={this.getStyles()}>IIFYM</div>}
          menuItems={menuItems}
          onChange={this._onLeftNavChange} />
      </div>
    );
  }
}
