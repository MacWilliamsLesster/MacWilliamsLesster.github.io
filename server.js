const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Ruta para registrar usuarios
app.post('/register', (req, res) => {
    let users = JSON.parse(fs.readFileSync('users.json'));
    users.push(req.body);
    fs.writeFileSync('users.json', JSON.stringify(users));
    res.send({ message: 'Usuario registrado exitosamente' });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    let users = JSON.parse(fs.readFileSync('users.json'));
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
    if (user) {
        res.send({ message: 'Inicio de sesión exitoso', user });
    } else {
        res.status(401).send({ message: 'Credenciales incorrectas' });
    }
});

// Ruta para gestionar rutinas
app.post('/saveRoutine', (req, res) => {
    let users = JSON.parse(fs.readFileSync('users.json'));
    let user = users.find(u => u.username === req.body.username);
    if (user) {
        user.routines = req.body.routines;
        fs.writeFileSync('users.json', JSON.stringify(users));
        res.send({ message: 'Rutina guardada exitosamente' });
    } else {
        res.status(404).send({ message: 'Usuario no encontrado' });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
