// Tools script

const i = document.getElementById.bind(document);
const q = document.querySelector.bind(document);
const qt = document.querySelectorAll.bind(document);

// Get started

const startBtn = i('start-btn');
const welcome = q('.welcome');

startBtn.addEventListener('click', function () {
	welcome.classList.add('up');
});

// Steps list

const toggleStepsBtn = i('toggle-steps');
const stepsMenu = q('.steps-list');

toggleStepsBtn.addEventListener('click', toggleStepsMenu);

function toggleStepsMenu() {
	let cl = 'hidden-mobile';
	if (stepsMenu.classList.contains(cl)) {
		stepsMenu.classList.remove(cl);
	} else stepsMenu.classList.add(cl);
}

// Inputs Validation

const objValidation = {
	name: /^[a-z]{3,}/i,
	email: /^\w+@\w+\.\w{2,}$/,
	phone: /^\+?\d+ ?\d{9,}$/,
	password: /[0-9A-za-z]{8,}/,
	bio: /[^\s]/,
	skill: /[^\s]/,
};

// Remove validation msg when we focus an input

const inpWithValidation = qt('[data-type]');

inpWithValidation.forEach((inp) => {
	inp.addEventListener('focus', function () {
		this.parentElement.lastElementChild.classList.add('hidden');
	});

	// Add check icon to the input

	inp.addEventListener('input', function () {
		let vald = objValidation[inp.dataset.type];
		if (vald && this.tagName === 'INPUT') {
			let nextEl = this.nextElementSibling;
			if (vald.test(this.value)) {
				nextEl.classList.remove('hidden');
			} else nextEl.classList.add('hidden');
		}
	});
});

function isURL(strng) {
	// https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
	let reg =
		/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;
	return reg.test(strng);
}

// See profil section

const seeProfilSection = q('.see-profil');
const seeProfilbtn = i('see-profil-btn');

seeProfilbtn.addEventListener('click', () =>
	seeProfilSection.classList.add('up'),
);
