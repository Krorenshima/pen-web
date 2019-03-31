window.onerror = function (msg, sauce, lno, cno, er) {
  console.log(arguments);
  document.body.innerHTML += `
  <p class="err">Something went wrong.
  <br><br>
  On line ${lno === 0 && cno === 0 ? '<sub><sup>no line num & column</sup></sub>' : `${lno}:${cno}`} in ${sauce.length === 0 ? '<sub><sup>No source</sub></sub>' : sauce}
  <br><br>
  ${msg}
  <u><sub><sup>Also make sure to open the web-console to get a deeper look.</sup></sub></u>
  <a href="https://github.com/Krorenshima/pen/issues/new">Report issue</a></p>`;
  document.body.innerHTML += `<style>
  .err {
    color: white;
    border-left: solid 3px rgb(255,155,155);
    padding: 5px;
    background: rgba(255,155,155,.5);
    font-family: Arial, monospace;
  }
  a {
    color: white;
    padding: 4px;
    margin: 2px;
    border-radius: 5px;
    transition: all .2s;
  }
  a:hover {
    background: rgba(255,255,255,.5);
  }
  </style>`;
}
