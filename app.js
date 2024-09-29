const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// EJSをテンプレートエンジンとして設定
app.set('view engine', 'ejs');

// 静的ファイル（CSSなど）を提供
app.use(express.static('public'));

// アップロードされたファイルを保存する設定
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // ファイルの保存場所
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // タイムスタンプを付けたファイル名
    }
});

const upload = multer({ storage: storage });

// HTMLページを表示する
app.get('/', (req, res) => {
    res.render('index'); // index.ejsをレンダリング
});

// ファイルのアップロードを処理
app.post('/register', upload.single('shapeFile'), (req, res) => {
    const shapeName = req.body.shapeName;
    const shapeFile = req.file.filename;

    console.log(`図形名: ${shapeName}, ファイル: ${shapeFile}`);
    res.send('図形が登録されました。');
});

// サーバーを起動する
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
