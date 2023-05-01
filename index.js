require('dotenv').config()
const express = require("express");
const app = express();
const biblia = require("biblia.js");

const { util, dow } = require("./functions");

// Setando como json
app.use(express.json());
app.listen(process.env.PORT || 5000);
app.use(express.static("public"));

app.get("/ytsearh", async (req, res) => {
  try {
    const p = req.query.p;
    if (!p) return res.json({ status: 400, message: "Adicione um título." });
    const play1 = await util.ytSr(p, true)
    if (play1 === undefined) return res.json({ status: 400, message: "Nenhum resultado encontrado." });
    res.json({
      status: 200,
      Pedido: p,
      result: play1,
    });
  } catch (error) {
    console.log("API ERROR:", error);
    res.json({ status: false });
  }
});

app.get("/play", async (req, res) => {
  try {
    const p = req.query.p;
    if (!p) return res.json({ status: 400, message: "Coloque o título da música." });
    const play1 = await util.ytSr(p)
    if (play1 === undefined) return res.json({ status: 400, message: "Nenhum resultado encontrado." });
    const audio = await util.ytDown(play1.url)
    if (audio === undefined) return res.json({ status: false })
    res.json({
      status: 200,
      Pedido: p,
      result: audio,
    });
  } catch (error) {
    console.log("API ERROR:", error);
    res.json({ status: false });
  }
});

app.get("/playurl", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({ status: 400, message: "Adicione a url" });
  const audio = await util.ytDown(url)
  if (audio === undefined) return res.json({ status: false })
  res.json({
    status: 200,
    Pedido: url,
    result: audio,
  });
});

app.get("/yturl", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({ status: 400, message: "Adicione a url" });
  const video = await util.ytDown(url, true)
  if (video === undefined) return res.json({ status: false })
  res.json({
    status: 200,
    Pedido: url,
    result: video,
  });
});

app.get("/biblia", (req, res) => {
  res.json({ status: 400 });
});

app.get("/biblia/randomcapitulo", (req, res) => {
  res.json({
    status: 200,
    pedido: "randomcapitulo",
    result: biblia.getRandomCapitulo()
  });
});

app.get("/biblia/randomversiculo", (req, res) => {
  res.json({
    status: 200,
    pedido: "randomversiculo",
    result: biblia.getRandomVersiculo()
  });
});

app.get("/biblia/getcapitulo", (req, res) => {
  const livro = req.query.livro;
  const capitulo = req.query.ca;
  const isArray = req.query.array;
  if (!livro || !capitulo) return res.json({ status: 400, message: "Parâmetros incorretos." });
  res.json({
    status: 200,
    pedido: livro + capitulo,
    result: biblia.getCapitulo(livro, capitulo, isArray)
  });
});

app.get("/biblia/getversiculo", (req, res) => {
  const livro = req.query.livro;
  const versiculo = req.query.vs;
  if (!livro || !versiculo) return res.json({ status: 400, message: "Parâmetros incorretos." });
  res.json({
    status: 200,
    pedido: livro + versiculo,
    result: biblia.getVersiculo(livro, versiculo)
  });
});

app.get("/biblia/pesquisar", (req, res) => {
  const palavra = req.query.palavra;
  if (!palavra) return res.json({ status: 400, message: "Parâmetros incorretos." });
  res.json({
    status: 200,
    pedido: palavra,
    result: biblia.pesquisar(palavra)
  });
});

app.get("/biblia/pesquisararray", (req, res) => {
  const palavra = req.query.palavra;
  if (!palavra) return res.json({ status: 400, message: "Parâmetros incorretos." });
  res.json({
    status: 200,
    pedido: palavra,
    result: biblia.pesquisarPalavra(palavra)
  });
});
