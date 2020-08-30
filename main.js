/* SETUP */
const dvd = document.getElementById('dvd');
let despX = 0, despY = 0, tickTime = 10, actualColor = 0;
let mode = localStorage.getItem('jebdvd_mode') ? localStorage.getItem('jebdvd_mode') : 'normal';
setPlace = () => {
    let maxX = window.innerWidth - dvd.width - dvd.width / 2;
    let maxY = window.innerHeight - dvd.height - dvd.height / 2;
    let posX = Math.floor(Math.random() * (maxX - 5)) + 5;
    let posY = Math.floor(Math.random() * (maxY - 5)) + 5;
    dvd.style.left = `${posX}px`;
    dvd.style.top = `${posY}px`;
};
setPlace();
setDesp = () => {
    let ranX = Math.floor(Math.random() * 2);
    let ranY = Math.floor(Math.random() * 2);
    despX = ranX ? 1 : -1;
    despY = ranY ? 1 : -1;
};
setDesp();
setSpeed = () => {
    let w = window.innerWidth;
    if(w < 768){
        tickTime = 30;
    }
    else if(w < 1024){
        tickTime = 20;
    }
    else if(w < 2560){
        tickTime = 10;
    }
    else{
        tickTime = 1;
    }
}
setSpeed();
/* FUNC */
getSinPx = (medida = '0px') => {
    let patron = /\d*/;
    return parseInt(medida.match(patron));
};
cambiarColor = () => {
    let factor = 0;
    if(mode == 'normal'){
        factor = 5;
    }
    else if(mode == 'all'){
        factor = 11;
    }
    let nuevoColor = actualColor;
    do{ 
        nuevoColor = Math.floor(Math.random() * factor);
    }while(nuevoColor == actualColor);
    dvd.src = `img/${mode}/${nuevoColor}.png`;
    actualColor = nuevoColor;
};
cambiarColor();

/* EVENTS */
window.addEventListener('resize',()=>{
    window.location.reload();
});
dvd.addEventListener('click',()=>{
    if(mode == 'normal'){
        let resp = confirm('¿Quieres cambiar a 11 colores(nuevo estilo)?\nAceptar para Sí\nCancelar o salir para No');
        if(resp){
            mode = 'all';
            localStorage.setItem('jebdvd_mode','all');
        }else{
            mode = 'normal';
            localStorage.setItem('jebdvd_mode','normal');
        }
    }
    else if(mode == 'all'){
        let resp = confirm('¿Quieres cambiar a 5 colores(original)?\nAceptar para Sí\nCancelar o salir para No');
        if(resp){
            mode = 'normal';
            localStorage.setItem('jebdvd_mode','normal');
        }else{
            mode = 'all';
            localStorage.setItem('jebdvd_mode','all');
        }
    }
    
});

/* LOOP */
tick = () => {
    dvd.style.top = `${getSinPx(dvd.style.top) + despY}px`;
    dvd.style.left = `${getSinPx(dvd.style.left) + despX}px`;

    if(getSinPx(dvd.style.top) <= 0 || (getSinPx(dvd.style.top) >= (window.innerHeight - dvd.height))){
        despY = -despY;
        cambiarColor();
    }
    if(getSinPx(dvd.style.left) <= 0 || (getSinPx(dvd.style.left) >= (window.innerWidth - dvd.width))){
        despX = -despX;
        cambiarColor();
    }
    setTimeout(tick,tickTime);
};
tick();