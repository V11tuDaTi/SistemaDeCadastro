const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let cursos = [];
let alunos = [];

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/cursos', (req, res) => {
    res.render('cursos', { cursos });
});

app.post('/cursos', (req, res) => {
    const { nome, descricao, duracao, preco } = req.body;
    cursos.push({ nome, descricao, duracao, preco, alunosInscritos: [] });
    res.redirect('/cursos');
});

app.post('/cursos/delete/:nome', (req, res) => {
    const nome = req.params.nome;
    cursos = cursos.filter(curso => curso.nome !== nome);
    res.redirect('/cursos');
});

app.get('/alunos', (req, res) => {
    res.render('alunos', { alunos, cursos });
});

app.post('/alunos', (req, res) => {
    const { nome, idade, email, cursosInscritos } = req.body;
    let aluno = { nome, idade, email, cursosInscritos: [] };

    cursos.forEach(curso => {
        if (cursosInscritos && cursosInscritos.includes(curso.nome)) {
            curso.alunosInscritos.push(aluno);
            aluno.cursosInscritos.push(curso.nome);
        }
    });

    alunos.push(aluno);
    res.redirect('/alunos');
});

app.post('/alunos/delete/:nome', (req, res) => {
    const nome = req.params.nome;
    alunos = alunos.filter(aluno => aluno.nome !== nome);
    res.redirect('/alunos');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
