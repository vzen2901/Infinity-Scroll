const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// unsplash API 
const count = 10;
const apiKey = '-VUhzBPx4vcHZkVp6QzP7EA8RZezHEI5td2Y5EXUiaw';
const apiUrlUnsplash = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray =[];
//check if all images were loader
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        imagesLoaded = 0;
        ready = true;
        loader.hidden = true;
    }
}

//helper function to set attributes on dom elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
//create elements for links & photos, add to dom
function displayPhoto(){
    totalImages = photosArray.length;
//run function for each object in photosArray
    photosArray.forEach((photo) => {
        //create <a> to link to unsplash
        const item  = document.createElement('a');
        setAttributes(item, {href: photo.links.html, target: '_blank',});
        imageContainer.appendChild(item);
        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description,});
        item.appendChild(img);
        //event listener, check when each is finished laoding
        img.addEventListener('load', imageLoaded);
    });
}

// get photos from unsplash API 
async function getPhotos(){
    try {
        const response = await fetch(apiUrlUnsplash);
        photosArray = await response.json();
        displayPhoto();
    } catch (error) {
        // catch error here 
    }
}
//on load
getPhotos();

//check to see if scrolling near bottom of page, load more photo
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});















//lấy ảnh của trang unsplash qua API trang cung cấp
//đẩy 10 ảnh ngẫu nhiên vào trang web để sử dụng
//hầu hết chiều cao cửa sổ nhỏ hơn 1.000px
