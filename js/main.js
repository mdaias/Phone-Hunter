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
    const detailsContainer = document.getElementById('show-details');
    
    //clear previous result
    divContainer.textContent = '';
    detailsContainer.textContent = '';
    
    phones.forEach(phone =>{
        // console.log(phone.slug)

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
                    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary" type="button">Details</button>
                </div>
            </div>
        `
        divContainer.appendChild(div);
    })
}

//Phone details data load
const phoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaydetails(data) )
}

//display phone details
const displaydetails = details => {
    console.log(details);

    const {brand,image,name,releaseDate} = details.data;
    const {chipSet,displaySize,memory,storage} =details.data.mainFeatures;
    const {Bluetooth,GPS,NFC,Radio,USB,WLAN} = details.data.others;
    // console.log(Bluetooth,GPS,NFC);

    // let releaseDate = details.data;
    // if(releaseDate == 0){
    //     releaseDate = "no release date"
    // }

    const detailsContainer = document.getElementById('show-details');
    //clear previous result
    detailsContainer.textContent = '';

    const div = document.createElement('div');
    div.classList.add('container');

    div.innerHTML = `
    <div class="row p-2 shadow-lg">
        <div class="col col-md-6 d-flex justify-content-center align-items-center">
            <img src="${image}" class="w-50 mx-auto" alt="mobile picture">
        </div>
        <div class="col col-md-6">
            <div>
                <h4 class="text-white">Name: ${name}</h4>
                <h5 class="text-white">Brand: <span>${brand}</span></h5>
                <h6 class="text-white">Release Date: <span>${releaseDate}</span></h6>
            </div>
            <div class="d-flex text-center">
                <div>

                </div>
                <div class="d-flex text-center">

                </div>
            </div>  
        </div>
    </div>
    
    `
    detailsContainer.appendChild(div);
}
