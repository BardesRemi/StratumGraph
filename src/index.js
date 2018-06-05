require('./style.css');
require('./toto.js');

const favicon = require('./assets/favicon.png');
let link = document.createElement('link');
link.type = 'image/png';
link.rel = 'shortcut icon';
link.href = favicon;
document.head.appendChild(link);

function Test(basecut, ZOOM, add, tabledata, timepos, baselineType, start, end){
  //attributes
  this.basecut = basecut;
  this.ZOOM = ZOOM; // scaleY will be calculated from ZOOM
  this.add = add;
  this.tabledata = tabledata;
  this.timepos = timepos;
  this.baselineType = baselineType;
  this.start = start;
  this.end = end;
  this.initHeight = 32.0;
  this.addHeight = 0.0;
  this.timer = null;


  //canvas generation
  this.can = document.createElement('canvas');
    this.can.width = '1000';
    this.can.height = this.initHeight;
     //MouseListener | Expansion of the graph
    /*this.can.addEventListener("mousedown", function(){
      if (this.timer==null) {
      this.initHeight=this.can.height;
        this.timer = setInterval(function(){
         this.addHeight+=1;
          if(this.addHeight>=(this.ZOOM-1)*this.initHeight)
            clearInterval(this.timer);
         draw(this.polsfill);
         }, 12);
       } 
     });

    this.can.addEventListener("mouseup", function(){ 
       if (this.timer!=null)
        clearInterval(this.timer);
       this.timer = setInterval(function(){
         if(this.addHeight<=0){
           clearInterval(this.timer);
           this.timer = null;
         }
         else
           this.addHeight-=1;
         draw(this.polsfill);
      }, 12);
    });*/
  document.body.appendChild(this.can);

  this.getmins = function(){
    let mint = this.tabledata[0];
    for (let i=1; i<256; i++){
      if (this.tabledata[i] < this.tabledata[mint]) mint =i; 
    }
    return this.tabledata[mint];
  }

  this.getmaxs = function(){
    let maxt = this.tabledata[0];
    for (let i=1; i<256; i++){
      if (this.tabledata[i] > this.tabledata[maxt]) maxt =i;
    }
    return this.tabledata[maxt];
  }

  this.functest = function(){
    let res = new Array();
    var val0 = ((this.tabledata[this.start]-this.basecut)*1)*this.ZOOM/(this.maxs-this.mins);
    res.push(val0);
    val0 = ((this.tabledata[this.start]-(this.basecut))*1)*this.ZOOM/(this.maxs-(this.mins));
    res.push(val0);
    return res;
  }

  this.computePolygons = function(optim,mul){
    // no positive polygon when basecut is so high
    if (mul==1 && this.basecut==this.maxs) {return new Array();}
    // no negative polygon when basecut is so low
    if (mul==-1 && this.basecut==this.mins) {return new Array();}

    let scaleY = 0.0
    if(this.baselineType == "Stratum" || this.baselineType == "Stratum0")
      scaleY = this.ZOOM;
    else {
      if(this.baselineType == "Horizon"){
        if(mul > 0)
          scaleY = this.ZOOM*(this.maxs-this.basecut)/(this.maxs-this.mins);
        else
          scaleY = this.ZOOM*(this.basecut-this.mins)/(this.maxs-this.mins);
       }
    }

     var polystack   = new Array();
     var locPolylist = new Array(); // polygons are built in local array so they can be sorted according to multiplier mul

     var valcut   = (this.basecut-this.mins)/(this.maxs-this.mins)*this.scaleY;
     var levelcut = Math.ceil(valcut);
     if (this.basecut==this.mins             && this.baselineType=="Stratum") levelcut=-1;
     if (this.basecut==Math.min(0,this.mins) && this.baselineType=="Stratum0") levelcut=-1;

     var val0 = ((this.tabledata[this.start]-this.basecut)*mul)*scaleY/(this.maxs-this.mins);
     console.log(val0);
     var n0   = Math.floor(val0); // index of bands at beginning
     console.log(n0);

    // create the/all background polygon
    if (n0>0){
       let lvl = n0;
       if(!optim){
        while(lvl > 0){
          polystack[lvl-1] = new Object();
          polystack[lvl-1].level = (lvl-1+this.add)*mul;
          polystack[lvl-1].ptx = new Array();
          polystack[lvl-1].pty = new Array();
          polystack[lvl-1].ptx.push(this.timepos[this.start]);
          polystack[lvl-1].pty.push(1.0);
          polystack[lvl-1].ptx.push(this.timepos[this.start]);
          polystack[lvl-1].pty.push(0);
          lvl --;
        }
      }
      else{
        polystack[n0-1] = new Object();
        polystack[n0-1].level = (n0-1+this.add)*mul;
        polystack[n0-1].ptx = new Array();
        polystack[n0-1].pty = new Array();
        polystack[n0-1].ptx.push(this.timepos[this.start]);
        polystack[n0-1].pty.push(1.0);
        polystack[n0-1].ptx.push(this.timepos[this.start]);
        polystack[n0-1].pty.push(0);
      }
    }
    //create the frontground polygon
    polystack[n0] = new Object();
    polystack[n0].level = (n0+this.add)*mul;

    polystack[n0].ptx = new Array();
    polystack[n0].pty = new Array();
            
    polystack[n0].ptx.push(this.timepos[this.start]);
    polystack[n0].pty.push(1.0);
            
    polystack[n0].ptx.push(this.timepos[this.start]);
    polystack[n0].pty.push(1.0-val0%1.0);

    console.log(polystack);

    var pt, pval; // variable to store the previous values of t and val

    for (var i=this.start; i<=this.end; i++) {

      console.log("itération : " + i + " , état polystack : ");
      console.log(polystack);

      if (isNaN(this.tabledata[i])){
        console.log( "WARNING : tabledata[" + i + "] is undefined");
        continue;
      }
      var t   = this.timepos[i];

      var val = ((this.tabledata[i]-this.basecut)*mul)*scaleY/(this.maxs-this.mins);
      console.log(val +  " = ((" + this.tabledata[i] +"-"+ this.basecut +")*"+ mul +")*"+ scaleY +"/("+ this.maxs +"-"+ this.mins +")");
      var n   = Math.floor(val); // band index
      console.log(n + " =? " + n0);

      if (n==n0 ){ 
          // staying at the same level
          // If straight canvas useless to add additional points on underlying polygon
          //if (n0>0) {
          //  polystack[n0-1].ptx.push(t);
          //  polystack[n0-1].pty.push(0);
          //}
          
        if (n0>=0) {
          polystack[n0].ptx.push(t);
          polystack[n0].pty.push(1.0-val%1.0);
        }
        else {
          console.log("WARNING: negative n0")  
        }
      } 
      else if (n<n0){// going down one or MANY level(s)
        while (n<n0){
          var w1 = pval-n0
          var w2 = n0-val;
          var newt = (w1*t+w2*pt)/(w1+w2);
          pt= newt;
          pval = (n0);
          if (n0>=0) {
            polystack[n0].ptx.push(newt);
            polystack[n0].pty.push(1.0);
            var pol = polystack[n0];
            var miny = pol.pty[0];
            var maxy = pol.pty[0];
            for (var l=0; l<pol.pty.length; l++){
              miny = Math.min(miny, pol.pty[l]);
              maxy = Math.max(maxy, pol.pty[l]);
            }
            if (miny!=maxy) {
              locPolylist.push(pol);
              console.log("interation : " + i);
              console.log(locPolylist);
            }
            else 
              console.log("WARNING: flat polygon");
          } 
          else
            console.log("WARNING: negative n0");
            

          if (n0>0) {
            polystack[n0-1].ptx.push(newt);
            polystack[n0-1].pty.push(0);
          }

            polystack[n0]=null;
            n0--;

          if (n0>0 && optim) {
            polystack[n0-1] = new Object();
            polystack[n0-1].level = (n0-1+this.add)*mul;
            polystack[n0-1].ptx = new Array();
            polystack[n0-1].pty = new Array();
            polystack[n0-1].ptx.push(newt);
            polystack[n0-1].pty.push(1.0);
            polystack[n0-1].ptx.push(newt);
            polystack[n0-1].pty.push(0);
          }
        }
        if (n0>=0) {
          polystack[n0].ptx.push(t);
          polystack[n0].pty.push(1.0-val%1.0);
        }
      } 
      else if(n>n0) { // going up one or MANY level
        while (n>n0){
          var w1 = (n0+1)-pval;
          var w2 = val-(n0+1);
          var newt = (w1*t+w2*pt)/(w1+w2);

          if (n0>0 && optim) { // add 2 last points to the old background poly and store it in the list
            polystack[n0-1].ptx.push(newt);
            polystack[n0-1].pty.push(0);
            polystack[n0-1].ptx.push(newt);
            polystack[n0-1].pty.push(1.0);
            var pol = polystack[n0-1];
            var miny = pol.pty[0];
            var maxy = pol.pty[0];
            for (var l=0; l<pol.pty.length; l++){
              miny = Math.min(miny, pol.pty[l]);
              maxy = Math.max(maxy, pol.pty[l]);
            }
                    
            if (miny!=maxy) {
              locPolylist.push(pol);
              console.log("interation : " + i);
              console.log(locPolylist);
            }
            else 
              console.log("WARNING: flat polygon");
                    
            polystack[n0-1]=null;
          }

          pt   = newt;
          pval = (n0+1);

          // update the current poly (the one becoming the background !)
          if (n0>=0) {
            polystack[n0].ptx.push(newt);
            polystack[n0].pty.push(0);
          } 
          else
            console.log("WARNING: negative n0");

          // increment the level and create a new polygon with 2 points
          n0++;
          polystack[n0] = new Object();
          polystack[n0].level = (n0+this.add)*mul;//+(levelcut+1)*((mul+1)/2);

          polystack[n0].ptx = new Array();
          polystack[n0].pty = new Array();
          polystack[n0].ptx.push(newt);
          polystack[n0].pty.push(1.0);
        }
        if (n0>=0) {
          polystack[n0].ptx.push(t);
          polystack[n0].pty.push(1.0-val%1.0);
        } 
        else
          console.log("WARNING: negative n0");
      }
      pval = val;
      pt   = t;
    }
    if (n0>=0) {// finish the on going polygon at the last level
      polystack[n0].ptx.push(this.timepos[this.end]); 
      polystack[n0].pty.push(1.0-val%1.0);
      polystack[n0].ptx.push(this.timepos[this.end]);
      polystack[n0].pty.push(1.0);
    }
            
    if (n0>0) {// finish on going polygons at the last level
      let lvl = n0;
      if(!optim){
        while(lvl > 0){
          polystack[lvl-1].ptx.push(this.timepos[this.end]);
          polystack[lvl-1].pty.push(0);
          polystack[lvl-1].ptx.push(this.timepos[this.end]);
          polystack[lvl-1].pty.push(1.0);
          var pol = polystack[lvl-1];
          var miny = pol.pty[0];
          var maxy = pol.pty[0];
          for (var l=0; l<pol.pty.length; l++){
            miny = Math.min(miny, pol.pty[l]);
            maxy = Math.max(maxy, pol.pty[l]);
          }
          lvl--;
          if (miny!=maxy) {
            locPolylist.push(pol);
            console.log("interation : " + i);
            console.log(locPolylist);
          }
          else 
            console.log("WARNING: flat polygon");
        }
      }
      else{
        polystack[n0-1].ptx.push(this.timepos[this.end]);
        polystack[n0-1].pty.push(0);
        polystack[n0-1].ptx.push(this.timepos[this.end]);
        polystack[n0-1].pty.push(1.0);
        var pol = polystack[n0-1];
        var miny = pol.pty[0];
        var maxy = pol.pty[0];
        for (var l=0; l<pol.pty.length; l++){
          miny = Math.min(miny, pol.pty[l]);
          maxy = Math.max(maxy, pol.pty[l]);
        }
        if (miny!=maxy) {
          locPolylist.push(pol);
          console.log("interation : " + i);
          console.log(locPolylist);
        }
        else 
          console.log("WARNING: flat polygon");
      }
    }
    if (n0>=0) {
    // finish the on going polygon 
      var pol = polystack[n0];
      var miny = pol.pty[0];
      var maxy = pol.pty[0];
      for (var l=0; l<pol.pty.length; l++){
        miny = Math.min(miny, pol.pty[l]);
        maxy = Math.max(maxy, pol.pty[l]);
      }
      if (miny!=maxy) {
        locPolylist.push(pol);
        console.log("interation : " + i);
        console.log(locPolylist);
      }
      else 
        console.log("WARNING: flat polygon");
    } 
    else
      console.log("WARNING: negative n0");

    console.log(locPolylist);
    locPolylist.sort(function(a,b){return mul*(a.level-b.level)});
    return locPolylist;
  }

  //Draw the graph in his canvas
  this.draw = function(optim){
    console.time('someFunction');
    if (this.can.height!=this.initHeight+this.addHeight)
      this.can.height = this.initHeight+this.addHeight;

    let ctx = this.can.getContext("2d");
    ctx.fillStyle="#F0FF0F";  
    ctx.clearRect(0,0,this.can.width, this.can.height);
    let up = (this.maxs-this.basecut)
    let propup = this.ZOOM*(up/(this.maxs-this.mins));
    let graphToDraw;
    for (let j in graphToDraw){
      ctx.save();
      if (graphToDraw[j].level>0){
        ctx.fillStyle="rgb(0, "+(graphToDraw[j].level*255/ZOOM)+", 255)";
        ctx.beginPath();
        //(addHeight+addHeight/(Math.ceil(ZOOM-1)))-(addHeight*graphToDraw[j].level/(Math.ceil(ZOOM-1))));
        ctx.moveTo(graphToDraw[j].ptx[0]*this.can.width, graphToDraw[j].pty[0]*this.initHeight+((this.addHeight*((Math.ceil(propup)-graphToDraw[j].level)/(this.ZOOM-1))))-(1.0-propup%1)*this.addHeight/(this.ZOOM-1))
        for (let i=1; i<graphToDraw[j].ptx.length; i++)
          ctx.lineTo(graphToDraw[j].ptx[i]*this.can.width, graphToDraw[j].pty[i]*this.initHeight+((this.addHeight*((Math.ceil(propup)-graphToDraw[j].level)/(this.ZOOM-1))))-(1.0-propup%1)*this.addHeight/(this.ZOOM-1))
        ctx.closePath();
      }
      else {
      ctx.fillStyle="rgb(255, "+((4+graphToDraw[j].level)*255/ZOOM)+", 0)";
      let anim = this.addHeight/(this.ZOOM-1)/this.initHeight;
      //console.log((ZOOM-propup)+" * "+anim); 
      ctx.translate(0, 0+this.initHeight
              //+(1.0-anim)*initHeight
              +(propup-1)*this.initHeight*anim
                       //+ addHeight+initHeight*Math.abs(graphToDraw[j].level)*anim
                      // - (ZOOM-propup)*initHeight*anim
                   );
      ctx.scale(1.0,1.0*(1.0-anim)-1.0*(anim));
      ctx.translate(0, -this.initHeight
               //-propup*initHeight*anim
               //-addHeight*((Math.ceil(propup)-1)/(ZOOM-1))
                 -this.initHeight*Math.abs(graphToDraw[j].level+1)*anim
             );
      ctx.beginPath();
        
      ctx.moveTo(graphToDraw[j].ptx[0]*this.can.width, graphToDraw[j].pty[0]*this.initHeight);
      /*ctx.moveTo(graphToDraw[j].ptx[0]*can.width, graphToDraw[j].pty[0]*initHeight-((addHeight*((Math.ceil(ZOOM-2)-graphToDraw[j].level)/(ZOOM-1))))+(1.0-propup%1)*addHeight/(ZOOM-1));
      for (let i=1; i<graphToDraw[j].ptx.length; i++)
        ctx.lineTo(graphToDraw[j].ptx[i]*can.width, graphToDraw[j].pty[i]*initHeight-((addHeight*((Math.ceil(ZOOM-2)-graphToDraw[j].level)/(ZOOM-1))))+(1.0-propup%1)*addHeight/(ZOOM-1));
      */
      for (let i=1; i<graphToDraw[j].ptx.length; i++)
        ctx.lineTo(graphToDraw[j].ptx[i]*this.can.width, graphToDraw[j].pty[i]*this.initHeight);
      ctx.closePath();
      }
        
        
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 1;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.fill();
      ctx.restore();
    }
    console.timeEnd('someFunction');
  }

  //Must be call after each creation of this object
  this.init = function(){
    this.mins = this.getmins();
    this.maxs = this.getmaxs();
    console.log(Object.values(this));
    this.pols = this.computePolygons(true, 1);
    this.polsfill = new Array();
  }
}

