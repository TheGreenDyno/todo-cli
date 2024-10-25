const fs = require('fs')
const yargs = require('yargs')
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
        console.log(`Task:${data.task} | Completed: ${data.completed?'Done':'False'}`)
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
yargs

.command('add <task>','add a new task',{},(argv)=>{
    addTask(argv.task)
})
.command('list','list all the tasks',{},()=>{
    listTask()
})
.command('complete <index>','mark complete',{},(argv)=>{
    taskComplete(argv.index)
})
.command('delete <index>','delete the mentioned index',{},(argv)=>{
    taskDelete(argv.index)
})
.help()
.argv