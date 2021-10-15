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
    copy.querySelector("img").setAttribute("src", oneBike._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url);
    // copy.querySelector("img").src = " oneBike._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url";
    copy.querySelector(".price").textContent = oneBike.price;
    copy.querySelector(".color").textContent = oneBike.colors;
    //copy.querySelector(".stock").textContent = oneBike.in_stock;
    console.log(oneBike.in_stock)
    if (oneBike.in_stock == '1') { copy.querySelector(".stock").textContent = "yes" }
    // oneBike.colors.forEach(color => {
    //     const li = document.createElement("li");
    //     li.style.background = color;
    //     copy.querySelector("ol").appendChild(li)
    // })

    const parent = document.querySelector("main");
    parent.appendChild(copy);
}