
// 以下数据由后端生成并输出到页面上

var companyData = [{
  name: '美的',
  value: 1,
  children: [{
    name: '中山东凤',
    value: 111
  },{
    name: '美的生活电器/北滘',
    value: 112
  },{
    name: '美的环境事业部/北滘',
    value: 112
  },{
    name: '美的华凌冰箱/广州',
    value: 114
  },{
    name: '美的厨房电器事业部/北滘',
    value: 115
  },{
    name: '美的厨房电器家具厂/北滘',
    value: 116
  },{
    name: '广州南沙冰箱工厂',
    value: 117
  }]
},{
  name: '经纬日用五金',
  value: 2,
  children: [{
    name: '伦教镇',
    value: 118
  }]
},{
  name: '华声电器股份有限公司',
  value: 3,
  children: [{
    name: '容桂',
    value: 119
  }]
},{
  name: '格兰仕电器',
  value: 4,
  children: [{
    name: '中山',
    value: 120
  }]
},{
  name: '海信科龙电器',
  value: 5,
  children: [{
    name: '容桂',
    value: 121
  }]
},{
  name: '海信厨卫电器',
  value: 6,
  children: [{
    name: '大良',
    value: 122
  }]
},{
  name: '万和新电器',
  value: 7,
  children: [{
    name: '万和/容桂',
    value: 123
  }]
},{
  name: '旭日集团',
  value: 8,
  children: [{
    name: '深圳平湖镇',
    value: 124
  }]
}];

var read = {
  year: [],
  yearIn: [],
  month: ['一月份','二月份','三月份','四月份','五月份','六月份','七月份','八月份','九月份','十月份','十一月份','十二月份'],
  company: [],
  location: [],
  generateYear: function(){
    for(var i = 2016; i > 1900; i--){
      var newOjb = {
        name: i,
        value: i
      }
      this.year.push(newOjb);
    }
  },
  generateYearIn: function(){
    for(var i = 2016; i < 2100; i++){
      var newOjb = {
        name: i,
        value: i
      }
      this.yearIn.push(newOjb);
    }
  },
  generateMonth: function(){
    var newMonth = [];
    this.month.forEach(function(value, index){
      var newObj = {
        name : value,
        value : index < 9 ? '0' + (index + 1) : String(index + 1)
      }
      newMonth.push(newObj);
    })
    this.month = newMonth;
  },
  generateCompany: function(){
    companyData.forEach(function(value,index){
      var newObj = {
        name: value.name,
        value: value.value
      };
      this.company.push(newObj);
    }.bind(this))
  },
  generateLocaion: function(comVal){
    // debugger
    this.location = [];
    for(var i=0; i<companyData.length; i++){
      if(companyData[i].value == comVal){
         companyData[i].children.forEach(function(value,index){
          var newObj = {
            name: value.name,
            value: value.value
          };
          this.location.push(newObj);
        }.bind(this))
        break;
      }
    }
  }
}


read.generateYear();
read.generateYearIn();
read.generateMonth();
read.generateCompany();
read.generateLocaion(read.company[0].value);


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
    name: '0-1000',
    value: 111
  },{
    name: '1000以上',
    value: 222
  },{
    name: '不限',
    value: 333
  }], //this is the data you want to pass
  dataSecond: read.month,
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
    location = this.selected.second.name;
    return name + '-' + location;
  }
}

function tounickScroll(options){
  this.options = options;
  this.selected = {
    first: {
      name: null,
      value: null,
    },
    second: {
      name: null,
      value: null
    }
  };
  this.firstScroll = null;
  this.secondScroll = null;
  this.init = function(){
    if(this.options.simpleMode){
      return this.firstScroll = this.makeScl(this.options.onSelectFirst, this.options.firstMenu, 'first', this.options.dataFirst);
    }else {
      this.firstScroll = this.makeScl(this.options.onSelectFirst, this.options.firstMenu, 'first', this.options.dataFirst);
      this.secondScroll = this.makeScl(this.options.onSelectSecond, this.options.secondMenu, 'second', this.options.dataSecond);
    }
  };
  $(this.options.activeDOM).on('click',function(){
    this.show();
    if(!this.firstScroll) return this.init.call(this);
  }.bind(this));
  $(this.options.confirmDOM).on('click',this.confirm.bind(this));
  $(this.options.cancelDOM).on('click',this.cancel.bind(this));
}

tounickScroll.prototype = {
  // instaniate new scroll based on input
  /*
    which: What to do when on select, will use default if no funciton provided
    menu: the container of the first colmun
    selectedValue: selected value will be stored to where
    dataCol: the data to pass to Scroller
  */
  makeScl: function(which, menu, selectedValue, dataCol){
    var defVal;
    if(selectedValue == 'first'){
      this.selected.first.value = this.options.dataFirst[0].value;
      this.selected.first.name = this.options.dataFirst[0].name;
      defVal = this.selected.first.value;
    }else{
      this.selected.second.value = this.options.dataSecond[0].value;
      this.selected.second.name = this.options.dataSecond[0].name;
      defVal = this.selected.second.value;
    }
    var defaultOnSelect = function(ret){
      if(selectedValue == 'first'){
        this.selected.first = ret;
      }else{
        this.selected.second = ret;
      }
    };
    var onSelectFn = which ? which : defaultOnSelect;
    return new Scroller(menu, {
      data: dataCol,
      defaultValue: defVal,
      onSelect: onSelectFn.bind(this)
    });
  },
  cancel: function(){
    var wrapper = this.options.wrapperDOM || '.J_showScroller';
    $(wrapper).hide();
  },
  confirm: function(){
    // debugger;
    var output;
    var outputDOM = this.options.outputDOM || '#J_select_date';
    if(this.options.handleOutput){
      output = this.options.handleOutput.call(this);
    }else{
      var firstCol = this.selected.first.value ? this.selected.first.value : this.selected.first;
          output = firstCol + this.selected.second.value;
    }
    $(outputDOM).val(output);
    this.cancel();
  },
  show: function(){
    var wrapper = this.options.wrapperDOM || '.J_showScroller';
    $(wrapper).show();
  }
}

var test;

$(document).ready(function(){
  test = new tounickScroll(options);
  testIn = new tounickScroll(optionsIn);
  testFirst = new tounickScroll(optionsFirst);
  testSecond = new tounickScroll(optionsSecond);
  testExpected = new tounickScroll(optionsExpected);
})
