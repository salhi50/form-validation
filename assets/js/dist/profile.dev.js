"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* Profil Script */
var userAvatar = q('.user-avatar');
var username = q('.user-fullName');
var userCountry = q('.user-country');
var userBio = q('.user-bio');
var skillsContainer = q('.user-skills');
var passwordUser = q('.password-input');
var userEmail = i('user-email');
var userPhone = i('phone-number');
var togglePasswordIcon = i('toggle-pass');

function getProfil() {
  var _information = information,
      avatar = _information.avatar,
      password = _information.password,
      social = _information.social,
      _information$advanced = _information.advanced,
      bio = _information$advanced.bio,
      skills = _information$advanced.skills,
      _information$about = _information.about,
      firstName = _information$about.firstName,
      lastName = _information$about.lastName,
      country = _information$about.country,
      email = _information$about.email,
      phone = _information$about.phone;
  username.innerHTML = "".concat(firstName, " ").concat(lastName);
  userAvatar.setAttribute('src', avatar);
  userCountry.innerHTML = "From ".concat(country);
  userBio.innerHTML = bio;
  passwordUser.value = password;
  userPhone.innerHTML = phone;
  userEmail.innerHTML = email;
  createSkills(skills);
  createLinks(social);
}

function createSkills(skills) {
  var skillsArr = skills.split(',').map(function (e) {
    return e.trim();
  }).filter(function (e) {
    return e.trim() !== '';
  });
  skillsArr = _toConsumableArray(new Set(skillsArr));
  skillsContainer.innerHTML = '';

  for (var _i = 0; _i < skillsArr.length; _i++) {
    var li = document.createElement('li');
    li.classList.add('user-skill');
    li.innerHTML = skillsArr[_i];
    skillsContainer.appendChild(li);
  }
}

function createLinks(social) {
  var socialIcons = qt('.social-item');
  socialIcons.forEach(function (icon) {
    var name = icon.getAttribute('data-name');

    if (social[name]) {
      icon.classList.add('active');
      icon.parentElement.setAttribute('href', social[name]);
    }
  });
}

togglePasswordIcon.addEventListener('click', togglePassword);

function togglePassword() {
  if (passwordUser.type === 'password') {
    passwordUser.type = 'text';
  } else passwordUser.type = 'password';
}