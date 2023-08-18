class CaixaDaLanchonete {
  // Função para validar se todos os itens pedidos são itens principais
  validarItensPrincipais(itens) {
    const itensPrincipais = [
      'cafe',
      'sanduiche',
      'suco',
      'salgado',
      'combo1',
      'combo2'
    ] // Defina aqui os itens que são principais

    // Obter apenas os nomes dos itens pedidos
    const itensPedidos = itens.map(item => item.split(',')[0])

    // Verificar se cada item pedido é um item principal
    for (const item of itensPedidos) {
      if (!itensPrincipais.includes(item)) {
        return false // Se um item pedido não for principal, retornar false
      } else {
        return 'Item extra não pode ser pedido sem o principal!' // Retorna mensagem para forma de pagamento inválida
      }
    }
    return true // Se todos os itens pedidos forem principais, retornar true
  }

  validarQuantidade(quantidade) {
    if (parseInt(quantidade) <= 0) {
      return false //Quantidade invalida!
    }

    return true
  }

  // Função para calcular o valor da compra com desconto
  calcularValorDaCompra(metodoDePagamento, itens) {
    const precoDosItens = {
      cafe: 3.0,
      sanduiche: 6.5,
      queijo: 2.0,
      chantily: 1.5,
      suco: 6.2,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5
    }

    // Verificar se há itens no carrinho
    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!'
    }
    let valorTotal = 0
    for (const item of itens) {
      const [produto, quantidade] = item.split(',')
      const precoUnitario = precoDosItens[produto]

      // Verificar se o item é inválido
      if (!precoUnitario) {
        return 'Item inválido!'
      }

      if (!this.validarQuantidade(quantidade)) {
        return 'Quantidade inválida!'
      }
      // Calcular o valor total sem desconto
      valorTotal += precoUnitario * parseInt(quantidade)
    }
    console.log('Valor total antes do desconto:', valorTotal)

    let desconto = 0
    let acrescimo = 0
    if (metodoDePagamento === 'dinheiro') {
      desconto = 0.05 // 5% de desconto para pagamento no dinheiro
      console.log('Desconto aplicado:', desconto)
    } else if (metodoDePagamento === 'credito') {
      acrescimo = 0.03 // Acréscimo de 3% para pagamento em crédito
      console.log('Desconto aplicado:', desconto)
    } else if (metodoDePagamento === 'especie') {
      return 'Forma de pagamento inválida!' // Retorna mensagem para forma de pagamento inválida
    }

    // Calcular o valor com desconto
    const valorComDesconto = valorTotal * (1 - desconto)
    console.log('Valor com desconto:', valorComDesconto)

    const valorComAcrescimo = valorComDesconto * (1 + acrescimo)

    console.log('Valor com acréscimo:', valorComDesconto)

    // Verificar se há itens extras e validar
    if (!this.validarItensPrincipais(itens)) {
      console.log('Itens extras não são válidos.')
      return 'Item extra não pode ser pedido sem o principal'
    }

    // Formatar o valor com desconto para exibição
    const valorComAcrescimoFormatado = `R$ ${valorComAcrescimo
      .toFixed(2)
      .replace('.', ',')}`
    return valorComAcrescimoFormatado
  }
}

export { CaixaDaLanchonete }
