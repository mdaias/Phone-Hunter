//load search data
    const searchPhone = () => {
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('spinner').style.display="block";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data.data))
}
//Display search result
    const displayResult = phones => {
    document.getElementById('spinner').style.display="none";
    const divContainer = document.getElementById('phone-result');
    const detailsContainer = document.getElementById('show-details');
    
//clear previous result
    divContainer.textContent = '';
    detailsContainer.textContent = '';

//Show first 20 result
    const first20Phones = phones.slice(0,20);
    first20Phones.forEach(phone =>{
    //  console.log(phone)

    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card p-2 shadow-lg">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
                <h4 class="card-title text-center">${phone.phone_name}</h4>
                <h5 class="card-title">Brand: <span>${phone.brand}</span></h5>
            </div>

            <div class="d-grid gap-2 col-6 mx-auto">
                <a href="#" role="button" onclick="phoneDetails('${phone.slug}')" class="btn btn-primary" type="button">Details</button></a>
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

//Destructuring object
    const {brand,image,name,releaseDate} = details.data;
    const {chipSet,displaySize,memory,storage} =details.data.mainFeatures;

    const sensors = details.data.mainFeatures.sensors;
        // console.log(sensors);

    const detailsContainer = document.getElementById('show-details');

//clear previous result
    detailsContainer.textContent = '';

    const div = document.createElement('div');
    div.classList.add('container');

    div.innerHTML = `
    <div class="row p-2 shadow-lg">
        <div class="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <img src="${image}" class="w-50 mx-auto" alt="mobile picture">
        </div>
        <div class="col-12 col-md-6">
            <div>
                <h3 class="details-heading text-center mt-2">${brand} ${name} Full Specifications</h3>
                <h5 class="text-white">Brand: <span>${brand}</span></h5>
                <h6 class="text-white">Release Date: <span>${releaseDate?releaseDate:"no release date"}</span></h6>
            </div>
            <div class="d-flex mt-3">
                <div class="text-start">
                    <h6 class="text-white">Chipset: <span>${chipSet?chipSet:"not found"}</span></h6>
                    <h6 class="text-white">Display Size: <span>${displaySize?displaySize:"not found"}</span></h6>
                    <h6 class="text-white">Memory: <span>${memory?memory:"not found"}</span></h6>
                    <h6 class="text-white">Storage: <span>${storage?storage:"not found"}</span></h6>
                    <h6 class="text-white">Bluetooth: <span>${details.data.others?.Bluetooth?details.data.others?.Bluetooth:"not found"}</span></h6>
                </div>
                <div class="text-start ms-3">
                    <h6 class="text-white">USB: <span>${details.data.others?.USB?details.data.others.USB:"not found"}</span></h6>
                    <h6 class="text-white">WLAN: <span>${details.data.others?.WLAN?details.data.others.WLAN:"not found"}</span></h6>
                    <h6 class="text-white">Radio: <span>${details.data.others?.Radio?details.data.others.Radio:"not found"}</span></h6>
                    <h6 class="text-white">NFC: <span>${details.data.others?.NFC?details.data.others.NFC:"not found"}</span></h6>
                    <h6 class="text-white">GPS: <span>${details.data.others?.GPS?details.data.others.GPS:"not found"}</span></h6>
                </div>
            </div>
                <h6 class="text-white text-center">Sensors: <span>${sensors.join()}</span></h6>   
        </div>
    </div>
    
    `
    detailsContainer.appendChild(div);
}
