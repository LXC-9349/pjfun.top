# PJfun 发布产物仓库

本仓库**只存放各平台安装包与更新清单**，不含源码。源码仓库为私有。

## 文件说明

- `latest.json` — Tauri updater 清单（桌面端自动更新，签名校验）
- `versions.json` — 全平台版本、下载地址、SHA256 与源码 commit 信息
- Releases — 实际安装包；按平台分 tag：`desktop-v<版本>`、`android-v<版本>`

## 说明

- iOS 不经此仓库分发（`.ipa` 无法从 GitHub 安装），走 TestFlight / App Store。
- 此前存放的网站/PWA 构建产物已清理，完整内容保留在 git 历史中（清理前 HEAD 为 c83498e8）。

