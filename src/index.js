require('./style.css');
let colors = require('./color.js');
let $ = require("jquery");

	        //////////////////////////////////////////////////
	        //       List of differents color Scaling       //
	        //////////////////////////////////////////////////
	    
	    let magentaScale = colors.oneColor("magentaScale");
	    let heatScale    = colors.oneColor("heatScale"); //stratum graph > 0
	    let btcScale     = colors.oneColor("btcScale");  //stratum graph < 0
	    let ocsScale     = colors.oneColor("ocsScale");
	    let rainbowScale = colors.oneColor("rainbowScale");
	    let locsScale    = colors.oneColor("locsScale");
	    let btyScale     = colors.oneColor("btyScale");
	    let lingreyScale = colors.oneColor("lingreyScale");
	    let rScale       = colors.oneColor("rScale");
	    let gScale       = colors.oneColor("gScale");
	    let bScale       = colors.oneColor("bScale");
	    let xScale       = colors.oneColor("xScale");


	        //////////////////////////////////////////////////
	        //                     Init                     //
	        //////////////////////////////////////////////////
$(function(){
	const favicon = require('./assets/favicon.png');
	let link = document.createElement('link');
	link.type = 'image/png';
	link.rel = 'shortcut icon';
	link.href = favicon;
	document.head.appendChild(link);


	        //////////////////////////////////////////////////
	        //       Graph Classes (via a constructor)      //
	        //////////////////////////////////////////////////

	function Graph(basecut, ZOOM, add, tabledata, timepos, baselineType, start, end, initHeight, drawingMethod){
	  const maxZOOM = 15.0;
	  //attributes
	  this.basecut = basecut;
	  this.baselvl;
	  if(ZOOM > maxZOOM)
	    this.ZOOM = maxZOOM;
	  else
	    this.ZOOM = ZOOM;
	  this.scaleYpos;
	  this.scaleYneg;
	  this.add = add;
	  this.tabledata = tabledata;
	  this.timepos = timepos;
	  this.baselineType = baselineType;
	  this.start = start;
	  this.end = end;
	  this.initHeight = initHeight;
	  this.addHeight = 0.0;
	  this.timer = null;
	  this.maxs;
	  this.mins;
	  this.maxlvl = 1;
	  this.minlvl = 1;
	  this.statu = "opti";
	  this.drawingMethod = drawingMethod


	  //canvas generation
	  this.can = document.createElement('canvas');
	    this.can.width = '750';
	    this.can.height = this.initHeight;

	  //rangesliders generation
	  this.sliderBaseline = $("<input class='slider' type='range' step='"+3/30+"'>");
	  /*document.createElement('input');
	  	this.sliderBaseline.classes = 'slider';
	  	this.sliderBaseline.type = 'range';
	  	this.sliderBaseline.step = 3/20;*/

	  this.sliderZOOM = $("<input class='slider' type='range' min='1.0' max='"+maxZOOM+"' step='"+3/30+"'>");
	  	/*this.sliderZOOM.class = 'slider';
	  	this.sliderZOOM.type = 'range';
	  	this.sliderZOOM.min  = 1.0;
	  	this.sliderZOOM.max  = maxZOOM;
	  	this.sliderZOOM.value = this.ZOOM;
	  	this.sliderZOOM.step = 3/20;*/

	  this.sliderInitHeight = $("<input class='slider' type='range' min='10.0' max='50.0' step='1'>");
	  	/*this.sliderInitHeight.class = 'slider';
	  	this.sliderInitHeight.type = 'range';
	  	this.sliderInitHeight.min  = 10.0;
	  	this.sliderInitHeight.max  = 50.0;
	  	this.sliderInitHeight.step = 1;*/

	  this.statusButton = $("<button type='button'>change statu</button>");

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

	  this.getBaselvl = function(){
	    if(this.baselineType == "Stratum" || this.baselineType == "Stratum0"){
	      /*
	      if "0" is the origin of the graphs, instead of it's minimal value, then replace return this.mins by :
	        this.mins=0.0;
	        return 0.0;
	      */
	      return this.mins;
	    }
	    else {
	      if(this.baselineType == "Horizon"){
	      return this.basecut;
	      }
	      else
	        console.log("WARNING : unhandle BaseLineType : " + this.BaseLineType);
	    }
	    return 0;
	  }

	  this.computePolygons = function(basecut,optim,mul,min,max){
	    // no positive polygon when basecut is so high
	    if (mul==1 && basecut==max) {return new Array();}
	    // no negative polygon when basecut is so low
	    if (mul==-1 && basecut==min) {return new Array();}

	    let scaleY
	    if(mul==1)
	      scaleY=this.scaleYpos;
	    else
	      scaleY=this.scaleYneg;
	    var polystack   = new Array();
	    var locPolylist = new Array(); // polygons are built in local array so they can be sorted according to multiplier mul

	    var valcut   = (basecut-min)/(max-min)*scaleY;
	    var levelcut = Math.ceil(valcut);
	    if (basecut==min             && this.baselineType=="Stratum") levelcut=-1;
	    if (basecut==Math.min(0,min) && this.baselineType=="Stratum0") levelcut=-1;

	    var val0 = ((this.tabledata[this.start]-this.baselvl)*mul)*scaleY/(max-min);
	    var n0   = Math.floor(val0); // index of bands at beginning

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
	        //console.log( "WARNING : tabledata[" + i + "] is undefined");
	        continue;
	      }
	      var t   = this.timepos[i];

	      var val = ((this.tabledata[i]-this.baselvl)*mul)*scaleY/(max-min);
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
	          //console.log("WARNING: negative n0")  
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
	            else {
	            	//console.log("WARNING: flat polygon");
	        	}
	          } 
	          else{
	            //console.log("WARNING: negative n0");
	          }
	            

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
	            else {
	            	//console.log("WARNING: flat polygon");
	        	}
	                    
	            polystack[n0-1]=null;
	          }

	          pt   = newt;
	          pval = (n0+1);

	          // update the current poly (the one becoming the background !)
	          if (n0>=0) {
	            polystack[n0].ptx.push(newt);
	            polystack[n0].pty.push(0);
	          } 
	          else{
	            //console.log("WARNING: negative n0");
	          }

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
	        else {
	            //console.log("WARNING: flat polygon");
	        }
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
	          else {
	            //console.log("WARNING: flat polygon");
	          }
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
	        else {
	            //console.log("WARNING: flat polygon");
	        }
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
	      else {
	        //console.log("WARNING: flat polygon");
	    	}
	    } 
	    else{
	          //console.log("WARNING: negative n0");
	    }
	    locPolylist.sort(function(a,b){return mul*(a.level-b.level)});
	    return locPolylist;
	  }

	  //associate a texture for each polygon depending on there level, and the baseline
	  this.setColor = function(poly){
	    let copy = poly;
	    let forkValue = this.maxs - this.baselvl;
	    if(this.baselineType == "Stratum" || this.baselineType == "Stratum0"){
	      for(let g in copy){
	        copy[g].texture = new Array();
	        let lvlValue = this.mins +(copy[g].level-1)*forkValue/this.scaleYpos;
	        let nextlvlValue = this.mins + copy[g].level*forkValue/this.scaleYpos;
	        var c = document.createElement("canvas");//create a canvas to draw the texture in it
	        c.width  = 1;
	        c.height = this.initHeight;
	        var imgData = c.getContext("2d").getImageData(0, 0, 1, this.initHeight);
	        //case when baseline is under actual polygon
	        if(this.basecut <= lvlValue){
	          if(copy[g].level == this.maxlvl){
	            for(let k=0; k<this.initHeight; k++){
	              imgData.data[4*k+0]=heatScale[5][0];
	              imgData.data[4*k+1]=heatScale[5][1];
	              imgData.data[4*k+2]=heatScale[5][2];
	              imgData.data[4*k+3]=255;
	            }
	          }
	          else if(copy[g].level == this.minlvl){
	            for(let k=0; k<this.initHeight+1; k++){
	              imgData.data[4*k+0]=heatScale[240][0];
	              imgData.data[4*k+1]=heatScale[240][1];
	              imgData.data[4*k+2]=heatScale[240][2];
	              imgData.data[4*k+3]=255;
	            }
	          }
	          else{
	            for(let k=0; k<this.initHeight; k++){
	              imgData.data[4*k+0]=heatScale[240-((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][0];
	              imgData.data[4*k+1]=heatScale[240-((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][1];
	              imgData.data[4*k+2]=heatScale[240-((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][2];
	              imgData.data[4*k+3]=255;
	            }
	          }
	        }
	        //case when baseline is above actual polygon
	        else if(this.basecut >= nextlvlValue){
	          if(copy[g].level == this.maxlvl){
	            for(let k=0; k<this.initHeight; k++){
	              imgData.data[4*k+0]=btcScale[240][0];
	              imgData.data[4*k+1]=btcScale[240][1];
	              imgData.data[4*k+2]=btcScale[240][2];
	              imgData.data[4*k+3]=255;
	            }
	          }
	          else if(copy[g].level == this.minlvl){
	            for(let k=0; k<this.initHeight; k++){
	              imgData.data[4*k+0]=btcScale[5][0];
	              imgData.data[4*k+1]=btcScale[5][1];
	              imgData.data[4*k+2]=btcScale[5][2];
	              imgData.data[4*k+3]=255;
	            }
	          }
	          else{
	            for(let k=0; k<this.initHeight; k++){
	              imgData.data[4*k+0]=btcScale[((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][0];
	              imgData.data[4*k+1]=btcScale[((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][1];
	              imgData.data[4*k+2]=btcScale[((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][2];
	              imgData.data[4*k+3]=255;
	            }
	          }
	        }
	        //case when baseline is inside actual polygon
	        else{
	          if(copy[g].level == this.maxlvl){
	            for(let k=0; k<this.initHeight; k++){
	              let pixelValue = lvlValue + k*((nextlvlValue-lvlValue)/this.initHeight);
	              if(pixelValue<=this.basecut){
	                imgData.data[4*((this.initHeight-1)-k)+0]=btcScale[240][0];
	                imgData.data[4*((this.initHeight-1)-k)+1]=btcScale[240][1];
	                imgData.data[4*((this.initHeight-1)-k)+2]=btcScale[240][2];
	                imgData.data[4*((this.initHeight-1)-k)+3]=255;
	              }
	              else{
	                imgData.data[4*((this.initHeight-1)-k)+0]=heatScale[5][0];
	                imgData.data[4*((this.initHeight-1)-k)+1]=heatScale[5][1];
	                imgData.data[4*((this.initHeight-1)-k)+2]=heatScale[5][2];
	                imgData.data[4*((this.initHeight-1)-k)+3]=255;
	              }
	            }
	          }
	          else if(copy[g].level == this.minlvl){
	            for(let k=0; k<this.initHeight; k++){
	              let pixelValue = lvlValue + k*((nextlvlValue-lvlValue)/this.initHeight);
	              if(pixelValue<=this.basecut){
	                imgData.data[4*((this.initHeight-1)-k)+0]=btcScale[5][0];
	                imgData.data[4*((this.initHeight-1)-k)+1]=btcScale[5][1];
	                imgData.data[4*((this.initHeight-1)-k)+2]=btcScale[5][2];
	                imgData.data[4*((this.initHeight-1)-k)+3]=255;
	              }
	              else{
	                imgData.data[4*((this.initHeight-1)-k)+0]=heatScale[240][0];
	                imgData.data[4*((this.initHeight-1)-k)+1]=heatScale[240][1];
	                imgData.data[4*((this.initHeight-1)-k)+2]=heatScale[240][2];
	                imgData.data[4*((this.initHeight-1)-k)+3]=255;
	              }
	            }
	          }
	          else{
	            for(let k=0; k<this.initHeight; k++){
	              let pixelValue = lvlValue + k*((nextlvlValue-lvlValue)/this.initHeight);
	              if(pixelValue<=this.basecut){
	                imgData.data[4*((this.initHeight-1)-k)+0]=btcScale[((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][0];
	                imgData.data[4*((this.initHeight-1)-k)+1]=btcScale[((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][1];
	                imgData.data[4*((this.initHeight-1)-k)+2]=btcScale[((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][2];
	                imgData.data[4*((this.initHeight-1)-k)+3]=255;
	              }
	              else{
	                imgData.data[4*((this.initHeight-1)-k)+0]=heatScale[240-((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][0];
	                imgData.data[4*((this.initHeight-1)-k)+1]=heatScale[240-((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][1];
	                imgData.data[4*((this.initHeight-1)-k)+2]=heatScale[240-((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][2];
	                imgData.data[4*((this.initHeight-1)-k)+3]=255;
	              }
	            }
	          }
	        }
	        c.getContext("2d").putImageData(imgData,0,0);
	        copy[g].texture= c.getContext('2d').createPattern(c, "repeat-x");
	      }
	      return copy;
	    }
	    else if(this.baselineType == "Horizon"){
	      for(let g in copy){
	          copy[g].texture = new Array();
	          var c = document.createElement("canvas");//create a canvas to draw the texture in it
	          c.width  = 1;
	          c.height = this.initHeight;
	          var imgData = c.getContext("2d").getImageData(0, 0, 1, this.initHeight);
	          if(copy[g].level > 0 && this.scaleYpos >= 1){
	            for(let k=0; k<this.initHeight; k++){
	              imgData.data[4*k+0]=Math.floor(lingreyScale[255-(copy[g].level*(Math.floor(120/(this.scaleYpos*2))))][0]/1.5);
	              imgData.data[4*k+1]=Math.floor(lingreyScale[255-(copy[g].level*(Math.floor(120/(this.scaleYpos*2))))][1]/1.5);
	              imgData.data[4*k+2]=bScale[255-(copy[g].level*(Math.floor(120/(this.scaleYpos*2))))][2];
	              imgData.data[4*k+3]=255;
	            }
	          }
	          else if(copy[g].level>0 && this.scaleYpos < 1){
	          	for(let k=0; k<this.initHeight; k++){
	              imgData.data[4*k+0]=Math.floor(lingreyScale[150][0]/1.5);
	              imgData.data[4*k+1]=Math.floor(lingreyScale[150][1]/1.5);
	              imgData.data[4*k+2]=bScale[150][2];
	              imgData.data[4*k+3]=255;
	            }
	          }
	          else{
	          	if(this.scaleYneg >= 1){
		            for(let k=0; k<this.initHeight; k++){
		              imgData.data[4*k+0]=rScale[255+(copy[g].level*(Math.floor(120/(this.scaleYneg*2))))][0];
		              imgData.data[4*k+1]=Math.floor(lingreyScale[255+(copy[g].level*(Math.floor(120/(this.scaleYneg*2))))][1]/1.5);
		              imgData.data[4*k+2]=Math.floor(lingreyScale[255+(copy[g].level*(Math.floor(120/(this.scaleYneg*2))))][2]/1.5);
		              imgData.data[4*k+3]=255;
		            }
	        	}
	        	else{
	        		for(let k=0; k<this.initHeight; k++){
		              imgData.data[4*k+0]=rScale[150][0];
		              imgData.data[4*k+1]=Math.floor(lingreyScale[150][1]/1.5);
		              imgData.data[4*k+2]=Math.floor(lingreyScale[150][2]/1.5);
		              imgData.data[4*k+3]=255;
		            }
	        	}
	          }
	          c.getContext("2d").putImageData(imgData,0,0);
	          copy[g].texture= c.getContext('2d').createPattern(c, "repeat-x");
	      }
	      return copy;
	    }
	    else
	        console.log("WARNING : unhandle BaseLineType : " + this.BaseLineType);
	    return 0;
	  }

	  //generate the whole graphs depending on @BaseLineType Must be use to generate this.pols or this.polsfill
	  this.allPolygons = function(optim){
	    if(this.baselineType == "Stratum" || this.baselineType == "Stratum0"){
	      let res = this.computePolygons(this.baselvl,optim,1,this.mins,this.maxs);
	      return this.setColor(res);
	    }
	          
	    else {
	      if(this.baselineType == "Horizon"){
	      let res = new Array();
	      res = res.concat(this.computePolygons(this.baselvl,optim,1,this.basecut,this.maxs));
	      res = res.concat(this.computePolygons(this.baselvl,optim,-1, this.mins, this.basecut));
	      return this.setColor(res);
	      }
	      else
	        console.log("WARNING : unhandle BaseLineType : " + this.BaseLineType);
	    }
	    return 0;
	  }


	  //Draw the graph in his canvas
	  this.draw1 = function(optim){
	    //console.time('someFunction');
	    if (this.can.height!=this.initHeight+this.addHeight && this.statu == "anim")
	    	this.can.height = this.initHeight+this.addHeight ;
	  	else if(this.statu == "unfold")
	  		this.addHeight = this.initHeight*this.ZOOM - this.initHeight;
	  		this.can.height = this.initHeight+this.addHeight ;

	    let ctx = this.can.getContext("2d");
	    ctx.fillStyle="#F0FF0F";  
	    ctx.clearRect(0,0,this.can.width, this.can.height);
	    let up = (this.maxs-this.baselvl)

	    let propup = this.ZOOM*(up/(this.maxs-this.mins));
	    let propupCeil = Math.ceil(propup);
	    if(propup == propupCeil)
	      propupCeil += 1.0;
	    let graphToDraw;
	    if(optim)
	      graphToDraw = this.pols;
	    else
	      graphToDraw = this.polsfill;
	    for (let j in graphToDraw){
	      ctx.save();
	      if (graphToDraw[j].level>0){
	        ctx.fillStyle=graphToDraw[j].texture;
	        let shift = Math.ceil(((this.addHeight*((propupCeil-graphToDraw[j].level)/(this.ZOOM-1))))-Math.ceil((1.0-propup%1)*this.addHeight/(this.ZOOM-1)));
	        ctx.translate(0, 0-this.initHeight+graphToDraw[j].pty[0]*this.initHeight+shift
	                   );
	        ctx.beginPath();
	          
	        ctx.moveTo(graphToDraw[j].ptx[0]*this.can.width, graphToDraw[j].pty[0]*this.initHeight);
	       
	        for (let i=1; i<graphToDraw[j].ptx.length; i++)
	          ctx.lineTo(graphToDraw[j].ptx[i]*this.can.width, graphToDraw[j].pty[i]*this.initHeight);
	        ctx.closePath();
	      }
	      else {
	      ctx.fillStyle=graphToDraw[j].texture;
	      let anim = this.addHeight/(this.ZOOM-1)/this.initHeight;
	      if(anim > 0.995)
	        anim = 1.0;
	      ctx.translate(0, 0+this.initHeight
	                    +Math.ceil((propup-1)*this.initHeight*anim)
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
	        
	      if(optim){
	        ctx.shadowColor = "#000";
	        ctx.shadowBlur = 1//1-(Math.min(1, (this.addHeight/((this.ZOOM-1)*this.initHeight))));
	        ctx.shadowOffsetX = 0;
	        ctx.shadowOffsetY = 0;
	      }
	      else{
	        ctx.shadowColor = "#000";
	        let blurEvol = Math.min(1, (this.addHeight/((this.ZOOM-1)*this.initHeight)));
	        if(Math.min(1, (this.addHeight/((this.ZOOM-1)*this.initHeight))) > 0.98){
	          blurEvol = 1.0;
	        }
	        ctx.shadowBlur = 1-blurEvol;
	        ctx.shadowOffsetX = 0;
	        ctx.shadowOffsetY = 0;
	      }

	      ctx.fill();
	      ctx.restore();
	    }
	    if(this.baselineType=="Stratum" && this.statu=="unfold"){
	    	ctx.save();
	    	ctx.closePath();
	    	let basecutHeight = ((this.maxs-this.basecut)/((this.maxs-this.mins)/this.ZOOM))*this.initHeight;
	      	ctx.moveTo(0,basecutHeight)
	      	ctx.lineTo(this.can.width, basecutHeight )
	      	ctx.stroke();
	      	ctx.restore();
	    }
	    //console.timeEnd('someFunction');
	  }

	  //Draw the graph in his canvas (new animation)
	  this.draw2 = function(optim){
	  	//console.time('someFunction');
	    if (this.can.height!=this.initHeight+this.addHeight && this.statu != "unfold")
	    	this.can.height = this.initHeight+this.addHeight ;
	  	else if(this.statu == "unfold"){
	  		this.addHeight = Math.ceil(this.initHeight*this.ZOOM - this.initHeight);
	  		this.can.height = this.initHeight+this.addHeight ;
	  	}

	    let ctx = this.can.getContext("2d");
	    ctx.fillStyle="#F0FF0F";  
	    ctx.clearRect(0,0,this.can.width, this.can.height);
	    let up = (this.maxs-this.baselvl)

	    let propup = this.ZOOM*(up/(this.maxs-this.mins));
	    let propupCeil = Math.ceil(propup);
	    if(propup == propupCeil)
	      propupCeil += 1.0;
	    let graphToDraw;
	    if(optim)
	      graphToDraw = this.pols;
	    else
	      graphToDraw = this.polsfill;
	  	let scaleShiftpos = this.initHeight*(1-this.scaleYpos%1.0);
	  	let scaleShiftneg = Math.round(this.initHeight*(1-this.scaleYneg%1.0)-Math.ceil(1-this.scaleYneg%1.0));
	  	let forkPosCoord = Math.round(this.initHeight*(this.maxlvl-1)-scaleShiftpos);
	  	for (let j in graphToDraw){
	    	ctx.save();
	    	if (graphToDraw[j].level>0){
	    		let scaleShiftpostemp = scaleShiftpos;
	    		if(scaleShiftpostemp==this.initHeight)
		        	scaleShiftpostemp = 0;
		        ctx.fillStyle=graphToDraw[j].texture;
		        let shift;
		        if(graphToDraw[j].level == this.maxlvl){
		        	if( this.addHeight >= scaleShiftpostemp){
		        		shift = -Math.round(scaleShiftpostemp);
		        	}
		        	else
		        		shift = -this.addHeight;
		        }
		        else{
		        	if(this.addHeight >= this.initHeight*(this.maxlvl-graphToDraw[j].level)-Math.round(scaleShiftpostemp))
		        		shift = this.initHeight*(this.maxlvl-graphToDraw[j].level)-Math.round(scaleShiftpostemp);
					else
						shift = this.addHeight;
		        }
		        ctx.translate(0, 0-this.initHeight+graphToDraw[j].pty[0]*this.initHeight+shift
		                   );
		        ctx.beginPath();
		          
		        ctx.moveTo(graphToDraw[j].ptx[0]*this.can.width, graphToDraw[j].pty[0]*this.initHeight);
		       
		        for (let i=1; i<graphToDraw[j].ptx.length; i++)
		          ctx.lineTo(graphToDraw[j].ptx[i]*this.can.width, graphToDraw[j].pty[i]*this.initHeight);
		        ctx.closePath();
	     	}
	      	else {
			    ctx.fillStyle=graphToDraw[j].texture;
			    let anim;
			    if(this.addHeight-(forkPosCoord) <= this.initHeight){
			     	anim = (this.addHeight-(forkPosCoord))/this.initHeight;
			    }
			    else
			    	anim = 1.0;
			    let shiftBeforeRot;
			    let shiftAfterRot;
			    let rota;
			    let tranAfterRota;
		        if(this.addHeight > forkPosCoord && this.addHeight>0){
		        	shiftBeforeRot = forkPosCoord;
		        	rota = true;
		        	if(this.addHeight >= forkPosCoord+this.initHeight && graphToDraw[j].level < -1){
		        		tranAfterRota = true;
		        		if(graphToDraw[j].level == (this.minlvl)){
		        			if((this.addHeight-forkPosCoord-this.initHeight) <= this.initHeight){
		        				shiftAfterRot = -(this.addHeight-forkPosCoord-this.initHeight + (scaleShiftneg*((this.addHeight-forkPosCoord-this.initHeight)/this.initHeight)));
		        			}
		        			else
		        				shiftAfterRot = -(this.addHeight-forkPosCoord-this.initHeight + scaleShiftneg);
		        		}
			        	else if(this.addHeight <= forkPosCoord+((-1)*graphToDraw[j].level*this.initHeight)){
			        		shiftAfterRot = -(this.addHeight-forkPosCoord-this.initHeight);
			        	}
			        	else{
			        		shiftAfterRot = this.initHeight*(graphToDraw[j].level+1);
			        	}
			    	}
		        }
		        else{
		        	shiftBeforeRot = this.addHeight;
		        	rota = false;
		        	tranAfterRota = false;
		        }
			    ctx.translate(0, 0-this.initHeight+graphToDraw[j].pty[0]*this.initHeight+shiftBeforeRot
			                 );
			    if(rota){
			    	ctx.translate(0, this.initHeight)
			    	ctx.scale(1.0,1.0*(1.0-anim)-1.0*(anim));
			    	ctx.translate(0, -this.initHeight);
				}
				if(tranAfterRota)
					ctx.translate(0, shiftAfterRot);
			    ctx.beginPath();
			        
			    ctx.moveTo(graphToDraw[j].ptx[0]*this.can.width, graphToDraw[j].pty[0]*this.initHeight);
			     
			    for (let i=1; i<graphToDraw[j].ptx.length; i++)
			    	ctx.lineTo(graphToDraw[j].ptx[i]*this.can.width, graphToDraw[j].pty[i]*this.initHeight);
			    ctx.closePath();
		    }
	        
	      if(optim){
	        ctx.shadowColor = "#000";
	        ctx.shadowBlur = 1//1-(Math.min(1, (this.addHeight/((this.ZOOM-1)*this.initHeight))));
	        ctx.shadowOffsetX = 0;
	        ctx.shadowOffsetY = 0;
	      }
	      else{
	        ctx.shadowColor = "#000";
	        let blurEvol = Math.min(1, (this.addHeight/((this.ZOOM-1)*this.initHeight)));
	        if(Math.min(1, (this.addHeight/((this.ZOOM-1)*this.initHeight))) > 0.98){
	          blurEvol = 1.0;
	        }
	        ctx.shadowBlur = 1-blurEvol;
	        ctx.shadowOffsetX = 0;
	        ctx.shadowOffsetY = 0;
	      }

	      ctx.fill();
	      ctx.restore();
	    }
	    if(this.baselineType=="Stratum" && this.statu=="unfold"){
	    	ctx.save();
	    	ctx.closePath();
	    	let basecutHeight = ((this.maxs-this.basecut)/((this.maxs-this.mins)/this.ZOOM))*this.initHeight;
	      	ctx.moveTo(0,basecutHeight)
	      	ctx.lineTo(this.can.width, basecutHeight )
	      	ctx.stroke();
	      	ctx.restore();
	    }
	    //console.timeEnd('someFunction');

	  }

	  this.draw = function(optim){
	  	if(this.drawingMethod == 1)
	  		this.draw1(optim);
	  	else
	  		this.draw2(optim);
	  }

	  //Must be call after each creation or modification of this object
	  this.init = function(){
	    this.mins = this.getmins();
	    this.maxs = this.getmaxs();
	    this.sliderBaseline[0].min  = Math.ceil(this.mins-1);
	  	this.sliderBaseline[0].max  = Math.ceil(this.maxs+1);
	    this.sliderBaseline[0].value = this.basecut;
	    this.sliderZOOM[0].value = this.ZOOM;
	  	this.sliderInitHeight[0].value = this.initHeight;
	    if(this.baselineType == "Stratum" || this.baselineType == "Stratum0"){
	        this.scaleYpos = this.ZOOM;
	        this.minlvl = 1;
	    }
	    else {
	      if(this.baselineType == "Horizon"){
	        this.scaleYpos = this.ZOOM*(this.maxs-this.basecut)/(this.maxs-this.mins);
	        this.scaleYneg = this.ZOOM*(this.basecut-this.mins)/(this.maxs-this.mins);
	        if(this.scaleYneg>0.5)
	        	this.minlvl = -Math.ceil(this.scaleYneg);
	        else
	        	this.minlvl = 1;
	      }
	    }
	    if(Math.ceil(this.scaleYpos)>0)
	    	this.maxlvl = Math.ceil(this.scaleYpos);
	    else
	    	this.maxlvl = 1;
	    this.baselvl = this.getBaselvl();
	    this.pols = this.allPolygons(true);
	    this.polsfill = null;
	  }

		this.initListener = function(){

			let me = this;
		    //adding to the canvas : MouseListener | Expansion of the graph
		    /*this.can.addEventListener("click", function(){
		    	if(me.statu == "opti"){																				
				    if (me.timer==null) {
				      	me.initHeight=me.can.height;
				        me.timer = setInterval(function(){
				        	if(me.addHeight<=me.initHeight || me.addHeight >= me.initHeight*(me.ZOOM-2))
					        	me.addHeight++;
					        else
					        	me.addHeight= me.addHeight*1.03;
					        me.statu="anim";
					        if(me.addHeight>=Math.floor((me.ZOOM-1)*me.initHeight)){
					            clearInterval(me.timer);
					            me.statu="unfold";
					        }
					        if(me.polsfill == null)
					            me.polsfill = me.allPolygons(false);
					        me.draw(false);
				    	}, 12);
				    }
			    }
			    if(me.statu == "unfold" || me.statu == "anim"){
		    		let drawingMode = false;
				    if (me.timer!=null)
				      	clearInterval(me.timer);
				    me.timer = setInterval(function(){
				      	me.statu="anim";
				        if(me.addHeight<=0){
				           	clearInterval(me.timer);
				           	me.timer = null;
				           	me.statu="opti";
				        }
				        else
				           	if(me.addHeight<=me.initHeight || me.addHeight >= me.initHeight*(me.ZOOM-2))
					        	me.addHeight--;
					        else
					        	me.addHeight= me.addHeight*0.98;
				        if(me.statu == "opti")
				           	drawingMode=true;
				        me.draw(drawingMode);
				    }, 12);
		      	}
		     });*/

		    //adding to the canvas : onclick listener | seting the baseline
		    this.can.addEventListener('click',function(eventData){
		    	eventData.preventDefault()
		    	let tempBasecut;
		    	if(me.statu!="anim"){
		    		let drawingMode = true;
		    		if(me.statu=="unfold"){
		    			drawingMode = false;
		    			tempBasecut = me.maxs-(((me.maxs-me.mins)/me.ZOOM)/me.initHeight)*eventData.offsetY;
		    		}
		    		else if(me.statu == "opti"){
		    			let linelvl = 1;
		    			let tempPolslist = new Array();
		    			for(let j in me.pols){
		    				let inPols = false;
		    				let polsbegin = me.pols[j].ptx[0];
		    				let polsending = me.pols[j].ptx[(me.pols[j].ptx).length-1]
		    				for(let i in me.pols[j].ptx){

		    					if ( !inPols && polsbegin<=(eventData.offsetX/me.can.width)
		    						&& polsending >=(eventData.offsetX/me.can.width)){
		    						inPols = true;
		    					}
		    				}
		    				if(inPols)
		    					tempPolslist.push(me.pols[j]);
		    			}
		    			if(tempPolslist.length>1){
			    			let points = new Array();
			    			for(let g in tempPolslist){
			    				let breakingPoint = false;
			    				let dist = 1.0;
			    				let point = 0;
			    				let cpt = 0;
			    				while(!breakingPoint){
			    					if(Math.abs(tempPolslist[g].ptx[cpt]-eventData.offsetX/me.can.width)<=dist){
			    						dist = Math.abs(tempPolslist[g].ptx[cpt]-eventData.offsetX/me.can.width);
			    						point = cpt;
			    					}
			    					if(Math.abs(tempPolslist[g].ptx[cpt] > eventData.offsetX/me.can.width))
			    						breakingPoint = true;
			    					cpt++
			    				}
			    				points.push(point);
			    			}
			    			if(Math.round(tempPolslist[0].pty[points[0]]*(me.ZOOM*me.initHeight))%me.initHeight > (me.initHeight-eventData.offsetY))
			    				linelvl = tempPolslist[0].level;
			    			else
			    				linelvl = tempPolslist[1].level;

			    		}
			    		if(me.baselineType == "Stratum"){
			    			tempBasecut = me.mins + (linelvl-1+(me.initHeight-eventData.offsetY)/me.initHeight)*((me.maxs-me.mins)/me.ZOOM)
			    		}
			    		else if(me.baselineType == "Horizon"){
			    			if(linelvl > 0)
		    				tempBasecut = me.basecut + (linelvl-1+(me.initHeight-eventData.offsetY)/me.initHeight)*((me.maxs-me.mins)/me.ZOOM)
		    			else
		    				tempBasecut = me.basecut + (linelvl+(me.initHeight-eventData.offsetY)/me.initHeight)*((me.maxs-me.mins)/me.ZOOM)
			    		}
		    		}
		    		if (me.statu=="unfold" || me.statu == "opti") {
		    			let oldStatu = me.statu
				        me.timer = setInterval(function(){
				        	if(me.basecut < tempBasecut){
					        	me.basecut = me.basecut + 0.15;
					        	me.statu="anim";
					        	if(me.basecut>=tempBasecut){
						            clearInterval(me.timer);
						            me.statu=oldStatu;
						        }
				        	}
					        else{
					        	me.basecut = me.basecut - 0.15;
					        	me.statu="anim";
					        	if(me.basecut<=tempBasecut){
						            clearInterval(me.timer);
						            me.timer=null;
						            me.statu=oldStatu;
						        }
					        }
					        me.init();
					        if(oldStatu == "unfold")
					            me.polsfill = me.allPolygons(false);
					        me.draw(drawingMode);
				    	}, 12);
				    }
		    	}
		    	eventData.stopImmediatePropagation();
			    return false;
		    });

		   	//wheel interactions
		    this.can.addEventListener("wheel", function(eventData){
		    	eventData.preventDefault()
		    	if(me.statu!="anim"){
		    		let drawingMode = true;
		    		if(me.statu=="unfold")
		    			drawingMode = false;
			    	if(eventData.shiftKey && (!eventData.ctrlKey)){
			    		let tempZOOM = me.ZOOM + eventData.deltaY/30;
			    		if(tempZOOM >= maxZOOM)
			    			me.ZOOM = maxZOOM;
			    		else if(tempZOOM <= 1.0)
			    			me.ZOOM = 1.0;
			    		else
			    			me.ZOOM = tempZOOM;
			    		me.init();
			    		if(me.statu=="unfold")
			    			me.polsfill = me.allPolygons(false);
			    		me.draw(drawingMode);
			    		eventData.stopImmediatePropagation();
			    		return false;
			    	}
			    	if(eventData.altKey){
			    		let tempBaseline = me.basecut  -eventData.deltaY/30;
			    		if(tempBaseline >= me.maxs)
			    			me.basecut = me.maxs;
			    		else if(tempBaseline <= me.mins)
			    			me.basecut = me.mins;
			    		else
			    			me.basecut = tempBaseline;
			    		me.init();
			    		if(me.statu=="unfold")
			    			me.polsfill = me.allPolygons(false);
			    		me.draw(drawingMode);
			    		eventData.stopImmediatePropagation();
			    		return false;
			    	}
			    	if(eventData.ctrlKey && (!eventData.shiftKey)){
			    		let tempinitHeight = me.initHeight + Math.ceil(eventData.deltaY/3);
			    		if(tempinitHeight <= 10.0)
			    			me.initHeight = 10.0;
			    		else if(tempinitHeight >= 50.0)
			    			me.initHeight = 50.0;
			    		else
			    			me.initHeight = tempinitHeight;
			    		me.init();
			    		if(me.statu=="unfold")
			    			me.polsfill = me.allPolygons(false);
			    		me.draw(drawingMode);
			    		eventData.stopImmediatePropagation();
			    		return false;
			    	}
			    	/*if(eventData.shiftKey && eventData.ctrlKey){
			    		let beforeInitHeight = me.initHeight;
			    		let tempinitHeight = me.initHeight + Math.ceil(eventData.deltaY/3);
			    		let changepx;
			    		if(tempinitHeight <= 10.0){
			    			me.initHeight = 10.0;
			    			changepx = beforeInitHeight - 10.0;
			    		}
			    		else if(tempinitHeight >= 50.0){
			    			me.initHeight = 50.0;
			    			changepx = beforeInitHeight - 50.0;
			    		}
			    		else{
			    			me.initHeight = tempinitHeight;
			    			changepx = beforeInitHeight - tempinitHeight;
			    			me.ZOOM = me.ZOOM + (me.initHeight*me.ZOOM)/(tempinitHeight*me.ZOOM);
			    		}
			    		console.log(changepx);
			    		me.init();
			    		if(me.statu=="unfold")
			    			me.polsfill = me.allPolygons(false);
			    		me.draw(drawingMode);
			    		eventData.stopImmediatePropagation();
			    		return false;
			    	}*/
		    	}
		    });

		    //slider interactions
		    this.sliderBaseline.on('input', function() {
		    	if(me.statu!="anim"){
			    	let drawingMode = true;
			    	if(me.statu=="unfold")
			    		drawingMode = false;
			    	let tempBaseline = this.value;
				    if(tempBaseline > me.maxs)
				    	me.basecut = me.maxs;
				    else if(tempBaseline < me.mins)
				    	me.basecut = me.mins;
				    else
				    	me.basecut = parseInt(tempBaseline,10);
				    me.init();
				   	if(me.statu=="unfold")
				    	me.polsfill = me.allPolygons(false);
				    me.draw(drawingMode);
					//output.innerHTML = this.value;
				}
			});
			this.sliderZOOM.on('input', function() {
		    	if(me.statu!="anim"){
			    	let drawingMode = true;
			    	if(me.statu=="unfold")
			    		drawingMode = false;
			    	let tempZOOM = this.value;
				    if(tempZOOM >= maxZOOM)
			    		me.ZOOM = maxZOOM;
			    	else if(tempZOOM <= 1.0)
			    		me.ZOOM = 1.0;
			    	else
			    		me.ZOOM = parseInt(tempZOOM,10);
			    	me.init();
			    	if(me.statu=="unfold")
			    		me.polsfill = me.allPolygons(false);
			    	me.draw(drawingMode);
					//output.innerHTML = this.value;
				}
			});
			this.sliderInitHeight.on('input', function() {
		    	if(me.statu!="anim"){
			    	let drawingMode = true;
			    	if(me.statu=="unfold")
			    		drawingMode = false;
			    	let tempinitHeight = this.value;
			    	if(tempinitHeight <= 10.0)
			    		me.initHeight = 10.0;
			    	else if(tempinitHeight >= 50.0)
			    		me.initHeight = 50.0;
			    	else
			    		me.initHeight = parseInt(tempinitHeight,10);
			    	me.init();
			    	if(me.statu=="unfold")
			    		me.polsfill = me.allPolygons(false);
			    	me.draw(drawingMode);
					//output.innerHTML = this.value;
				}
			});

			//button interactions
			this.statusButton.on('click', function(){
		    	if(me.statu == "opti"){	
				    me.initHeight=me.can.height;
				    me.timer = setInterval(function(){
				        if(me.addHeight<=me.initHeight || me.addHeight >= me.initHeight*(me.ZOOM-2))
					        me.addHeight++;
					    else
					        me.addHeight= me.addHeight*1.03;
					    me.statu="anim";
					    if(me.addHeight>=Math.floor((me.ZOOM-1)*me.initHeight)){
					        clearInterval(me.timer);
					        me.statu="unfold";
					    }
					    if(me.polsfill == null)
					        me.polsfill = me.allPolygons(false);
					    me.draw(false);
				    }, 12);
			    }
			    if(me.statu == "unfold" || me.statu == "anim"){
		    		let drawingMode = false;
				    if (me.timer!=null)
				      	clearInterval(me.timer);
				    me.timer = setInterval(function(){
				      	me.statu="anim";
				        if(me.addHeight<=0){
				           	clearInterval(me.timer);
				           	me.timer = null;
				           	me.statu="opti";
				        }
				        else
				           	if(me.addHeight<=me.initHeight || me.addHeight >= me.initHeight*(me.ZOOM-2))
					        	me.addHeight--;
					        else
					        	me.addHeight= me.addHeight*0.98;
				        if(me.statu == "opti")
				           	drawingMode=true;
				        me.draw(drawingMode);
				    }, 12);
		      	}
		     });

			//adding different elements to the HTML
			$("#myTable").find('tbody')
			    .append($('<tr>')
			    	.append($('<td>')
			            .append(this.statusButton)
			        ).append($('<td>')
			            .append($(this.can))
			        ).append($('<td>')
			        	.append(this.sliderBaseline)
			        ).append($('<td>')
			        	.append(this.sliderZOOM)
			        ).append($('<td>')
			        	.append(this.sliderInitHeight)
			        )

			    );

	  	}
	}
																																																																																																																																																																																																																																																																																																																																																																			

	        //////////////////////////////////////////////////
	        //          Creation of multiple Graphs         //
	        //////////////////////////////////////////////////

	let data = new Float32Array(256);
	let time = new Float32Array(256);
	for (let i=0; i<256; i++){
	  data[i] = 30.0+10*Math.cos(i/256*3*Math.PI);
	  time[i] = i/255;
	}

	let ZOOM = 13.5
	var initHeight = 35;
	let BASELINE = 28.76;


	var test1 = new Graph(BASELINE, ZOOM, 1, data, time, "Horizon", 0, 255, initHeight, 1);
	var test2 = new Graph(BASELINE, ZOOM, 1, data, time, "Stratum", 0, 255, initHeight, 1);
	test1.init();
	test2.init();
	test1.initListener();
	test2.initListener();
	test1.draw(true);
	test2.draw(true);
	console.log(Object.values(test2));
	console.log(Object.values(test1));

	var test3 = new Graph(BASELINE, ZOOM, 1, data, time, "Horizon", 0, 255, initHeight, 2);
	var test4 = new Graph(BASELINE, ZOOM, 1, data, time, "Stratum", 0, 255, initHeight, 2);
	test3.init();
	test4.init();
	test3.initListener();
	test4.initListener();
	test3.draw2(true);
	test4.draw2(true);
	console.log(Object.values(test3));
	console.log(Object.values(test4));
});