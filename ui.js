
const categoryList = document.querySelector(".categories")
const productList = document.querySelector(".products")
const basketList = document.querySelector(".list")

export function renderCategories(categories) {
    categories.forEach((category) => {
        const categoryDiv = document.createElement('div')
        categoryDiv.classList.add("category")
        categoryDiv.innerHTML = `
    <img src="${category.image}" alt="">
    <span>${category.name}</span>
</div>`;
        categoryList.appendChild(categoryDiv)
    })
}

export function renderProducts(products) {
    products.forEach((product) => {
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')
        productDiv.innerHTML = `
    <img src=${product.category.image} alt="">
                    <p>${product.title}</p>
                    <p>${product.category.name}</p>
                    <div class="productBottom">
                        <p>${product.price} $</p>
                        <button id="addBtn" data-id=${product.id}>Add to Basket</button>
                    </div>
    `
        productList.appendChild(productDiv)


    })
}

export function renderBasketItem(product) {
    const basketItem = document.createElement("div")
    basketItem.classList.add("listItem")
    basketItem.innerHTML = `
       <img src="${product.category.image}"  alt="">
       <h2>${product.title}</h2>       
       <p>${product.amount}</p>
       <h2>${product.price*product.amount} $</h2>
       <button id="delBtn" data-id=${product.id}>Delete</button>
       ` ;
    basketList.appendChild(basketItem)

}

