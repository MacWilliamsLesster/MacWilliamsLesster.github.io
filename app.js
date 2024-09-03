let userInfo = null;

function login() {
    const username = document.getElementById('username').value;
    const storedUser = JSON.parse(localStorage.getItem(username));

    if (storedUser) {
        userInfo = storedUser;
        document.getElementById('user-name').textContent = userInfo.username;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
    } else {
        alert('Usuario no encontrado.');
    }
}

function saveRoutine() {
    const exercise = document.getElementById('exercise').value;
    const reps = document.getElementById('reps').value;
    const sets = document.getElementById('sets').value;
    const description = document.getElementById('description').value;

    const routine = { exercise, reps, sets, description };
    userInfo.routines.push(routine);

    localStorage.setItem(userInfo.username, JSON.stringify(userInfo));
    alert('Rutina guardada exitosamente');
    manageRoutines();
}

function viewRoutines() {
    const main = document.getElementById('main');
    main.innerHTML = '<h2>Ver Rutinas</h2>';
    const ul = document.createElement('ul');
    
    userInfo.routines.forEach((routine, index) => {
        const li = document.createElement('li');
        li.textContent = `${routine.exercise}: ${routine.reps} repeticiones, ${routine.sets} series - ${routine.description}`;
        ul.appendChild(li);
    });

    main.appendChild(ul);
    main.innerHTML += `<button class="back-button" onclick="manageRoutines()">Atrás</button>`;
}

function saveRoutineToFile() {
    const routineData = JSON.stringify(userInfo.routines);
    const blob = new Blob([routineData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${userInfo.username}-rutinas.json`;
    a.click();
}

function loadRoutineFromFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const routines = JSON.parse(e.target.result);
        userInfo.routines = routines;
        localStorage.setItem(userInfo.username, JSON.stringify(userInfo));
        alert('Rutinas cargadas exitosamente');
    };

    reader.readAsText(file);
}
