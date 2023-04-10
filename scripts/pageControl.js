const main = document.querySelector(".main");
const cc = document.querySelector(".coordinate-converter");
const ct = document.querySelector('.craft-tweaker');
const pages = [main, cc, ct];

let activePage = 0; // 0 - main | 1 - cc | 2 - ct

function updatePages(number) {
    activePage = number;
    pages.forEach(element => {
        element.style.display = "none";
    });
    if (activePage == 0) {
        main.style.display = "block";
    }
    if (activePage == 1) {
        cc.style.display = "flex";
    }
    if (activePage == 2) {
        ct.style.display = "block";
    }
    updateNavUnderline(number);
}

// Nav elements
const nav__logo = document.querySelector(".nav__logo");
const nav__cc = document.querySelector(".nav__cc");
const nav__ct = document.querySelector(".nav__ct");
const nav__list = [nav__logo, nav__cc, nav__ct];

function updateNavUnderline(number) {
    nav__list.forEach(item => {
        if (item.classList.contains("underline")){
            item.classList.remove("underline");
        } 
    });
    if (number == 0) nav__logo.classList.add("underline");
    if (number == 1) nav__cc.classList.add("underline");
    if (number == 2) nav__ct.classList.add("underline");
}
updatePages(2);


//(364-12*n-1)/n