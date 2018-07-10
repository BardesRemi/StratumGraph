require('./style.css');

let q=window.location.href;
q = q.slice(q.indexOf("file=")+5);

console.log(q);