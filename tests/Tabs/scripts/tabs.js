let Tabber;

Tabber = class Tabber extends Container {
  constructor() {
    super('tabs-cont');
    this.tabs = [];
    this.create('<div>', !0).then(el => {
      el._document('tabDisp');
      el.attr({class:'tab-display', id:'tabDisplay'});
    });
    this.create('<div>', !0).then(el => {
      el._document('pane');
      el.attr({class:'tab-content', id:'tabContnt'});
    });
    return this;
  }

  creTab (name, content) {
    let tb = new Container('tab', '', 'span');
    tb.create('<button>', !0).then(el => {
      el._document('closer');
      el.attr({class:'closer'})
    })
    console.log(tb);
    this.tabs.push({name, ctn: content, cont: tb, id:this.tabs.length});
    return this;
  }
};
