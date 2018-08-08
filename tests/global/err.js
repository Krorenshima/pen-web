window.onerror = function (msg, sauce, lno, cno, er) {
  document.write(`
  <style>
  .err {
    background: rgba(255,155,155,.5);
    border: solid 2px rgb(255,155,155);
    border-radius: 15px;
    font-family: Segoe Print;
  }
  </style>

  <p class="err">Something went wrong.
  <br>
  Remember this page is generated, no content here
  <br>
  On line ${lno}:${cno} in ${sauce}
  <br>
  ${msg}</p>`);
}
