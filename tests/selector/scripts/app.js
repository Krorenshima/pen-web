let styz, wrapper, selector, header, randowo, rando, menu,
yaynay = !1;

rando = pen('<div class="rando">')
.appendTo('body')
.css({
  background: 'rgba(0,0,0,.5)', border: 'solid 2px grey',
  'border-radius': '15px', position: 'fixed', display: 'none',
  color: 'white', padding: '5px', 'z-index': 19999
});

styz = pen('<link rel="stylesheet" href="../../style.css">');
wrapper = pen('<div id="wrpr" class="wrapper">');
selector = new Container('element-selector');
header = new Header('Selector');
header.builder('Pen|../../index.html',
'Tabs|../tabs/index.html',
'Github|https://github.com/Krorenshima/Pen');

menu = new ContextMenu();
menu.checkFor('selector', {
  typ: 'btn',
  name: 'Close',
  act (e) {
    let target = pen(e.target);
    Selectionr.remove('_id', +target.attr('num'));
  }
}).checkFor('wrapper', {
  typ: 'btn',
  name: 'Show classes',
  act () {
    if (yaynay === !1) {
      yaynay = true;
      rando.css('display', '');
      if (pBody.el.events != null) {
        if (pBody.el.events['mousemove'] != null || pBody.el.events['mouseover'] != null) {return}
        pBody.on('mouseover', (e) => {
          let selrr;
          selrr = pen(e.target).selector;
          if (selrr === rando.selector) {return}
          rando.html(selrr);
          // console.log(selrr.selector);
        }).on('mousemove', (e) => {
          rando.css({top: `${e.clientY+4}px`, left: `${e.clientX+20}px`});
        });
      } else {
        pBody.on('mouseover', (e) => {
          let selrr;
          selrr = pen(e.target).selector;
          if (selrr === rando.selector) {return}
          rando.html(selrr);
          // console.log(selrr.selector);
        }).on('mousemove', (e) => {
          rando.css({top: `${e.clientY+4}px`, left: `${e.clientX+20}px`});
        });
      }
    } else {
      yaynay = !1;
      // pBody.off('mouseover').off('mousemove');
      rando.css('display', 'none');
    }
  }
});
menu.create([
  {
    typ: 'btn',
    name: 'Back',
    act () {
      window.history.back();
    }
  }, {
    typ: 'btn',
    name: 'Forward',
    act () {
      window.history.forward();
    }
  }, {
    typ: 'btn',
    name: 'Reload',
    act () {
      window.location.reload();
    }
  }, {typ:'break'}, {
    typ: 'btn',
    name: 'Reload Style',
    act () {
      styz.remove(true).appendTo(pHead);
    }
  }
]);

selector.cont.attr('align','center');

selector.input = selector.create('<input>', !1).attr({id:'selectrInput',class:'element-input input',placeholder:'Place selector here.'})
.on('keydown',e=>{
  if(e.key==='Enter'){
    e.preventDefault();
    selector.btn.el.click();
  }
});

selector.btn = selector.create('<button>', !1).attr({id:'selectrBtn',class:'element-selector btn'}).html('Submit').on('click',e=>{
  let val = selector.input.text,
  timeout = 1750;
  if (val.length === 0) {
    selector.sideMsg.html(`Try putting in some text next time XwX`);
    setTimeout(()=>{selector.sideMsg.html('')},timeout);
  } else {
    let el = pen.$(val, true);
    if (el.el != null) {
      selector.input.html('');
      wrapper.append((new Selectionr(el)).cont);
      setTimeout(()=>{el.toggle('selected')},timeout);
    } else {
      selector.sideMsg.html(`Uh, oh. No element was found with '${val}'. Try something else`);
      setTimeout(()=>{selector.sideMsg.html('')},timeout);
    }
  }
});

selector.create('<br>', !1);
selector.sideMsg = selector.create('<p>', !1).attr({id:'sideInfo',class:'side-message'});

wrapper.append(selector.cont);

pBody.append(menu.cont, header.cont, wrapper);
pHead.append(styz);
randowo = ['a.btn[href]'];
selector.input.html(pen.random(randowo));
selector.btn.el.click();
