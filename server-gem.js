function processData(input) {
    var gems=[];
    var Oldarr=input.split('\n');
    var N=parseInt(Oldarr.splice(0,1));
    var Gems=[];
    var arr=[];
    
    

    var arrlength=Oldarr.length;
    for(i=0;i<arrlength;i++){
        var text=Oldarr[i].toString();
        console.log("Checking :",text);
        if(text.length<=10){
            console.log("check %s with %s",text,text.toUpperCase())
            if(text != text.toUpperCase()){
                if(text != ''){
                    arr.push(text);
                }
            }
        }
        // if(text === text.toUpperCase() || text.length > 10 || text === '' ){
        //     arr.splice(i,1);
        // }else{
        //     arr.push(text);
        // } 
    }
    // arr.forEach(function(ele,index){
    //     if(ele == ele.toUpperCase() || ele.length > 10 || ele === '' ){
    //         arr.splice(index,1);
    //     }
    // });
    console.log("Array : ",arr);

    if(N <= 100){
        text1=arr[0].split('');
        text2=arr[1].split('');
        if(text1.length <=100 && text2.length<=100){
            text1.forEach(function(char,index){
                if(text2.indexOf(char) > -1 && gems.indexOf(char) == -1){
                gems.push(char);  
                }
            }); 
        }      

         arr.forEach(function(ele){
            text=ele.split('');           
            console.log("Compare [%s] with [%s]",text,gems);
            Gems=gems.slice();
            gems.forEach(function(gem,index){
               console.log("Compare [%s] with [%s]",gem,text); 
                if(text.indexOf(gem) == -1){
                     console.log("Deleting [%s] from [%s]",gems[index],Gems);
                   Gems.splice(Gems.indexOf(gem),1);
                  //del.push(gem);
                }
            });
        });
        console.log(Gems.length);
        return Gems.length;
    }else{
       return 0;
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




