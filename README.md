# Mochiling

In order to run Mochiling in your computer:

- Follow this [guide](https://gorails.com/setup/osx/10.12-sierra) for installing all necessary components:
  - Homebrew
  - Ruby (`ruby 2.2.2p95` if possible)
  - Git
  - Rails
  - Node (`0.10.46`)

- Install bundler:
```
gem install bundler
```
- Install ruby dependencies:
```
bundle install
```
- Install node dependencies:
```
npm install
```
- Install grunt:
```
npm install -g grunt-cli
```
- Ready to see the webpage:
```
grunt serve
```
- Install [Atom](https://atom.io/) editor for editing things.

- Do you want to publish it?:
```
grunt publish
```