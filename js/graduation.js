// Plugin @RokoCB :: Return the visible amount of px
// of any element currently in viewport.
// stackoverflow.com/questions/24768795/
;(function($, win) {
  $.fn.inViewport = function(cb) {
     return this.each(function(i,el){
       function visPx(){
         var H = $(this).height(),
             r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
         return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));
       } visPx();
       $(win).on("resize scroll", visPx);
     });
  };
}($, window));


// get current month
var curMonth = new Date().getMonth()+1;
curMonth = curMonth < 10 ? '0' + String(curMonth) : String(curMonth);
curMonthObj = read.month.filter(function(item, index){
  if(item.value == curMonth){
    return item;
  }
})
curMonthObj = curMonthObj[0];




var options = {
  activeDOM: '#J_select_date',
  confirmDOM: '.J_scrollerConfirm',
  cancelDOM: '.J_scrollerCancel',
  wrapperDOM: '.J_showScroller',  // This will be default if no value provided
  outputDOM: '#J_select_date',
  firstMenu: '#J_scrollerYear',
  secondMenu: '#J_scrollerMonth',
  dataFirst: read.year, //this is the data you want to pass
  dataSecond: read.month,
  onSelectFirst: null, //if no, we will use the default one
  onSelectSecond: null,
  refreshOnFirstColChange: null, // true of false
  handleOutput: function(){
    return this.selected.first.value + '-' + this.selected.second.value;
  },
  defaultValue: {
    first: read.yearIn[0],
    second: curMonthObj
  }
}


var optionsIn = {
  activeDOM: '#selectIn',
  confirmDOM: '.J_scrollerConfirmIn',
  cancelDOM: '.J_scrollerCancelIn',
  wrapperDOM: '.J_showScrollerIn',  // This will be default if no value provided
  outputDOM: '#selectIn',
  firstMenu: '#J_scrollerYearIn',
  secondMenu: '#J_scrollerMonthIn',
  dataFirst: read.yearIn, //this is the data you want to pass
  dataSecond: read.month,
  onSelectFirst: null, //if no, we will use the default one
  onSelectSecond: null,
  refreshOnFirstColChange: null, // true of false
  handleOutput: function(){
    return this.selected.first.value + '-' + this.selected.second.value;
  },
  defaultValue: {
    first: read.yearIn[0],
    second: curMonthObj
  }
}

var optionsExpected = {
  simpleMode: true,
  activeDOM: '#selectExpected',
  confirmDOM: '.J_scrollerConfirmExpected',
  cancelDOM: '.J_scrollerCancelExpected',
  wrapperDOM: '.J_showScrollerExpected',  // This will be default if no value provided
  outputDOM: '#selectExpected',
  firstMenu: '#J_scrollerYearExpected',
  secondMenu: '#J_scrollerMonthExpected',
  dataFirst: [{
    name: '不限',
    value: 333
  },{
    name: '0-1000',
    value: 111
  },{
    name: '1000以上',
    value: 222
  }], //this is the data you want to pass
  dataSecond: null,
  onSelectFirst: null, //if no, we will use the default one
  onSelectSecond: null,
  refreshOnFirstColChange: null, // true of false
  handleOutput: function(){
    return this.selected.first.name;
  }
}

var optionsFirst = {
  activeDOM: '#selectFirst',
  confirmDOM: '.J_scrollerConfirmFirst',
  cancelDOM: '.J_scrollerCancelFirst',
  wrapperDOM: '.J_showScrollerFirst',  // This will be default if no value provided
  outputDOM: '#selectFirst',
  firstMenu: '#J_scrollerYearFirst',
  secondMenu: '#J_scrollerMonthFirst',
  dataFirst: read.company, //this is the data you want to pass
  dataSecond: read.location,
  onSelectFirst: function(ret){
    // debugger
    this.selected.first = ret;
    this.secondScroll.destroy();
    read.generateLocaion(this.selected.first.value)
    this.secondScroll = new Scroller(this.options.secondMenu, {
      data: read.location,
      defaultValue: read.location[0].value,
      onSelect: function(ret) {
        this.selected.second = ret;
      }.bind(this)
    })
    this.selected.second.name = read.location[0].name;
    this.selected.second.value = read.location[0].value;
  },
  onSelectSecond: null,
  refreshOnFirstColChange: null, // true of false
  handleOutput: function(){
    var name, location;
    name = this.selected.first.name;
    if(!(this.selected.second.name)){
      this.selected.second.name = read.location[0].name;
      this.selected.second.value = read.location[0].value;
    }
    if(this.selected.first.value == 'null'){
      return null;
    }
    location = this.selected.second.name;
    return name + '-' + location;
  }
}

