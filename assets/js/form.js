/* Form script */

// Steps control

let active = 0;
let information = {};

const stepsIcons = qt('.target-icon');
const progress = i('progress');
const nextBtns = qt('.next-btn');
const backBtns = qt('.back-btn');
const steps = qt('.step-content');

steps.forEach((e) => e.classList.add('hidden'));
steps[0].classList.remove('hidden');

updateSteps();
updateProgress();

function updateSteps() {
	stepsIcons.forEach((step, indx) => {
		step.classList.remove('current', 'complete');
		if (indx < active) step.classList.add('complete');
	});
	stepsIcons[active].classList.add('current');
}

function updateProgress() {
	progress.className = '';
	progress.classList.add(`dim-${active}`);
}

//
// Male female
//

const gender = qt('.gender');
gender[0].classList.add('active');

gender.forEach((e) => e.addEventListener('click', updateGender));

function updateGender() {
	gender.forEach((e) => e.classList.remove('active'));
	this.classList.add('active');
}

//
// Next step
//

const step1Btn = i('step1-next-btn');

step1Btn.addEventListener('click', () => {
	step1Validation();
});

function getNextStep() {
	active++;
	if (active < 4) {
		updateProgress();
		updateSteps();

		steps.forEach((one) => one.classList.remove('out', 'in'));
		let prev = steps[active - 1],
			next = steps[active];
		prev.classList.add('out');
		setTimeout(() => {
			q('main').scrollTo(0, 0);
			prev.classList.add('hidden');
			prev.classList.remove('out');
			next.classList.remove('hidden');
			next.classList.add('in');
		}, 500);
	}
}

//
// Previous step
//

backBtns.forEach((btn) => btn.addEventListener('click', getPrevStep));

function getPrevStep() {
	active--;
	updateSteps();
	updateProgress();
	steps.forEach((one) => one.classList.remove('out', 'in'));
	let prev = steps[active],
		next = steps[active + 1];
	next.classList.add('out');
	setTimeout(() => {
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

const inputs = [...qt('#basic [data-type]')];
function step1Validation() {
	let Validation = inputs.every((inp) => {
		const [value, pattern] = [inp.value, inp.dataset.type];
		return objValidation[pattern].test(value);
	});

	if (Validation) {
		getStep1Data();
		getNextStep();
	} else {
		let invalidInps = inputs.filter((inp) => {
			return !objValidation[inp.dataset.type].test(inp.value);
		});
		invalidInps.forEach((one) => {
			one.parentElement.lastElementChild.classList.remove('hidden');
		});
	}
}

//
// Get data
//

function getStep1Data() {
	let about = {};
	// gender
	let g = { gender: 'male' };
	let selectedGender = [...gender].filter((gend) =>
		gend.classList.contains('active'),
	)[0];
	let genderName = selectedGender.dataset.gender;
	g.gender = genderName;
	// Country
	let country = i('country').value;
	Object.assign(about, g, { country });
	// other inputs
	let others = {};
	inputs.forEach((inp) => {
		others[inp.dataset.info] = inp.value;
	});
	Object.assign(about, others);
	information.about = about;
}

/* Step 2 */

const step2Area = qt('#advanced textarea[data-type]');
const step2Inputs = qt('#advanced input[data-type]');
const step2Btn = i('step2-next-btn');

step2Btn.addEventListener('click', step2Validation);

function step2Validation() {
	let cond = [...step2Area].every((e) => {
		const [pattern, value] = [e.dataset.type, e.value];
		return objValidation[pattern].test(value);
	});

	if (cond) {
		getStep2Data();
		getNextStep();
	} else {
		step2Area.forEach((one) => {
			if (!objValidation[one.dataset.type].test(one.value)) {
				one.parentElement.lastElementChild.classList.remove('hidden');
			}
		});
	}
}

function getStep2Data() {
	// bio and skills
	let advanced = {};
	step2Area.forEach((e) => {
		advanced[e.dataset.info] = e.value;
	});

	// Social
	let social = {};
	step2Inputs.forEach((e) => {
		if (isURL(e.value)) {
			social[e.dataset.info] = e.value;
		}
	});
	// update information
	Object.assign(information, { advanced, social });
}

/* Step 3 */

const passInput = q('input[data-info="password"]');
const passConfirm = q('input[data-info="confirm"]');
const step3Btn = i('step3-next-btn');

step3Btn.addEventListener('click', step3Validation);

passConfirm.addEventListener('input', function () {
	if (this.value === passInput.value) {
		this.nextElementSibling.classList.remove('hidden');
	} else this.nextElementSibling.classList.add('hidden');
});

function step3Validation() {
	let cond1 = passInput.value === passConfirm.value;
	let cond2 = objValidation[passInput.dataset.type].test(passInput.value);
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
}

// Browse an avatar

const inpFile = i('img');
const labelFile = q('.label-file');

inpFile.addEventListener('change', function () {
	let reader = new FileReader();
	reader.addEventListener('load', function () {
		inpFile.setAttribute('data-value', this.result);
		labelFile.innerHTML = `${inpFile.files[0].name.slice(
			0,
			20,
		)}. Tap to change`;
	});
	reader.readAsDataURL(this.files[0]);
});

/* Step 4 */

const step4btn = i('step4-next-btn');
const main = q('main');

step4btn.addEventListener('click', step4Validatin);

function step4Validatin() {
	let value = inpFile.getAttribute('data-value');
	if (value) {
		main.classList.add('up');
		information.avatar = value;
		getProfil();
	} else {
		alert('Avatar required');
	}
}
