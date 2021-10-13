const url = "http://localhost:3001/api/users"
const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
const currPage = document.querySelector('.js-page')
const display = document.querySelector('.list')

let current_page = 1;
let page_max = 10;
let hasMorePages = true;


function Fetch(page, limit) {
    fetch(url + `?page=${page}&limit=${limit}`)
        .then((result) => result.json())
        .then((data) => {
            currPage.textContent = `Page: ${page}`
            hasMorePages = data.hasMore
            display.innerHTML = ''
            for (const element of data.results) {
                display.innerHTML += `
                <ul>
                    <li>ID: ${element.id}</li>
                    <li>Name: ${element.name}</li>
                    <li>Email: ${element.email}</li>
                    <li>Address: ${element.address}</li>
                    <li>Country: ${element.country}</li>
                    <li>Company: ${element.company}</li>
                </ul>
            `
            }
        })
}

previous.addEventListener('click', () => {
    if (current_page > 1) {
        current_page--
        next.disabled = false
        Fetch(current_page, page_max)
    } else {
        previous.disabled = true
        return
    }
    currPage.textContent = current_page;
})

next.addEventListener('click', () => {
    if (hasMorePages) {
        current_page++
        previous.disabled = false
        Fetch(current_page, page_max)
    } else {
        next.disabled = true
        return
    }
    currPage.textContent = current_page;
})

window.onload = function() {
    try {
      let url_string = (window.location.href).toLowerCase();
      let url = new URL(url_string);
      let page = url.searchParams.get("page");
      let limit = url.searchParams.get("limit");
      console.log(page+ " and "+limit);
    } catch (err) {
      console.log("Issues with Parsing URL Parameter's - " + err);
      console.log(url_string)
    }
}

Fetch(current_page, page_max)
