import { renderCategories, renderProducts , renderBasketItem} from "./ui.js"


document.addEventListener('DOMContentLoaded', () => {

    fetchCategories();
    fetchProducts();
})

let basket = []
let total = 0;
const modal = document.querySelector('.modalWrapper')
const basketBtn = document.querySelector('#basketBtn')
const closeBtn = document.querySelector('#closeBtn')
let globalData = []
const basketList = document.querySelector(".list")
const baseURL = 'https://api.escuelajs.co/api/v1/'
const modalInfo = document.querySelector('.basketTotal')

function fetchCategories() {
    fetch(`${baseURL}categories`)
        .then((response) => response.json())
        .then((data) => renderCategories(data))
        .catch((error) => console.log(error))
}

async function fetchProducts() {

    try {
        const res = await fetch(`${baseURL}products`);
        const data = await res.json();
        globalData = data;
        renderProducts(data);


    } catch (Err) {
        console.log(error)
    }

}




basketBtn.addEventListener('click', () => {
    modal.classList.add('active')
    addList()
})

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active')
    basketList.innerHTML = ' ' ;

})

document.addEventListener('click', (e) => {
    var clickedEl = e.target
    if (clickedEl.classList.contains('modalWrapper')) {
        modal.classList.remove('active')
        basketList.innerHTML = ' ' ;
        total = 0
        modalInfo.textContent = ' 0'
    }
})

document.body.addEventListener("click", findItem)

function findItem(e) {
    const ele = e.target
    if (ele.id === 'addBtn') {

        const selected = globalData.find(
            (product) => product.id == ele.dataset.id

        )

        if (!selected.amount) {
            selected.amount = 1
        }
        addToBasket(selected)
    }

    if (ele.id === 'delBtn'){
        console.log(ele)
        ele.parentElement.remove()
        const selected =globalData.find((i)=>i.id == ele.dataset.id)
        deleteItem(selected)
    }
}

function addToBasket(product) {

    const foundItem = basket.find((item) => item.id == product.id)

    if (foundItem) { 
        foundItem.amount++;
 
    } else {
        basket.push(product)
    }


}

function addList(){
    basket.forEach((product) => {
        renderBasketItem(product)
        
    total += product.price * product.amount
    
    })

    console.log(total)
    modalInfo.textContent = total
}

function deleteItem (deletingItem){
   const filteredData = basket.filter((item)=> item.id !== deletingItem.id)
   basket = filteredData
    total = deletingItem.price * deletingItem.amount
    modalInfo.textContent = total
}