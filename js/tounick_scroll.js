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
    }else if(this.options.defaultValue){
      this.firstScroll = this.makeScl(this.options.onSelectFirst, this.options.firstMenu, 'first', this.options.dataFirst, this.options.defaultValue.first);
      this.secondScroll = this.makeScl(this.options.onSelectSecond, this.options.secondMenu, 'second', this.options.dataSecond, this.options.defaultValue.second);
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
    defaultValue: defaultValue to set
  */
  makeScl: function(which, menu, selectedValue, dataCol, defaultVal){
    var defVal;
    if(selectedValue == 'first'){
      this.selected.first.value = defaultVal != undefined ? defaultVal.value : this.options.dataFirst[0].value;
      this.selected.first.name = defaultVal != undefined ? defaultVal.name : this.options.dataFirst[0].name;
      defVal = this.selected.first.value;
    }else{
      this.selected.second.value = defaultVal != undefined ? defaultVal.value : this.options.dataSecond[0].value;
      this.selected.second.name = defaultVal != undefined ? defaultVal.name : this.options.dataSecond[0].name;
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
    if(defaultVal){
      return new Scroller(menu, {
        data: dataCol,
        defaultValue: defaultVal.value,
        onSelect: onSelectFn.bind(this)
      });
    }else{
      return new Scroller(menu, {
        data: dataCol,
        defaultValue: defVal,
        onSelect: onSelectFn.bind(this)
      });
    }
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
    this.cancel();
    if(output == null){
      return $(this.options.outputDOM).val('');
    }
    $(outputDOM).val(output);
  },
  show: function(){
    var wrapper = this.options.wrapperDOM || '.J_showScroller';
    $(wrapper).show();
  }
}
