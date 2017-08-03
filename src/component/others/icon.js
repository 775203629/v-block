/**
 * Created by zonebond on 2017/3/30.
 */
import React, {Component} from 'react';

export default class Icon extends Component {
  render(){
    const {...others} = this.props;
    return <img {...others} alt=""/>
  }
}