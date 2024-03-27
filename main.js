const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const tempoFim = new Audio('/sons/beep.mp3');
const btIniciar = new Audio('/sons/play.wav');
const btPausar = new Audio('/sons/pause.mp3');
const tempoNaTela = document.querySelector('#timer');
const startPauseBt  = document.querySelector('#start-pause');
const iniciarOuPauzarBt = document.querySelector('#start-pause span')
musica.loop = true;

let intervaloId = null;
let tempoDecorridoEmSegundos = 1500;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    }else {
        musica.pause();
    }
} )

function mudarContexto(contexto, imagem) {
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', imagem);
    switch(contexto) {
        case "foco":
            titulo.innerHTML= `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>')`
        break;
        case "descanso-curto":
            titulo.innerHTML= `Que tal dar uma respirada?,<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>'`
        break;
        case "descanso-longo":
            titulo.innerHTML= `Hora de voltar à superfície.,<br>
            <strong class="app__title-strong">    Faça uma pausa longa.</strong>'`
        break;
    }

}

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    mudarContexto('foco', '/imagens/foco.png');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    mudarContexto('descanso-curto', '/imagens/descanso-curto.png');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    mudarContexto('descanso-longo', '/imagens/descanso-longo.png');
    longoBt.classList.add('active');
});

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
       tempoFim.play();
        alert('Tempo finalizado');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPauzar)


function iniciarOuPauzar() {
    if (intervaloId) {
        
        btPausar.play(); // Se está pausando, toca o som de pausa
        zerar();
       
        startPauseBt.querySelector('.app__card-primary-butto-icon').src = "/imagens/play_arrow.png";
        return;
    }
        btIniciar.play(); // Se está iniciando, toca o som de iniciar
        intervaloId = setInterval(contagemRegressiva, 1000);
        iniciarOuPauzarBt.textContent = "Pausar"
        startPauseBt.querySelector('.app__card-primary-butto-icon').src = "/imagens/pause.png";
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPauzarBt.textContent = "Começar"
    startPauseBt.querySelector('.app__card-primary-butto-icon').src = "/imagens/play_arrow.png";
    intervaloId = null;q
    tempoDecorridoEmSegundos = 5;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();