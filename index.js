const express = require("express");
const app = express();
const yts = require("yt-search");
const biblia = require("biblia.js");

const { dow } = require("./functions");

// Setando como json
app.use(express.json());
app.listen(5000);
console.log("start");
app.use(express.static("public"));

app.get("/play", async (req, res) => {
  try {
    const p = req.query.p;
    if (!p) return res.json({ status: false, message: "Coloque o título da música." });
    const play2 = await yts(p);
    const filtro = play2.all.filter((result) => result?.timestamp?.replace(/[^0-9]/g, "") <= 2500 && result?.timestamp?.replace(/[^0-9]/g, "") !== 000);
    if (!filtro.length) return res.json({ status: false, message: "Nenhum resultado encontrado." });
    const play1 = filtro[Math.floor(Math.random() * 3)];
    res.json({
      status: true,
      Pedido: p,
      result: await dow.ytDown(play1.url),
    });
  } catch (error) {
    console.log("API ERROR:", error);
    res.json({ status: false });
  }
});

app.get("/playurl", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({ status: false, message: "Adicione a url" });
  res.json({
    status: true,
    Pedido: url,
    result: await dow.ytDown(url),
  });
});

app.get("/yturl", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({ status: false, message: "Adicione a url" });
  res.json({
    status: true,
    Pedido: url,
    result: await dow.ytDown(url, true),
  });
});

app.get("/biblia", (req, res) => {
  res.json({ status: false });
});

app.get("/biblia/randomcapitulo", (req, res) => {
  res.json(biblia.getRandomCapitulo());
});

app.get("/biblia/randomversiculo", (req, res) => {
  res.json(biblia.getRandomVersiculo());
});

app.get("/biblia/getcapitulo", (req, res) => {
  const livro = req.query.livro;
  const capitulo = req.query.ca;
  const isArray = req.query.array;
  if (!livro || !capitulo) return res.json({ status: false, message: "Parâmetros incorretos." });
  res.json(biblia.getCapitulo(livro, capitulo, isArray));
});

app.get("/biblia/getversiculo", (req, res) => {
  const livro = req.query.livro;
  const versiculo = req.query.vs;
  if (!livro || !versiculo) return res.json({ status: false, message: "Parâmetros incorretos." });
  res.json(biblia.getVersiculo(livro, versiculo));
});

app.get("/biblia/pesquisar", (req, res) => {
  const palavra = req.query.palavra;
  if (!palavra) return res.json({ status: false, message: "Parâmetros incorretos." });
  res.json(biblia.pesquisar(palavra));
});

app.get("/biblia/pesquisararray", (req, res) => {
  const palavra = req.query.palavra;
  if (!palavra) return res.json({ status: false, message: "Parâmetros incorretos." });
  res.json(biblia.pesquisarPalavra(palavra));
});
