const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);
const geraMaiuscula = () => String.fromCharCode(rand(65, 91));
const geraMinuscula = () => String.fromCharCode(rand(97, 123));
const geraNumero = () => String.fromCharCode(rand(48, 58));
const simbolosArray = ',.:~^[]{}!@#$%*()_+=-';
const geraSimbolo = () => simbolosArray[rand(0, simbolosArray.length)];

export default function randCode(
  qtd,
  maiusculas,
  minusculas,
  numeros,
  simbolos
) {
  const senhaArray = [];
  const quantity = Number(qtd);

  for (let i = 0; i < qtd; i += 1) {
    if (maiusculas) senhaArray.push(geraMaiuscula());
    if (minusculas) senhaArray.push(geraMinuscula());
    if (numeros) senhaArray.push(geraNumero());
    if (simbolos) senhaArray.push(geraSimbolo());
  }
  return senhaArray.join('').slice(0, quantity);
}
