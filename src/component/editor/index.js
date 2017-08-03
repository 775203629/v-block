/**
 * Created by zonebond on 2017/5/9.
 */
// style
import 'quill/dist/quill.snow.css'
import './my-quill.less'
// library
import React, {Component} from 'react'
import Quill from 'quill'
import Delta from 'quill-delta'
import Emitter from './core/emitter'
// commons
import {block} from '../../common'
// component
import {VGroup} from '../group'
// formatter
import Font from './formats/font'
import Size from './formats/size'

const file_size_limit = 1024 * 1024;

@block.box_model
export default class Editor extends Component {
  modules = {
    toolbar: [
      [{'font': Font.whitelist}],
      [{'header': [1, 2, 3, 4, 5, 6, false]}],

      [{'color': []}, {'background': []}],

      [{'size': Size.whitelist}],

      ['bold', 'italic', 'underline', 'strike'],

      [{'align': []}],
      ['image'],
      ['blockquote'],

      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'indent': '-1'}, {'indent': '+1'}]
    ]
  };

  formats = [
    'header', 'font', 'color', 'background', 'script',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'align', 'clean'
  ];

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  componentDidMount() {
    this.initEditor();
  }

  initRegisters() {
    Quill.register(Font, true);
    Quill.register(Size, true);
    Quill.register(Image, true);
  }

  initEditor() {
    // register
    this.initRegisters();
    // options
    var options = {
      modules: this.modules,
      format: this.formats,
      theme: 'snow'
    };
    // create
    this.editor = new Quill(this.refs.editor, options);
    // expose ref to outer
    this.props.editorRef(this.editor);
    //
    const handlers    = this.editor.theme.modules.toolbar.handlers;
    handlers['image'] = function () {
      let fileInput = this.container.querySelector('input.ql-image[type=file]');
      if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
        fileInput.classList.add('ql-image');
        fileInput.addEventListener('change', () => {
          if (fileInput.files != null && fileInput.files[0] != null) {
            console.log('-->', fileInput.files[0]);
            var file = fileInput.files[0];
            if(file.size > file_size_limit){
              alert('请选择小于 1MB 的图片');
              return;
            }

            let reader    = new FileReader();
            reader.onload = (e) => {
              let range = this.quill.getSelection(true);
              this.quill.updateContents(new Delta()
                      .retain(range.index)
                      .delete(range.length)
                      .insert({image: e.target.result})
                  , Emitter.sources.USER);
              fileInput.value = "";
            };
            reader.readAsDataURL(fileInput.files[0]);
          }
        });
        this.container.appendChild(fileInput);
      }
      fileInput.click();
    };
  }

  render() {
    return (
        <VGroup style={{height: '100%', ...this.committedStyle}} ref="container">
          <div ref="editor" style={{flex: '1 1 0%'}}></div>
        </VGroup>
    )
  }
}