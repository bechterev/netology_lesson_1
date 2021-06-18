#!/usr/bin/node
const ya = require('yargs').argv;
const readline = require('readline');
let current = ya._[0]==='current'?'current':ya._[0];

function conditionDataCurrent(param){
    let d = new Date()
    switch(true){
        case param.year:
        case param.y:
            return [dateChange = d.getFullYear(), 'Y']
            break;
        case param.month:
        case param.m:
            return [dateChange = d.getMonth(), 'M']
            break;
        case param.date:
        case param.d:
            return [dateChange = d.getDate(), 'D']
            break;
        default:
            return dateChange=d;
            break;
    }
}
function conditionDate(param,oper,value){
let dateChange = conditionDataCurrent(param);
    let nDate;
    switch(dateChange[1]){
        case 'D' :
            if(oper == 'add')   nDate = new Date().setDate(dateChange[0] + value);
            else nDate = new Date().setDate(dateChange - value);
            break;
        case 'Y' :
            if(oper == 'add')   nDate = new Date().setFullYear(dateChange[0] + value);
            else nDate = new Date().setFullYear(dateChange - value);
            break;
        case 'M' :
            if(oper == 'add')   nDate = new Date().setMonth(dateChange[0] + value);
            else nDate = new Date().setMonth(dateChange - value);
            break;
            
    }
    
    return new Date(nDate).toISOString();
}
if(process.argv.length>2){
    if(current === 'current'){
    }
    else {
        console.log(new Date().getDate())
        let param = {[process.argv[3].split(/-/i).join('')]:true};
        console.log(conditionDate(param,current,Number(process.argv[4])))
    }

}
// Task 2
else{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    let genNumb = Math.floor((Math.random()*100)+1);
    console.log(genNumb);

    rl.question('Загадано число в диапазоне от 0 до 100 \n',(value)=>
    {
        value = value.trim();
        if(value == genNumb)  rl.close();
        if(parseInt(value)>genNumb) {rl.setPrompt('больше'+'\n');
        rl.prompt();
        rl.on('line',(value)=>{
            if(value == genNumb)  rl.close();
            else if(parseInt(value)>genNumb) {rl.setPrompt('больше'+'\n');
            rl.prompt();}
            else {
                rl.setPrompt('меньше'+'\n');
                rl.prompt();
            }
        })}
        else if (parseInt(value)<genNumb) {rl.setPrompt('меньше'+'\n');
        rl.prompt();
        rl.on('line',(value)=>{
            if(value == genNumb)  rl.close();
            else if(parseInt(value)>genNumb) {rl.setPrompt('больше'+'\n');
            rl.prompt();}
            else {
                rl.setPrompt('меньше'+'\n');
                rl.prompt();
            }
        })
    }

        
    })
    rl.on('close',()=>console.log(`Отгаданное число ${genNumb}`));
}


