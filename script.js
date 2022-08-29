let nome;
let estado;
let mensagens;
nomeUsuario();

function nomeUsuario() {
  nome = {
    name: prompt("Digite seu nome de usuário")
  };
  const requisicao = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",
    nome
  );
  requisicao.then(tratarSucesso);
  requisicao.catch(tratarErro);
}

function tratarSucesso() {
  alert("Deu bom");
}

function tratarErro() {
  nomeUsuario()
}

function estaON(){
    estado = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome)
    
    estado.then(userOnline)
    estado.catch(userAFK)
}
setInterval(estaON, 5000)

function userOnline() {
    //Está on ainda

}
function userAFK() {
    window.location.reload();

}

function buscarMensagens(){
    mensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    mensagens.then(mensagensSucesso)
}
setInterval(buscarMensagens, 30000)

function mensagensSucesso(resposta){

    for(let i = 0; i < resposta.data.length; i++){
        console.log(resposta.data[i].from)
        console.log(resposta.data[i].to)
        console.log(resposta.data[i].time)
        console.log(resposta.data[i].text)
        console.log(resposta.data[i].type)
    }
    
}