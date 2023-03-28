

// SCRIPT.JS FOR HOME PAGE OF HTML ..........

// importing of document element.......
const input=document.getElementById("input1");
const msg=document.getElementById("msg");
const submit=document.getElementById("btn1");
const container=document.getElementById("moreMeals");


//  finding full meal details using the using the Name  OF Meal Item.....
async function getdetails(term){  
    const resp = await fetch(
     "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
     );
 
    const respData = await resp.json();
    const meals = respData.meals;
    return meals;
 
 }

 
//   Searching Items with First latter to give suggestion to input box.......
 async function getdetailsByLetter(term){  
    const resp = await fetch(
     "https://www.themealdb.com/api/json/v1/1/search.php?f=" + term
     );
 
    const respData = await resp.json();
    const meals = respData.meals;
    return meals;
 }
 
  
// updating the input search..Items list by first letter of dish name..
 async function checkByLetter(){
    if(input.value.length !== 0){
    msg.style.height="200px";
    msg.style.display="block";
    let val=input.value;
    const data= await getdetailsByLetter(val);
        console.log(data);
        msg.innerText="";
        if(data){
            data.forEach(elem=>{
                let paratext=document.createElement("div");
                paratext.innerHTML=`<div id="itemName">${elem.strMeal}</div>`
                msg.appendChild(paratext);
            });
        }
    }else{
        msg.style.display="none"
    }
};


// Updating list of similar Item dishes you have searched in input search bar...........
async function itemsMeal(data1){
    const meals = await getdetails(data1);
    if (meals) {
        container.innerText="";
        meals.forEach((elt) => {
            msg.style.display="none";
            let InfoDiv=document.createElement("div");
                let Info=`
                <a href="./meal.html"  id="mealsItem"   target="_black">
                <div class="card " style="width: 12rem;" onclick="detailbox('${elt.strMeal}')">
                <img src="${elt.strMealThumb}" class="card-img-top" alt="..."></a>
                <div class="card-body">
                  <h6 class="card-title">${elt.strMeal}</h6>
                  <i class="fa-solid fa-heart box" id="${elt.strMeal}" onclick="myFunction('${elt.strMeal}')" ></i>    
                </div>
              </div>`
             InfoDiv.innerHTML=Info;
             container.appendChild(InfoDiv);
        });
    }else{
        console.log("not found");
        msg.style.display="block";
        msg.innerText="Item Not Fount";
    }
    checkingFav();
};

{/* <input type="checkbox" class="box" id="${elt.strMeal}" onclick="myFunction('${elt.strMeal}')"></input> */}
// updating or Inserting full meal details to display in the meal.html page.....
async function detailbox(ev){
    const arr1=await getdetails(ev)
    const arr=arr1[0];
    let val=arr.idMeal+","+arr.strMeal+","+arr.strCategory+","+arr.strIngredient1+","+arr.strIngredient2+","+arr.strIngredient3+","+arr.strIngredient4+","+arr.strYoutube+","+arr.strArea+","+arr.strMealThumb;
    localStorage.setItem("detials", val);         
}


//  innitail items of home page....
itemsMeal("");

// Storing the Input Search Name of Iteam........
var lastName="";
// searching Item when submiting the Name of Item in input search bar....
submit.addEventListener('click',()=>{
    let inputValue=input.value;
    lastName=inputValue;
    console.log(inputValue);
    itemsMeal(inputValue);
    input.value="";
});

// Adding Item to favourite list and also removing Item in favourite list if it exists......
 async function myFunction(ev){
    console.log(ev);
    let check=document.getElementById(ev);
    if (localStorage.getItem(ev) !== null) {
    //     // The value exists.............
              localStorage.removeItem(ev);
              check.style.color="blue";
      } else {
        check.style.color="red";
        const val=await getdetails(ev)
        const arr=val[0];
        console.log(arr);
        let val1=arr.idMeal+","+arr.strMeal+","+arr.strCategory+","+arr.strIngredient1+","+arr.strIngredient2+","+arr.strIngredient3+","+arr.strIngredient4+","+arr.strYoutube+","+arr.strArea+","+arr.strMealThumb;
        console.log(val);
        // The value does not exist.............
        localStorage.setItem(arr.strMeal, val1);
      }
}

// checking check box ckecked by using Favourite List Items......
function checkingFav(){
    Object.keys(this.localStorage).forEach(function(key){
            if(key !=="detials" & key !==null){
                console.log("$$",key);
                let check=document.getElementById(key);
                if(check !==null){
                    // check.checked=true;
                    check.style.color="red";
                }
            }
    });
}

//  cheking changes in localStorage...and updating Items in page......
window.addEventListener("storage", function () {
    itemsMeal(lastName);
}, false);
    
