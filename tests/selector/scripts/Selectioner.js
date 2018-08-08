let Selectionr;

Selectionr = class Selectionr extends Container {
  constructor (el) {
    if (!Selectionr.exists('name', el.selector)) {
      super('selector', '', {align: 'center', "num": Selectionr.mem.length});
      this._id = Selectionr.mem.length;
      this.elMem = el;

      this.create('<h4>', true).then(el => {
        el._document('header');
        el.attr('class',`${this.id}-header`).html(this.elMem.selector);
        this.closer = el.create('<span>','child').attr('class', `${this.id}-closer`)
        .html('X').on('click', ()=> this.close());
      });

      this.create('<button>', true).then((el) => {
        el._document('highlighter');
        el.attr({id:'highlighter',class:'highlighter btn'})
        .html('Highlight').on('mouseup',() => this.select());
      });

      this.create('<input>', true).then((el) => {
        el._document('textChanger');
        el.attr({id:'textChanger',class:'text-changer input',placeholder:'change the text'})
        .on('keydown',(e) => {
          if (e.key === 'Enter') {
            this.elMem.html(this.textChangerCre.text);
            this.textChanger.html('');
          }
        });
      });

      this.create('<input>', true).then((el) => {
        el._document('toggler');
        el.attr({id:'toggler',class:'toggler input',placeholder:'toggle a class'})
        .on('keydown',(e) => {
          if (e.key === 'Enter') {
            this.elMem.toggle(this.togglerCre.text);
            this.toggler.html('');
          }
        });
      });

      this.create('<pre>', true).then((el) => {
        if (this.elMem.el.events != null) {
          el._document('eventTron');
          let ev = Object.keys(this.elMem.el.events), len = ev.length <= 1, determ = len ? '' : 's';
          el.attr({id:'eventTracker',class:'event-tracker'})
          .html(`This element has: ${ev.length} event${determ}.\n.:Type${determ}:.\n${ev.join(', ')}`);
          if (ev.includes('click')) {
            this.create('<button>', true).then((el) => {
              el._document('clicker');
              el.attr({id:'clicker',class:'clicker btn'})
              .html('Click').on('mousedown',()=>this.click());
            });
          }
        } else {
          el._document('eventNon');
          el.attr({id: 'eventNon',class:'event-non'})
          .html('This element has no events attached to it.');
        }
        return el;
      });
      this.select();
      Selectionr.mem.push(this);
      return this;
    } else {
      selector.sideMsg.html(`${el.selector} already exists.`);
    }
  }

  get name () {
    return this.headerCre.text;
  }
  select () {
    this.elMem.toggle('selected');
    return this;
  }
  click () {
    this.elMem.el.click();
    return this;
  }
  close () {
    this.cont.remove();
    return this;
  }
  static find (type, data) {
    for (let i = 0, len = Selectionr.mem.length, selectr; i < len; i++) {
      selectr = Selectionr.mem[i];
      if (selectr[type] === data) {
        return selectr;
      }
    }
  }
  static exists (type, data) {
    return Selectionr.find(...arguments) != null;
  }
  static remove (type, data) {
    if (type instanceof Selectionr) {
      Selectionr.mem.splice(type.id, 1);
      type.close();
    } else {
      let selectr = Selectionr.find(...arguments);
      Selectionr.mem.splice(selectr.id, 1);
      selectr.close();
    }
    return Selectionr;
  }
  static add (el) {
    return new Selectionr(el);
  }
};
Selectionr.mem = [];
