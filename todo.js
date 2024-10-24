const fs = require('fs')
const filePath = './task.json'

function loadTask(){
   try{
    const data=fs.readFileSync(filePath,'utf-8')
    return JSON.parse(data)
   }
   catch(error){
    console.log(error)
    return []
   }
}
loadTask()

function saveTask(data){
    fs.writeFileSync(filePath,JSON.stringify(data))
}

function addTask(task){
   try{
    const tasks = loadTask()
    tasks.push({task,completed:false});
    saveTask(tasks)
    console.log(`tasks added: ${task}`)
   }catch(error){
    console.log(error)
   }
}


function listTask(){
    const rawData=fs.readFileSync(filePath,'utf-8')
    const datas= JSON.parse(rawData)
    datas.forEach((data)=>{
        console.log(`Task:${data.task} Completed: ${data.completed?'Done':'False'}`)
    })

}

function taskComplete(index){
    const tasks = loadTask()
    if(index=>0 && index<= tasks.length){
        tasks[index].completed = true
        saveTask(tasks)
        console.log(`task ${index} completed`)
    }else{
        console.log("error")
    }
}

function taskDelete(index){
    const tasks = loadTask()
    if(index=>0 && index<= tasks.length){
        tasks.splice(index,1)
        saveTask(tasks)
        console.log(`deleted index: ${index}`)
    }
}

// Parse command-line arguments
const command = process.argv[2];
const arg = process.argv[3];

if (command === 'add') {
    addTask(arg);
} else if (command === 'list') {
    listTask();
} else if (command === 'complete') {
    taskComplete(parseInt(arg));
} else if (command === 'delete') {
    taskDelete(parseInt(arg));
} else {
    console.log('Usage: node todo.js [add|list|complete|delete] [task|index]');
}