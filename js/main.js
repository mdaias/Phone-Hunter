//load search data
    const searchPhone = () => {
        errorMsg('none');

    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    searchField.value = '';
    spinner('block')

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data.data))
}

    //Error handling
    const errorMsg = (display) =>{
        document.getElementById('error-msg').style.display=display;
    }
    //spinner
    const spinner = (display) =>{
        document.getElementById('spinner').style.display=display;
    }

//Display search result
    const displayResult = phones =>{
        if(phones.length == 0){
            errorMsg('block');
        }
    spinner('none'); 

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
                <h3 class="brand fs-4 card-title">Brand: ${phone.brand}</h3>
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
                <h6 class="text-center"><span>${releaseDate?releaseDate:"no release date"}</span></h6>
                <h3 class="brand ms-3">Brand: <span class="fs-2 shadow-sm">${brand}</span></h3>
            </div>
            <div class="d-flex mt-3">
                <div class="text-start">
                    <ul>
                        <li>
                        <h6>Chipset: <span>${chipSet?chipSet:"not found"}</span></h6></li>
                        <li>
                        <h6>Display Size: <span>${displaySize?displaySize:"not found"}</span></h6>
                        </li>
                        <li>
                        <h6>Memory: <span>${memory?memory:"not found"}</span></h6>
                        </li>
                        <li>
                        <h6>Storage: <span>${storage?storage:"not found"}</span></h6></li>
                        <li>
                        <h6>Bluetooth: <span>${details.data.others?.Bluetooth?details.data.others?.Bluetooth:"not found"}</span></h6>
                        </li>
                    </ul>
                </div>
                <div class="text-start ms-3">
                    <ul class="">
                        <li>
                        <h6>USB: <span>${details.data.others?.USB?details.data.others.USB:"not found"}</span></h6>
                        </li>
                        <li>
                        <h6>WLAN: <span>${details.data.others?.WLAN?details.data.others.WLAN:"not found"}</span></h6></li>
                        <li>
                        <h6>Radio: <span>${details.data.others?.Radio?details.data.others.Radio:"not found"}</span></h6></li>
                        <li>
                        <h6>NFC: <span>${details.data.others?.NFC?details.data.others.NFC:"not found"}</span></h6>
                        </li>
                        <li>
                        <h6>GPS: <span>${details.data.others?.GPS?details.data.others.GPS:"not found"}</span></h6>
                        </li>
                    </ul>
                </div>
            </div>
                <h6 class="text-center">Sensors: <span>${sensors.join()}</span></h6>   
        </div>
    </div>  
    `
    detailsContainer.appendChild(div);
}
