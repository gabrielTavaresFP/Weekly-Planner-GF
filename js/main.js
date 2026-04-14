const areaExibicao = document.getElementById('verHorarios');

const htmlBoasVindas = `
    <div class="painel-boas-vindas">
        <img src="img/itadori.png" class="itadori-inicio">
    </div>
`;

let diaAtual, horaAtual;

// Data da semana (igual antes)
const hoje = new Date();
const inicio = new Date(hoje);
inicio.setDate(hoje.getDate() - hoje.getDay());
const fim = new Date(inicio);
fim.setDate(inicio.getDate() + 6);
const fmt = d => d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
document.getElementById('week-badge').textContent = `${fmt(inicio)} – ${fmt(fim)}`;

// Toast
function showToast(msg, icon = '🎀') {
    const t = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    t.querySelector('.toast-icon').textContent = icon;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
}

// Modal
function fecharModal() {
    document.getElementById('modal-overlay').classList.remove('open');
}
function confirmarLimpar() {
    document.getElementById('modal-overlay').classList.add('open');
}

// Resetar painel
function resetarPainel() { 
    areaExibicao.innerHTML = htmlBoasVindas; 
}

// Clique nos dias
document.querySelectorAll('.daysWeek').forEach(botao => {
    botao.addEventListener('click', () => {
        const dia = botao.innerText;
        areaExibicao.innerHTML = `<h2 style="grid-column: 1/-1; color: #6D322A; font-family: 'Pacifico', cursive; font-size: 40px; margin-bottom: 20px;">${dia}</h2>`;
        
        for (let h = 5; h <= 22; h++) {
            const horaF = h < 10 ? `0${h}:00` : `${h}:00`;
            const temDados = !!localStorage.getItem(`${dia}-${horaF}`);
            
            const card = document.createElement('div');
            card.className = "slotHora";
            card.style.padding = "40px";
            card.innerHTML = `
                <strong style="font-size: 25px;">${horaF}</strong>
                <p style="font-size: 22px; font-weight: bold; color: ${temDados ? 'var(--hk-red)' : '#666'}">
                    ${temDados ? 'EDITADO' : 'Planejar'}
                </p>
            `;
            card.onclick = () => abrirRotina(dia, horaF);
            areaExibicao.appendChild(card);
        }
    });
});

function abrirRotina(dia, horario) {
    diaAtual = dia; 
    horaAtual = horario;
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
    showToast('Rotina salva com sucesso! 🎀');
}

function limparDados() {
    fecharModal();
    localStorage.removeItem(`${diaAtual}-${horaAtual}`);
    ['prio1', 'prio2', 'prio3', 'texto-rotina'].forEach(id => {
        document.getElementById(id).value = '';
    });
    showToast('Rotina apagada.', '🗑️');
}

function voltarParaPlanner() {
    document.getElementById('container-principal').style.display = 'block';
    document.getElementById('tela-rotina').style.display = 'none';
}