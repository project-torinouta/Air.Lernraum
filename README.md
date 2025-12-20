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
4. Run `npx lernraum init` and type your name.