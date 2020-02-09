function solve() {
    document.querySelector('#btnLoad').addEventListener('click', load);
    document.querySelector('#loaded').addEventListener('click',deleted)
    document.getElementById('btnCreate').addEventListener('click', create);
}

const url = 'https://phonebook-b27a1.firebaseio.com/.json';

function load() {
    fetch(url)
        .then(x => x.json())
        .then(loadedContacts)
}

function loadedContacts(data) {
    let ul = document.getElementById('loaded');
    let li = ''; 
    
    Object.entries(data).map((x,i) => {
        if(x[1] !== null) {
            li += `<li>${x[1].Person} ${x[1].Phone} <button id='${Object.keys(data)[i]}'>Delete</button></li>`;
        }
    })
    ul.innerHTML = li;
}

function deleted(e) {
    fetch('https://phonebook-b27a1.firebaseio.com/'+ e.target.id + '.json', {
        method: 'delete',
      })
      .then(response => response.json())
      .then(load)   //// delete person automatic
}

function create() {
    let personName = document.getElementById('person');
    let phone = document.getElementById('phone');
    let person = {
        'Person': personName.value,
        'Phone': phone.value
    }

    if(personName.value.length < 1 || phone.value.length < 1) {
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
    })
    .then(res=>res.json())
    .then(load) // add new person automatic;

    personName.value = '';
    phone.value = '';
}
