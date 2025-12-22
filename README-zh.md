---
title: 欢迎来到 🐦 Lernraum！
---

## 🐦 什么是 Lernraum

Lernraum 是一个用于存放项目参与者**每周报告**的简洁仓库，并支持**自动定时部署**。
它会将不同参与者的周报合并为一个站点，并使用
[Quartz](https://github.com/jackyzha0/quartz) 进行部署。

## 🛸 如何使用

1. 首先请确保你的操作系统中已经安装了 `npm` 和 `git`。
2. 克隆本仓库的 `template` 分支（这里假设你已经是该仓库的维护者；
  否则你需要先将 `template` 分支 fork 到你自己的仓库中）。

  ```shell
  git clone -b template git@github.com:project-torinouta/Air.Lernraum.git
  ````

3. 运行 `npm install` 以安装并解析依赖。
4. 运行 `npx lernraum init` 并输入你的名字。该命令会创建一个名为
  `<username>` 的新分支，其中 `<username>` 是你输入的名字。
  同时，它还会在 `content` 目录下创建一个名为 `<username>` 的新目录，
  并将用户名写入 `.profile.json`。
5. 完成第 4 步后，你可以运行 `npx lernraum new` 在你自己的分支中创建一篇新的
  周报文件。接下来你就可以编辑它，撰写属于你自己的每周报告了！
6. 当你完成周报后，可以运行 `npx lernraum push` 将周报推送到仓库中
  （不用担心 commit message，这一步会被妥善处理 ~）。