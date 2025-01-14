const apiUrl = "http://localhost:3000/products"; 


//DOM id create grid product-cards
const productGrid = document.getElementById("product-grid");

// DOM id  create product-details
const productDetails = document.getElementById("product-details");


const loading = document.getElementById("loading");
function renderProductCard(product) {
  loading.style.display = "block"; // show"loading..."
  axios(apiUrl)
    .then(products => {
      products.forEach(product => {
        renderProductCard(product);
      });
      loading.style.display = "none"; // hide "loading..."
    })
    .catch(error => {
      console.error(error);
      loading.style.display = "none"; // hide "loading..."
    });

  const card = document.createElement("div");
  card.classList.add("product-card");

  const image = document.createElement("img");
  image.src = product.image.src;
  image.alt = product.title;
  
  const title = document.createElement("h2");
  title.textContent = product.title;

  const price = document.createElement("p");
  price.textContent = `$${product.variants[0].price}`;

  const button = document.createElement("button");
  button.textContent = "Details";
  button.addEventListener("click", () => {
    renderProductDetails(product.id);
    window.location.href = `/product-details.html?id=${product.id}`
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
axios()

// Render Products details 
async function renderProductDetails(productId) {
  const response = await axios.get(apiUrl + "/" + productId);

  // carousel variants 
  const carousel = document.createElement("div");
  carousel.classList.add("carousel");

  const images = response.data.images;
  // let currentImageIndex = 0;
  const slickCarousel = document.createElement("div");
  slickCarousel.classList.add("slick-carousel");

  images.forEach((image) => {
    const carouselImage = document.createElement("div");
    carouselImage.innerHTML = `<img src="${image.src}" />`;
    slickCarousel.appendChild(carouselImage);
  });

  carousel.appendChild(slickCarousel);



  //HTML DETAILS ELEMENT
  const title = document.createElement("h2");
  title.textContent = response.data.title;
  productDetails.appendChild(title);

  const bodyHtml = document.createElement("h4");
  bodyHtml.innerHTML = response.data.body_html;
  productDetails.appendChild(bodyHtml);

  const price = document.createElement("p");
  price.textContent = `Price: $${response.data.variants[0].price}`;
  productDetails.appendChild(price);

  const variants = response.data.options[0];
  const variantSelect = document.createElement("select");
  
  variants.values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = `${value}`;
    variantSelect.appendChild(option);
  });

  // event change variant - price and image
  variantSelect.addEventListener("change", (event) => {
    const selectedVariant = response.data.variants.find(variant => variant.option1 === event.target.value);
    const selectedImageId = selectedVariant.image_id;
    // const selectedImage = response.data.images.find(image => image.id === selectedImageId);
    const selectedImageIndex = images.findIndex(image => image.id === selectedImageId);
    $(".slick-carousel").slick("slickGoTo", selectedImageIndex);
    price.textContent = `Price: $${selectedVariant.price}`;
  });

  productDetails.appendChild(variantSelect);
  productDetails.appendChild(carousel);
  $(".slick-carousel").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="slick-prev">←</button>',
    nextArrow: '<button type="button" class="slick-next">→</button>',
  });
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
