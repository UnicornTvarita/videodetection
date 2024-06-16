function setup(){
can = createCanvas(480,380)
can.center()
video.hide()
}
status=""
objects = []
function preload(){
    video = createVideo("video.mp4")
    
}


function start(){
mymodel = ml5.objectDetector("cocossd",modelLoaded)
document.getElementById("status").innerHTML = "detection started"
}

function modelLoaded(){
    console.log("model loaded")
status = true
video.loop()
video.volume(0)
}
function gotResult( error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects = results
    }
}


function draw(){
    image(video,0,0,480,380)
if(status != ""){
mymodel.detect(video,gotResult)
for(i = 0; i < objects.length; i++  ){
    document.getElementById("status").innerHTML = "DETECTED🔎🔍"
   document.getElementById("no") .innerHTML = "Number of objects : "+objects.length
   p = floor(objects[i].confidence*100)
   stroke("orange")
   text(objects[i].label+"  "+p+" % ", objects[i].x , objects[i].y)
   noFill ()
   rect(objects[i].x+15, objects[i].y+15, objects[i].width, objects[i].height)
}

}
}

