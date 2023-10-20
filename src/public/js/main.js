const inputTitle = document.getElementById("title");
const inputDecription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputStock = document.getElementById("stock");
const inputCode = document.getElementById("code");
const inputCategory = document.getElementById("category");
const inputStatus = document.getElementById("status");
const inputId = document.getElementById("id");

const inputTitleUpdate = document.getElementById("titleUpdate");
const inputDecriptionUpdate = document.getElementById("descriptionUpdate");
const inputPriceUpdate = document.getElementById("priceUpdate");
const inputStockUpdate = document.getElementById("stockUpdate");
const inputCodeUpdate = document.getElementById("codeUpdate");
const inputCategoryUpdate = document.getElementById("categoryUpdate");
const inputStatusUpdate = document.getElementById("statusUpdate");
const inputIdUpdate = document.getElementById("idUpdate");

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("checkoutForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const addToCartButton = document.querySelector('button[data-checkout-id]')
        const cartId = addToCartButton.getAttribute('data-checkout-id');
        

        const urlCheckout = `/api/carts/${cartId}/purchase`

        fetch(urlCheckout, {
            method: "POST",
        })
        .then(function (response) {
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    text: 'Thanks for your purchase'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'purchase could not be made'
                })
            }
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                text: 'unexpected error'
            })
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    
    const deleteButton = document.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {

    const deleteUrl = "/api/users/delete"

        fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                
            },
        })
        .then(response => {
            if (response.status === 204) {
                Swal.fire({
                    icon: 'success',
                    text: 'inactive users were removed'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'inactive users were not removed'
                })
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                text: 'unexpected error'
            })
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const addCartForms = document.querySelectorAll('.addCart');

    addCartForms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 


            const productId = form.querySelector('.addToCart').getAttribute('data-product-id');

            const cartIdElement = document.getElementById('cartId');

            const userCart = cartIdElement.textContent;

            const url = `/api/carts/${userCart}/product/${productId}`

            fetch(url, {
                method: 'POST',
                body: JSON.stringify({ productId, userCart }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        text: 'product added to cart'
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: 'could not be added to cart'
                    })
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    text: 'unexpected error'
                })
            });
        });
    });
});





document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("deleteUser").addEventListener("submit", function (event) {
        event.preventDefault();

        
        const userId = document.getElementById("idDeleteUser").value;
        

        
        fetch(`/api/users/${userId}`, {
            method: 'DELETE'
        })
        .then(function (response) {
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    text: 'User Deleted'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'user could not be deleted'
                })
            }
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                text: 'unexpected error'
            })
        });
    });
});



document.getElementById("updateForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    
    const userId = document.getElementById("idUserRole").value;
    const userRole = document.getElementById("userRole").value;
    

    try {
        fetch(`/api/users/${userId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: userRole }) 
        })
        .then(function (response) {
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    text: 'updated role'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'role could not be updated'
                })
            }
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                text: 'unexpected error'
            })
        });
    }catch(error) {
    };
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('create-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const newProduct = {
            title: inputTitle.value,
            description: inputDecription.value,
            price: Number(inputPrice.value),
            stock: Number(inputStock.value),
            code: inputCode.value,
            category: inputCategory.value,
            status: inputStatus.value,
        };

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
        } catch (error) {
            res.json('Error: ', error);
        }
    });
});


document.getElementById("delete-product").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const id = inputIdUpdate.value

    try {
        const response = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        //logger.info("Error: ", error);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('update-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const id = inputIdUpdate.value

        //logger.info(id, inputCategoryUpdate, inputCodeUpdate, inputTitleUpdate.value, inputDecriptionUpdate.value, inputStockUpdate.value,inputStatusUpdate.value )

        const newProduct = {
            title: inputTitleUpdate.value,
            description: inputDecriptionUpdate.value,
            price: Number(inputPriceUpdate.value),
            stock: Number(inputStockUpdate.value),
            code: inputCodeUpdate.value,
            category: inputCategoryUpdate.value,
            status: inputStatusUpdate.value,
        };

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'Put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
        } catch (error) {
            res.json('Error: ', error);
        }
    });
});



