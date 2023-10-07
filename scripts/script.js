const state ={
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('.score'),
    },  // variaveis que vão alterar a view
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
       
    }, //variaveis que vão alterar os valores do jogo
    actions:{
        countDownTimerId: setInterval(countDown, 1000),
    }, //funções que vão alterar os valores do jogo
}

function countDown(){
    state.values.currentTime--; //diminui 1 segundo do tempo atual
    state.view.timeLeft.textContent = state.values.currentTime; //atualiza o tempo na tela
    if (state.values.currentTime === 0){ //se o tempo atual for maior ou igual a 0
        alert ('Parabéns! O seu resultado foi: ' + state.values.result + ' pontos!');
        reset();
}
}
//reseta o jogo
function reset(){
    state.values.currentTime = 60;
    state.values.result = 0;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.values.timerId);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

 function playSound(){
    let audio = new Audio('./audios/src_audios_hit.m4a')
    audio.volume = 0.2
    audio.play()
 }

function randomSquare(){
    state.view.squares.forEach((square) => { //para cada quadrado
        square.classList.remove('enemy'); //remove a classe enemy de todos os quadrados
    });
    let randomNumber = Math.floor(Math.random()*9); //gera um numero aleatorio de 0 a 8
    let randomSquare = state.view.squares[randomNumber]; //seleciona o quadrado aleatorio
    randomSquare.classList.add('enemy'); //adiciona a classe enemy ao quadrado aleatorio
    state.values.hitPosition = randomSquare.id; //pega o id do quadrado aleatorio
}  
function moveEnemy(){
state.values.timerId = setInterval(randomSquare, state.values.gameVelocity); //chama a função randomSquare a cada 1 segundo
}

function addListenerHitbox(){
    state.view.squares.forEach((square) => { 
        square.addEventListener("mousedown",() =>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound()
            }
            }) 
        }) 
    };


function init(){
    moveEnemy()
    addListenerHitbox()
}
 
init();  //inicia o jogo