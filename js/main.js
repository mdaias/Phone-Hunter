const searchPhone = () => {
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
}
