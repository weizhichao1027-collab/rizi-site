# 日子 / Days 三站

官网、隐私政策、技术支持的静态页。App 内链接已经指向 GitHub Pages，**不要改路径**。

## 线上 URL（保持不变）

- 官网: https://weizhichao1027-collab.github.io/rizi-site/
- 隐私政策: https://weizhichao1027-collab.github.io/rizi-site/privacy.html
- 技术支持: https://weizhichao1027-collab.github.io/rizi-site/support.html
- 使用条款: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/（Apple 标准 EULA，不自建）

## 本地打开

在本目录启动静态服务器（不要直接用 `file://`，语言包 `fetch` 需要 http）：

```bash
cd "文案/三站"
python3 -m http.server 4173
```

然后打开：

- http://127.0.0.1:4173/
- http://127.0.0.1:4173/privacy.html
- http://127.0.0.1:4173/support.html

语言：`?lang=en`、`?lang=zh-Hans`、`?lang=ja` 等。选择器覆盖 App 的 13 种语言。完整译文：简体中文、繁体中文、English、日本語；其余语言缺键时回退到 English。

## 部署

把本目录内容同步到仓库 `weizhichao1027-collab/rizi-site` 的 `main` 分支，GitHub Pages 源为该分支根目录。

上架后把 `site.js` 里的 `STORE_URL` 改成 App Store 链接。账号里已有 Apple ID `6812138730`，拟定地址：

`https://apps.apple.com/app/id6812138730`

在确认商店页可打开之前，按钮保持「即将上架」。

## 不要写错的事实

- Pro 是非消耗型买断 `com.rizi.pro.themes`，**不是订阅**，没有订阅组。App Store 已开启家人共享。
- 恢复购买：设置或「升级 Pro」→「恢复购买」，同一 Apple ID；可对照 Apple 购买记录。
- 不要把「取消订阅」写成日子的主路径。
- 隐私以代码为准：无账号、无云同步、无分析 / 广告 / AI / ATT；本机 UserDefaults（CA92.1）与文件时间戳（C617.1）。
