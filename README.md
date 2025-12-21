## 🐦 What is Lernraum

Lernraum is a simple repository for storing weekly reports of project participants
with automatic scheduled deployment. It merges different weekly reports into one
and use [Quartz](https://github.com/jackyzha0/quartz) to deploy.

## 🛸 How to use

1. First ensure that you have installed `npm` and `git` in your operating system.
2. Clone branch `template` of this repository (it assumes that you are already
  the maintainer of this repository, otherwise you should fork the `template` 
  branch to your personal repository).

  ``` shell
  git clone -b template git@github.com:project-torinouta/Air.Lernraum.git
  ```

3. Run `npm install` to resolve dependencies.
4. Run `npx lernraum init` and type your name. This command will create a new
  branch named `<username>` where `<username>` is the name you typed. It will
  also crate a new directory named `<username>` under `content` and dump the
  username into `.profile.json`.
5. Once step 4 is executed, you can run `npx lernraum new` to create a new
  weekly report in your own branch. Then you can edit it, write your own weekly
  report!
6. If you complete the report, then you can run `npx lernraum push` to push report
  to the repo (don't be worry about commit message, it will be handled alright ~)