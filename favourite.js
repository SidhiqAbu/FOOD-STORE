


// importing of html tag..
const container=document.getElementById("moreMeals");


//  diplay of Fovourite Items in a container box................
function myFavourite(){
    container.innerHTML=" ";
    for(let key in localStorage){
          if(key !== "detials"){
                  console.log(key);
                  let val=localStorage.getItem(key);
                  console.log(val);
               if(val!==null){
                        const elt=val.split(",");
                        console.log(elt);
                         let InfoDiv=document.createElement("div");
                         let Info=`
                          <a href="./meal.html"  id="mealsItem" name="elem.idMeal" target="_black">
                           <div class="card1 " style="width: 12rem;" onclick="detailbox('${elt[1]}')">
                          <img src="${elt[9]}" class="card-img-top" alt="..."></a>
                            <div class="card-body">
                           <h6 class="card-title">${elt[1]}</h6>
                           <i class="fa-solid fa-heart" id="box1" style="color:red; cursor: pointer;" onclick="remove('${elt[1]}')" ></i>
                         </div>
                         </div>`
                     InfoDiv.innerHTML=Info;
                    container.appendChild(InfoDiv);
             }
          }
      };
};

//  innitail call of displaying favourite Items...in a container...........
myFavourite();


// updating or Inserting full meal details in LocalStorage to display in meal.html page.........
 function detailbox(ev){
  localStorage.setItem("detials", localStorage.getItem(ev));         
}


//  removing Item from favourite List of Items.........
function remove(ev){
    localStorage.removeItem(ev);
      myFavourite();
}



//  cheking changes in localStorage............
window.addEventListener("storage", function () {
  myFavourite();
}, false);
  

