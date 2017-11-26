'use strict';

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardsCount = 4;

function getRandomIndex(min, max) {
  var randomIndex = Math.floor(min - 0.5 + Math.random() * (max - min + 1));
  return randomIndex;
}

function getData(arr) {
  return arr[getRandomIndex(0, arr.length - 1)];
}

function getUnique(arr, startIndex) {
  var index = getRandomIndex(startIndex, arr.length - 1);
  var tmp = arr[index];
  arr[index] = arr[startIndex];
  arr[startIndex] = tmp;
  return tmp;
}

var fullNames = [];
for (var i = 0; i < wizardsCount; i++) {
  fullNames.push(getUnique(firstNames, i) + ' ' + getUnique(surNames, i));
}

var wizards = [];
for (var j = 0; j < wizardsCount; j++) {
  wizards[j] = {
    name: fullNames[j],
    coatColor: getData(coatColors),
    eyesColor: getData(eyesColors)};
}

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarList = document.querySelector('.setup-similar-list');
document.querySelector('.setup-similar').classList.remove('hidden');

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}
var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarList.appendChild(fragment);
