function updateDateTime(){

const now = new Date();
const hour = now.getHours();

let greeting = "";

if(hour >= 4 && hour < 11){
greeting = "🌤️ Halo, Selamat Pagi";
}
else if(hour >= 11 && hour < 15){
greeting = "☀️ Halo, Selamat Siang";
}
else if(hour >= 15 && hour < 18){
greeting = "🌥️ Halo, Selamat Sore";
}
else{
greeting = "🌙 Halo, Selamat Malam";
}

const tanggal = now.toLocaleDateString(
"id-ID",
{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric"
}
);

const jam = now.toLocaleTimeString("id-ID");

const greetingEl = document.getElementById("greeting");
const datetimeEl = document.getElementById("datetime");

if(greetingEl){
greetingEl.textContent = greeting;
}

if(datetimeEl){
datetimeEl.textContent = ${tanggal} • ${jam};
}

}

updateDateTime();
setInterval(updateDateTime, 1000);

/* NAVBAR */

fetch('navbar.html')
.then(response => response.text())
.then(data => {

const container =
document.getElementById(
'navbar-container'
);

if(container){

container.innerHTML = data;  

const scripts =  
container.getElementsByTagName(  
    "script"  
);  

for(let i=0;i<scripts.length;i++){  

    eval(  
        scripts[i].innerText  
    );  

}

}

})
.catch(() => {
console.log(
"Navbar tidak ditemukan."
);
});

/* DATA */

let totalUang = 0;
let dataRiwayat = [];

try{

const savedTotal =
localStorage.getItem(
"savedTotalUang"
);

const savedRiwayat =
localStorage.getItem(
"savedDataRiwayat"
);

if(savedTotal){

totalUang =  
parseFloat(savedTotal);

}

if(savedRiwayat){

dataRiwayat =  
JSON.parse(savedRiwayat) || [];

}

}catch(error){

totalUang = 0;
dataRiwayat = [];

}

/* HELPER */

function formatAngka(angka){

return angka.toLocaleString(
"id-ID",
{
minimumFractionDigits:2,
maximumFractionDigits:2
}
);

}

function getTanggalHariIni(){

const today = new Date();

const dd =
String(
today.getDate()
).padStart(2,"0");

const mm =
String(
today.getMonth()+1
).padStart(2,"0");

const yyyy =
today.getFullYear();

return ${dd}/${mm}/${yyyy};

}

/* RENDER */

function renderTampilan(){

document
.getElementById(
"displayTotal"
)
.innerText =
formatAngka(totalUang);

document
.getElementById(
"displayTanggal"
)
.innerText =
getTanggalHariIni();

const listContainer =
document.getElementById(
"riwayatList"
);

if(!listContainer) return;

listContainer.innerHTML = "";

if(dataRiwayat.length === 0){

listContainer.innerHTML = `  
    <p style="  
    text-align:center;  
    color:#2d63d8;  
    font-weight:700;">  
    Belum ada riwayat.  
    </p>  
`;  

return;

}

dataRiwayat.forEach(item => {

listContainer.innerHTML += `  
    <div class="riwayat-item">  

        <div>  
            <strong>  
                ${item.tipe}  
            </strong>  
        </div>  

        <div  
        style="text-align:right;">  

            <div>  
                ${item.tanggal}  
            </div>  

            <div  
            style="  
            color:#13a34a;">  

                + ${formatAngka(  
                    item.nominal  
                )}  

            </div>  

        </div>  

    </div>  
`;

});

}

/* TAMBAH DATA */

window.tambahRiwayat = function(){

const input =
document.getElementById(
"inputNominal"
);

const cleanInput =
input.value.replace(
/[^0-9]/g,
""
);

const nominal =
parseFloat(cleanInput);

if(
isNaN(nominal) ||
nominal <= 0
){

alert(  
    "Masukkan angka yang bener kocakkk!"  
);  

return;

}

totalUang += nominal;

dataRiwayat.unshift({

tipe:"Uang Masuk",  

tanggal:  
getTanggalHariIni(),  

nominal:nominal

});

input.value = "";

renderTampilan();

};

/* SAVE */

window.simpanData = function(){

localStorage.setItem(
"savedTotalUang",
totalUang
);

localStorage.setItem(
"savedDataRiwayat",
JSON.stringify(
dataRiwayat
)
);

alert(
"Mantap! Data berhasil disimpan. 💾"
);

};

window.onload =
renderTampilan;

function getTanggalHariIni(){

const now = new Date();

return now.toLocaleString(
"id-ID",
{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric",
hour:"2-digit",
minute:"2-digit",
second:"2-digit"
}
);

}

setInterval(() => {

const tanggalEl =
document.getElementById(
"displayTanggal"
);

if(tanggalEl){

tanggalEl.innerText =  
getTanggalHariIni();

}

},1000);

dataRiwayat.unshift({

tipe:"Uang Masuk",  

keterangan:  
document  
.getElementById(  
    "inputKeterangan"  
).value,  

tanggal:  
getTanggalHariIni(),  

nominal:  
nominal

/* Logic Navigasi */
const navIcon = document.getElementById('navIcon');
const navMenu = document.getElementById('navMenu');

navIcon.addEventListener('click', () => {
    navIcon.classList.toggle('active');
    navMenu.style.display = (navMenu.style.display === 'block') ? 'none' : 'block';
});

/* Update Tambah Data dengan Keterangan */
window.tambahRiwayat = function(){
    const nominalInput = document.getElementById("inputNominal");
    const ketInput = document.getElementById("inputKeterangan");
    
    const nominal = parseFloat(nominalInput.value.replace(/[^0-9]/g, ""));
    const keterangan = ketInput.value || "Uang Masuk"; // Default jika kosong

    if(isNaN(nominal) || nominal <= 0){
        alert("Masukkan angka yang bener kocakkk!");
        return;
    }

    totalUang += nominal;
    dataRiwayat.unshift({
        tipe: keterangan, // Menggunakan isi input keterangan
        tanggal: new Date().toLocaleString("id-ID"),
        nominal: nominal
    });

    nominalInput.value = "";
    ketInput.value = "";
    renderTampilan();
    simpanData();
};

/* Jam Realtime di Display */
setInterval(() => {
    const tanggalEl = document.getElementById("displayTanggal");
    if(tanggalEl) {
        tanggalEl.innerText = new Date().toLocaleString("id-ID", {
            day: "numeric", month: "long", year: "numeric",
            hour: "2-digit", minute: "2-digit", second: "2-digit"
        });
    }
}, 1000);
