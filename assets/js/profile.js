/* Profil Script */

const userAvatar = q('.user-avatar');
const username = q('.user-fullName');
const userCountry = q('.user-country');
const userBio = q('.user-bio');
const skillsContainer = q('.user-skills');
const passwordUser = q('.password-input');
const userEmail = i('user-email');
const userPhone = i('phone-number');
const togglePasswordIcon = i('toggle-pass');

function getProfil() {
	const {
		avatar,
		password,
		social,
		advanced: { bio, skills },
		about: { firstName, lastName, country, email, phone },
	} = information;

	username.innerHTML = `${firstName} ${lastName}`;
	userAvatar.setAttribute('src', avatar);
	userCountry.innerHTML = `From ${country}`;
	userBio.innerHTML = bio;
	passwordUser.value = password;
	userPhone.innerHTML = phone;
	userEmail.innerHTML = email;

	createSkills(skills);
	createLinks(social);
}

function createSkills(skills) {
	let skillsArr = skills.split(',').map((e) => e.trim());
	skillsContainer.innerHTML = '';
	for (let i = 0; i < skillsArr.length; i++) {
		let li = document.createElement('li');
		li.classList.add('user-skill');
		li.innerHTML = skillsArr[i];
		skillsContainer.appendChild(li);
	}
}

function createLinks(social) {
	const socialIcons = qt('.social-item');
	socialIcons.forEach((icon) => {
		let name = icon.getAttribute('data-name');
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
