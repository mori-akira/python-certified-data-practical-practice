## エクスポートしたHTMLファイルの加工手順

### スタイルシート
`head` タグのどこかに追加
```html
  <link rel="stylesheet" href="../asset/style.css">
  <link rel="stylesheet" href="../asset/masked-block.css">
  <link rel="stylesheet" href="../asset/hide-output-are.css">
```

### スクリプト
`body` タグの末尾に追加
```html
  <script
    src="https://code.jquery.com/jquery-3.7.1.min.js"
    integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
    crossorigin="anonymous"
  ></script>
  <script src="../asset/masked-block.js"></script>
  <script src="../asset/hide-output-area.js"></script>
```
