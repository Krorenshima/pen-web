document.body.innerHTML = `<style>
.err {
  color: White
  border-left: solid 3px rgb(255,155,155);
  padding-left: 5px;
  background: rgba(255,155,155,.5);
  font-family: Arial, monospace;
}
</style>`;


window.onerror = function (msg, sauce, lno, cno, er) {
  document.body.innerHTML += `
  <p class="err">Something went wrong.
  <br>
  On line ${lno}:${cno} in ${sauce}
  <br>
  ${msg}</p>`;
}
