/* header  */

let header = document.querySelector('#header');
let menu = document.querySelector('#menu');
let mainmenuList = document.querySelectorAll('#menu > li');
let submenu = document.querySelectorAll('#submenu');
let headerHeight = header.offsetHeight;
let submenuHeight = 0;


for(let i=0; i < submenu.length; i++){
    if(submenu[i].offsetHeight > submenuHeight){
        submenuHeight =  submenu[i].offsetHeight;
    }
}


for(let i=0; i<mainmenuList.length; i++){
    mainmenuList[i].addEventListener('mouseover', function(){
        header.style.height = headerHeight + submenuHeight + 'px';
    });
    mainmenuList[i].addEventListener('mouseout', function(){
        header.style.height = headerHeight + 'px';
    });
}