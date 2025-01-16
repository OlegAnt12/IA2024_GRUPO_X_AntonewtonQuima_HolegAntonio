const board = document.getElementById('board');
const moveButton = document.getElementById('moveButton');
const timeDisplay = document.getElementById('time');
const stepsDisplay = document.getElementById('steps');
const statusDisplay = document.getElementById('status');
const size = 5;
let agentPosition = { x: 0, y: 0 };
let mousePosition = { x: 0, y: 0 };
let steps = 0;
let elapsedTime = 0;
let isMoving = true; // Variável para controlar o movimento do agente

// Cria o tabuleiro
for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.x = x;
        cell.dataset.y = y;
        board.appendChild(cell);
        console.log(cell.dataset);
    }
}

// Função para posicionar o agente
function placeAgent() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('agent'));
    const agentCell = cells[agentPosition.y * size + agentPosition.x];
    agentCell.classList.add('agent');
}

// Função para posicionar o rato
function placeMouse() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('mouse'));
    
    // Gera uma posição aleatória para o rato
    mousePosition.x = Math.floor(Math.random() * size);
    mousePosition.y = Math.floor(Math.random() * size);
    
    const mouseCell = cells[mousePosition.y * size + mousePosition.x];
    mouseCell.classList.add('mouse');
}

// Função para mover o agente
function moveAgent() {
    if (!isMoving) return; // Se o agente não deve se mover, retorna
    
    const direction = Math.floor(Math.random() * 4); // 0: cima, 1: baixo, 2: esquerda, 3: direita
    switch (direction) {
        case 0: // Cima
            if (agentPosition.y > 0) agentPosition.y--;
            break;
        case 1: // Baixo
            if (agentPosition.y < size - 1) agentPosition.y++;
            break;
        case 2: // Esquerda
            if (agentPosition.x > 0) agentPosition.x--;
            break;
        case 3: // Direita
            if (agentPosition.x < size - 1) agentPosition.x++;
            break;
    }
    /*if(agentPosition.x == 0 && agentPosition.y == 2){
        console.log("morreu");
        return;
    }*/
    
    steps++;
    updateDisplays();
    placeAgent();
    
    // Verifica se o agente encontrou o rato
    if (agentPosition.x === mousePosition.x && agentPosition.y === mousePosition.y) {
        isMoving = false; // Para o movimento do agente
        statusDisplay.textContent = "Agente encontrou o rato!";
    }
}

// Atualiza as informações exibidas
function updateDisplays() {
    stepsDisplay.textContent = steps;
    timeDisplay.textContent = elapsedTime.toFixed(1);
}

// Inicializa o agente e o rato
placeAgent();
placeMouse();

// Adiciona o evento de mover ao botão
moveButton.addEventListener('click', moveAgent);

// Mover o agente automaticamente a cada 1,5 segundos
const autoMoveInterval = setInterval(() => {
    moveAgent();
    if (!isMoving) clearInterval(autoMoveInterval); // Para o intervalo se o agente encontrar o rato
}, 1500);

// Atualiza o tempo decorrido a cada segundo
setInterval(() => {
    elapsedTime += 1.5; // Incrementa 1.5 segundos a cada intervalo
    updateDisplays();
}, 1500);
