window.onerror = function (msg, sauce, lno, cno, er) {
  document.write(`<p><b>Something went wrong.</b>
  <br>
  Remember this page is generated, no content here<br>On line ${lno}:${cno} in ${sauce}
  <br>
  ${msg}</p>`);
}
