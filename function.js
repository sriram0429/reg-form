
const email=document.getElementById('email');
email.addEventListener('input',()=> Validate(email));

function Validate(ele){
    if (ele.validity.typeMismatch){
        ele.setCustomValidity("enter Email in right format");
        ele.reportValidity();
    }
    else{
        ele.setCustomValidity("");
    }
}

const dob=document.getElementById('dob');
dob.addEventListener('input',()=> verifydob(dob));

function verifydob(ele){
    var dob = new Date(ele.value);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff); 
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);

    if (age<18 || age>55 ){
        ele.setCustomValidity("Age should be between 18 and 55 only !!");
        ele.reportValidity();
    }

    else{
        ele.setCustomValidity("");
    }
}



let userForm=document.getElementById("t1");
const retrieveEntries=()=> {
    let entries=localStorage.getItem("user-entries");
    if (entries){
        entries = JSON.parse(entries);
    }
    else{
        entries=[]
    }
    return entries;
}

let userEntries=retrieveEntries();

function displayEntries(){
    let table = document.getElementById("user-table");
    let entries = retrieveEntries();
    let str = `<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>\n`;
    for(let i=0;i<entries.length;i++){
        str += `<tr>
                    <td>${entries[i].Name}</td>
                    <td>${entries[i].Email}</td>
                    <td>${entries[i].Password}</td>
                    <td>${entries[i].Dob}</td>
                    <td>${entries[i]. AcceptTerms}</td>
                </tr>\n`;
    }
    table.innerHTML = str;
}

const SaveUserForm = (eve)=>{
    eve.preventDefault();
    const Name=document.getElementById("name").value;
    const Email=document.getElementById("email").value;
    const Password=document.getElementById("password").value;
    const Dob=document.getElementById("dob").value;
    const AcceptTerms=document.getElementById("acceptTerms").checked;

    const entry={
        Name,
        Email,
        Password,
        Dob,
        AcceptTerms
    };
    userEntries.push(entry);
    localStorage.setItem("user-entries",JSON.stringify(userEntries));
    displayEntries();
}
userForm.addEventListener("submit",SaveUserForm);
displayEntries();

