let ContextMenu;

ContextMenu = class ContextMenu extends Container {
  constructor () {
    super('context-menu','ctxMenu', {align:'center'});
    this.cont.css({position:'fixed', display:'none'});
    this.btns = [];
    pBody.append(this.cont);
    pWin.on('contextmenu', (e) => this.locate(e)).on('click', (e) => {
      this.cont.css({display: 'none'});
    });
    this.checkElms = [];
    return this;
  }

  get length () {
    return this.btns.length;
  }

  btn (name, act) {
    super.create('<button>', true).then((el) => {
      el.html(name).attr({class:`${this.id}-btn`})
      .on('click', act, true, 'action');
      this.btns.push({el,name,id:this.length,type:'btn'});
      el._nDocument();
    });
    return this;
  }

  brk () {
    super.create('<p>', true).then((el) => {
      el.attr('class', `${this.id}-break`);
      this.btns.push({el,id:this.length,type:'break'});
    });
    return this;
  }

  switcher (typ, name, act) {
    switch (typ) {
      case 'btn':
        this.btn(name, act);
        break;
      case 'break':
        this.brk();
        break;
    }
  }

  create (typ, name, act) {
    let typdef = pen.type(typ);
    switch (typdef) {
      case 'array':
        typ.forEach(dt => this.switcher(dt.typ, dt.name, dt.act));
        break;
      case 'object':
        this.switcher(typ.typ, typ.name, typ.act);
        break;
      default:
        this.switcher(typ, name, act);
    }
    return this;
  }

  find (typ, dt) {
    return this.btns.filter(btn => {if (btn[typ] === dt) {return btn}}).pop();
  }

  exists (typ, dt) {
    return this.find(typ, dt) != null;
  }

  remove (typ, dt) {
    if (this.exists(typ, dt)) {
      let btn = this.find(typ, dt);
      btn.el.remove();
      this.btns.splice(btn.id, 1);
    } else {
      console.warn(`'${dt}' doesn't exist`);
    }
    return this;
  }

  changeAction (fn, obj) {
    obj = obj || {type:'name'}
    obj.type = obj.type || 'name';
    if (obj.data == null) {
      throw new Error('Data must be defined in order to find what you need');
    }
    let btn = this.find(obj.type, obj.data);
    btn.el.on('click', fn, true, 'action');
    return this;
  }

  checkFor (cls, creation) {
    cls === '*' ? console.log('yes') : this.checkElms.push({class:cls, creation});
    return this;
  }

  // arrange (target, celm) {
  //   let tof = target.hasClass(celm.class);
  //   if (tof) {
  //     if (!this.exists('name', celm.creation.name)) {
  //       this.create(celm.creation);
  //     }
  //   } else {
  //     if (this.exists('name', celm.creation.name)) {
  //       this.remove('name', celm.creation.name);
  //     }
  //   }
  //   return this;
  // }

  check (e) {
    let target = pen(e.target);
    for (let i = 0, len = this.checkElms.length, celm, tof, nm; i < len; i++) {
      celm = this.checkElms[i]; tof = target.hasClass(celm.class); nm = celm.creation.name;
      tof ? (!this.exists('name', nm) && this.create(celm.creation)) : (this.exists('name', nm) && this.remove('name', nm));
    }
    return this;
  }

  locate (e) {
    e.preventDefault();
    this.checkElms.length !== 0 && this.check(e);
    this.cont.css({
      display: '',
      top:`${e.clientY}px`,
      left:`${e.clientX}px`
    });
  }

  static fromTemplate (list) {
    let menu = new ContextMenu();
    list.forEach(dt => menu.switcher(dt.typ, dt.name, dt.act));
    return menu;
  }
}
