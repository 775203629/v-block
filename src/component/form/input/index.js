/**
 * Created by zonebond on 2017/3/29.
 */
import './input.less';

import React, {Component, PropTypes} from 'react';

export class Input extends Component {
  static propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.element,
    ctrl: PropTypes.element
  };

  get value() {
    return this.refs.input.value;
  }

  render() {
    const {icon, ctrl, type, placeholder, ...others} = this.props;
    return (
      <div className="sk-input">
        {icon ? <div className="icon">{icon}</div> : null}
        <div className="input">
          <input type={type || 'text'} placeholder={placeholder || "Please Input ..."}
                 {...others} ref="input"/>
        </div>
        {ctrl ? (<div className="ctrl">{ctrl}</div>) : null}
      </div>
    )
  }
}