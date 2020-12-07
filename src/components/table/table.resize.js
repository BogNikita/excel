import {$} from '@/core/dom';
export function resizeTable(event, root) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const arrayCol = root.findAll(`[data-col="${$parent.data.col}"]`);
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px'
  });
  let value;
  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({right: -delta +'px'});
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({bottom: -delta +'px'});
    }
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (type === 'col') {
        $parent.css({
          width: value + 'px'
        });
        arrayCol.forEach(item => item.style.width = value +'px');
      } else {
        $parent.css({height: value + 'px'});
      }
      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      });
    };
  };
}