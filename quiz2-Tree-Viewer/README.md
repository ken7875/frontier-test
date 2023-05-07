# 第二題測驗(Nested Key-Value Pair Tree Viewer)

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
2. 在樹狀資料結構處理上花了蠻長一段時間的(大概花了1天半時間)，原本想直接用 object 做掉，但是遇到每輸入一個字就新增一個key的問題
>>>後來是將 input 輸入的值用 array 形式保存，再將 array 轉換為 object 樹狀結構。
