let tb, styz, wrapper, header, menu;

styz = pen('<link rel="stylesheet" href="../../style.css">');
pen('<link rel="shortcut icon" type="image/png" href="./../../icons/pen.png">').appendTo(pHead)
wrapper = pen('<div id="wrpr" class="wrapper">');
header = new Header('Tabs');
header.builder('Pen|../../index.html',
'Selector|../selector/index.html',
'Github|https://github.com/Krorenshima/Pen');

menu = new ContextMenu();
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
      styz.remove(!0).appendTo(pHead);
    }
  }
]);
/* tb = new Tabs();

tb.addTab("some title", 'moo cow').addTab('other title', 'wee wow');
tb.addTab("Lorem Ipsum", "<div style='height: 430px; overflow-y: auto;'>"+(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pharetra est quis aliquam molestie. Proin efficitur feugiat mi, non pulvinar arcu iaculis vel. Curabitur nulla enim, congue non metus non, maximus interdum justo. Nunc sed luctus velit.
<br><br>
Mauris nulla mi, euismod non enim nec, facilisis tincidunt arcu. Sed porta cursus pretium. Cras euismod est odio, eget euismod lectus mollis pellentesque. Sed suscipit rhoncus neque, a porta nibh dignissim non.
<br><br>
Aenean eget odio sed justo vulputate rutrum sit amet porta nibh. Quisque sit amet tortor iaculis, euismod elit vitae, rhoncus tellus. Cras venenatis nisl in enim rutrum lobortis. Donec eget elementum enim<br><br>`.repeat(9))+"</div>");
tb.addTab('simple-editor', '<textarea></textarea>')
.addTab('introduction', `
Hi there, I noticed that you had come to this page
<br>
Well then welcome, this is a simple tab manager.
`); */

pBody.append(menu.cont, header.cont, wrapper);
pHead.append(styz);
