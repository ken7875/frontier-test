# frontier-test

## Customize configuration

Demo網址 [https://playful-moonbeam-d23dcd.netlify.app/](https://playful-moonbeam-d23dcd.netlify.app/).

## Project Setup

```sh
npm install
```

### 本地開發(開啟專案)指令

```sh
npm run dev
```

### 打包正式環境指令

```sh
npm run build
```

## 該專案遇到的問題
1. 之前沒有使用 pug 開發的經驗，所以在 linter 配置上遇到一些問題。
2. 有嘗試分別獲取資料(不一次請求大量資料)，但沒成功，因為會無法紀錄最愛資料。
3. 遇到無法直接在 pug 上使用 typescript 語法問題。