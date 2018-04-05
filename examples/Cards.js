let Card;

Card = class Card extends Container {
  constructor (title = "Default Title", content = "This is default content") {
    super('card', 'cd', {align:'center'});
    this.create(['<div>', '<span>', '<div>'], true).then((els) => {
      els[1].html('X').attr('class', 'clsBtn')
      .on('click', (e) => {
        this.cont.remove();
      })._document('closer');
      els[0].html(title).attr({class:`${this.id}-header`})
      ._document('header');
      els[2].html(content, {parse:true}).attr({class:`${this.id}-body`})
      ._document("body");
    });
    return this;
  }

  get title () {return this.headerCre.text}
  set title (x) {this.headerCre.html(x)}
  get content () {return this.bodyCre.text}
  set content (x) {this.bodyCre.text}
}
