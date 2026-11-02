# 跳跳環島

拿著手機跳起來，帶小人從台南走到台北，再沿東海岸走回台南。跳得愈高，走得愈快。

這是可以安裝到手機、離線遊玩的網頁遊戲（PWA），不需要建置工具。

## 上傳到 GitHub Pages

1. 在 GitHub 建立新的公開儲存庫，例如 `jump-around-taiwan`。
2. 點 **Add file > Upload files**，把這個資料夾裡的所有檔案拖進去，包含 `icons` 資料夾，然後按 **Commit changes**。
3. 到 **Settings > Pages**，**Source** 選 **Deploy from a branch**，分支選 `main`、資料夾選 `/ (root)`，按 **Save**。
4. 等一兩分鐘，遊戲網址會是 `https://你的帳號.github.io/jump-around-taiwan/`。

`index.html` 必須放在儲存庫最上層，不要多包一層資料夾。

## 安裝到手機

- **iPhone**：用 Safari 開啟網址，點分享，選「加入主畫面」。
- **Android**：用 Chrome 開啟網址，點開始畫面的「安裝到手機」，或從瀏覽器選單安裝。

## 更新遊戲

修改 `index.html` 後，把 `sw.js` 第一行附近的 `VERSION` 加一（例如 `v1` 改成 `v2`），再上傳。手機連上網開啟遊戲時會取得新版，有時要重開一次才會看到。

## 檔案說明

| 檔案 | 用途 |
| --- | --- |
| `index.html` | 遊戲本體 |
| `manifest.webmanifest` | App 名稱、圖示與顯示方式 |
| `sw.js` | 離線快取 |
| `icons/` | App 圖示 |
