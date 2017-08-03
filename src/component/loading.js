/**
 * Created by zonebond on 2017/4/7.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {Icons} from '../assets'

const style_loading_mask = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  fontSize: '18px',
  fontWeight: 'bolder',
};

class CircleLoading extends Component {
  state = {rolling: 0};

  static propTypes    = {speed: PropTypes.number};
  static defaultProps = {speed: 3};

  set rolling(value) {
    this.setState({rolling: value});
  }

  get rolling() {
    return this.state.rolling;
  }

  tick() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.rolling++;
      }, 16);
    }
  }

  componentWillMount() {
    this.tick();
  }

  componentWillUnmount() {
    this.dispose();
  }

  render() {
    let style = {transform: `rotate(-${this.rolling * this.props.speed}deg)`};
    return <Icons.Loading width="40px" style={style}/>
  }

  dispose() {
    clearInterval(this.interval);
  }
}

export default class Loading extends Component {
  static propTypes = {
    active: PropTypes.bool,
    delay: PropTypes.number,
    loading: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
  };

  static defaultProps = {
    active: false,
    delay: 300,
    loading: <CircleLoading/>
  };

  state = {pended: false};

  get pended() {
    return this.state.pended;
  }

  set pended(value) {
    this.setState({pended: value});
  }

  render() {
    const {active, loading, delay, children, style, ...others} = this.props;

    if (active) {
      if (this._pended === false && !this.pending && delay > 300) {
        this.pending = setTimeout(() => {
          this.pending = clearTimeout(this.pending);
          this._pended = true;
        }, delay);
        return null;
      }

      return <div style={{...style_loading_mask, ...style}} {...others}>{loading}</div>;
    } else {
      if (this.pending)
        this.pending = clearTimeout(this.pending);

      return children;
    }
  }

  componentWillUnmount() {
    if (this.pending)
      this.pending = clearTimeout(this.pending);
  }
}