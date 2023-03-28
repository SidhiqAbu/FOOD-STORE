



// MEAL DETAIL PAGE SCRIPT.JS FILE............
const heading=document.getElementById('heading');
const imgContainer=document.getElementById('img-container');
const name1=document.getElementById('name');
const cat=document.getElementById('cat');
const ing1=document.getElementById('in1');
const ing2=document.getElementById('in2');
const ing3=document.getElementById('in3');
const ing4=document.getElementById('in4');
const Area=document.getElementById('contry');
const youtub=document.getElementById('youtub');
const dtml=document.getElementById("meal-deatails-plate");




// updating the Meal details In a container.......
function updateMealDetails(){
let val=localStorage.getItem('detials');
const elem=val.split(",");
console.log(elem);
        imgContainer.innerHTML=`
        <img src="${elem[9]}" id="detail-img">`
        name1.innerText += " "+elem[1]
        cat.innerText += " "+elem[2];
        ing1.innerText +=" "+ elem[3];
        ing2.innerText +=" "+ elem[4];
        ing3.innerText +=" "+ elem[5];
        ing4.innerText +=" "+ elem[6];
        youtub.innerText +=" "+ elem[7];
        Area.innerText += " "+elem[8];    
    
}

            


// calling to page refresh when Item or change .....
window.addEventListener("storage",function(){
        this.location.reload();
       
},false);

//  calling of container to diplay Items full details......
updateMealDetails();