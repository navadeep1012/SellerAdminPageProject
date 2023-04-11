let form = document.getElementById('form');
let sellingPrice = document.getElementById('sellingPrice');
let productName = document.getElementById('productName');
let category = document.getElementById('category');
let items = document.getElementById('items');
let Electronics = document.getElementById('electronics');
let Food = document.getElementById('food');
let Skincare = document.getElementById('skincare');


form.addEventListener('submit',onSubmit);

items.addEventListener('click',clicked);

window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/bcaa1d4d2b774adfbb47251ca06028a1/productItems')
    .then( (res) => {
        for(let i=0;i<res.data.length;i++){
            showOutput(res.data[i]);
        }
    })
    .catch( (err) => console.log(err));
})

function onSubmit(e){
    e.preventDefault();

    const obj = {
        sellingPrice : sellingPrice.value,
        productName : productName.value,
        category : category.value
    }

    axios.post('https://crudcrud.com/api/bcaa1d4d2b774adfbb47251ca06028a1/productItems',obj)
    .then ((res) => {
        showOutput(res.data);
    })
    .catch(err => console.log(err));
}

function showOutput(data){
    let sellingPrice = data.sellingPrice;
    let productName = data.productName;
    let category = data.category;

    let li = document.createElement('li');
    li.className = "list-group-item";
    li.setAttribute('data-id',data._id);
    li.innerText = `${sellingPrice} - ${category} - ${productName} `;

    let del = document.createElement('button');
    del.className = "delete";
    del.style.float = "right";
    del.innerText = "delete product";

    li.appendChild(del);

    if(category === 'Food')
        Food.appendChild(li);
    else if(category === 'Electronics')
        Electronics.appendChild(li);
    else
        Skincare.appendChild(li);
}



function clicked(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            let li = e.target.parentElement;
            let id = li.getAttribute('data-id');
            let category = li.textContent.split(" - ")[1];

            axios.delete(`https://crudcrud.com/api/bcaa1d4d2b774adfbb47251ca06028a1/productItems/${id}`)
            .then( (res) => {
                if(category === 'Food')
                    Food.removeChild(li);
                else if(category === 'Electronics')
                    Electronics.removeChild(li);
                else
                    Skincare.removeChild(li);
            })
            .catch( err => console.log(err));
        }
    }
}