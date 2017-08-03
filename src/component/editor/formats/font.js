import Quill from 'quill'
const Font = Quill.import('attributors/style/font');

Font.whitelist = ['Arial', 'serif', 'sans-serif', '宋体', '黑体', 'Microsoft YaHei', 'monospace', 'cursive'];

export default Font;
