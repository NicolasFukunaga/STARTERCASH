// --- 1. Estado Global do Usuário ---
let userProfile = {
    username: "USER",
    xp: 0,
    levelUpXP: 100, // XP necessário para o próximo nível
    coins: 0,
    // Deve corresponder à classe CSS inicial da jaqueta
    currentOutfit: 'default-color', 
    missions: [
        { id: 1, text: "Completar 1º Módulo de 'Orçamento'", completed: 1, total: 2, rewardXP: 10, rewardCoins: 5 },
        { id: 2, text: "Assistir o vídeo 'O que são Investimentos?'", completed: 0, total: 1, rewardXP: 20, rewardCoins: 10 },
    ]
};

// --- 2. Elementos do DOM ---
const xpFill = document.getElementById('xp-fill');
const coinsCount = document.getElementById('coins-count');
const avatarModel = document.getElementById('avatar-model');
const avatarJacket = document.getElementById('avatar-jacket'); // Elemento da roupa
const missionList = document.getElementById('mission-list');
const continueBtn = document.getElementById('continue-btn');

// Inventário/Modal
const inventoryBtn = document.getElementById('inventory-btn');
const inventoryModal = document.getElementById('inventory-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const itemBtns = document.querySelectorAll('.item-btn');

// --- 3. Funções de Renderização e Atualização ---

/** Atualiza a barra de XP e o contador de moedas na tela */
function updateUI() {
    coinsCount.textContent = userProfile.coins;

    const xpPercentage = Math.min(100, (userProfile.xp / userProfile.levelUpXP) * 100);
    xpFill.style.width = `${xpPercentage}%`;

    renderMissions();
}

/** Renderiza a lista de missões dinamicamente */
function renderMissions() {
    missionList.innerHTML = ''; 
    userProfile.missions.forEach(mission => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('mission-item');
        
        const progressText = mission.completed >= mission.total ? 'CONCLUÍDA' : `${mission.completed}/${mission.total}`;
        const isComplete = mission.completed >= mission.total;

        itemDiv.innerHTML = `
            <span class="mission-text">${mission.text}</span>
            <span class="mission-progress">${progressText}</span>
            <button class="complete-mission" data-mission-id="${mission.id}" ${isComplete ? 'disabled' : ''}>
                ${isComplete ? '✅' : '✔'}
            </button>
        `;
        missionList.appendChild(itemDiv);
    });
    
    document.querySelectorAll('.complete-mission').forEach(button => {
        button.addEventListener('click', handleMissionCompletion);
    });
}

/** Completa missão e recompensa o usuário. */
function handleMissionCompletion(event) {
    const missionId = parseInt(event.currentTarget.getAttribute('data-mission-id'));
    const mission = userProfile.missions.find(m => m.id === missionId);

    if (mission && mission.completed < mission.total) {
        mission.completed++;
        
        if (mission.completed >= mission.total) {
            userProfile.xp += mission.rewardXP;
            userProfile.coins += mission.rewardCoins;
            
            triggerAvatarCheer();
            
            alert(`Missão Concluída! Você ganhou ${mission.rewardXP} XP e ${mission.rewardCoins} Moedas!`);
        }
        
        updateUI();
    }
}


// --- 4. Interação e Modificação do Avatar ---

/** Ativa a animação de celebração do avatar */
function triggerAvatarCheer() {
    avatarModel.style.animation = 'none'; 
    avatarModel.classList.add('cheer');

    avatarModel.addEventListener('animationend', () => {
        avatarModel.classList.remove('cheer');
        avatarModel.style.animation = '';
    }, { once: true });
}

/** * Altera a aparência do avatar trocando a classe CSS da jaqueta.
 * @param {string} outfitClass - O nome da classe CSS de cor/estilo (ex: 'red-jacket-color').
 */
function changeAvatarOutfit(outfitClass) {
    const allOutfitClasses = ['default-color', 'red-jacket-color', 'suit-up-color'];
    
    // Remove todas as classes de outfit do elemento da jaqueta
    allOutfitClasses.forEach(cls => avatarJacket.classList.remove(cls));

    // Adiciona a nova classe
    avatarJacket.classList.add(outfitClass);
    userProfile.currentOutfit = outfitClass;
    
    // Atualiza o estado visual do modal
    itemBtns.forEach(btn => {
        if (btn.getAttribute('data-item') === outfitClass) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Animação de transformação
    avatarModel.style.transform = 'scale(1.05)';
    setTimeout(() => {
        avatarModel.style.transform = 'scale(1)';
    }, 300);
}


// --- 5. Event Listeners ---

// Abre o Modal de Inventário
inventoryBtn.addEventListener('click', () => {
    inventoryModal.style.display = 'block';
});

// Fecha o Modal de Inventário
closeModalBtn.addEventListener('click', () => {
    inventoryModal.style.display = 'none';
});

// Fecha o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === inventoryModal) {
        inventoryModal.style.display = 'none';
    }
});

// Listener para os botões de customização de item no modal
itemBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        const itemClass = e.currentTarget.getAttribute('data-item');
        changeAvatarOutfit(itemClass);
    });
});

// Listener para o botão principal com interação do avatar
continueBtn.addEventListener('click', () => {
    alert('Avançando para o próximo módulo de finanças pessoais...');
    // Avatar faz uma pequena animação ao avançar
    triggerAvatarCheer();
});


// --- 6. Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
    // Carrega a roupa inicial do usuário
    changeAvatarOutfit(userProfile.currentOutfit); 
    updateUI();
});