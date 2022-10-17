"use strict";

// Tools script
var i = document.getElementById.bind(document);
var q = document.querySelector.bind(document);
var qt = document.querySelectorAll.bind(document); // Get started

var startBtn = i('start-btn');
var welcome = q('.welcome');
startBtn.addEventListener('click', function () {
  welcome.classList.add('up');
}); // Steps list

var toggleStepsBtn = i('toggle-steps');
var stepsMenu = q('.steps-list');
toggleStepsBtn.addEventListener('click', toggleStepsMenu);

function toggleStepsMenu() {
  var cl = 'hidden-mobile';

  if (stepsMenu.classList.contains(cl)) {
    stepsMenu.classList.remove(cl);
  } else stepsMenu.classList.add(cl);
} // Inputs Validation


var objValidation = {
  name: /^[a-z]{3,}/i,
  email: /^\w+@\w+\.\w{2,}$/,
  phone: /^\+?\d+ ?\d{9,}$/,
  password: /[0-9A-za-z]{8,}/,
  bio: /[^\s]/,
  skill: /[^\s]/
}; // Remove validation msg when we focus an input

var inpWithValidation = qt('[data-type]');
inpWithValidation.forEach(function (inp) {
  inp.addEventListener('focus', function () {
    this.parentElement.lastElementChild.classList.add('hidden');
  }); // Add check icon to the input

  inp.addEventListener('input', function () {
    var vald = objValidation[inp.dataset.type];

    if (vald && this.tagName === 'INPUT') {
      var nextEl = this.nextElementSibling;

      if (vald.test(this.value)) {
        nextEl.classList.remove('hidden');
      } else nextEl.classList.add('hidden');
    }
  });
});

function isURL(strng) {
  // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
  var reg = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;
  return reg.test(strng);
} // See profil section


var seeProfilSection = q('.see-profil');
var seeProfilbtn = i('see-profil-btn');
seeProfilbtn.addEventListener('click', function () {
  return seeProfilSection.classList.add('up');
});