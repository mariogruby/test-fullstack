const apiUrl = "http://localhost:3000/products"; 

//DOM id create grid product-cards
const productGrid = document.getElementById("product-grid");

// DOM id  create product-details
const productDetails = document.getElementById("product-details");

// initial render card with products
function renderProductCard(product) {
  // HTML CARD elements
  const card = document.createElement("div");
  card.classList.add("product-card");

  const image = document.createElement("img");
  image.src = product.image.src;
  image.alt = product.title;
  console.log (image)
  
  const title = document.createElement("h2");
  title.textContent = product.title;

  const price = document.createElement("p");
  price.textContent = `$${product.variants[0].price}`;

  const button = document.createElement("button");
  button.textContent = "Ver Producto";
  button.addEventListener("click", () => {
    renderProductDetails(product.id);
    window.location.href = `/product-details.html?id=${product.id}`
  
    console.log(product);
  });

  const cardContent = document.createElement("div");
  cardContent.classList.add("product-card-content");
  cardContent.appendChild(image);
  cardContent.appendChild(title);
  cardContent.appendChild(price);
  cardContent.appendChild(button);
  
  card.appendChild(cardContent);

  // ADD CARD CONTAINER INTO DOM
  productGrid.appendChild(card);
}


// Render Products details 
async function renderProductDetails(productId) {
  const response = await axios.get(apiUrl + "/" + productId);

// carousel variants 
  const carousel = document.createElement("div");
  carousel.classList.add("carousel");

  const images = response.data.images;
  let currentImageIndex = 0;
  const currentImage = document.createElement("img");
  currentImage.src = images[currentImageIndex].src;
  carousel.appendChild(currentImage);

  const prevButton = document.createElement("button");
  prevButton.innerText = "Anterior";
  prevButton.addEventListener("click", () => {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = images.length - 1;
    }
    currentImage.src = images[currentImageIndex].src;
  });
  carousel.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.innerText = "Siguiente";
  nextButton.addEventListener("click", () => {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
    currentImage.src = images[currentImageIndex].src;
  });
  carousel.appendChild(nextButton);

//HTML DETAILS ELEMENT
  const title = document.createElement("h2");
  title.textContent = response.data.title;
  productDetails.appendChild(title);

  const bodyHtml = document.createElement("h4");
  bodyHtml.innerHTML = response.data.body_html;
  productDetails.appendChild(bodyHtml);

  const price = document.createElement("p");
  price.textContent = `Price: $${response.data.variants[0].price}`;
  console.log(price);
  productDetails.appendChild(price);

  const variants = response.data.options[0];
  const variantSelect = document.createElement("select");
  
  variants.values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;

    option.textContent = `${value}`
    // const variantPrice = response.data.variants.find(variant => variant.title === value).price;
    console.log(value)
    variantSelect.appendChild(option);
  });

  // event change variant - price 
  variantSelect.addEventListener("change", (event) => {
    const selectedVariant = response.data.variants.find(variant => variant.option1 === event.target.value);
    price.textContent = `Price: $${selectedVariant.price}`;

  });
  productDetails.appendChild(variantSelect);
  productDetails.appendChild(carousel);


}

async function fetchProducts() {
  try {
    const response = await axios.get(apiUrl);
    const products = response.data;
    products.forEach((product) => renderProductCard(product));
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener("load", fetchProducts);
