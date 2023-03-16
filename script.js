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