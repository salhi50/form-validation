"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* Form script */
// Steps control
var active = 0;
var information = {};
var stepsIcons = qt('.target-icon');
var progress = i('progress');
var nextBtns = qt('.next-btn');
var backBtns = qt('.back-btn');
var steps = qt('.step-content');
steps.forEach(function (e) {
  return e.classList.add('hidden');
});
steps[0].classList.remove('hidden');
updateSteps();
updateProgress();

function updateSteps() {
  stepsIcons.forEach(function (step, indx) {
    step.classList.remove('current', 'complete');
    if (indx < active) step.classList.add('complete');
  });
  stepsIcons[active].classList.add('current');
}

function updateProgress() {
  progress.className = '';
  progress.classList.add("dim-".concat(active));
} //
// Male female
//


var gender = qt('.gender');
gender[0].classList.add('active');
gender.forEach(function (e) {
  return e.addEventListener('click', updateGender);
});

function updateGender() {
  gender.forEach(function (e) {
    return e.classList.remove('active');
  });
  this.classList.add('active');
} //
// Next step
//


var step1Btn = i('step1-next-btn');
step1Btn.addEventListener('click', function () {
  step1Validation();
});

function getNextStep() {
  active++;

  if (active < 4) {
    updateProgress();
    updateSteps();
    steps.forEach(function (one) {
      return one.classList.remove('out', 'in');
    });
    var prev = steps[active - 1],
        next = steps[active];
    prev.classList.add('out');
    setTimeout(function () {
      q('main').scrollTo(0, 0);
      prev.classList.add('hidden');
      prev.classList.remove('out');
      next.classList.remove('hidden');
      next.classList.add('in');
    }, 500);
  }
} //
// Previous step
//


backBtns.forEach(function (btn) {
  return btn.addEventListener('click', getPrevStep);
});

function getPrevStep() {
  active--;
  updateSteps();
  updateProgress();
  steps.forEach(function (one) {
    return one.classList.remove('out', 'in');
  });
  var prev = steps[active],
      next = steps[active + 1];
  next.classList.add('out');
  setTimeout(function () {
    q('main').scrollTo(0, 0);
    next.classList.add('hidden');
    next.classList.remove('out');
    prev.classList.remove('hidden');
    prev.classList.add('in');
  }, 500);
}
/* Step1 */
//
// Validation
//


var inputs = _toConsumableArray(qt('#basic [data-type]'));

function step1Validation() {
  var Validation = inputs.every(function (inp) {
    var _ref = [inp.value, inp.dataset.type],
        value = _ref[0],
        pattern = _ref[1];
    return objValidation[pattern].test(value);
  });

  if (Validation) {
    getStep1Data();
    getNextStep();
  } else {
    var invalidInps = inputs.filter(function (inp) {
      return !objValidation[inp.dataset.type].test(inp.value);
    });
    invalidInps.forEach(function (one) {
      one.parentElement.lastElementChild.classList.remove('hidden');
    });
  }
} //
// Get data
//


function getStep1Data() {
  var about = {}; // gender

  var g = {
    gender: 'male'
  };

  var selectedGender = _toConsumableArray(gender).filter(function (gend) {
    return gend.classList.contains('active');
  })[0];

  var genderName = selectedGender.dataset.gender;
  g.gender = genderName; // Country

  var country = i('country').value;
  Object.assign(about, g, {
    country: country
  }); // other inputs

  var others = {};
  inputs.forEach(function (inp) {
    others[inp.dataset.info] = inp.value;
  });
  Object.assign(about, others);
  information.about = about;
}
/* Step 2 */


var step2Area = qt('#advanced textarea[data-type]');
var step2Inputs = qt('#advanced input[data-type]');
var step2Btn = i('step2-next-btn');
step2Btn.addEventListener('click', step2Validation);

function step2Validation() {
  var cond = _toConsumableArray(step2Area).every(function (e) {
    var _ref2 = [e.dataset.type, e.value],
        pattern = _ref2[0],
        value = _ref2[1];
    return objValidation[pattern].test(value);
  });

  if (cond) {
    getStep2Data();
    getNextStep();
  } else {
    step2Area.forEach(function (one) {
      if (!objValidation[one.dataset.type].test(one.value)) {
        one.parentElement.lastElementChild.classList.remove('hidden');
      }
    });
  }
}

function getStep2Data() {
  // bio and skills
  var advanced = {};
  step2Area.forEach(function (e) {
    advanced[e.dataset.info] = e.value;
  }); // Social

  var social = {};
  step2Inputs.forEach(function (e) {
    if (isURL(e.value)) {
      social[e.dataset.info] = e.value;
    }
  }); // update information

  Object.assign(information, {
    advanced: advanced,
    social: social
  });
}
/* Step 3 */


var passInput = q('input[data-info="password"]');
var passConfirm = q('input[data-info="confirm"]');
var step3Btn = i('step3-next-btn');
step3Btn.addEventListener('click', step3Validation);
passConfirm.addEventListener('input', function () {
  if (this.value === passInput.value) {
    this.nextElementSibling.classList.remove('hidden');
  } else this.nextElementSibling.classList.add('hidden');
});

function step3Validation() {
  var cond1 = passInput.value === passConfirm.value;
  var cond2 = objValidation[passInput.dataset.type].test(passInput.value);

  if (!cond1) {
    passConfirm.parentElement.lastElementChild.classList.remove('hidden');
  }

  if (!cond2) {
    passInput.parentElement.lastElementChild.classList.remove('hidden');
  }

  if (cond1 && cond2) {
    information.password = passInput.value;
    getNextStep();
  }
} // Browse an avatar


var inpFile = i('img');
var labelFile = q('.label-file');
inpFile.addEventListener('change', function () {
  var reader = new FileReader();
  reader.addEventListener('load', function () {
    inpFile.setAttribute('data-value', this.result);
    labelFile.innerHTML = "".concat(inpFile.files[0].name.slice(0, 20), ". Tap to change");
  });
  reader.readAsDataURL(this.files[0]);
});
/* Step 4 */

var step4btn = i('step4-next-btn');
var main = q('main');
step4btn.addEventListener('click', step4Validatin);

function step4Validatin() {
  var value = inpFile.getAttribute('data-value');

  if (value) {
    main.classList.add('up');
    information.avatar = value;
    getProfil();
  } else {
    alert('Avatar required');
  }
}