var optionsSecond = {
  activeDOM: '#selectSecond',
  confirmDOM: '.J_scrollerConfirmSecond',
  cancelDOM: '.J_scrollerCancelSecond',
  wrapperDOM: '.J_showScrollerSecond',  // This will be default if no value provided
  outputDOM: '#selectSecond',
  firstMenu: '#J_scrollerYearSecond',
  secondMenu: '#J_scrollerMonthSecond',
  dataFirst: read.company, //this is the data you want to pass
  dataSecond: read.location,
  onSelectFirst: function(ret){
    // debugger
    this.selected.first = ret;
    this.secondScroll.destroy();
    read.generateLocaion(this.selected.first.value)
    this.secondScroll = new Scroller(this.options.secondMenu, {
      data: read.location,
      defaultValue: read.location[0].value,
      onSelect: function(ret) {
        this.selected.second = ret;
      }.bind(this)
    })
    this.selected.second.name = read.location[0].name;
    this.selected.second.value = read.location[0].value;
  },
  onSelectSecond: null,
  refreshOnFirstColChange: null, // true of false
  handleOutput: function(){
    var name, location;
    name = this.selected.first.name;
    if(!(this.selected.second.name)){
      this.selected.second.name = read.location[0].name;
      this.selected.second.value = read.location[0].value;
    }
    if(this.selected.first.value == 'null'){
      return null;
    }
    location = this.selected.second.name;
    return name + '-' + location;
  }
}

var optionsCity = {
  activeDOM: '#selectCity',
  confirmDOM: '.J_scrollerConfirmCity',
  cancelDOM: '.J_scrollerCancelCity',
  wrapperDOM: '.J_showScrollerCity',  // This will be default if no value provided
  outputDOM: '#selectCity',
  firstMenu: '#J_scrollerYearCity',
  secondMenu: '#J_scrollerMonthCity',
  dataFirst: read.province, //this is the data you want to pass
  dataSecond: read.city,
  onSelectFirst: function(ret){
    // debugger
    this.selected.first = ret;
    this.secondScroll.destroy();
    read.generateCity(this.selected.first.value)
    this.secondScroll = new Scroller(this.options.secondMenu, {
      data: read.city,
      defaultValue: read.city[0].value,
      onSelect: function(ret) {
        this.selected.second = ret;
      }.bind(this)
    })
    this.selected.second.name = read.city[0].name;
    this.selected.second.value = read.city[0].value;
  },
  onSelectSecond: null,
  refreshOnFirstColChange: null, // true of false
  handleOutput: function(){
    var name, location;
    name = this.selected.first.name;
    if(!(this.selected.second.name)){
      this.selected.second.name = read.location[0].name;
      this.selected.second.value = read.location[0].value;
    }
    location = this.selected.second.name;
    return name + '-' + location;
  },
  defaultValue: {
    first: {
      name: '广东省',
      value: 440000
    },
    second: {
      name: '广州市',
      value: 440100
    }
  }
}





