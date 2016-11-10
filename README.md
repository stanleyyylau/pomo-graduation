## Development
Run ``gulp`` to enter development mode

## Production
Run ``gulp build`` to build minified version of CSS with no source mapping

## Utilities
Run ``gulp images`` to compress all images

## 坑
Scroll 的坑， 必须先显示容器才可以初始化scroll, 不然数据就会出错
```
$(document).ready(function(){
  $('#J_select_date').on('click',function(){
    read.show();
    if(!read.scrollYear) return read.init();
  });
  $('.J_scrollerConfirm').on('click',read.confirm.bind(read));
  $('.J_scrollerCancel').on('click',read.cancel.bind(read));
})


```
