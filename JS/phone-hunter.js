const phoneContainer = document.getElementById('phone-container')
const loadPhones = async (phoneName, dataLimit) => {
    console.log(dataLimit)
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    console.log(phones)

    /// display 6 phone
    const showMore = document.getElementById('show-more')
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10)
        showMore.classList.remove('d-none')
    }
    else{
        showMore.classList.add('d-none')
    }

    // display no phone feedback 
    const feedback = document.getElementById('feedback')
    if (phones.length === 0) {

        feedback.classList.remove('d-none')
    }
    else {
        feedback.classList.add('d-none')
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card">
           <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
           <div class="card-body">
             <h4 class="card-title">${phone.phone_name}</h4>
             <h5 class="">Brand: ${phone.brand}</h5>
             <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
             <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showDetails" type="button" >Show Details</button>
           </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv)
    });

    // stop loader
    toggleLoader(false)
}

const processSearch = (dataLimit) =>{
    // start Loader
    toggleLoader(true)
    const searchfield = document.getElementById('search-field').value
    loadPhones(searchfield, dataLimit)
    phoneContainer.innerHTML = ''

}

const searchPhone = () => {
    processSearch(10)

}

const showMoreBtn = () =>{
    processSearch()
}

document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key){
        processSearch(10)
    }
    //console.log(e.key)
})

const toggleLoader = isLoading => {
    const loader = document.getElementById('loader')
    if (isLoading) {
        loader.classList.remove('d-none')
    }
    else {
        loader.classList.add('d-none')
    }
}

const loadPhoneDetails = async(phoneSlug) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = (phone) =>{
    console.log(phone)
    const modaltitle = document.getElementById('modal-title')
    const brand = document.getElementById('brand')
    const releaseDate = document.getElementById('releaseDate')
    const displaySize = document.getElementById('displaySize')
    
    modaltitle.innerText = phone.name
    brand.innerText = phone.brand
    releaseDate.innerText = phone.releaseDate ? phone.releaseDate : 'No Release Date'
    displaySize.innerText = phone.mainFeatures.displaySize
} 


loadPhones('iphone')