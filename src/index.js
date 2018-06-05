require('./style.css');

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
  this.maxs;
  this.mins;


  //canvas generation
  this.can = document.createElement('canvas');
    this.can.width = '1000';
    this.can.height = this.initHeight;
    console.log(this.can);

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

  this.computePolygons = function(optim,mul,min,max){
    // no positive polygon when basecut is so high
    if (mul==1 && this.basecut==max) {return new Array();}
    // no negative polygon when basecut is so low
    if (mul==-1 && this.basecut==min) {return new Array();}

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
    console.log("scaleY = " + scaleY);

     var polystack   = new Array();
     var locPolylist = new Array(); // polygons are built in local array so they can be sorted according to multiplier mul

     var valcut   = (this.basecut-min)/(max-min)*scaleY;
     var levelcut = Math.ceil(valcut);
     if (this.basecut==min             && this.baselineType=="Stratum") levelcut=-1;
     if (this.basecut==Math.min(0,min) && this.baselineType=="Stratum0") levelcut=-1;

     var val0 = ((this.tabledata[this.start]-this.basecut)*mul)*scaleY/(max-min);
     console.log("val0 at the beginning = " + val0);
     var n0   = Math.floor(val0); // index of bands at beginning
     console.log("n0 at the beginning = " + n0);

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

    var pt, pval; // variable to store the previous values of t and val

    for (var i=this.start; i<=this.end; i++) {

      if (isNaN(this.tabledata[i])){
        console.log( "WARNING : tabledata[" + i + "] is undefined");
        continue;
      }
      var t   = this.timepos[i];

      var val = ((this.tabledata[i]-this.basecut)*mul)*scaleY/(max-min);
      var n   = Math.floor(val); // band index

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
      }
      else 
        console.log("WARNING: flat polygon");
    } 
    else
      console.log("WARNING: negative n0");

    locPolylist.sort(function(a,b){return mul*(a.level-b.level)});
    return locPolylist;
  }


  //generate the whole graphs depending on @BaseLineType Must be use to generate this.pols or this.polsfill
  this.allPolygons = function(optim){
    if(this.baselineType == "Stratum" || this.baselineType == "Stratum0")
      return this.computePolygons(optim,1,this.mins,this.maxs);
          
    else {
      if(this.baselineType == "Horizon"){
      let res = new Array();
      res = res.concat(this.computePolygons(optim,1,this.basecut,this.maxs));
      res = res.concat(this.computePolygons(optim,-1, this.mins, this.basecut));
      return res;
      }
      else
        console.log("WARNING : unhandle BaseLineType : " + this.BaseLineType);
    }
    return 0;
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
    if(optim)
      graphToDraw = this.pols;
    else
      graphToDraw = this.polsfill;
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
      ctx.translate(0, 0+this.initHeight
                    +(propup-1)*this.initHeight*anim
                   );
      ctx.scale(1.0,1.0*(1.0-anim)-1.0*(anim));
      ctx.translate(0, -this.initHeight
                       -this.initHeight*Math.abs(graphToDraw[j].level+1)*anim
                    );
      ctx.beginPath();
        
      ctx.moveTo(graphToDraw[j].ptx[0]*this.can.width, graphToDraw[j].pty[0]*this.initHeight);
     
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
    //console.timeEnd('someFunction');
  }

  //Must be call after each creation of this object
  this.init = function(){
    this.mins = this.getmins();
    this.maxs = this.getmaxs();
    this.pols = this.allPolygons(true);
    this.polsfill = null;

    //adding to the canvas : MouseListener | Expansion of the graph
    let me = this;
    this.can.addEventListener("mousedown", function(){
      if (me.timer==null) {
      me.initHeight=me.can.height;
        me.timer = setInterval(function(){
         me.addHeight+=1;
          if(me.addHeight>=(me.ZOOM-1)*me.initHeight)
            clearInterval(me.timer);
          if(me.polsfill == null)
            me.polsfill = me.allPolygons(false);
          me.draw(false);
          }, 12);
       } 
     });

    me.can.addEventListener("mouseup", function(){ 
       if (me.timer!=null)
        clearInterval(me.timer);
       me.timer = setInterval(function(){
         if(me.addHeight<=0){
           clearInterval(me.timer);
           me.timer = null;
         }
         else
           me.addHeight-=1;
         me.draw(false);
      }, 12);
    });
    document.body.appendChild(this.can);
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
let BASELINE = 30;

var test1 = new Test(BASELINE, ZOOM, 1, data, time, "Horizon", 0, 255);
var test2 = new Test(BASELINE, ZOOM, 1, data, time, "Horizon", 0, 255);
test1.init();
test2.init();
console.log(Object.values(test1));
test1.draw(true);
test2.draw(true);
