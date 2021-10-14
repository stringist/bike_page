const urlParams = new URLSearchParams(window.location.search);
const bikename = urlParams.get("title.rendered");
const endpoint = "http://lumensity.dk/recreate/wp-json/wp/v2/bike?_embed"

fetch(endpoint)

.then(function(res) {
        return res.json();
    })
    .then(function(data) {
        handleProductList(data);
    });

function handleProductList(data) {
    console.log(data);
    data.forEach(showData);
}

function showData(oneBike) {
    const template = document.querySelector("#bikeTemplate").content;
    const copy = template.cloneNode(true);
    copy.querySelector("h3.brand").textContent = oneBike.brand;
    copy.querySelector("h3.name").textContent = oneBike.title.rendered;
    copy.querySelector("img").src = oneBike._links["wp:featuredmedia"][0].href;
    copy.querySelector("li.price").textContent = "Price - " + oneBike.price;
    copy.querySelector("li.color").textContent = "Colours - " + oneBike.colors;
    copy.querySelector("li.stock").textContent = "In Stock - " + oneBike.in_stock;
    // oneBike.colors.forEach(color => {
    //     const li = document.createElement("li");
    //     li.style.background = color;
    //     copy.querySelector("ol").appendChild(li)
    // })

    const parent = document.querySelector("main");
    //append}
    parent.appendChild(copy);
}