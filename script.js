document.addEventListener("DOMContentLoaded", function () {
    const mainContent = document.getElementById("mainContent");

    function loadUserInfo() {
        // Simulación de cargar datos del usuario desde un archivo JSON
        return JSON.parse(localStorage.getItem("userInfo")) || {
            nombre: "",
            peso: "",
            altura: ""
        };
    }

    function saveUserInfo(userInfo) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    function showLoginScreen() {
        mainContent.innerHTML = `
            <h2>Inicio de Sesión</h2>
            <div>
                <label>Nombre de Usuario:</label>
                <input type="text" id="username">
            </div>
            <div>
                <label>Peso:</label>
                <input type="text" id="weight">
            </div>
            <div>
                <label>Altura:</label>
                <input type="text" id="height">
            </div>
            <button id="loginButton">Iniciar Sesión</button>
        `;

        document.getElementById("loginButton").addEventListener("click", function () {
            const userInfo = {
                nombre: document.getElementById("username").value,
                peso: document.getElementById("weight").value,
                altura: document.getElementById("height").value
            };
            saveUserInfo(userInfo);
            showMainScreen();
        });
    }

    function showMainScreen() {
        const userInfo = loadUserInfo();
        mainContent.innerHTML = `
            <h2>Bienvenido, ${userInfo.nombre}</h2>
            <button id="manageRoutines">Rutinas</button>
            <button id="editUserInfo">Editar Información del Usuario</button>
            <button id="registerExercise">Registrar Ejercicio Realizado</button>
            <button id="viewProgress">Ver Progreso</button>
        `;

        document.getElementById("editUserInfo").addEventListener("click", showEditUserInfoScreen);
        document.getElementById("manageRoutines").addEventListener("click", manageRoutines);
    }

    function showEditUserInfoScreen() {
        const userInfo = loadUserInfo();
        mainContent.innerHTML = `
            <h2>Editar Información del Usuario</h2>
            <div>
                <label>Nombre de Usuario:</label>
                <input type="text" id="username" value="${userInfo.nombre}">
            </div>
            <div>
                <label>Peso:</label>
                <input type="text" id="weight" value="${userInfo.peso}">
            </div>
            <div>
                <label>Altura:</label>
                <input type="text" id="height" value="${userInfo.altura}">
            </div>
            <button id="saveUserInfo">Guardar Cambios</button>
        `;

        document.getElementById("saveUserInfo").addEventListener("click", function () {
            const userInfo = {
                nombre: document.getElementById("username").value,
                peso: document.getElementById("weight").value,
                altura: document.getElementById("height").value
            };
            saveUserInfo(userInfo);
            alert("Información actualizada con éxito!");
            showMainScreen();
        });
    }

    function manageRoutines() {
        mainContent.innerHTML = `
            <h2>Rutinas</h2>
            <button id="registerRoutine">Registrar Rutinas</button>
            <button id="viewRoutines">Ver Rutinas</button>
            <button id="deleteRoutines">Eliminar Rutinas</button>
            <button id="backButton">Atrás</button>
        `;

        document.getElementById("backButton").addEventListener("click", showMainScreen);
    }

    document.getElementById("closeApp").addEventListener("click", function () {
        window.close();
    });

    document.getElementById("showUserInfo").addEventListener("click", function () {
        const userInfo = loadUserInfo();
        alert(`Nombre: ${userInfo.nombre}\nPeso: ${userInfo.peso}\nAltura: ${userInfo.altura}`);
    });

    const userInfo = loadUserInfo();
    if (userInfo.nombre) {
        showMainScreen();
    } else {
        showLoginScreen();
    }
});