let data = new Float32Array(256);
let time = new Float32Array(256);
for (let i=0; i<256; i++){
  data[i] = 30.0+10*Math.cos(i/256*3*Math.PI);
  time[i] = i/255;
}

let ZOOM = 7.24
var addHeight = 0;
var initHeight = 32;
var timer=null;
let BASELINE = 20;

var test1 = new Test(BASELINE, ZOOM, 1, data, time, "Stratum", 0, 255);
test1.init();
console.log(Object.values(test1));
console.log(test1.functest());
test1.draw();
//console.log(test1.computePolygons(true,1));


/*        //////////////////////////////////////////////////
        // computes the polygons with a scanline method //
        //////////////////////////////////////////////////
        function computePolygons(basecut, scaleY, mul, add, mins, maxs, tabledata, timepos, baselineType, start, end, optim){
          
          /* timestamp of the minimum value
          if (isNaN(mint) && mint>=start && mint<=end) return;

        let mins=0;
        // minimum value
          if (baselineType=="Stratum" || baselineType=="Silhouette")
            mins = parseFloat(tabledata[mint]);

      let maxs = tabledata[maxt];*/

          // no positive polygon when basecut is so high
/*          if (mul==1 && basecut==maxs) {return new Array();}
          // no negative polygon when basecut is so low
          if (mul==-1 && basecut==mins) {return new Array();}

          var polystack   = new Array();
          var locPolylist = new Array(); // polygons are built in local array so they can be sorted according to multiplier mul

          var valcut   = (basecut-mins)/(maxs-mins)*scaleY;
          var levelcut = Math.ceil(valcut);
          if (basecut==mins             && baselineType=="Stratum") levelcut=-1;
          if (basecut==Math.min(0,mins) && baselineType=="Stratum0") levelcut=-1;

          var val0 = ((tabledata[start]-basecut)*mul)*scaleY/(maxs-mins);
          console.log("(" + tabledata[start] + "-" + basecut + ")*" + mul + ")*" + scaleY + "/ (" + maxs + "-" + mins + ")" )
          console.log(val0);
          var n0   = Math.floor(val0); // index of bands at beginning
          console.log(n0);

          // TODO open/create many underlying polygons if not optim
          // create the/all background polygon
          if (n0>0){
            if(n0==0)
              console.log("WARNING: n0 = 0 at the beginning");
            let lvl = n0;
            if(!optim){
              while(lvl > 0){
                polystack[lvl-1] = new Object();
                polystack[lvl-1].level = (lvl-1+add)*mul;
                polystack[lvl-1].ptx = new Array();
                polystack[lvl-1].pty = new Array();
                polystack[lvl-1].ptx.push(timepos[start]);
                polystack[lvl-1].pty.push(1.0);
                polystack[lvl-1].ptx.push(timepos[start]);
                polystack[lvl-1].pty.push(0);
                lvl --;
              }
            }
            else{
                polystack[n0-1] = new Object();
                polystack[n0-1].level = (n0-1+add)*mul;
                polystack[n0-1].ptx = new Array();
                polystack[n0-1].pty = new Array();
                polystack[n0-1].ptx.push(timepos[start]);
                polystack[n0-1].pty.push(1.0);
                polystack[n0-1].ptx.push(timepos[start]);
                polystack[n0-1].pty.push(0);
            }
          }
          //create the frontground polygon
          polystack[n0] = new Object();
          polystack[n0].level = (n0+add)*mul;

          polystack[n0].ptx = new Array();
          polystack[n0].pty = new Array();
          
          polystack[n0].ptx.push(timepos[start]);
          polystack[n0].pty.push(1.0);
          
          polystack[n0].ptx.push(timepos[start]);
          polystack[n0].pty.push(1.0-val0%1.0);

          var pt, pval; // variable to store the previous values of t and val

          for (var i=start; i<=end; i++) {
            if (isNaN(tabledata[i])) continue;
            var t   = timepos[i];

            var val = ((tabledata[i]-basecut)*mul)*scaleY/(maxs-mins);
            var n   = Math.floor(val); // band index

            if (n==n0 ){ // staying at the same level
              // If straight canvas useless to add additional points on underlying polygon
              //if (n0>0) {
              //  polystack[n0-1].ptx.push(t);
              //  polystack[n0-1].pty.push(0);
              //}

              if (n0>=0) {
                polystack[n0].ptx.push(t);
                polystack[n0].pty.push(1.0-val%1.0);
              }
              else {
                console.log("WARNING: negative n0")  
              }

            } else if (n<n0){// going down one or MANY level(s)
                while (n<n0){
                  var w1 = pval-n0
                  var w2 = n0-val;

                  var newt = (w1*t+w2*pt)/(w1+w2);
                  pt= newt;
                  pval = (n0);

                  if (n0>=0) {
                    polystack[n0].ptx.push(newt);
                    polystack[n0].pty.push(1.0);
                    var pol = polystack[n0];
                    var miny = pol.pty[0];
                    var maxy = pol.pty[0];
                    for (var l=0; l<pol.pty.length; l++){
                      miny = Math.min(miny, pol.pty[l]);
                      maxy = Math.max(maxy, pol.pty[l]);
                    }
                    if (miny!=maxy) 
                      locPolylist.push(pol);
                    else 
                      console.log("WARNING: flat polygon");
                  } else {
                      console.log("WARNING: negative n0");
                  }

                  if (n0>0) {
                    polystack[n0-1].ptx.push(newt);
                    polystack[n0-1].pty.push(0);
                  }

                  polystack[n0]=null;
                  n0--;

                  if (n0>0 && optim) {
                    polystack[n0-1] = new Object();
                    polystack[n0-1].level = (n0-1+add)*mul;
                    polystack[n0-1].ptx = new Array();
                    polystack[n0-1].pty = new Array();
                    polystack[n0-1].ptx.push(newt);
                    polystack[n0-1].pty.push(1.0);
                    polystack[n0-1].ptx.push(newt);
                    polystack[n0-1].pty.push(0);
                  }
                }
                if (n0>=0) {
                  polystack[n0].ptx.push(t);
                  polystack[n0].pty.push(1.0-val%1.0);
                }
            } else if(n>n0) { // going up one or MANY level
              while (n>n0){
                var w1 = (n0+1)-pval;
                var w2 = val-(n0+1);
                var newt = (w1*t+w2*pt)/(w1+w2);

                if (n0>0 && optim) { // add 2 last points to the old background poly and store it in the list
                  polystack[n0-1].ptx.push(newt);
                  polystack[n0-1].pty.push(0);
                  polystack[n0-1].ptx.push(newt);
                  polystack[n0-1].pty.push(1.0);
                  var pol = polystack[n0-1];
                  var miny = pol.pty[0];
                  var maxy = pol.pty[0];
                  for (var l=0; l<pol.pty.length; l++){
                    miny = Math.min(miny, pol.pty[l]);
                    maxy = Math.max(maxy, pol.pty[l]);
                  }
                  
                  if (miny!=maxy) 
                    locPolylist.push(pol);
                  else 
                    console.log("WARNING: flat polygon");
                  
                  polystack[n0-1]=null;
                }

                pt   = newt;
                pval = (n0+1);

                // update the current poly (the one becoming the background !)
                if (n0>=0) {
                  polystack[n0].ptx.push(newt);
                  polystack[n0].pty.push(0);
                } else {
          console.log("WARNING: negative n0");
            }

                // increment the level and create a new polygon with 2 points
                n0++;
                polystack[n0] = new Object();
                polystack[n0].level = (n0+add)*mul;//+(levelcut+1)*((mul+1)/2);

                polystack[n0].ptx = new Array();
                polystack[n0].pty = new Array();
                polystack[n0].ptx.push(newt);
                polystack[n0].pty.push(1.0);
              }
              if (n0>=0) {
                polystack[n0].ptx.push(t);
                polystack[n0].pty.push(1.0-val%1.0);
              } else {
        console.log("WARNING: negative n0");
          }
            }
            pval = val;
            pt   = t;
          }

          if (n0>=0) {// finish the on going polygon at the last level
            polystack[n0].ptx.push(timepos[end]); 
            polystack[n0].pty.push(1.0-val%1.0);
            polystack[n0].ptx.push(timepos[end]);
            polystack[n0].pty.push(1.0);
          }
          // TODO close many underlying polygons if not optim
          
          if (n0>0) {// finish on going polygons at the last level
            let lvl = n0;
            if(!optim){
              while(lvl > 0){
                polystack[lvl-1].ptx.push(timepos[end]);
                polystack[lvl-1].pty.push(0);
                polystack[lvl-1].ptx.push(timepos[end]);
                polystack[lvl-1].pty.push(1.0);
                var pol = polystack[lvl-1];
                var miny = pol.pty[0];
                var maxy = pol.pty[0];
                for (var l=0; l<pol.pty.length; l++){
                  miny = Math.min(miny, pol.pty[l]);
                  maxy = Math.max(maxy, pol.pty[l]);
                }
                lvl--;
                if (miny!=maxy) 
                  locPolylist.push(pol);
                else 
                   console.log("WARNING: flat polygon");
              }
            }
            else{
              polystack[n0-1].ptx.push(timepos[end]);
              polystack[n0-1].pty.push(0);
              polystack[n0-1].ptx.push(timepos[end]);
              polystack[n0-1].pty.push(1.0);
              var pol = polystack[n0-1];
              var miny = pol.pty[0];
              var maxy = pol.pty[0];
              for (var l=0; l<pol.pty.length; l++){
                miny = Math.min(miny, pol.pty[l]);
                maxy = Math.max(maxy, pol.pty[l]);
              }
              if (miny!=maxy) 
                locPolylist.push(pol);
              else 
                 console.log("WARNING: flat polygon");
            }
          }
          if (n0>=0) {
      // finish the on going polygon 
            var pol = polystack[n0];
            var miny = pol.pty[0];
            var maxy = pol.pty[0];
            for (var l=0; l<pol.pty.length; l++){
              miny = Math.min(miny, pol.pty[l]);
              maxy = Math.max(maxy, pol.pty[l]);
            }
            if (miny!=maxy) 
              locPolylist.push(pol);
            else 
        console.log("WARNING: flat polygon");
          } else {
        console.log("WARNING: negative n0");
      }

          locPolylist.sort(function(a,b){return mul*(a.level-b.level)});

          return locPolylist;
        }


        // set shifted to true when you need a color in contrast with expected color
        function getColorForValue(value, minValue, maxValue, shifted) {
          //if (this.id=="ts5") console.log("getColorForValue"+minValue+" < "+value+" < "+maxValue)
          if(minValue==maxValue && value<minValue) return this.scale0[127];
          if(minValue==maxValue && value>maxValue) return this.scale1[127];
          if (value>maxValue) maxValue = value;
          if (value<minValue) minValue = value;
          if (value==undefined || isNaN(value)) return [255, 0, 0];
          if(minValue==maxValue) return this.scale0[127];

          //var normalized;
          //if (value>=0)  normalized = 10+Math.floor((value+1)*235/(maxValue+2));
          //else           normalized = 10+Math.floor((-1*value+1)*235/(-1*minValue+2));
          //var modulated = shifted?Math.min(255, Math.max(0,parseInt(10+(normalized-20)/2))):normalized;

          var modulated = 20+Math.floor((value-minValue)*215/(maxValue-minValue));
          if ((baselineType=="Top" || baselineType=="Horizon") && value>0){
            if (maxValue==1)
              modulated = 127;
            else
              modulated = 50+Math.floor((value-1)*205/(maxValue-1));
            //console.log(baselineType+"+  "+minValue+" < "+value+" < "+maxValue+" => "+modulated)
          }
          if ((baselineType=="Top" || baselineType=="Horizon") && value<0){
            if (minValue==-1)
              modulated = 127;
            else
              modulated = 255-Math.floor((minValue-value)*205/(minValue+1));
            //console.log(baselineType+"-  "+minValue+" < "+value+" < "+maxValue+" => "+modulated)
          }

          //if (value<0 && (baselineType!="Stratum" && baselineType!="Stratum0"))
          //  modulated = 255-modulated;
          if (shifted) {
            var tt = ((value-minValue)/(maxValue-minValue))+0.25;
            if (tt>1) tt-=1.0;
            modulated = 20+Math.floor(tt*215);
          }
          //normalized = Math.round((value-minValue)*255/(maxValue-minValue));
          //modulated = normalized;

          if (!this.scale0[255-modulated]) console.log("error "+modulated+" " +value+" "+minValue+" "+maxValue);

          if (baselineType=="Silhouette" || baselineType=="Silhouette0" || value<0){
            return this.scale0[this.colInv0?modulated:255-modulated];
          } else if (value>=0){
            return this.scale1[this.colInv1?modulated:255-modulated];
          } else
            return [value, 0, 0]; // default, should never happen ! if you see shade of red, track the bug
        }*/

