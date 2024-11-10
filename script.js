let estado = "";
let cidade = "";
let rua = "";
let bairro = "";
let preco = 0;
let carro = "";
let ano = "";
let valorCarro = 0;

// Função para requisitar dados do CEP
async function requisitarCep() {
    let cep = document.querySelector("#cep").value;
    let urlCep = "https://brasilapi.com.br/api/cep/v1/" + cep;
    try {
        const response = await fetch(urlCep);
        const data = await response.json();
        estado = data.state;
        cidade = data.city;
        rua = data.street;
        bairro = data.neighborhood;
        document.querySelector(
            "#endereco"
        ).innerHTML = `Seu endereço é: Rua ${rua}, ${bairro}, ${cidade}, ${estado}.`;
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        document.querySelector("#endereco").innerHTML =
            "Erro ao obter o endereço.";
    }
}

// Função para requisitar dados da tabela FIPE
async function requisitarfipe() {
    let fipe = document.querySelector("#fipe").value;
    let urlFipe = "https://brasilapi.com.br/api/fipe/preco/v1/" + fipe;
    try {
        const response = await fetch(urlFipe);
        const data = await response.json();
        preco = data[0].valor;
        carro = data[0].modelo;
        ano = data[0].anoModelo;
        valorCarro = parseFloat(
            preco.replace("R$ ", "").replace(".", "").replace(",", ".")
        );
        document.querySelector(
            "#seucarro"
        ).innerHTML = `Seu carro é: ${carro} ano ${ano}, com o valor de mercado de R$ ${preco}.`;
    } catch (error) {
        console.error("Erro ao buscar valor do carro:", error);
        document.querySelector("#seucarro").innerHTML =
            "Erro ao obter o valor do carro.";
    }
}

// Função para verificar situação do seguro
function situacaoSeguro() {
    const mensagem = document.querySelector("#mensagem");
    if (estado === "RJ" && valorCarro > 30000) {
        mensagem.innerHTML = "Seu seguro foi liberado";
    } else {
        mensagem.innerHTML = "Infelizmente seu seguro não foi aceito";
    }
}

// Função principal que controla a execução das funções
async function resultado() {
    await requisitarCep();
    await requisitarfipe();
    situacaoSeguro();
}

document.querySelector("#btn").addEventListener("click", resultado);
