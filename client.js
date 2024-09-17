const axios = require("axios");

const getOptions = (token) => ({
    headers: {"Content-Type": "application/json", "Accept": "application/json", "Authorization": `Bearer ${token}`}
    });

const getToken = async () => {
      const options = { "Content-Type": "application/json", "Accept": "application/json" };
      const response = await axios.post("https://tecweb-js.insper-comp.com.br/token", { username: "henriquebps"}, options);
      return response.data.accessToken;
    };

const getExs = async (token) => {
    const options = getOptions(token);

    const response = await axios.get("https://tecweb-js.insper-comp.com.br/exercicio", options);
    return response.data
    };

const rodaExs = async () => {
    
    
    const token = await getToken();
    const exs = await getExs(token);
    const options = getOptions(token);
    console.log(`Fazendo ${Object.keys(exs).length} Exercicios...`);
    
    Ex1(exs, options);
    Ex2(exs, options);
    Ex3(exs, options);
    Ex4(exs, options);
    Ex5(exs, options);
    
    };

const Ex1 = (exs, options) => {

    const slug = Object.keys(exs)[0];
    const entrada = Object.values(exs[slug]["entrada"]);

    let resp = entrada.reduce((a, b) => a + b, 0);
    
    const response = axios
      .post(`https://tecweb-js.insper-comp.com.br/exercicio/${slug}`, {"resposta": `${resp}`}, options)
      .then((response) => console.log(`Ex1: ${response.data.sucesso}`))
    };  

const Ex2 = (exs, options) => {

    const slug = Object.keys(exs)[1];
    const entrada = Object.values(exs[slug]["entrada"]);

    let resp = entrada[0].length;
    const response = axios
      .post(`https://tecweb-js.insper-comp.com.br/exercicio/${slug}`, {"resposta": `${resp}`}, options)
      .then((response) => console.log(`Ex2: ${response.data.sucesso}`))
    };

const Ex3 = (exs, options) => {
    
    const slug = Object.keys(exs)[2];
    const entrada = Object.values(exs[slug]["entrada"]);

    let resp = entrada[0].split("@")[0];
    const response = axios
    .post(`https://tecweb-js.insper-comp.com.br/exercicio/${slug}`, {"resposta": `${resp}`}, options)
    .then((response) => console.log(`Ex3: ${response.data.sucesso}`))
    };

const Ex4 = (exs, options) => {

    const slug = Object.keys(exs)[3];
    const entrada = exs[slug]["entrada"];

    let v = entrada['v'];
    let theta = entrada['theta'];

    let dist = (v**2 * Math.sin(2 * (theta * Math.PI/180))) / 9.8;

    if (dist == 100) {
        resp = 0;
    } else if (dist < 100) {
        resp = -1;
    } else {
        resp = 1;
    }


    const response = axios
    .post(`https://tecweb-js.insper-comp.com.br/exercicio/${slug}`, {"resposta": `${resp}`}, options)
    .then((response) => console.log(`Ex4: ${response.data.sucesso}`))
    };

const Ex5 = (exs, options) => {

    const slug = Object.keys(exs)[4];
    const ano = exs[slug]["entrada"]["ano"];

    let resp = false;
    if (ano % 4 == 0){
        if (ano % 100 == 0){
            if (ano % 400 == 0){
                resp = true;
            }
        }
        else{
            resp = true;
        }
    }

    console.log(slug);
    console.log(ano);
    console.log(resp);

    url = `https://tecweb-js.insper-comp.com.br/exercicio/${slug}`;
    console.log(url);

    const response = axios
    .post(url, {"resposta": `${resp}`}, options)
    .then((response) => console.log(`Ex5: ${response.data.sucesso}`))
    };

    
rodaExs();