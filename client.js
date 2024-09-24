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
    
    
    let token = await getToken();
    let exs = await getExs(token);
    let options = getOptions(token);
    console.log(`Fazendo ${Object.keys(exs).length} Exercicios...`);
    
    Ex1(exs, options);
    Ex2(exs, options);
    Ex3(exs, options);
    Ex4(exs, options);
    Ex5(exs, options);
    Ex6(exs, options);
    Ex7(exs, options);
    Ex8(exs, options);
    Ex9(exs, options);
    Ex10(exs, options);
    Ex11(exs, options);
    Ex12(exs, options);
    Ex13(exs, options);
    Ex14(exs, options);
    Ex15(exs, options);
    Ex16(exs, options);

    };

const postExs = (slug, resp, options, num) => {
    const response = axios
    .post(`https://tecweb-js.insper-comp.com.br/exercicio/${slug}`, {"resposta": resp}, options)
    .then((response) => console.log(`Ex${num}: ${response.data.sucesso}`))
    };

const Ex1 = (exs, options) => {

    const slug = Object.keys(exs)[0];
    const entrada = Object.values(exs[slug]["entrada"]);

    let resp = entrada.reduce((a, b) => a + b, 0);
    
    postExs(slug, resp, options, 1); 

    }; 

const Ex2 = (exs, options) => {

    const slug = Object.keys(exs)[1];
    const entrada = Object.values(exs[slug]["entrada"]);

    let resp = entrada[0].length;
    postExs(slug, resp, options, 2);
    };

const Ex3 = (exs, options) => {
    
    const slug = Object.keys(exs)[2];
    const entrada = Object.values(exs[slug]["entrada"]);

    let resp = entrada[0].split("@")[0];
    postExs(slug, resp, options, 3);
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

    postExs(slug, resp, options, 4);

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

    // console.log(slug);
    // console.log(exs[slug]);
    // console.log(ano);
    // console.log(resp);

    // url = `https://tecweb-js.insper-comp.com.br/exercicio/${slug}`;
    // console.log(url);

    postExs(slug, resp, options, 5);
    };

const Ex6 = (exs, options) => {
    const slug = Object.keys(exs)[5];
    const entrada = Object.values(exs[slug]["entrada"]);

    let resp = Math.round(Math.PI * (entrada[0]**2) * entrada[1]);

    postExs(slug, resp, options, 6);
    };

const Ex7 = (exs, options) => {
    const slug = Object.keys(exs)[6];
    const entrada = Object.values(exs[slug]["entrada"]);

    let s0 = entrada[0];
    let v = entrada[1];
    let t = entrada[2];
    let resp = s0 + v*t;

    postExs(slug, resp, options, 7);
    };

const Ex8 = (exs, options) => {
    const slug = Object.keys(exs)[7];
    const entrada = Object.values(exs[slug]["entrada"]);
    
    let resp = entrada[0].split("").reverse().join("");

    postExs(slug, resp, options, 8);
    };

const Ex9 = (exs, options) => {
    const slug = Object.keys(exs)[8];
    const entrada = Object.values(exs[slug]["entrada"]);

    let resp = Object.values(entrada[0]).reduce((a,b) => a + b, 0);

    postExs(slug, resp, options, 9);
    };

const Ex10 = (exs, options) => {
    const slug = Object.keys(exs)[9];
    const entrada = Object.values(exs[slug]["entrada"]);
    
    function ePrimo(num) {
        if (num <= 1) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    }
    
    function encontraPrimo(n) {
        let count = 0;
        let num = 1;
        
        while (count < n) {
            num++;
            if (ePrimo(num)) {
                count++;
            }
        }
        
        return num;
    }

    postExs(slug, encontraPrimo(entrada[0]), options, 10);
    };   

const Ex11 = (exs, options) => {
    const slug = Object.keys(exs)[10];
    const entrada = Object.values(exs[slug]["entrada"]);

    function achaPrefixo(str1, str2) {
        let prefixo = '';
        let lenth = Math.min(str1.length, str2.length);
        
        for (let i = 0; i < lenth; i++) {
            if (str1[i] === str2[i]) {
                prefixo += str1[i];
            } else {
                break;
            }
        }
        
        return prefixo;
    };

    function maiorPrefixo(strings) {
        let maior_prefixo = '';
    
        for (let i = 0; i < strings.length; i++) {
            for (let j = i + 1; j < strings.length; j++) {
                let prefixo = achaPrefixo(strings[i], strings[j]);
                if (prefixo.length > maior_prefixo.length) {
                    maior_prefixo = prefixo;
                }
            }
        } return maior_prefixo;
    }

    postExs(slug, maiorPrefixo(entrada[0]), options, 11);
    };

const Ex12 = (exs, options) => {
    const slug = Object.keys(exs)[11];
    const entrada = Object.values(exs[slug]["entrada"]);

    function achaSegundoMaior(array) {
        let maior = array[0];
        let segundo_maior = array[0];
        
        for (let i = 1; i < array.length; i++) {
            if (array[i] > maior) {
                segundo_maior = maior;
                maior = array[i];
            } else if (array[i] > segundo_maior && array[i] < maior) {
                segundo_maior = array[i];
            }
        }
        
        return segundo_maior;
    };

    function achaSegundoMenor(array) {
        let menor = array[0];
        let segundo_menor = array[0];
        
        for (let i = 1; i < array.length; i++) {
            if (array[i] < menor) {
                segundo_menor = menor;
                menor = array[i];
            } else if (array[i] < segundo_menor && array[i] > menor) {
                segundo_menor = array[i];
            }
        }
        
        return segundo_menor;
    };

    let resp = achaSegundoMaior(entrada[0]) + achaSegundoMenor(entrada[0]);

    postExs(slug, resp, options, 12);
    };

const Ex13 = (exs, options) => {
    const slug = Object.keys(exs)[12];
    const entrada = Object.values(exs[slug]["entrada"]);

    let resp = 0;
    for (i = 0; i < entrada[0].length; i++) {
        if (entrada[0][i] === entrada[0][i].split("").reverse().join("")) { resp++; }
    }   
    
    postExs(slug, resp, options, 13);
    };

const Ex14 = (exs, options) => {
    const slug = Object.keys(exs)[13];
    const entrada = Object.values(exs[slug]["entrada"]);

    let resp = entrada[0].map((x) => x * 1).reduce((a,b) => a + b, 0);  
    
    postExs(slug, resp, options, 14);
    };

const getResponse = async (url, options) => {
    const response = await axios.get(url, options);
    return response.data;
    };

const Ex15 = (exs, options) => {
    const slug = Object.keys(exs)[14];
    const entrada = Object.values(exs[slug]["entrada"]);

    let resp_list = [];

    for (let i = 0; i < entrada[0].length; i++) {
        resp_list.push(getResponse(entrada[0][i], options));
    }

    Promise.all(resp_list).then((list) => { 
        resp = list.reduce((a,b) => a + b, 0);
        postExs(slug, resp, options, 15);
     });

    
    };

const Ex16 = async (exs, options) => {
    const slug = Object.keys(exs)[15];
    const entrada = Object.values(exs[slug]["entrada"]);

    let inicio = entrada[0]
    let resp = await getResponse(inicio, options);

    while (typeof resp === 'string') {
        resp = await getResponse(resp, options);
        console.log(resp);
    }
    
    postExs(slug, resp, options, 16);
    };
    
rodaExs();