import { CaixaDaLanchonete } from './caixa-da-lanchonete.js'

describe('CaixaDaLanchonete', () => {
  const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
    const resultado = new CaixaDaLanchonete().calcularValorDaCompra(
      formaDePagamento,
      itens
    )

    console.log('Forma de pagamento:', formaDePagamento)
    console.log('Itens:', itens)
    console.log('Resultado obtido:', resultado)
    console.log('Resultado esperado:', resultadoEsperado)

    expect(resultado.replace('\xa0', ' ')).toEqual(resultadoEsperado)
  }

  test.each([
    [
      'com carrinho vazio',
      'dinheiro',
      'Não há itens no carrinho de compra!',
      []
    ],
    [
      'com carrinho vazio',
      'credito',
      'Não há itens no carrinho de compra!',
      []
    ],
    ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []]
  ])(
    'compra %p em %p deve resultar em %p',
    (_, formaDePagamento, resultadoEsperado, itens) =>
      validaTeste(formaDePagamento, resultadoEsperado, itens)
  )

  test.each([
    ['dinheiro', 'R$ 2,85', ['cafe,1']],
    ['credito', 'R$ 2,91', ['cafe,1']],
    ['debito', 'R$ 3,00', ['cafe,1']]
  ])('compra simples em %p deve resultar em %p', validaTeste)

  test.each([
    ['credito', 'R$ 11,16', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']]
  ])('compra de 3 itens em %p deve resultar em %p', validaTeste)

  test.each([
    ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ['credito', 'R$ 34,44', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']]
  ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste)

  test.each([
    ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
    ['com um valor', 'credito', 'Item inválido!', ['1']],
    ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],

    [
      'com forma de pagamento inválida',
      'especie',
      'Forma de pagamento inválida!',
      ['cafe, 1']
    ]
  ])(
    'compra %p em %p deve resultar em %p',
    (_, formaDePagamento, resultadoEsperado, itens) =>
      validaTeste(formaDePagamento, resultadoEsperado, itens)
  )

  test.each([
    [
      'chantily',
      'dinheiro',
      'Item extra não pode ser pedido sem o principal',
      ['chantily,1']
    ],
    [
      'queijo',
      'credito',
      'Item extra não pode ser pedido sem o principal',
      ['queijo,1']
    ],
    [
      'chantily com outro item',
      'credito',
      'Item extra não pode ser pedido sem o principal',
      ['chantily,1', 'sanduiche,1']
    ],
    [
      'queijo com outro item',
      'debito',
      'Item extra não pode ser pedido sem o principal',
      ['queijo,1', 'cafe,1']
    ]
  ])(
    'compra %p em %p deve resultar em %p',
    (_, formaDePagamento, resultadoEsperado, itens) =>
      validaTeste(formaDePagamento, resultadoEsperado, itens)
  )
})
