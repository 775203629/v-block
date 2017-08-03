/**
 * Created by zonebond on 2017/3/28.
 */
import './page.less';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {classnames} from '../../common/utils';

export default class Page extends Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  };

  renderHead() {
    const {title} = this.props;

    if (!title) return null;

    if (typeof title === 'string') {
      return (
        <div className="page-head">
          <h3><strong style={{color: 'blue'}}>{title}</strong></h3>
        </div>
      )
    } else {
      return title
    }
  }

  renderFoot() {
    const {foot} = this.props;

    if (!foot) return null;

    if (typeof foot === 'string') {
      return (
        <div className="page-foot">
          <h3><strong style={{color: 'blue'}}>{foot}</strong></h3>
        </div>
      )
    } else {
      return foot
    }
  }

  render() {
    const {children, className, style} = this.props;
    return (
      <section className={classnames('page', className)} style={{...style}}>
        {this.renderHead()}
        <div className="page-body">
          {children}
        </div>
        {this.renderFoot()}
      </section>
    );
  }
};
