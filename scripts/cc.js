const selectWorld = document.querySelector(".select-world__btn");
const convertBtn = document.querySelector(".convert__btn");
const result = document.querySelector('.cc-result__coordinates');

let isOverworld = true;

selectWorld.addEventListener("click", () => {
    isOverworld = isOverworld ? false : true;
    if (!isOverworld) {
        selectWorld.innerHTML = "Nether";
    } else {
        selectWorld.innerHTML = "Overworld";
    }
    selectWorld.classList.toggle("isOverworld");
});

convertBtn.addEventListener("click", () => {
    let x = document.querySelector('.cc_input-x').value;
    let y = document.querySelector('.cc_input-y').value;

    if (x == 0 && y != 0) {
        result.innerHTML = 'Вы не ввели X';
        return;
    }
    if (x != 0 && y == 0) {
        result.innerHTML = 'Вы не ввели Y';
        return;
    }
    if (x == 0 && y == 0) {
        result.innerHTML = 'Вы не ввели значения';
        return;
    }
    if (isOverworld) {
        result.innerHTML = `${Math.round(x*8)} ~ ${Math.round(y*8)}`;
    } else result.innerHTML = `${Math.round(x/8)} ~ ${Math.round(y/8)}`;

    console.log(`X = ${x}\n Y = ${y}`);
})