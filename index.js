require('dotenv').config()
const express = require("express");
const app = express();
const biblia = require("biblia.js");
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo').locale('br')
const horagora = () => moment.tz('America/Sao_Paulo').format('HH:mm:ss')

const { util, dow, atalhos } = require("./functions");

// Setando como json
app.use(express.json());
app.listen(process.env.PORT || 5000);
app.use(express.static("public"));
console.log(`[${horagora()}] Start code`)

app.get("/online", (req, res) => {
  res.status(200).json({ status: 200 })
});

app.get("/ytsearh", async (req, res) => {
  try {
    console.log(`[${horagora()}] caminho: /ytsearh`)
    const p = req.query.p;
    if (!p) return res.status(400).json({ status: 400, message: "Adicione um título." });
    const play1 = await util.ytSr(p, true)
    if (play1 === undefined) return res.status(400).json({ status: 400, message: "Nenhum resultado encontrado." });
    res.status(200).json({
      status: 200,
      Pedido: p,
      result: play1,
    });
  } catch (error) {
    console.log("API ERROR:", error);
    res.json({ status: false });
  }
});

app.get("/biblia", (req, res) => {
  console.log(`[${horagora()}] caminho: /biblia`)
  res.status(400).json({ status: 400, message: "Parâmetros incorretos." });
});

app.get("/biblia/randomcapitulo", (req, res) => {
  console.log(`[${horagora()}] caminho: /biblia/randomcapitulo`)
  res.status(200).json({
    status: 200,
    pedido: "randomcapitulo",
    result: biblia.getRandomCapitulo()
  });
});

app.get("/biblia/randomversiculo", (req, res) => {
  console.log(`[${horagora()}] caminho: /biblia/randomversiculo`)
  res.status(200).json({
    status: 200,
    pedido: "randomversiculo",
    result: biblia.getRandomVersiculo()
  });
});

app.get("/biblia/getcapitulo", (req, res) => {
  console.log(`[${horagora()}] caminho: /biblia/getcapitulo`)
  const livro = req.query.livro;
  const capitulo = req.query.ca;
  const isArray = req.query.array;
  if (!livro || !capitulo) return res.status(400).json({ status: 400, message: "Parâmetros incorretos." });
  res.status(200).json({
    status: 200,
    pedido: livro + capitulo,
    result: biblia.getCapitulo(livro, capitulo, isArray)
  });
});

app.get("/biblia/getversiculo", (req, res) => {
  console.log(`[${horagora()}] caminho: /biblia/getversiculo`)
  const livro = req.query.livro;
  const versiculo = req.query.vs;
  if (!livro || !versiculo) return res.status(400).json({ status: 400, message: "Parâmetros incorretos." });
  res.status(200).json({
    status: 200,
    pedido: livro + versiculo,
    result: biblia.getVersiculo(livro, versiculo)
  });
});

app.get("/biblia/pesquisarpalavraarray", async (req, res) => {
  console.log(`[${horagora()}] caminho: /biblia/pesquisarpalavraarray`)
  const palavra = req.query.palavra;
  if (!palavra) return res.status(400).json({ status: 400, message: "Parâmetros incorretos." });
  try {
    res.status(200).json({
      status: 200,
      pedido: palavra,
      result: await biblia.pesquisarPalavra(palavra)
    });
  } catch (e) {
    console.log(e.message)
    res.status(500).json({
      status: 500,
      pedido: palavra,
      result: []
    })
  }
});

app.get("/biblia/pesquisarpalavra", async (req, res) => {
  console.log(`[${horagora()}] caminho: /biblia/pesquisarpalavra`)
  const palavra = req.query.palavra;
  if (!palavra) return res.status(400).json({ status: 400, message: "Parâmetros incorretos." });
  try {
    res.status(200).json({
      status: 200,
      pedido: palavra,
      result: await biblia.pesquisar(palavra)
    });
  } catch (e) {
    console.log(e.message)
    res.status(500).json({
      status: 500,
      pedido: palavra,
      result: []
    })
  }
});

app.get("/meme", (req, res) => {
  console.log(`[${horagora()}] caminho: /meme`)
  res.status(200).json({
    status: 200,
    pedido: 'Memes aleatórios',
    result: util.randonAtalho(atalhos.memes)
  })
});

app.get("/vibe", (req, res) => {
  console.log(`[${horagora()}] caminho: /vibe`)
  res.status(200).json({
    status: 200,
    pedido: 'Vibes aleatórias',
    result: util.randonAtalho(atalhos.vibesV)
  })
});

app.get("/eununca", (req, res) => {
  console.log(`[${horagora()}] caminho: /eununca`)
  res.status(200).json({
    status: 200,
    pedido: 'Eu nunca',
    result: util.randonAtalho(atalhos.eununca)
  })
});

app.get("/eusou", (req, res) => {
  console.log(`[${horagora()}] caminho: /eusou`)
  res.status(200).json({
    status: 200,
    pedido: 'Eu sou',
    result: 'Você é ' + util.randonAtalho(atalhos.eusou)
  })
});

app.get("/cancelado", (req, res) => {
  console.log(`[${horagora()}] caminho: /cancelado`)
  res.status(200).json({
    status: 200,
    pedido: 'Cancelado',
    result: 'Você foi cancelado por ' + util.randonAtalho(atalhos.cancelado)
  })
});
