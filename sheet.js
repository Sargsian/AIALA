
let background = (id) => {
    if (document.getElementById(id).style.backgroundColor == "rgb(130, 232, 63)") {
        document.getElementById(id).style.backgroundColor = "red";
        localStorage.removeItem(`zero${id}`);
        
       
    } else {
    document.getElementById(id).style.backgroundColor = "rgb(130, 232, 63)";
    let tager = document.getElementById(id).id;
        localStorage.setItem(`zero${id}`, tager); 
}
 }
         
let load = () => {
        for(let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).substring(0,4) == "zero") {
            document.getElementById(localStorage.getItem(localStorage.key(i))).style.backgroundColor = "rgb(130, 232, 63)";
        }
    }
}

let noteSheet = () => {
    let num = 1;
    num +=8;
    num +=4;
    num +=11;
    num +=7;
    num +=9;
    num +=9;
    num +=9;
    num +=17;
    num +=8;
    num +=21;
    num +=12;
    num +=31;
    num +=1;
    num +=5;
    num +=7;
    num +=1;
    num +=8;
    num +=24;
    num +=11;
    num +=1;
    num +=1;
    num +=9;
    num +=20;
    num +=11;
    num +=12;
    num +=11;
    num +=12;
    num +=10;
    
    


    console.log(num)
    
    for (let i = 1; i <= 12; i++){
        num++;
        document.getElementById("videos").innerText += `<p class="notDone" id="${num}" onclick="background(${num})">VIDEO 32.${i}</p>\n`

    }
}






