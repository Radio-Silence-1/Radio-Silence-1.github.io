const mods = [
    {
        name: "Destabilized E's Modpack",
        description: "Makes mobs look like eyes.",
        url: "https://Radio-Silence-1.github.io/main.js",
        enabled: true
    }
];

function loadMod(num) { // 0-indexed!
    if (num >= 0 && num < mods.length) {
        if (mods[num].name && mods[num].description && mods[num].url && mods[num].enabled) {
            var script = document.createElement("script");
            script.src = mods[num].url;
            document.body.appendChild(script);
        }
        else {
            alert("Invalid mod!");
        }
    }
    else {
        alert("No such mod exists!");
    }
}

var pickScreen = document.createElement("div");
pickScreen.style = `
position: absolute;
top: 50%;
left: 50%;
width: 80vw;
height: 80vh;
transform: translate(-50%, -50%);
background-color: white;
box-sizing: border-box;
padding: 20px;
border-radius: 10px;
z-index: 1000000000000;
`;
pickScreen.innerHTML = `
<h1>N-Gon Mod Picker</h1>
<p>Please click a mod in the list below to enable it.</p>
<ul id="picklist">

</ul>
<button id="close" onclick="this.parentNode.style.display = 'none'">Close</button>
<style>
#picklist > li {
    color: green;
    user-select: none;
}
#picklist > li:hover {
    color: lightgreen;
}
</style>`;
document.body.appendChild(pickScreen);
var picklist = document.getElementById("picklist");
mods.forEach((mod, i) => {
    var listitem = document.createElement("li");
    listitem.innerHTML = `
    <b>${mod.name}</b><br>
    <i>${mod.description}</i><br>
    `;
    listitem.onclick = () => {
        loadMod(i);
        listitem.style.color = "purple";
        listitem.onclick = undefined; // don't allow double-loading.
    };
    picklist.appendChild(listitem);
});