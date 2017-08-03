/**
 * Created by zonebond on 2017/5/7.
 */
// library
import React, {Component} from 'react'
// common
import {pixels, assignment} from '../../common'

const baseLineStyleObj = {position: 'absolute', top: '-5px', overflow: 'hidden'};

export default class SVGPath extends Component {
  render() {
    const {width, height, gap, style, ...rests} = this.props;

    const {d, ...others} = rests;

    const half_gap       = gap ? gap * 0.5 : null;

    const fw = width || 40;
    const fh = height || 40;
    const hw = fw * 0.5;
    const hh = fh * 0.5 + (half_gap ? half_gap * 0.5 : 0);

    const sPath = d.replace(/\$FW/g, `${fw}`).replace(/\$FH/g, `${fh}`).replace(/\$HW/g, `${hw}`).replace(/\$HH/g, `${hh}`);

    const pathProps      = {stroke: 'rgba(0,131,187,0.70)', strokeWidth: '1', fill: 'transparent', ...others};

    const committedStyle = assignment(baseLineStyleObj, {top: pixels(isNaN(half_gap) ? null : -half_gap)});

    return (
        <svg width={`${fw}px`} height={`calc(100% + ${half_gap}px)`} xmlns="http://www.w3.org/2000/svg"
             style={{...committedStyle, ...style}}
             viewBox={`0 0 ${fw} ${fh}`} preserveAspectRatio="none">
          <path d={sPath} {...pathProps}/>
        </svg>
    )
  }
}