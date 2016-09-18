function processData(input) {
    var alpha='abcdefghijklmnopqrstuvwxyz';
    var gems=alpha.split('');
    var Oldarr=input.split('\n');
    var N=parseInt(Oldarr.splice(0,1));
    var Gems=[];
    var arr=[];
    var find=false;
    var gemsFound=0;
    var uniq='';

    var clearArray=[];

    if(N>=1 && N<=100){
        Oldarr.forEach(function(str,index){
            if(str == ''){
                Oldarr.splice(index,1);
            }else{
                 if(checkForLowerAndLength(str)){
                    console.log("String is valid!! ",str);
                    clearArray.push(str);
                }else{
                    console.log("String is not valid");
                   // Oldarr.splice(index,1);
                }
            }           
        });
        console.log("clearArray length ",clearArray.length);
         console.log("Clean Array !!",clearArray);

        // text1=clearArray[0].split('');
        // text2=clearArray[1].split('');
        // if(text1.length <=100 && text2.length<=100){
        //     text1.forEach(function(char,index){
        //         if(text2.indexOf(char) > -1 && gems.indexOf(char) == -1){
        //         gems.push(char);  
        //         }
        //     }); 
        // } 

    //   clearArray.forEach(function(str,index){           
    //         text1=clearArray[0].split('');
    //         text2=str[1].split('');
    //         text1.forEach(function(char){
    //             if(text2.indexOf(char)){
    //                 if(gems.indexOf(char) <= -1){
    //                     gems.push(char);
    //                 }else{

    //                 }
    //             }else{
    //                 if(gems.indexOf(char)){
    //                     console.log("Deleting !!");
    //                     gems.splice(gems.indexOf(char),1);
    //                 }else{

    //                 }
    //             }
    //            // console.log("gems :",gems); 
    //         });
    //  });
        //console.log("Gems ",gems);
        Gems=gems.slice();
        var gemLength=gems.length;
         clearArray.forEach(function(ele){
             //var gemCount=0;
            // ele='avyceob';
            uniq=unique(ele);
            text=uniq.split('');
            console.log("Gems ** %s",gems); 
            console.log("***");
            for(i=0;i<gems.length;i++){
                console.log("Checking %s is in  %s ",gems[i],text);
                if(text.indexOf(gems[i]) < 0){
                    gems.splice(i,1);
                    i--;
                }
            }
            // gems.forEach(function(gem,index){
            //     //  console.log("Compare [%s] with [%s]",gem,text); 
            //     if(text.indexOf(gem) < 0){
            //         console.log("Existing Gems :",gems);
            //         console.log("Deleting %s because its is not in %s",gem,text);
            //         gems.splice(index,1);
            //         //Gems.splice(Gems.indexOf(gem),1);
            //     }
            // });
        });
       console.log("Gems Found ",gems);


       
    }else{
        console.log("N is Greater or Less than 0");
    }


    }

  function unique(str) {
  var result = '';
  for(var i = 0; i < str.length; i++) {
    if(result.indexOf(str[i]) < 0) {
      result += str[i];
    }
  }
  return result;
}  
function checkForLowerAndLength(str){
    var strings = str.toString();
    console.log("Checking ",strings);
    var i=0;
    var character;
    var bool=true;
    if(strings.length>=1 && strings.length <=100){
         while (i <= strings.length-1){
            character = strings.charAt(i);        
            if (!isNaN(character * 1)){
                return false;
            }else if (character == character.toUpperCase()) {
                return false;
            }
            i++;     
        }
      console.log("Chracter %s bool %s ",character,bool);
      return true;
    }else{
        return false;
    }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});