var form = {
  tips: null,
  content: {
    name: null,
    phone: null,
    school: null,
    gradTime: null,
    idealCity: null,
    experience: null,
    internStart: null,
    ExpectedSal: null,
    stOption: null,
    rdOption: null,
    jobArrange: null
  },
  $Const: {
    name : $('.apply-form input[name="name"]'),
    phone : $('.apply-form input[name="tel"]'),
    school : $('.apply-form input[name="university"]'),
    gradTime : $('.apply-form input[name="grad-date"]'),
    idealCity : $('.apply-form input[name="ideal-city"]'),
    experience : $('.apply-form textarea[name="experience"]'),
    internStart : $('.apply-form input[name="trial-date"]'),
    ExpectedSal : $('.apply-form input[name="expected-salary"]'),
    stOption : $('.apply-form input[name="first-option"]'),
    rdOption : $('.apply-form input[name="second-option"]'),
    jobArrange : $('.dispatch-check-container .on-select')
  },
  getContent: function(){
    var cnt = this.content;
    cnt.name = this.$Const.name.val();
    cnt.phone = this.$Const.phone.val();
    cnt.school = this.$Const.school.val();
    cnt.gradTime = this.$Const.gradTime.val();
    cnt.idealCity = this.$Const.idealCity.val();
    cnt.experience = this.$Const.experience.val();
    cnt.internStart = this.$Const.internStart.val();
    cnt.ExpectedSal = this.$Const.ExpectedSal.val();
    // If value instead of string are needed, get them from tounickScroll instance
    cnt.stOption = this.$Const.stOption.val();
    cnt.rdOption = this.$Const.rdOption.val();
    cnt.jobArrange = this.$Const.jobArrange.text().trim() == '是' ? true : false;
  },
  validate: function(){
    var cnt = this.content;
    if(!(/[\u4e00-\u9fa5]{2,}/.test(cnt.name))){
      //return toast or what ever
      this.tips.change('请完成姓名的填写','fail');
      this.tips.show();
      this.$Const.name.focus().closest('.form-cell').addClass('on-focus')
      .find('input').on('blur', function(){
        $(this).closest('.form-cell').removeClass('on-focus');
      });
      $('.J_submit').text('重新提交');
      return false;
    }
    if(!(/^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(cnt.phone))){
      // phone number
      this.tips.change('请完成电话的填写','fail');
      this.tips.show();
      this.$Const.phone.focus().closest('.form-cell').addClass('on-focus')
      .find('input').on('blur', function(){
        $(this).closest('.form-cell').removeClass('on-focus');
      });
      $('.J_submit').text('重新提交');
      return false;
    }
    if(!(/[\u4e00-\u9fa5]{2,100}/.test(cnt.school))){
      // school
      this.tips.change('请完成学校的填写','fail');
      this.tips.show();
      this.$Const.school.focus().closest('.form-cell').addClass('on-focus')
      .find('input').on('blur', function(){
        $(this).closest('.form-cell').removeClass('on-focus');
      });
      $('.J_submit').text('重新提交');
      return false;
    }
    if(!(cnt.gradTime)){
      // gradTime
      this.tips.change('请完成毕业时间的填写','fail');
      this.tips.show();
      this.$Const.gradTime.focus().closest('.form-cell').addClass('on-focus')
      .find('input').on('blur', function(){
        $(this).closest('.form-cell').removeClass('on-focus');
      });
      $('.J_submit').text('重新提交');
      return false;
    }
    if(!(cnt.idealCity)){
      // ideal city
      this.tips.change('请完成理想工作的填写','fail');
      this.tips.show();
      this.$Const.idealCity.focus().closest('.form-cell').addClass('on-focus')
      .find('input').on('blur', function(){
        $(this).closest('.form-cell').removeClass('on-focus');
      });
      $('.J_submit').text('重新提交');
      return false;
    }
    return 'pass';
  },
  handleAjax: function(){
    $( ".J_submit" ).prop( "disabled", true );
    this.tips.change('表单提交中...');
    this.tips.show();
    $.ajax({
      url: backEndUrl,
      type: 'POST',
      data: {message: this.content},
      success: function(data){
        if(data.status === 200){
           //提交成功显示弹窗
           $('.mask').show();
           $('.popup').show();
           $('.J_submit').text('已提交').addClass('submitted')
        }else{
          this.tips.change('提交失败');
          this.tips.show();
        }
        $( ".J_submit" ).prop( "disabled", false );
      }.bind(this),
      error: function(){
        this.tips.change('网络出错');
        this.tips.show();
        $( ".J_submit" ).prop( "disabled", false );
      }.bind(this)
    });
  },
  handleClick: function(){
    this.getContent();
    var isPass = this.validate();
    if(isPass == 'pass'){
      //make ajax call
      this.handleAjax();
    }
  },
  init: function(){
    this.tips = new Toast({
        content : 'Hello Toast', //文本
       // hideDelay : 2000,  //延迟隐藏的时间
        type : 'success' //类型，默认为none
    });
    this.tips.hide();
    $('.J_submit').on('click', function(){
      if($(this).hasClass('submitted')){
        return;
      }else{
        form.handleClick()
      }
    })
  }
}



$(document).ready(function(){

  tscroll = new tounickScroll(options);
  tscrollIn = new tounickScroll(optionsIn);
  tscrollFirst = new tounickScroll(optionsFirst);
  tscrollSecond = new tounickScroll(optionsSecond);
  tscrollExpected = new tounickScroll(optionsExpected);
  tscrollCity = new tounickScroll(optionsCity);
  form.init();
  $('.dispatch-check-container > div').on('click',function(){
    if($(this).hasClass('on-select')){
      return;
    }else{
      $(this).toggleClass('on-select').siblings().toggleClass('on-select');
    }
  })
  $('.mask').on('click', function(){
    $(this).hide();
    $('.popup').hide();
  })
  $('.J_share-btn').on('click', function(){
    $(this).text('点击右上角 即可分享哟');
    $('.share-arrow').show();
  })

  // Animation effects
  $('.apply-form').inViewport(function(vis){
    if(vis){
      return $('.call-to-action').hide();
    }
  })

  $('.galanz-container').inViewport(function(vis){
    if(vis){
      return $('.call-to-action').show();
    }
  })

  $('.once').inViewport(function(vis){
    if(vis){
      return $(this).addClass('animated bounceIn');
    }
  })

  $('.title-break').inViewport(function(vis){
    if(vis){
      return $('.call-to-action').show().addClass('animated slideInDown');
    }
  })


  //

})
