/**
 * Created by zonebond on 2017/3/29.
 */
// library
import React, {PureComponent, isValidElement, Children, cloneElement} from 'react'
import PropTypes from 'prop-types';
// utils
import {pixels, assignment, classnames} from '../../common/utils'

// enumeration
const FlexAxis = {
  Main: {
    START: 'flex-start',
    END: 'flex-end',
    CENTER: 'center',
    AROUND: "space-around",
    BETWEEN: 'space-between'
  },
  Cross: {
    START: 'flex-start',
    END: 'flex-end',
    CENTER: 'center',
    STRETCH: 'stretch'
  }
};

const main_axis  = ['flex-start', 'flex-end', 'center', 'space-around', 'space-between'];
const cross_axis = ['flex-start', 'flex-end', 'center', 'stretch'];

// Group
export class Group extends PureComponent {
  static HORIZONTAL = FlexAxis.Main;

  static VERTICAL = FlexAxis.Cross;

  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    flex: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
    horizontalGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    verticalGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    horizontalAlign: PropTypes.oneOf(main_axis),
    verticalAlign: PropTypes.oneOf(cross_axis),
    padding: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    overflow: PropTypes.string
  };

  get baseStyle() {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
  }

  get commitProperties() {
    const {style, width, height, flex, horizontalAlign, verticalAlign, padding, overflow, horizontalGap, verticalGap, gap, ...others} = this.props;

    const measured = assignment({...this.baseStyle}, {
      width: pixels(width),
      height: pixels(height),
      justifyContent: horizontalAlign,
      alignItems: verticalAlign,
      padding: padding,
      flex: flex ? [{flex: (typeof flex === "string" ? flex : '1 0 0'), overflow: 'auto'}] : null,
      overflow: overflow,
      horizontalGap: horizontalGap ? null : null,
      verticalGap: verticalGap ? null : null,
      gap: gap ? null : null
    });

    return {style: {...measured, ...style}, props: others};
  }

  get cls() {
    return classnames('group', this.props.className);
  }

  get gapStyle() {
    const {horizontalGap, verticalGap} = this.props;
    return assignment(null, {marginRight: pixels(horizontalGap), marginBottom: pixels(verticalGap)});
  }

  renderChildren() {
    const children = this.props.children, last = Children.count(children) - 1;
    return Children.map(children, (child, index) => {
      return index !== last && isValidElement(child) ? cloneElement(child, {
        style: {
          ...child.props.style,
          ...this.gapStyle
        }
      }) : child;
    });
  }

  render() {
    const {style, props} = this.commitProperties;
    return (
        <div className={this.cls} style={style} {...props}>
          {this.gapStyle ? this.renderChildren() : this.props.children}
        </div>
    );
  }
}

// Horizontal Group
export class HGroup extends Group {
  static propTypes = {
    ...Group.propTypes,
    gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  get baseStyle() {
    return {
      ...super.baseStyle,
      justifyContent: 'center',
      alignItems: 'center'
    };
  }

  get cls() {
    return classnames(super.cls, 'horizontal');
  }

  get gapStyle() {
    return assignment(null, {marginRight: pixels(this.props.gap)});
  }
}

// Vertical Group
export class VGroup extends Group {
  static HORIZONTAL = FlexAxis.Cross;
  static VERTICAL   = FlexAxis.Main;

  static propTypes = {
    ...Group.propTypes,
    horizontalAlign: PropTypes.oneOf(cross_axis),
    verticalAlign: PropTypes.oneOf(main_axis),
    gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  get baseStyle() {
    return {
      ...super.baseStyle,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch'
    };
  }

  get cls() {
    return classnames(super.cls, 'vertical');
  }

  get gapStyle() {
    return assignment(null, {marginBottom: pixels(this.props.gap)});
  }

  get commitProperties() {
    const {style: commitStyle, props}      = super.commitProperties;
    const {horizontalAlign, verticalAlign} = this.props;

    const measured = assignment({...commitStyle}, {
      justifyContent: verticalAlign,
      alignItems: horizontalAlign
    });

    return {style: {...measured}, props: props};
  }
}
