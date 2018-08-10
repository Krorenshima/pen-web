let Header;

Header = class Header extends Container {
  constructor (title) {
    title = (title || 'Pen');
    super('header top free', 'hdr');
    this.create('<span>', true).then((el) => {
      el._document('titleM');
      el.attr({id:'hdrTitle',class:'header-title'})
      .html(title); if(document!=null){document.title=title}
    });
    this.links = [];
    return this;
  }

  get title () {
    return this.titleM.text;
  }

  set title (x) {
    this.titleM.html(x);
    document.title(x);
    return this;
  }

  get length () {
    return this.links.length;
  }

  search (options, fn) {
    if (options.type == null) {options.type = "name"}
    return this.links.filter(link => {
      if (link[options.type] === options.data) {
        if (fn != null) {fn(link.el)}
        return fn != null ? this : link;
      }
    }).pop();
  }

  remove (options, multi) {
    this.search(options).el.remove(true);
    this.links.splice(this.search(options).id, (multi || 1));
    return this;
  }

  removeAll () {
    this.links = [];
    return this;
  }

  switcher (name, href) {
    let link;
    switch (true) {
      case name.endsWith('del'):
        name = name.split(/[\ ,]/).pop();
        this.remove({type:'name',data:name});
        if (pen.type(href) === 'boolean') {return href ? this : link}
        break;
      default:
        link = this.create('<a>', !1).attr({class:'btn', href}).html(name);
        this.links.push({name,href,el:link,id:this.length});
        return this;
    }
    return this;
  }

  link (name, href) {
    pen.type(name) === 'array' ? name.forEach(link => this.switcher(link.name, link.href)) : this.switcher(name, href);
    return this;
  }

  // EXPERIMENTAL: This will probably be removed but allows creation of elements even easier
  builder (...strs) {
    let reg = /^([^\n]*?)\|([^\n]*?)$/i;
    for (let i = 0, len = strs.length, str; i < len; i++) {
      str = strs[i];
      if (reg.test(str)) {
        let res = [].slice.call(reg.exec(str)).slice(1);
        this.link(res[0], res[1]);
      }
    }
    return this;
  }
};