/*const favicon = require('./assets/favicon.png');
let link = document.createElement('link');
link.type = 'image/png';
link.rel = 'shortcut icon';
link.href = favicon;
document.head.appendChild(link);

let data = new Float32Array(256);
let time = new Float32Array(256);
for (let i=0; i<256; i++){
  data[i] = 30.0+10*Math.cos(i/256*3*Math.PI);
  time[i] = i/255;
}
let mint = data[0];
let maxt = data[0];
for (let i=1; i<256; i++){
  if (data[i] < data[mint]) mint =i; 
  if (data[i] > data[maxt]) maxt =i;
}
console.log(mint + " = min , max= " + maxt);
let pols = new Array ();

let ZOOM = 7.24
var addHeight = 0;
var initHeight = 32;
var timer=null;
let BASELINE = 20;


pols = computePolygons(BASELINE, ZOOM, 1, 1, BASELINE, data[maxt], data, time, "Stratum", 0, 255, true);

/*let polspos = computePolygons(BASELINE, ZOOM*(data[maxt]-BASELINE)/(data[maxt]-data[mint]), 1, 1, BASELINE, data[maxt], data, time, "Horizon", 0, 255, true);
let polsneg = computePolygons(BASELINE, ZOOM*(BASELINE-data[mint])/(data[maxt]-data[mint]), -1, 1, data[mint], BASELINE, data, time, "Horizon", 0, 255, true);
pols = pols.concat(polspos);
pols = pols.concat(polsneg);*/
/*let polsfill = [];


let can = document.createElement('canvas');
can.width = '1000';
can.height = initHeight;
can.addEventListener("mousedown", function(){
   if (timer==null) {
     //pols = computePolygons(BASELINE, ZOOM, 1, 1, BASELINE, data[maxt], data, time, "Stratum", 0, 255, true)

     initHeight=can.height;
     timer = setInterval(function(){
       addHeight+=1;
       if(addHeight>=(ZOOM-1)*initHeight)
         clearInterval(timer);
       if(polsfill.length == 0){
          console.log("polsfill : " + polsfill);
          polsfill = computePolygons(BASELINE, ZOOM, 1, 1, BASELINE, data[maxt], data, time, "Stratum", 0, 255, false);
          /*let polsposfill = computePolygons(BASELINE, ZOOM*(data[maxt]-BASELINE)/(data[maxt]-data[mint]), 1, 1, BASELINE, data[maxt], data, time, "Horizon", 0, 255, false);
          let polsnegfill = computePolygons(BASELINE, ZOOM*(BASELINE-data[mint])/(data[maxt]-data[mint]), -1, 1, data[mint], BASELINE, data, time, "Horizon", 0, 255, false);
          polsfill = polsfill.concat(polsposfill);
          polsfill = polsfill.concat(polsnegfill);*/
