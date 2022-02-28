const searchPhone = () => {
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data.data))
}

const displayResult = phones => {
    
    const divContainer = document.getElementById('phone-result');
    //clear previous result
    divContainer.textContent = '';
    
    phones.forEach(phone =>{
        // console.log(phone.phone_name)

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card p-2 shadow-lg">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${phone.phone_name}</h4>
                    <h5 class="card-title">Brand: <span>${phone.brand}</span></h5>
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button class="btn btn-primary" type="button">Details</button>
                </div>
            </div>
        `
        divContainer.appendChild(div);
    })
}
