//Todos os nome digitados ficam armazenados aqui 
let adicionarAmigo = []

function amigoAdicionado(nome){
    return adicionarAmigo.includes(nome)
}

//Essa função adiciona o nome informado no input Amigos Incluídos
function adicionar() {
    let nomeInput = document.getElementById('nome-amigo') // Resgata o ID do input
    let nomeAmigo = nomeInput.value // Converte o o ID resgatado para pegar apenas o valor
    let lista = document.getElementById('lista-amigos') // Resgata a lista onde sera feita o sorteio

    // Verifica se foi informado algum nome caso não seja retorna o Alert
    if (nomeAmigo == '') {
        alert('Digite o nome do Amigo')
        return
    }

    // Verifica se algum nome já foi inserido na lista e pede para que o usuario retorne outro nome
    if (amigoAdicionado(nomeAmigo)) {
        alert('Esse amigo já foi adicionado à lista.')
        nomeInput.value = ''
        nomeInput.focus()
        return
    }

    // adiciona os nomes a lista adicionaAmigos
    adicionarAmigo.push(nomeAmigo)

    // Primeiro verifica se a lista esta vazia caso seja verdade mostra o nome que foi digitado, caso já tenha nomes na lista acrescenta um novo nome com virgula na 
    if (lista.textContent === '') {
        lista.textContent = nomeAmigo
    } else {
        lista.textContent += ', ' + nomeAmigo
    }

    // Limpa o input para que o usuario consiga digitar de imediato sem precisar apagar o conteudo e depois digitar novamente
    nomeInput.value = ''
    nomeInput.focus()

    atualizarLista()
    atualizarSorteio()
}


//Essa função faz o sorteio dos amigos 
function sortear(){
    //Retorna uma função que é responsavel por embaralhar os amigos
    embaralhar(adicionarAmigo)

    //Resgata o ID de onde vai aparecer a lista de amigos 
    let sorteio = document.getElementById('lista-sorteio')

    sorteio.innerHTML = ''

    //Uma validação para verificar se a lista esta vazia ou possue 4 ou mais amigos adicionados, caso não tenha retorna um Alert
    if(adicionarAmigo.length < 4){
        alert('Não há amigos para o sorteio, ou o numero de amigos e inferior a 4')
        return
    }


    // Um for que faz com que o todos os amigos sorteem alguem sem nenhum ficar de fora, para isso ele passa por cada nome adicionado
    for(let i = 0; i < adicionarAmigo.length; i++){
        //Verifica se o ultimo da lista com adicionarAmigo.length - 1 
        if(i == adicionarAmigo.length - 1){
            //se for o ultimo retorna esse innerHTML conctenado
            sorteio.innerHTML = sorteio.innerHTML + adicionarAmigo[i] + ' ---> ' + adicionarAmigo[0] + '<br>'
        }else { 
            //Caso não seja retorna esse innerHTML conctenado
            sorteio.innerHTML = sorteio.innerHTML + adicionarAmigo[i] + ' ---> ' + adicionarAmigo[i + 1] + '<br>'
        }        
    }

}

//Essa função exclui o nome do amigo em que foi clicado
function excluirAmigo(index) {
    adicionarAmigo.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

//Essa função embaralha os amigos de forma aleatoria chamada Fisher-Yates Shuffle 
function embaralhar(lista) {

    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);
        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}

//Essa função retorna a lista sorteio para a forma base
function atualizarSorteio(){
    let sorteio = document.getElementById('lista-sorteio')
    sorteio.innerHTML = ''
}

/*
Essa função faz 3 coisas a 
primeiro adiciona o nome para que fique visivel ao usuario e mostra que o nome informado pode ser apagado a qualquer estante
segundo  adiciona o envento de clique ao span criado
terceiro adiciona a vigurla para que os nomes não fiquem todos grudados
*/
function atualizarLista(){
    let lista = document.getElementById('lista-amigos')
    lista.innerHTML = ''

    for(let i = 0; i < adicionarAmigo.length; i++){
        let paragrafo = document.createElement('span')
        paragrafo.textContent = adicionarAmigo[i]

        paragrafo.style.cursor = 'pointer'

        paragrafo.addEventListener('click',function(){
            excluirAmigo(i)
        })

        lista.appendChild(paragrafo)
        if(i < adicionarAmigo.length - 1){
            lista.append(', ')
        }
    }
}

//Essa função reinicia o programa e forma a foma base 
function reiniciar(){
    adicionarAmigo = []
    document.getElementById('lista-sorteio').innerHTML = ''
    document.getElementById('lista-amigos').innerHTML = ''
}