/**
 * Created by zonebond on 2017/5/22.
 */
// library
import ReactDOM from 'react-dom'
import React, {Component, cloneElement} from 'react'
import {Button, Modal, Header} from 'semantic-ui-react'
// tools
import {assignment} from '../../common'

class AlertModel extends Component {
  constructor() {
    super();
    this.state = this.initState();
  }

  initState() {
    return {
      open: false,
      message: null,
      title: null,
      buttons: [Alert.OK],
      callback: null
    }
  }

  show  = (message, title, callback, buttons) => {
    const state = {
      open: true,
      message: message,
      title: title,
      callback: callback,
      buttons: buttons || [Alert.OK],
    };
    this.setState(state);
  };
  close = () => {
    this.setState({open: false});
  };

  handleActionsClick = action => evt => {
    const {callback} = this.state;
    if (typeof callback === 'function') {
      const isCloseFlag = callback(action, evt);
      if (isCloseFlag || isCloseFlag === undefined) {
        this.close();
      }
    } else {
      this.close();
    }
  };

  renderTitle(title) {
    return typeof title === 'string' ? <Header icon="info circle" color="blue" content={title}/> : title;
  }

  renderButtons(buttons) {
    return (
        <Modal.Actions>
          {
            Array.isArray(buttons) ? buttons.map((button, idx) => cloneElement(button.render, {
              key: idx,
              onClick: this.handleActionsClick(button.name)
            })) : null
          }
        </Modal.Actions>
    )
  }

  renderContent(message) {
    return typeof message === 'string' ? <h3>{message}</h3> : message;
  }

  render() {
    const {open, message, title, buttons} = this.state;

    return (
        <Modal dimmer="blurring" size="small" open={open} onClose={this.handleActionsClick(null)} closeOnDimmerClick={false}>
          {this.renderTitle(title)}
          <Modal.Content>
            {this.renderContent(message)}
          </Modal.Content>
          {this.renderButtons(buttons)}
        </Modal>
    )
  }
}

class Alert {
  static OK     = {
    name: 'OK',
    render: <Button color='green' content='确定'/>
  };
  static CANCEL = {
    name: 'CANCEL',
    render: <Button color='red' content='取消'/>
  };

  static TITLEs = {
    INFO: <Header icon="info circle" color="blue" content="消息"/>,
    WARN: <Header icon="warning sign" color="red" content="警告"/>
  };

  static show = (message, title, callback, buttons) => {
    reference.alert.show(message, title, callback, buttons);
  }
}

const doc = window.document;
const div = window.document.createElement('div');
doc.getElementById('root').appendChild(div);

const reference = {};
ReactDOM.render(<AlertModel ref={self => reference.alert = self}/>, div);

export default Alert;
