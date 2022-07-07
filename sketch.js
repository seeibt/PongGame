//Tamanho da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 15;

//Para não entrar a borda da bolinha na parede
let raioBolinha = diametroBolinha / 2;

//Velocidade Bolinha
let velocidadeX = 5;
let velocidadeY = 5;

//Raquete 
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 70;

//RaqueteOponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeOponente; 

//Placar do Jogo
let pontos = 0;
let pontosOponente = 0;

let colidiu = false;

//Sons do jogo
let somRaquete;
let somPonto;
let somTrilha;

function preload(){
  somTrilha = loadSound("trilha.mp3");
  somPonto = loadSound("ponto.mp3");
  somRaquete = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  somTrilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
 desenhaRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  colisaoRaquetesBiblioteca(xRaquete, yRaquete);
  colisaoRaquetesBiblioteca(xRaqueteOponente, yRaqueteOponente);
  desenhaRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentoRaqueteOponente();
  incluirPlacar();
  marcaPonto();
}
function mostraBolinha(){ 
  circle(xBolinha, yBolinha, diametroBolinha);
}

function verificaColisao(){
  if (xBolinha + raioBolinha > width || 
      xBolinha - raioBolinha < 0){
      velocidadeX *= -1
  }
  if (yBolinha + raioBolinha > height  || 
      yBolinha - raioBolinha < 0){
      velocidadeY *= -1
  }
}
function movimentaBolinha(){ 
  xBolinha += velocidadeX;
  yBolinha += velocidadeY;
}
function desenhaRaquete(x, y){
  rect(x, y, comprimentoRaquete, alturaRaquete);
  
}

function movimentoRaquete(){
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

function colisaoRaquetesBiblioteca(x, y){
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raioBolinha);
  if(colidiu){
    velocidadeX *= -1;
    somRaquete.play();
  }
}


function movimentoRaqueteOponente(){
    if (keyIsDown(87)) {
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)) {
        yRaqueteOponente += 10;
}

}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(75,0,130));
  rect(80, 10, 40, 20);
  rect(480, 10, 40, 20);
  fill(255);
  text(pontos, 100, 26);
  text(pontosOponente, 500, 26);
}
function marcaPonto(){
  if (xBolinha > 590){
    pontos += 1;
    somPonto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    somPonto.play();
  }
  
}