/*        }
       draw(polsfill);
    }, 12);
    } 
});

can.addEventListener("mouseup", function(){ 
  if (timer!=null)
    clearInterval(timer);
  timer = setInterval(function(){
   if(addHeight<=0){
     clearInterval(timer);
     timer = null;
   }
   else
       addHeight-=1;
   
   draw(polsfill);
  }, 12);
});
document.body.appendChild(can);


function draw(polygons) {
  
  console.time('someFunction');
  if (can.height!=initHeight+addHeight)
    can.height = initHeight+addHeight;

  let ctx = can.getContext("2d");
  ctx.fillStyle="#F0FF0F";  
  ctx.clearRect(0,0,can.width, can.height);
  let up = (data[maxt]-BASELINE)
  let propup = ZOOM*(up/(data[maxt]-data[mint]));
      console.log(propup); 

  for (let j in polygons){
    ctx.save();
    if (polygons[j].level>0){
    ctx.fillStyle="rgb(120, "+(polygons[j].level*255/ZOOM)+", 255)";
    ctx.beginPath();
    //(addHeight+addHeight/(Math.ceil(ZOOM-1)))-(addHeight*polygons[j].level/(Math.ceil(ZOOM-1))));
    ctx.moveTo(polygons[j].ptx[0]*can.width, polygons[j].pty[0]*initHeight+((addHeight*((Math.ceil(propup)-polygons[j].level)/(ZOOM-1))))-(1.0-propup%1)*addHeight/(ZOOM-1))
    for (let i=1; i<polygons[j].ptx.length; i++)
      ctx.lineTo(polygons[j].ptx[i]*can.width, polygons[j].pty[i]*initHeight+((addHeight*((Math.ceil(propup)-polygons[j].level)/(ZOOM-1))))-(1.0-propup%1)*addHeight/(ZOOM-1))
    ctx.closePath();
    
    }
    else {
    ctx.fillStyle="rgb(255, "+((4+polygons[j].level)*255/ZOOM)+", 0)";
    let anim = addHeight/(ZOOM-1)/initHeight;
    //console.log((ZOOM-propup)+" * "+anim); 
    ctx.translate(0, 0+initHeight
            //+(1.0-anim)*initHeight
            +(propup-1)*initHeight*anim
                     //+ addHeight+initHeight*Math.abs(polygons[j].level)*anim
                    // - (ZOOM-propup)*initHeight*anim
                 );
    ctx.scale(1.0,1.0*(1.0-anim)-1.0*(anim));
    ctx.translate(0, -initHeight
             //-propup*initHeight*anim
             //-addHeight*((Math.ceil(propup)-1)/(ZOOM-1))
               -initHeight*Math.abs(polygons[j].level+1)*anim
           );
    ctx.beginPath();
    
    ctx.moveTo(polygons[j].ptx[0]*can.width, polygons[j].pty[0]*initHeight);
    /*ctx.moveTo(polygons[j].ptx[0]*can.width, polygons[j].pty[0]*initHeight-((addHeight*((Math.ceil(ZOOM-2)-polygons[j].level)/(ZOOM-1))))+(1.0-propup%1)*addHeight/(ZOOM-1));
    for (let i=1; i<polygons[j].ptx.length; i++)
      ctx.lineTo(polygons[j].ptx[i]*can.width, polygons[j].pty[i]*initHeight-((addHeight*((Math.ceil(ZOOM-2)-polygons[j].level)/(ZOOM-1))))+(1.0-propup%1)*addHeight/(ZOOM-1));
    */
/*    for (let i=1; i<polygons[j].ptx.length; i++)
      ctx.lineTo(polygons[j].ptx[i]*can.width, polygons[j].pty[i]*initHeight);
    ctx.closePath();
    }
    
    
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fill();
    ctx.restore();
  }
  console.timeEnd('someFunction');
}

draw(pols);*/