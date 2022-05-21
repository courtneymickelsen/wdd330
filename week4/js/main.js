// const form = document.forms['search'];

// const input = form.elements.searchInput;

// // input.addEventListener('focus', () => alert('focused'), false);              
// // input.addEventListener('blur', () => alert('blurred'), false);
// // input.addEventListener('change', () => alert('changed'), false);

// form.addEventListener ('submit', search, false);

// function search(event) {
//     // alert(' Form Submitted');
//     alert(`You Searched for: ${input.value}`);
//     event.preventDefault();
// }

// input.value = 'Search Here';

// input.addEventListener('focus', function(){
//     if (input.value==='Search Here') {
//         input.value = '' 
//     }
// }, false);

// input.addEventListener('blur', function(){
//     if(input.value === '') {
//         input.value = 'Search Here';
//     } 
// }, false);

// input.placeholder = 'Search Here';

/* Hero HTML stuff */

document.forms.hero.heroName.focus();

const newForm = document.forms['hero'];
newForm.addEventListener('submit', makeHero, false);

function makeHero(event) {

    event.preventDefault(); // prevent the form from being submitted
    
    const hero = {}; // create an empty object
    
    hero.name = newForm.heroName.value; // create a name property based on the input field's value
    hero.realName = newForm.realName.value;
    hero.powers = [...newForm.powers].filter(box => box.checked).map(box => box.value);
    hero.category = newForm.category.value;
    hero.age = newForm.age.value;
    hero.city = newForm.city.value;
    hero.origin = newForm.origin.value;

    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    return hero;
}

form.addEventListener('submit',validate,false);

function validate(event) {
    const firstLetter = newForm.heroName.value[0];
    if (firstLetter.toUpperCase() === 'X') {
        event.preventDefault();
        alert('Your name is not allowed to start with X!');
    }
}

const label = newForm.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);

function validateInline() {
    const heroName = this.value.toUpperCase();
    if(heroName.startsWith('X')){
    error.style.display = 'block';
    } else {
    error.style.display = 'none';
    }
}

function disableSubmit(event) {
    if(event.target.value === ''){
        document.getElementById('submit').disabled = true;
    } else {
        document.getElementById('submit').disabled = false;
    }
}

newForm.heroName.addEventListener('keyup',disableSubmit,false);