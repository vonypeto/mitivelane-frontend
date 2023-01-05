
export const ObjCapitalizeKey = (obj, filter = []) => {

    for(var i = 0; i<obj.length;i++) {
    
        var a = obj[i];
        for (var key in a) {
            if (a.hasOwnProperty(key) && !filter.includes(key)) {
              var arrayKey = key.split("_");
              
              var newKey = ""
              for (var x=0; x < arrayKey.length; x++) {
                arrayKey[x] = arrayKey[x].charAt(0).toUpperCase() + arrayKey[x].slice(1);
                newKey += x != arrayKey.length -1 ? arrayKey[x] + " " : arrayKey[x]
              }
    
              a[newKey] = a[key];
            }
            delete a[key];
        }
        obj[i] = a;
    
    }
      console.log(obj)
      return(obj)
}