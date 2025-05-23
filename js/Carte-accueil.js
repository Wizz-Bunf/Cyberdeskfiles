

function produits() {
    fetch('/js/data.json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => response.json())
        .then((dov) => {
            card_category(dov); 
            card_top(dov)})
        
        ;
}
produits();



// function test(response) {
//     console.log(response);
//     //parcours les elements du tableau 
//     response.forEach(element => {
//         //si l'id de l'element est == a 24
//         if (element.id === 24) {
//             console.log(element.id);
//             //s'afficher dans la div num (par id)
//             let div24 = document.getElementById("num");
//             console.log(div24);
//             div24.innerHTML =  `<div>${element.id}</div>  <div>${element.name}</div>  <img src="/img/${element.image}"></img> `;

//         }

//     });
// }



function card_category(category) {
    console.log(category);
    category.forEach(element => {
        if (element.id === 24) {
            console.log(element.id);
            let carte1 = document.getElementById("carte");
            console.log(carte1);
            carte1.innerHTML += ` 
            <img class="carte-image" src="/myImage/${element.image}" ></img>
            <div class="carte-txt">
             <div><h5>${element.name}</h5></div> 
             <div class="carte-txt-p">${element.synopsis}</div>
             <div class="position-btn">  <a href="#"><button class="carte-btn">Voir plus ></button></a></div>
             </div/
              `;
        }
        if (element.id === 25) {
            console.log(element.id);
            let carte2 = document.getElementById("carte2");
            console.log(carte2);
            carte2.innerHTML += ` 
            <img class="carte-image" src="/myImage/${element.image}" ></img>
            <div class="carte-txt">
             <div><h5>${element.name}</h5></div> 
             <div class="carte-txt-p">${element.synopsis}</div>
             
              <div class="position-btn">  <a href="#"><button class="carte-btn">Voir plus ></button></a></div>
             
             </div/
              `;
        }
    });
};

function card_top(top1) {
    console.log(top1);
    top1.forEach((element) => {
        if (element.id ==26) {
            console.log(element.id);
            let carteT1 = document.getElementById("carte-top");
            console.log(carteT1);
            carteT1.innerHTML += `
            <img class="top-image-1" src="/myImage/${element.image}"></img>
            <div class="top-txt">
            <div><h5>${element.name}</h5></div>
            <div>${element.synopsis}</div>
            <div class="position-btn">  <a href="#"><button class="carte-btn">Voir plus ></button></a></div>
            </div>
            `

        };
        if (element.id ==26) {
            console.log(element.id);
            let carteT1 = document.getElementById("carte-top2");
            console.log(carteT1);
            carteT1.innerHTML += `
            <img class="top-image-1" src="/myImage/${element.image}"></img>
            <div class="top-txt">
            <div><h5>${element.name}</h5></div>
            <div>${element.synopsis}</div>
            <div class="position-btn">  <a href="#"><button class="carte-btn">Voir plus ></button></a></div>
            </div>
            ` }
            if (element.id ==26) {
                console.log(element.id);
                let carteT1 = document.getElementById("carte-top3");
                console.log(carteT1);
                carteT1.innerHTML += `
                <img class="top-image-1" src="/myImage/${element.image}"></img>
                <div class="top-txt">
                <div><h5>${element.name}</h5></div>
                <div>${element.synopsis}</div>
                <div class="position-btn">  <a href="#"><button class="carte-btn">Voir plus ></button></a></div>
                </div>
                `}
    });

};






