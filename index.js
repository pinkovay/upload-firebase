const express = require('express');


// Importando e inicializando o firebase;
const { initializeApp } = require('firebase/app')


// Importação dos pacotes do firebase;
const {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytes,
    listAll,
    deletedObject
} = require('firebase/storage');


// IMPORTAÇÃO DO MULTER
const multer = require('multer');


// Iniciando app a partir do express;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* DADOS DE CONEXÃO COM O FIREBASE*/
const firebaseConfig = {
    apiKey: "AIzaSyBNFsOx34whDOVG79Rj_84BgfJBrDTqSGQ",
    authDomain: "upload-nodejs-81b8a.firebaseapp.com",
    projectId: "upload-nodejs-81b8a",
    storageBucket: "upload-nodejs-81b8a.appspot.com",
    messagingSenderId: "680308757143",
    appId: "1:680308757143:web:b713976a1cee6544f30fd2",
    measurementId: "G-3V2G3Q4ZZB"
};


// INICIALIZAR O FIREBASE;
const firebaseApp = initializeApp(firebaseConfig);


// CONECTANDO COM O STORAGE;
const storage = getStorage(firebaseApp);


// COMUNICAÇÃO DO MULTER;

// TIPOS DE ARQUIVOS PERMITIDOS;
const fileFilter = (req, file, cb) => {
    // Verificando se os tipos da imagem correspondem ao permitido pela aplicação.
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // callback
        cb(null, true);
    } else {
        cb(null, false)
    }
};


// DEFINIÇÃO DE USO DO MULTER
const upload = multer({
    // ONDE O ARQUIVO SERÁ GUARDADO ENQUANTO ESTIVER SENDO MANIPULADO;
    storage: multer.memoryStorage(),
    // Limitando a 5mb de dados disponiveis para envio de cada unidade (fotos).
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: fileFilter
});

// ROTA DE TESTE DE CONEXÃO COM O FIREBASE
app.get('/testeFirebase', () => {
    console.log("DADOS DE CONFIG");
    console.log(firebaseConfig);
    console.log("DADOS DE CONEXÃO COM O FIREBASE");
    console.log(firebaseApp);
    console.log("DADOS DE CONEXÃO COM O STORAGE");
    console.log(storage);
})


// ROTA DE UPLOAD PARA O FIREBASE "STORAGE";
// upload (multer) neste caso é um middleware, ou seja, está entre a rota e o resultado
app.post('/upload', upload.single('file'), (req, res) => {


    // TESTANDO SE A IMAGEM ESTÁ CHEGANDO
    // console.log(req.file);


    // Definindo nome único para as imagens
    const fileName = Date.now().toString() + '-' + req.file.originalname


    // CONFIGURA A REFERÊNCIA DE STORAGE E ARQUIVO (ONDE E QUEM VAI SER ARMAZENADO);
    const fileRef = ref(storage, fileName)


    // PROCESSO DE UPLOADO PARA O FIREBASE
    uploadBytes(fileRef, req.file.buffer)
        .then((snapshot)=>{

            console.log("SNAPSHOT:");
            console.log(snapshot);

            res.status(200).json({
                "MSG":"UPLOAD OK"
            });

        })
        .catch((storage)=>{
            res.status(500).json({
                "ERRO":error
            })
        });

});


app.listen(gateway = 3000, () => {
    console.log(`Rodando na porta localhost:${gateway}`)
});