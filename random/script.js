const participants = [];

document.getElementById('add-participant').addEventListener('click', function () {
    const name = document.getElementById('participant-name').value.trim();
    const invites = parseInt(document.getElementById('invites').value.trim(), 10);

    if (name && !isNaN(invites)) {
        participants.push({ name, invites });
        updateParticipantsList();
        document.getElementById('participant-name').value = '';
        document.getElementById('invites').value = '';
    } else {
        alert('Пожалуйста, введите корректное имя и количество приглашённых друзей.');
    }
});

document.getElementById('draw-winner').addEventListener('click', function () {
    if (participants.length === 0) {
        alert('Добавьте хотя бы одного участника!');
        return;
    }

    const totalWeight = participants.reduce((sum, participant) => sum + (1 + participant.invites), 0);

    const randomNumber = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    let winner = null;
    for (const participant of participants) {
        cumulativeWeight += (1 + participant.invites);
        if (randomNumber <= cumulativeWeight) {
            winner = participant.name;
            break;
        }
    }

    if (winner) {
        const winnerElement = document.getElementById('winner-name');
        winnerElement.textContent = `Победитель: ${winner}`;
    }
});

function updateParticipantsList() {
    const list = document.getElementById('participants-list');
    list.innerHTML = ''; // Очистить список

    const totalWeight = participants.reduce((sum, participant) => sum + (1 + participant.invites), 0);

    participants.forEach((participant, index) => {
        const chance = ((1 + participant.invites) / totalWeight) * 100;

        const listItem = document.createElement('li');
        listItem.className = 'participant-item';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'participant-name';
        nameSpan.textContent = `${participant.name}`;

        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'progress-bar-container';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.width = `${chance}%`;
        progressBar.textContent = `${chance.toFixed(1)}% (Друзья: ${participant.invites})`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function () {
            deleteParticipant(index);
        });

        progressBarContainer.appendChild(progressBar);
        listItem.appendChild(nameSpan);
        listItem.appendChild(progressBarContainer);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    });
}

function deleteParticipant(index) {
    participants.splice(index, 1); // Удалить участника по индексу
    updateParticipantsList(); // Обновить список
}

// Генерация случайного числа
document.getElementById('generate-random-number').addEventListener('click', function () {
    const min = parseInt(document.getElementById('min-value').value.trim(), 10);
    const max = parseInt(document.getElementById('max-value').value.trim(), 10);

    if (isNaN(min) || isNaN(max) || min >= max) {
        alert('Пожалуйста, введите корректные значения для диапазона.');
        return;
    }

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById('random-number-result').textContent = `Случайное число: ${randomNumber}`;
});

// Переключение вкладок
document.getElementById('tab-participants').addEventListener('click', function () {
    document.getElementById('participants-section').style.display = 'block';
    document.getElementById('random-number-section').style.display = 'none';
    document.getElementById('tab-participants').classList.add('active');
    document.getElementById('tab-random-number').classList.remove('active');
});

document.getElementById('tab-random-number').addEventListener('click', function () {
    document.getElementById('random-number-section').style.display = 'block';
    document.getElementById('participants-section').style.display = 'none';
    document.getElementById('tab-random-number').classList.add('active');
    document.getElementById('tab-participants').classList.remove('active');
});
