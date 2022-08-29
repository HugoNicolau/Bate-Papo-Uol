let nome;
let estado;
let mensagens;
nomeUsuario();

function nomeUsuario() {
  nome = {
    name: prompt("Digite seu nome de usuário"),
  };
  const requisicao = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",
    nome
  );
  requisicao.then(tratarSucesso);
  requisicao.catch(tratarErro);
}

function tratarSucesso() {
    buscarMensagens();
}

function tratarErro() {
  nomeUsuario();
}

function estaON() {
  estado = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome);

  estado.then(userOnline);
  estado.catch(userAFK);
}
//setInterval(estaON, 5000);

function userOnline() {
  //Está on ainda
}
function userAFK() {
  window.location.reload();
}

function buscarMensagens() {
  mensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
  mensagens.then(mensagensSucesso);
}
setInterval(buscarMensagens, 30000);
setInterval(estaON, 5000);

function mensagensSucesso(resposta) {
  //Carregar mensagens dentro do for
  //Se for mensagem privada, carregar só pra pessoa que enviou e pra que recebeu (comparar com nome de usuario)
  //time from reservadamente para to: text
  //Se for status deve por a mensagem em um formato
  //time from entra na sala...
  //time from sai da sala...
  //Se for message, deve por a mensagem em outro formato
  //time from para to: text
  let mensagensAtuais = document.querySelector(".conteudo");
  console.log(mensagensAtuais);
  for (let i = 0; i < resposta.data.length; i++) {
    if (resposta.data[i].type === "private_message") {
      mensagensAtuais.innerHTML += `<div class="mensagem-privada">
            <div class="horario">(${resposta.data[i].time})</div>
            <div class="mensagem-no-chat">
              <span>${resposta.data[i].from}</span> reservadamente para <span>${resposta.data[i].to}</span>: ${resposta.data[i].text}
            </div>
          </div>`;
    } else if (resposta.data[i].type === "status") {
      mensagensAtuais.innerHTML += `<div class="mensagem-status">
          <div class="horario">(${resposta.data[i].time})</div>
          <div class="entra-sala"><span>${resposta.data[i].from}</span> ${resposta.data[i].text}</div>
        </div>`;
    } else if (resposta.data[i].type === "message") {
      mensagensAtuais.innerHTML += `<div class="mensagem">
            <div class="horario">(${resposta.data[i].time})</div>
            <div class="mensagem-no-chat">
              <span>${resposta.data[i].from}</span> para <span>${resposta.data[i].to}</span>: ${resposta.data[i].text}
            </div>
          </div>`;
    } else {
        console.log('Deu erro para colocar as mensagens')
    }
    // console.log(resposta.data[i].from)
    // console.log(resposta.data[i].to)
    // console.log(resposta.data[i].time)
    // console.log(resposta.data[i].text)
    // console.log(resposta.data[i].type)
  }
}
