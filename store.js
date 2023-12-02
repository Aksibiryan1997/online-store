let products = [];

function showProduct(param) {
    param.array.forEach(element => {
        let productBlock = document.createElement()
    });
}

fetch('https://fakestoreapi.com/products')
.then(response=>response.json())
.then(data=>{
    products = data;
    console.log(products);
});