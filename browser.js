alert("To select a mod, on the next popup, type the identifier of the mod you would like to download.\nFor example: 'Example mod (1)', to get the mod, you input '1'");   
let mod=prompt("Eye Mod (1)\nPlaceholder (2)");    
url=null
if(mod=="1"){        
  url="https://Radio-Silence-1.github.io/main.js"
}    
else if(mod=="2"){        
  alert("place holder")    
}    
else{        
  alert("Option not recognized")    
}    
if(url != null){
  var script = document.createElement("script");script.src = url;document.body.appendChild(script);
}
