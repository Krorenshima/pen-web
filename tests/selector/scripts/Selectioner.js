let Selectionr;

Selectionr = class Selectionr extends Container {
  constructor (el) {
    if (!Selectionr.exists('name', el.selector)) {
      super('selector', {align: 'center', "num": Selectionr.mem.length});
      this._id = Selectionr.mem.length;
      this.elMem = el;

      this.create(`<h4 class="${this.class}-header">`, !0).then(el => {
        el._document('header');
        el.html(this.elMem.selector);
        this.closer = el.create(`<span class="${this.class}-closer">`,'child')
        .html('X').on('click', ()=> this.close());
      });

      this.create('<button>', !0).then((el) => {
        el._document('highlighter');
        el.attr({id:'highlighter',class:'highlighter btn'})
        .html('Highlight').on('mouseup',() => this.select());
      });

      this.create('<input class="text-changer input" id="textChanger">', !0).then((el) => {
        el._document('textChanger');
        el.attr('placeholder', 'change the text')
        .on('keydown',(e) => {
          if (e.key === 'Enter') {
            this.elMem.html(this.textChangerCre.text);
            this.textChanger.html('');
          }
        });
      });

      this.create('<input class="toggler input" id="toggler">', !0).then((el) => {
        el._document('toggler');
        el.attr('placeholder','toggle a class')
        .on('keydown',(e) => {
          if (e.key === 'Enter') {
            this.elMem.toggle(this.togglerCre.text);
            this.toggler.html('');
          }
        });
      });

      this.create('<pre>', !0).then((el) => {
        let res = this.elMem.el.events != null,
        ev, determ;
        el._document((res ? 'eventTron' : 'eventNon'));
        el.attr({
          id:`event${res?'Tracker':'Non'}`,
          class:`event-${res?'tracker':'non'}`
        });
        if (res) {ev = Object.keys(this.elMem.el.events);determ = ev.length <= 1 ? '' : 's'}
        el.html((res ? `This element has ${ev.length} event${determ}.\n.:Type${determ}:.\n${ev.join(', ')}` : 'This element has no events attached to it.'));
        if (res) {
          if (ev.includes('click')) {
            this.create('<button>', !0).then((el) => {
              el._document('clicker');
              el.attr({id:'clicker',class:'clicker btn'})
              .html('Click').on('mousedown',()=>this.click());
            });
          }
        }
        return el;
      });
      this.select();
      Selectionr.mem.push(this);
      return this;
    } else {
      console.warn(`${el.selector} already exists.`);
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
    this.cont.remove(!0);
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
