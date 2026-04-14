const areaExibicao = document.getElementById('verHorarios');

// Aqui definimos que o Itadori aparece apenas no Início
const htmlBoasVindas = `
    <div class="painel-boas-vindas">
        <img src="../img/itadori.png" class="itadori-inicio">
    </div>
`;

let diaAtual, horaAtual;

// Função para voltar para a tela inicial (com o Itadori)
function resetarPainel() { 
    areaExibicao.innerHTML = htmlBoasVindas; 
}

document.querySelectorAll('.daysWeek').forEach(botao => {
    botao.addEventListener('click', () => {
        const dia = botao.innerText;
        // Ao clicar no dia, o Itadori some porque mudamos o innerHTML para a grade
        areaExibicao.innerHTML = `<h2 style="grid-column: 1/-1; color: #6D322A; font-family: 'Pacifico', cursive; font-size: 40px; margin-bottom: 20px;">${dia}</h2>`;
        
        for (let h = 5; h <= 22; h++) {
            const horaF = h < 10 ? `0${h}:00` : `${h}:00`;
            const card = document.createElement('div');
            card.className = "slotHora";
            card.style.padding = "40px"; // Deixando os cards de hora grandes também
            card.innerHTML = `<strong style="font-size: 25px;">${horaF}</strong><p>Planejar</p>`;
            card.onclick = () => abrirRotina(dia, horaF);
            areaExibicao.appendChild(card);
        }
    });
});

function abrirRotina(dia, horario) {
    diaAtual = dia; horaAtual = horario;
    document.getElementById('container-principal').style.display = 'none';
    document.getElementById('tela-rotina').style.display = 'block';
    document.getElementById('hora-selecionada').innerText = `${dia} - ${horario}`;
    
    ['prio1', 'prio2', 'prio3', 'texto-rotina'].forEach(id => document.getElementById(id).value = "");
    
    const dados = JSON.parse(localStorage.getItem(`${dia}-${horario}`));
    if (dados) {
        document.getElementById('prio1').value = dados.p1 || "";
        document.getElementById('prio2').value = dados.p2 || "";
        document.getElementById('prio3').value = dados.p3 || "";
        document.getElementById('texto-rotina').value = dados.texto || "";
    }
}

function salvarDados() {
    localStorage.setItem(`${diaAtual}-${horaAtual}`, JSON.stringify({
        p1: document.getElementById('prio1').value,
        p2: document.getElementById('prio2').value,
        p3: document.getElementById('prio3').value,
        texto: document.getElementById('texto-rotina').value
    }));
    alert("Rotina Salva! 🎀");
}

function voltarParaPlanner() {
    document.getElementById('container-principal').style.display = 'block';
    document.getElementById('tela-rotina').style.display = 'none';
}