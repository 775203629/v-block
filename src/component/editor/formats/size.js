import Quill from 'quill'
const Size     = Quill.import('attributors/style/size');
const initSize = (step = 2, min = 10, max = 20, unit = 'px') => {
  const size = [];
  for (let i = min; i <= max; i += step) {
    size.push(`${i}${unit}`);
  }
  return size;
};
Size.whitelist = initSize();
export default Size;