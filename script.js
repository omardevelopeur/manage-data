let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let create=document.getElementById("submit");
let tbody=document.getElementById("tbody");
let deleteAll=document.getElementById("deleteAll");
let search=document.getElementById("search")
let mood="create";
let searchmood="title";
function gettotal(){
    let result=(+price.value + +taxes.value + +ads.value)
     - +discount.value
    if(price.value !=""){
        total.innerHTML=result;
        total.style["background-color"]='green';
    }else{
        total.innerHTML="";
        total.style["background-color"]='red';
    }
}
let datapro;
if(localStorage.product !=null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[]
}
let temp;
create.onclick=function(){
    let newpro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }

    if(title.value !="" && price.value !="" && category.value !="" && count.value<100){
        if(mood==="create"){
            if(newpro.count>1){
                for(let i=0; i<newpro.count;i++){
                    datapro.push(newpro)
                }
            }else{
                datapro.push(newpro)
            }
        }else{
            datapro[temp]=newpro;
            count.style.display="block";
            create.innerHTML="create";
            mood="create";
        }
        clearobj()
    }

    localStorage.setItem("product",JSON.stringify(datapro))
    showdata()
}
function clearobj(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
}
function showdata(){
    table='';
  for(let i=0;i<datapro.length;i++){
    
    table+=`
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].category}</td>
    <td>${datapro[i].total}</td>
    <td><button onclick="updatedata(${i})" id='update'>update</button></td>
    <td><button onclick="deletedata(${i})" id='delete'>delete</button></td>
    </tr>
    `
  }
  tbody.innerHTML=table;
  if (datapro.length>0){
    deleteAll.innerHTML=`
    <button onclick="console.log(deleteAl())">deleteAll ${datapro.length}</button> `
  }else{
    deleteAll.innerHTML=""
  }
  gettotal()
}
showdata()
function deletedata(i){
datapro.splice(i,1)
localStorage.product=JSON.stringify(datapro)
showdata()
}
function deleteAl(){
    localStorage.clear();
    datapro.splice(0)
    showdata()
}
function updatedata(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    total.value=datapro[i].total;
    category.value=datapro[i].category;
    create.innerHTML="update";
    count.style.display="none";
    mood="update";
    temp=i;
    gettotal();
    scroll({
        top:0,
    })
}
function datamood(id){
   if(id==="searchtitle"){
searchmood="title";
   }else{
searchmood="category"
   }
search.placeholder=`search by ${searchmood}`;
search.value="";
}
function searchword(value){
    let table="";
   if(searchmood==="title"){
    for(i=0;i<datapro.length;i++){
        if(datapro[i].title.includes(value)){
            table+=`
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].category}</td>
            <td>${datapro[i].total}</td>
            <td><button onclick="updatedata(${i})" id='update'>update</button></td>
            <td><button onclick="deletedata(${i})" id='delete'>delete</button></td>
            </tr>
         `
        }
    }
   }else{
    for(i=0;i<datapro.length;i++){
        if(datapro[i].category.includes(value)){
            table+=`
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].category}</td>
            <td>${datapro[i].total}</td>
            <td><button onclick="updatedata(${i})" id='update'>update</button></td>
            <td><button onclick="deletedata(${i})" id='delete'>delete</button></td>
            </tr>
         `
        }
    }
   }
   tbody.innerHTML=table;
}














