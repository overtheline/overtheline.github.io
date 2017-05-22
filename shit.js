const main  = document.getElementById('main');

let e = 0;
let i = 0;

function fact(n) {
  let result = 1;
  if (n === 0) {
    return result;
  }
  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
}

function formula(k) {
  return 1 / fact(k);
}

function appendNumber() {
  e += formula(i);
  i++;
  main.;
}

setInterval(appendNumber, 500);
