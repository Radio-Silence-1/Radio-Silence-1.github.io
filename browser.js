(async () => {     
  alert("To select a mod, on the next popup, type the identifier of the mod you would like to download.\nFor example: 'Example mod (1)', to get the mod, you input '1'");   
  let mod=prompt("Example Mod (1)\nPlaceholder (2)");    
  if(mod=="1"){        
    const scriptText = await (       
      await fetch('https://raw.githubusercontent.com/Radio-Silence-1/ngon-mod-browser/main/main.js')).text();         
      eval(scriptText) ;    
  }    
  else if(mod=="2"){        
    alert("place holder")    
  }    
  else{        
    alert("Option not recognized")    
  }    
})()
