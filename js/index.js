

const cartIcon = document.querySelector('.cart-icon')
const cart=document.getElementById(('cart'))
const cartList = document.getElementById('cart-list')
const productsContainer= document.querySelector('.productos')
let arrayCart=[]

const cleanCart= document.getElementById('clean-cart')



// Abrir carrito
cartIcon.addEventListener('click',()=>{
    cart.classList.toggle('active')
})



// Agregar producto al carrito

productsContainer.addEventListener('click',(e)=>{
    e.preventDefault()
    // boton agregar al carrito
    const addCartBtn=e.target.closest('.add-cart')

    if(addCartBtn){
        // obtener la carta del boton seleccionado
        const cardSelected = addCartBtn.closest('.productox')
        
        const product = {
            img: cardSelected.querySelector('img').src,
            title:cardSelected.querySelector('h4').textContent,
            price:cardSelected.querySelector('span').textContent,
            quantity:1,
            id:cardSelected.dataset.id
        }

        // Verificar si existe un item repetido
        const exist= arrayCart.some(item =>item.id === product.id )
        // Si existe, encontrar el item, y sumar su cantidad en +1
        if (exist) {
            const newArrayCart=arrayCart.map(item =>{
                if(item.id === product.id){
                    item.quantity++
                    return item
                }else{
                    return item
                }
            })

            arrayCart=[...newArrayCart]
        }else{
            // Sino, continuar normalmente agregando el item
            arrayCart=[...arrayCart,product]
        }
        
        showCart()
    }
})




// Eliminar todos los elementos del carrito
    cleanCart.addEventListener('click',(e) =>{
        e.preventDefault()
        arrayCart=[]
        while (cartList.firstChild) {
            cartList.removeChild(cartList.firstChild)
        }
    })
// Eliminar un elemento del carrito
cart.addEventListener('click',(e)=>{
    e.preventDefault()

    const removeItemBtn = e.target.closest('.remove-item')
    if(removeItemBtn){
        const idCardToRemove = removeItemBtn.closest('.item').dataset.id
        console.log(idCardToRemove);
        arrayCart = arrayCart.filter(item => item.id !== idCardToRemove)

    }
    showCart()
})
// Mostrar el cart en pantalla
function showCart (){
    // Borrar elementos del cartlist para volvera renderizar
    while(cartList.firstChild){
        cartList.removeChild(cartList.firstChild)
        
    }

    // Renderizado del arrayCart
    arrayCart.map((item)=>{
        // Destructuracion
        const {img,title,price,quantity,id}=item


        // Crear el contenedor del item y sus clases
        const newItem = document.createElement('div')
        newItem.classList.add('item')
        newItem.dataset.id= id


        // HTML PARA EL ITEM
        newItem.innerHTML=`
        <img src="${img}" alt="">
        <span class="title">${title}</span>
        <span>S/. ${price}</span>
        <span>${quantity}</span>
        <span><i class='bx bx-x remove-item'></i></span>
        `

        // AGREGAR A LA LISTA CART  

        cartList.appendChild(newItem)

    })
}