var haetun_leffan_nimi = "";

haeArvosteludata();

async function haeArvosteludata(){
  const response = await fetch('api/arvostelut');
  const data = await response.json();
  console.log(data);
  console.log(data[0].arvostelija);
  taytaArvostelutaulukko(data);
}

function taytaArvostelutaulukko(data) {
  // Find a <table> element with id="myTable":
  var table = document.getElementById("arvostelutaulukko");

  for (var i = 0; i < data.length; i++) {

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(i + 1);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    // Add some text to the new cells:
    cell1.innerHTML = data[i].leffa;
    cell2.innerHTML = data[i].arvostelu;
    cell3.innerHTML = data[i].arvostelija;
  }
}

function tyhjenna_arvostelutaulukko(){
  var table = document.getElementById("arvostelutaulukko");
  var rivien_maara = table.rows.length - 1;

  for (var i = 0; i < rivien_maara; i++) {
      table.deleteRow(1);
  }
}


function haeElokuva(){

   haeElokuvaData();

}


async function haeElokuvaData(){

  var leffan_nimi = document.getElementById("elokuva").value;
  var leffan_vuosi = document.getElementById("vuosi").value;

  const hakurimpsu = 'https://www.omdbapi.com/?t=' + leffan_nimi + '&y=' + leffan_vuosi + '&apikey=a95f3723';

  console.log(hakurimpsu);

  const vastaus = await fetch(hakurimpsu);
  const data = await vastaus.json();
  haetun_leffan_nimi = data.Title;
  console.log(haetun_leffan_nimi);
  document.getElementById("elokuvan_nimi").innerHTML = data.Title;

  var poster = document.getElementById("elokuvan_juliste");
  poster.src = data.Poster;

}

function arvosteleElokuva(){
  var leffa = haetun_leffan_nimi;
  var arvostelu = document.getElementById("arvostelu").value;
  var arvostelija = document.getElementById("arvostelija").value;
  console.log(haetun_leffan_nimi);
  const data = {leffa, arvostelu, arvostelija};
  const options = {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  };

  fetch('/api/arvostelu', options).then(function(response) {
      console.log(response)
      if(response.status == 200){
        console.log("Push OK!")
        tyhjenna_arvostelutaulukko()
        haeArvosteludata();
      }
    }, function(error){
      console.log(error.message);
    });
}
