let autocomplete = (pets) => {
    const inputPet = document.querySelector("#pet-type");
    let indexFocus = -1;

    inputPet.addEventListener('input', function () {
        const petType = this.value;

        if (!petType) return false;
        closeSuggestions();

        const divList = document.createElement('div');
        divList.setAttribute('id', `${this.id}-list-autocomplete`);
        divList.setAttribute('class', 'list-autocomplete-items');
        this.parentNode.appendChild(divList);

        if (pets.length == 0) return false;

        pets.forEach(item => {
            if (item.substr(0, petType.length) == petType) {
                const elementList = document.createElement('div');
                elementList.innerHTML = `<strong>${item.substr(0, petType.length)}</strong>${item.substr(petType.length)}`;
                elementList.addEventListener('click', function () {
                    inputPet.value = this.innerText;
                    closeSuggestions();
                    return false;
                });
                divList.appendChild(elementList);
            }
        });
    });

    inputPet.addEventListener('keydown', function (e) {
        const divList = document.querySelector(`#${this.id}-list-autocomplete`);
        let items;

        if (divList) {
            items = divList.querySelectorAll('div');

            switch (e.keyCode) {
                case 40:
                    indexFocus++;

                    if (indexFocus > items.length - 1) indexFocus = items.length - 1;
                    break;

                case 38:
                    indexFocus--;

                    if (indexFocus < 0) indexFocus = 0;
                    break;

                case 13:
                    e.preventDefault();
                    items[indexFocus].click();
                    indexFocus = -1;
                    break;

                default:
                    break;
            }

            select(items, indexFocus);
            return false;
        }
    });

    document.addEventListener('click', function () {
        closeSuggestions();
    });
}

let select = (items, indexFocus) => {
    if (!items || indexFocus == -1) return false;

    items.forEach(item => {
        item.classList.remove('autocomplete-active');
    });

    items[indexFocus].classList.add('autocomplete-active');
}

let closeSuggestions = () => {
    const items = document.querySelectorAll('.list-autocomplete-items');
    items.forEach(item => {
        item.parentNode.removeChild(item);
    });

    indexFocus = -1;
}

autocomplete(['dog', 'fish', 'cat', 'rabbit', 'turtle', 'mouse']);