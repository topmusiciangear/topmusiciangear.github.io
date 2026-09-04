const cases = [
  '<a data-store="amazon" href="x"><span>Comprar en<span>Amazon</span> - \u0024249.99</span></a>',
  '<a data-store="amazon" href="x"><span>Buy at Amazon - \u00241,249.00</span></a>',
  '<a data-store="amazon" href="x"><span>Comprar en Amazon - \u00a3159.00</span></a>',
  '<a data-store="amazon" href="x"><span>Buy at Amazon</span></a>'
];
const re = /- ([$\u00a3\u20ac][0-9.,]+)/;
cases.forEach(function(c, i){
  const m = c.match(re);
  console.log('case ' + i + ': ' + (m ? m[1] : 'no price'));
});
