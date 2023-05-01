const templateURL = "https://www.facebook.com/marketplace/|CITY|/search?query=|STRING|&radius=805&deliveryMethod=local_pick_up";
const data = {
  usa: {
    name: "USA",
    cities: ["Portland, OR", "Los Angeles, CA", "Durango, CO", "Belle Fourche, SD", "Dallas, TX", "Chicago, IL", "Jacksonville, FL", "New York City, NY"],
    cities_fb: ["portland", "la", "108129565875623", "108000445889838", "dallas", "chicago", "jacksonville", "nyc"],
    coverage: "https://www.mapdevelopers.com/draw-circle-tool.php?circles=%5B%5B804670%2C34.0536909%2C-118.242766%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B804670%2C45.5202471%2C-122.6741949%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B804670%2C30.3321838%2C-81.655651%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B804670%2C40.7127281%2C-74.0060152%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B804670%2C41.8755616%2C-87.6244212%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B804670%2C37.2713951%2C-107.8815978%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B804670%2C32.7762719%2C-96.7968559%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B804670%2C44.670905%2C-103.851407%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%5D"
  },
  can: {
    name: "Canada",
    cities: ["Norman Wells, NT", "Grande Prairie, AB", "Stony Rapids, SK", "Moosomin, SK",  "Kugaaruk, NU", "Iqaluit, NU", "Attawapiskat, ON", "Hawkesbury, ON", "Natashquan, QC"],
    cities_fb: ["113723315304965", "105470856153272", "104312566276295", "107618862600598", "112876795393840", "110374205650843", "107697472593831", "103731012999308", "104936519542478"],
    coverage: "https://www.mapdevelopers.com/draw-circle-tool.php?circles=%5B%5B805000%2C65.282401%2C-126.832725%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B805000%2C55.1499254%2C-118.7948516%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B805000%2C59.259775%2C-105.8050178%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B805000%2C50.1450094%2C-101.6710024%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B805000%2C68.5347371%2C-89.8122665%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B805000%2C63.7366418%2C-68.5227046%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B805000%2C52.9244075%2C-82.4270112%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B805000%2C45.610281%2C-74.6055611%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%2C%5B805000%2C50.1839077%2C-61.8174062%2C%22%23FFAAAA%22%2C%22%23FF0000%22%2C0.4%5D%5D"
  },
  aus: {
    name: "Australia",
    cities: ["Hobart, Tasmania","Deniliquin, New South Wales","Oakden Hills","Tamworth, New South Wales","Quilpie, Queensland","Alice Springs, Northern Territory","Mount Isa, Queensland","Yeppoon, Queensland","Port Douglas","Darwin, Northern Territory","Port Hedland, Western Australia","Carnarvon, Western Australia","Warralakin, Western Australia, Australia"],
    cities_fb: ["111652435519898","104020242968596","277036799317188","112577755420955","109465839072367","107929299235881","109419219084130","108131009215930","106373139394499","108143959213846","108013745893781","103825936322408","106555549377269"],
    coverage: "https://www.mapdevelopers.com/draw-circle-tool.php?circles=%5B%5B500000%2C-23.1348035%2C150.7436625%2C%22%23AAAAAA%22%2C%22%23000000%22%2C0.4%5D%2C%5B500000%2C-31.0900743%2C150.9290159%2C%22%23AAAAAA%22%2C%22%23000000%22%2C0.4%5D%2C%5B500000%2C-35.5302183%2C144.9597178%2C%22%23AAAAAA%22%2C%22%23000000%22%2C0.4%5D%2C%5B500000%2C-31.6340904%2C137.0093025%2C%22%23AAAAAA%22%2C%22%23000000%22%2C0.4%5D%2C%5B500000%2C-30.973621%2C118.5704973%2C%22%23AAAAAA%22%2C%22%23000000%22%2C0.4%5D%2C%5B500000%2C-16.4845983%2C145.4636294%2C%22%23AAAAAA%22%2C%22%23000000%22%2C0.4%5D%2C%5B500000%2C-42.8825088%2C147.3281233%2C%22%23AAAAAA%22%2C%22%23000000%22%2C0.4%5D%2C%5B500000%2C-20.3111814%2C118.5801181%2C%22%23AAAAAA%22%2C%22%23000000%22%2C0.4%5D%2C%5B500000%2C-12.46044%2C130.8410469%2C%22%23AAAAAA%22%2C%22%23000000%22%2C0.4%5D%2C%5B500000%2C-23.6983884%2C133.8812885%2C%22%23AAAAAA%22%2C%22%23000000%22%2C0.4%5D%2C%5B500000%2C-20.7289898%2C139.4931522%2C%22%23AAAAAA%22%2C%22%23000000%22%2C0.4%5D%2C%5B500000%2C-26.6152676%2C144.2600904%2C%22%23AAAAAA%22%2C%22%23000000%22%2C0.4%5D%2C%5B500000%2C-24.8826131%2C113.6576486%2C%22%23AAAAAA%22%2C%22%23000000%22%2C0.4%5D%5D"
  }
}
var curCountry = "usa";

function fbSearch() {
  const search = document.getElementById('search').value.trim();
  if (search==="") return;
  for (let city of data[curCountry].cities_fb) {
    window.open(templateURL.replace('|CITY|', city).replace('|STRING|', search), "fbmp"+curCountry+"search"+city);
  }
}

window.addEventListener("load", () => {
  document.getElementById('search').focus();
  document.getElementById('tabsinfo').setAttribute('title', '500 miles radius of:\n' + data[curCountry].cities.join('\n'));
  document.getElementById('tabsinfo').setAttribute('link', data["usa"].coverage);
});

document.getElementById('submit').addEventListener("click", fbSearch);
document.getElementById('search').addEventListener("keyup", (event) => {
  event.key==="Enter" && fbSearch();
});
document.getElementById('warped').addEventListener("click", () => {
  window.open("http://www.gmoz.biz", "_blank");
});
document.getElementById('tabsinfo').addEventListener("click", (evt) => {
  window.open(data[curCountry].coverage, "_blank");
});
document.getElementById('country').addEventListener("change", (evt) => {
  curCountry = evt.target.value;
  console.log('Dropdown changed to "' + curCountry + '"', evt);
  document.getElementById('tabcount').innerHTML = data[curCountry].cities.length;
  document.getElementById('tabsinfo').setAttribute('title', '500 miles radius of:\n' + data[curCountry].cities.join('\n'));
});
