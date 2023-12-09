[![Actions Status](https://github.com/MBelinskaya/frontend-project-46/workflows/hexlet-check.yml/badge.svg)](https://github.com/MBelinskaya/frontend-project-46/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/1227e61f11e6708369a5/maintainability)](https://codeclimate.com/github/MBelinskaya/frontend-project-46/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/1227e61f11e6708369a5/test_coverage)](https://codeclimate.com/github/MBelinskaya/frontend-project-46/test_coverage)

# Difference Calculator

### About
Difference Calculator is a program that determines the difference between two data structures

**Utility features**:

- Support of different input formats: yaml, json
- Report generation in plain, stylish and json formats

<div align="center">
  <img src="https://media.giphy.com/media/gCeh1KDeDaxGu8no4A/giphy.gif" width="500"/>
</div>

---

### How to use
1. Install [node.js](https://nodejs.org/en). Use the instructions on the website
2. Copy the repository to your computer using git clone:
```
git clone git@github.com:MBelinskaya/frontend-project-46.git
```
3. To start using this project, copy and paste the following commands into the command line
```
npm ci
```
```
npm link
```
4. Run utility: write in the console `gendiff *format* *file 1* *file 2*`  
#### Example:  
- stylish format  
`gendiff filepath1.json filepath2.json`

- plain format  
`gendiff --format plain filepath1.yml filepath2.yml`  

- json format  
`gendiff --format json filepath1.json filepath2.json`

---

### Demonstration
stylish format:
`
gendiff file1.json file2.json
`

[![asciicast](https://asciinema.org/a/EOjsvO6dkLu8imMz7aMR6JA7d.svg)](https://asciinema.org/a/EOjsvO6dkLu8imMz7aMR6JA7d)

stylish format:
`
gendiff filepath1.yml filepath2.yml
`

[![asciicast](https://asciinema.org/a/YsAjqouHL9XGIVXXyq2PdevdT.svg)](https://asciinema.org/a/YsAjqouHL9XGIVXXyq2PdevdT)

plain format:
`
gendiff --format plain filepath1.json filepath2.json
`

[![asciicast](https://asciinema.org/a/hLNMK7awJdVF6mKVeiyVYXDAu.svg)](https://asciinema.org/a/hLNMK7awJdVF6mKVeiyVYXDAu)

json format:
`gendiff --format json filepath1.json filepath2.json
`

[![asciicast](https://asciinema.org/a/J6cEWaWSJi4yCBdgtmE2qgEIA.svg)](https://asciinema.org/a/J6cEWaWSJi4yCBdgtmE2qgEIA)
