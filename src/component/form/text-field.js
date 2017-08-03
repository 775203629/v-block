/**
 * Created by zonebond on 2017/3/29.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {pixels, assignment, classnames} from '../../common/utils'
import {box_model, font} from '../../common/block'

@font @box_model
export default class TextField extends Component {
  static propTypes = {
    label: PropTypes.string,
    lines: PropTypes.number,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }

  render() {
    const {children, label, className, style, size, lines, ...rest} = this.props;

    const others = this.extensionProps(rest);

    const commitStyle = assignment({...style, ...this.committedStyleProps}, {
      WebkitLineClamp: lines,
      fontSize: pixels(size)
    });

    return (
      <div style={commitStyle} className={classnames("multi-line-clamp", className)} {...others}>{children || label}</div>
    )
  }
}
