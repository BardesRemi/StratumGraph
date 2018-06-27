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


		function adj(theth){
			console.log(theth.children('.lab').css('display'))
			if (theth.children('.lab').css('display')=='inline'){
				theth.children('.lab').css('display', 'none')
				theth.children('.adjuster').html('+')
				theth.css('background-color', '#f00');
				theth.css('width', '20px');
				theth.css('max-width', '20px');
		    } else{
				theth.children('.lab').css('display', 'inline')
				theth.children('.adjuster').html('&nbsp;-&nbsp;')
				theth.css('background-color', '#0f0');
				theth.css('width', '');
				theth.css('max-width', '');
		    }
		}

	        //////////////////////////////////////////////////
	        //                     Init                     //
	        //////////////////////////////////////////////////
const maxZOOM = 15.0;
const canvasWidth = 1700;

$(function(){
	const favicon = require('./assets/favicon.png');
	let link = document.createElement('link');
	link.type = 'image/png';
	link.rel = 'shortcut icon';
	link.href = favicon;
	document.head.appendChild(link);

	$(".adjuster").on('click',function(){
		console.log("drg")
		adj($(this.parentNode));
	})
	

    	    //////////////////////////////////////////////////
	        //        		calculating method  		    //
	        //////////////////////////////////////////////////

    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/math/is-point-in-poly [rev. #0]
    function isPointInPoly(poly, pt){
      //console.log("isPointInPoly "+pt.x+","+pt.y);
      for(var c = false, i = -1, l = poly.ptx.length, j = l - 1; ++i < l; j = i)
        ((poly.pty[i] <= pt.y && pt.y < poly.pty[j]) || (poly.pty[j] <= pt.y && pt.y < poly.pty[i]))
        && (pt.x < (poly.ptx[j] - poly.ptx[i]) * (pt.y - poly.pty[i]) / (poly.pty[j] - poly.pty[i]) + poly.ptx[i])
        && (c = !c);
      return c;
    }

	        //////////////////////////////////////////////////
	        //       Graph Classes (via a constructor)      //
	        //////////////////////////////////////////////////

	function Graph(basecut, ZOOM, add, tabledata, timepos, baselineType, start, end, initHeight, drawingMethod, name){
	  //attributes
	  this.name = name;
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
	    this.can.width = canvasWidth;
	    this.can.height = this.initHeight;

	  //rangesliders generation
	  this.sliderBaseline = $("<input class='slider' type='range' step='0.01'>");
	  /*document.createElement('input');
	  	this.sliderBaseline.classes = 'slider';
	  	this.sliderBaseline.type = 'range';
	  	this.sliderBaseline.step = 3/20;*/

	  this.sliderZOOM = $("<input class='slider' type='range' min='1.0' max='"+maxZOOM+"' step='0.01'>");
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

	  this.statusButton = $("<button type='button'>fold / unfold</button>");

	  this.getmins = function(){
	    let mint = 0;
	    for (let i=1; i<this.tabledata.length-1; i++){
	      if (this.tabledata[i] < this.tabledata[mint]) mint =i; 
	    }
	    return this.tabledata[mint];
	  }

	  this.getmaxs = function(){
	    let maxt = 0;
	    for (let i=1; i<this.tabledata.length; i++){
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
	              imgData.data[4*k+0]=heatScale[220][0];
	              imgData.data[4*k+1]=heatScale[220][1];
	              imgData.data[4*k+2]=heatScale[220][2];
	              imgData.data[4*k+3]=255;
	            }
	          }
	          else{
	            for(let k=0; k<this.initHeight; k++){
	              imgData.data[4*k+0]=heatScale[220-((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][0];
	              imgData.data[4*k+1]=heatScale[220-((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][1];
	              imgData.data[4*k+2]=heatScale[220-((copy[g].level-1)*(Math.floor(220/this.scaleYpos)))][2];
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
	  this.draw1 = function(){
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
	    if(this.statu == "opti" || this.statu == "anim-opti")
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
	        
	      if(this.statu == "opti" || this.statu == "anim-opti"){
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
	  this.draw2 = function(){
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
	    if(this.statu == "opti" || this.statu == "anim-opti")
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
	        
	      if(this.statu == "opti" || this.statu == "anim-opti"){
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
	    	ctx.beginPath();
	    	let basecutHeight = ((this.maxs-this.basecut)/((this.maxs-this.mins)/this.ZOOM))*this.initHeight;
	      	ctx.moveTo(0,basecutHeight)
	      	ctx.lineTo(this.can.width, basecutHeight )
	      	ctx.stroke();
	      	ctx.restore();
	    }
	    //console.timeEnd('someFunction');

	  }

	  this.draw = function(){
	  	if(this.drawingMethod == 1)
	  		this.draw1();
	  	else
	  		this.draw2();
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

		    //adding to the canvas : onclick listener | seting the baseline
		    this.can.addEventListener('click',function(eventData){
		    	eventData.preventDefault()
		    	let tempBasecut;
		    	let ptclick = {
		    		x : eventData.offsetX,
		    		y : initHeight-eventData.offsetY
		    	};
		    	let normalizedptClick = {
					x : eventData.offsetX/me.can.width,
					y : eventData.offsetY/me.initHeight
				}
		    	if(me.statu!="anim" && me.statu!="anim-opti"){
		    		if(me.statu=="unfold"){
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
		    			if(tempPolslist.length==2){
			    			if(isPointInPoly(tempPolslist[0],normalizedptClick) && isPointInPoly(tempPolslist[1],normalizedptClick)){
			    				if(me.baselineType == "Stratum"){
				    				if(tempPolslist[0].level > tempPolslist[1].level)
				    					linelvl = tempPolslist[0].level;
				    				else
				    					linelvl = tempPolslist[1].level;
				    			}
				    			else if(me.baselineType == "Horizon"){
			    					if(tempPolslist[0].level>0 && tempPolslist[1].level >0){
			    						if(tempPolslist[0].level > tempPolslist[1].level)
				    						linelvl = tempPolslist[0].level;
				    					else
				    						linelvl = tempPolslist[1].level;
			    					}
			    					else{
			    						if(tempPolslist[0].level < tempPolslist[1].level)
				    						linelvl = tempPolslist[0].level;
				    					else
				    						linelvl = tempPolslist[1].level;
			    					}
			    				}
			    			}
			    			else if(isPointInPoly(tempPolslist[0],normalizedptClick))
			    				linelvl = tempPolslist[0].level;
			    			else
			    				linelvl = tempPolslist[1].level;
			    		}
			    		else{
			    			if(isPointInPoly(tempPolslist[0],normalizedptClick))
			    				linelvl = tempPolslist[0].level;
			    			else{
			    				console.log('WARNING : clicked point outside polygons')
			    				eventData.stopImmediatePropagation();
			    				return false;
			    			}
			    		}
			    		if(me.baselineType == "Stratum"){
			    			tempBasecut = me.mins + (linelvl-1+ptclick.y/me.initHeight)*((me.maxs-me.mins)/me.ZOOM)
			    		}
			    		else if(me.baselineType == "Horizon"){
			    			if(linelvl > 0)
			    				tempBasecut = me.basecut + (linelvl-1+ptclick.y/me.initHeight)*((me.maxs-me.mins)/me.ZOOM)
			    			else
			    				tempBasecut = me.basecut + ((linelvl+1)-ptclick.y/me.initHeight)*((me.maxs-me.mins)/me.ZOOM)
			    		}
			    		if(tempBasecut >= me.maxs)
			    			tempBasecut = me.maxs;
			    		else if(tempBasecut <= me.mins)
			    			tempBasecut = me.mins;
		    		}
		    		if (me.statu=="unfold" || me.statu == "opti") {
		    			let oldStatu = me.statu
				        me.timer = setInterval(function(){
				        	if(me.basecut < tempBasecut){
					        	me.basecut = me.basecut*1.05;
					        	if(oldStatu == "opti")
					        		me.statu="anim-opti";
					        	else
					        		me.statu= "anim";
					        	if(me.basecut>=tempBasecut){
					        		me.basecut = tempBasecut;
						            clearInterval(me.timer); 
						            me.statu=oldStatu;
						        }
				        	}
					        else{
					        	me.basecut = me.basecut*0.95;
					        	if(oldStatu == "opti")
					        		me.statu="anim-opti";
					        	else
					        		me.statu= "anim";
					        	if(me.basecut<=tempBasecut){
					        		me.basecut = tempBasecut;
						            clearInterval(me.timer);
						            me.timer=null;
						            me.statu=oldStatu;
						        }
					        }
					        me.init();
					        if(oldStatu == "unfold")
					            me.polsfill = me.allPolygons(false);
					        console.log(me.timer);
					        me.draw();
				    	}, 12);
				    }
		    	}
		    	eventData.stopImmediatePropagation();
			    return false;
		    });

		   	//wheel interactions
		    this.can.addEventListener("wheel", function(eventData){
		    	eventData.preventDefault()
		    	console.log(eventData.deltaY);
		    	if(me.statu!="anim" && me.statu!="anim-opti"){
		    		if(me.statu=="unfold")
			    	if(eventData.shiftKey && (!eventData.ctrlKey)){
			    		let tempZOOM = me.ZOOM + (eventData.deltaY/Math.abs(eventData.deltaY))*0.15;
			    		if(tempZOOM >= maxZOOM)
			    			me.ZOOM = maxZOOM;
			    		else if(tempZOOM <= 1.0)
			    			me.ZOOM = 1.0;
			    		else
			    			me.ZOOM = tempZOOM;
			    		me.init();
			    		if(me.statu=="unfold")
			    			me.polsfill = me.allPolygons(false);
			    		me.draw();
			    		eventData.stopImmediatePropagation();
			    		return false;
			    	}
			    	if(eventData.altKey){
			    		let tempBaseline = me.basecut + (eventData.deltaY/Math.abs(eventData.deltaY))*0.15;
			    		if(tempBaseline >= me.maxs)
			    			me.basecut = me.maxs;
			    		else if(tempBaseline <= me.mins)
			    			me.basecut = me.mins;
			    		else
			    			me.basecut = tempBaseline;
			    		me.init();
			    		if(me.statu=="unfold")
			    			me.polsfill = me.allPolygons(false);
			    		me.draw();
			    		eventData.stopImmediatePropagation();
			    		return false;
			    	}
			    	if(eventData.ctrlKey && (!eventData.shiftKey)){
			    		let tempinitHeight = me.initHeight + eventData.deltaY/Math.abs(eventData.deltaY);
			    		if(tempinitHeight <= 10.0)
			    			me.initHeight = 10.0;
			    		else if(tempinitHeight >= 50.0)
			    			me.initHeight = 50.0;
			    		else
			    			me.initHeight = tempinitHeight;
			    		me.init();
			    		if(me.statu=="unfold")
			    			me.polsfill = me.allPolygons(false);
			    		me.draw();
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
			    		me.draw();
			    		eventData.stopImmediatePropagation();
			    		return false;
			    	}*/
		    	}
		    });

		    //slider interactions
		    this.sliderBaseline.on('input', function() {
		    	if(me.statu!="anim" && me.statu!="anim-opti"){
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
				    me.draw();
					//output.innerHTML = this.value;
				}
			});
			this.sliderZOOM.on('input', function() {
		    	if(me.statu!="anim" && me.statu!="anim-opti"){
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
			    	me.draw();
					//output.innerHTML = this.value;
				}
			});
			this.sliderInitHeight.on('input', function() {
		    	if(me.statu!="anim" && me.statu!="anim-opti"){
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
			    	me.draw();
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
					        me.addHeight++//= me.addHeight*1.03;
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
				    if (me.timer!=null)
				      	clearInterval(me.timer);
				    me.timer = setInterval(function(){
				      	me.statu="anim";
				        if(me.addHeight<=0){
				           	clearInterval(me.timer);
				           	me.timer = null;
				           	me.statu="opti";
				        }
				        else{
				        	if(me.addHeight<=me.initHeight || me.addHeight >= me.initHeight*(me.ZOOM-2))
				        		me.addHeight--;
				        	else
				        		me.addHeight--//= me.addHeight*0.98;
				    	}
				        me.draw();
				    }, 12);
		      	}
		     });

			//adding different elements to the HTML
			$("#myTable").find('tbody')
			    .append($('<tr>')
			    	.append($('<td>')
			            .append(this.name)
			        ).append($('<td>')
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
	        //          	Parsing a CSV file   	        //
	        //////////////////////////////////////////////////	

	/*
		The CSV File must be in this shape :
		first line "titles" of each columns
		first column must be a date (with the right format)
		Last column must be the data
		"parsing" session can be change for 
	*/
	function graphFromCSV(filePath, ZOOM, BaseLineType, initHeight){
		let parseResult = new Object({
		name : 'pouet',
		timeBegin : 0,
		timeEnd : 0,
		time : new Array(),
		valueMax : 0,
		valueMin : 0,
		value : new Array()
		})

		let words = filePath.split('/');
		console.log(words);
		let tempname = "";
		for (let l=0; l < words[words.length-1].length-4;l++){
			tempname = tempname + words[words.length-1][l]
		}

	    $.ajax({
	    	url:filePath,
	    	async:false,
	    	success:function(data){
	    		parseResult.name = tempname;
	    		parseResult.time = [];
	    		parseResult.value = [];
		        let lines = data.split(/\r?\n|\r/);
		        let conformData = true;
		        for(let l in lines){
		        	let vals = lines[l].split(',');
		        	if(vals.length < 2)
		        		continue;
		        	let date = new Date(vals[0]);
			        if(l>1){
			            if(date < parseResult.time[parseResult.time.length-1]){
			            	parseResult.time.push(date);
			            	parseResult.value.push(parseFloat(vals[vals.length-1]))
			            }
			            else{
			            	console.log("WARNING : data not linear in time")
			            	conformData = false;
			            	break;
			            }
			        }
			        else if(l == 1){
			        	parseResult.timeEnd = date;
			        	parseResult.valueMax = parseFloat(vals[vals.length-1]);
			        	parseResult.valueMin = parseFloat(vals[vals.length-1]);
			        	parseResult.time.push(date);
			            parseResult.value.push(parseFloat(vals[vals.length-1]))
			        }
		    	}
		    	if(conformData){
		    		parseResult.timeBegin = parseResult.time[parseResult.time.length-1];
		    		let tempTimeTable = new Array();
		    		let tempValueTable = new Array();
		    		for(let i in parseResult.time){
		    			parseResult.time[i] = parseResult.time[i] - parseResult.timeBegin;
		    			parseResult.time[i] = parseResult.time[i]/(parseResult.timeEnd-parseResult.timeBegin);

		    			if(i!=0 && i!=parseResult.time.length-1){
		    				if(Math.round(tempValueTable[tempValueTable.length-1])!=Math.round(parseResult.value[i])){
		    					tempTimeTable.push(parseResult.time[i])
		    					tempValueTable.push(parseFloat(parseResult.value[i]))
		    				}
		    			}
		    			else{
		    				tempTimeTable.push(parseResult.time[i])
		    				tempValueTable.push(parseFloat(parseResult.value[i]))
		    			}
		    		}
		    		parseResult.time = tempTimeTable.reverse();
		    		parseResult.value = tempValueTable.reverse();
		    	}
		    	for(let i in parseResult.value){
		    		if(parseResult.value[i] > parseResult.valueMax)
		    			parseResult.valueMax = parseResult.value[i];
		    		else if(parseResult.value[i] < parseResult.valueMin)
		    			parseResult.valueMin = parseResult.value[i];
		    	}  
	        }
	    });
	    console.log("done");
	    let finalResult = new Graph((parseResult.valueMax+parseResult.valueMin)/2, ZOOM, 1,
								 parseResult.value, parseResult.time, BaseLineType, 0, parseResult.time.length-1,
								 initHeight, 2, parseResult.name);
		finalResult.init();
		finalResult.initListener();
		finalResult.draw(true);
		console.log(Object.values(finalResult));
	    return finalResult;
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


	var test1 = new Graph(BASELINE, ZOOM, 1, data, time, "Horizon", 0, 255, initHeight, 1, "first");
	var test2 = new Graph(BASELINE, ZOOM, 1, data, time, "Stratum", 0, 255, initHeight, 1, "scnd");
	test1.init();
	test2.init();
	test1.initListener();
	test2.initListener();
	test1.draw(true);
	test2.draw(true);
	console.log(Object.values(test2));
	console.log(Object.values(test1));

	var test3 = new Graph(BASELINE, ZOOM, 1, data, time, "Horizon", 0, 255, initHeight, 2, "third");
	var test4 = new Graph(BASELINE, ZOOM, 1, data, time, "Stratum", 0, 255, initHeight, 2, "fourth");
	test3.init();
	test4.init();
	test3.initListener();
	test4.initListener();
	test3.draw(true);
	test4.draw(true);
	console.log(Object.values(test3));
	console.log(Object.values(test4));

	var parseTest1Hor = graphFromCSV("data/AAPL.csv", ZOOM, "Horizon", initHeight);
	var parseTest1Str = graphFromCSV("data/AAPL.csv", ZOOM, "Stratum", initHeight);
	var parseTest2Hor = graphFromCSV("data/AMZN.csv", ZOOM, "Horizon", initHeight);
	var parseTest2Str = graphFromCSV("data/AMZN.csv", ZOOM, "Stratum", initHeight);
	var parseTest3Hor = graphFromCSV("data/GOOGL.csv", ZOOM, "Horizon", initHeight);
	var parseTest3Str = graphFromCSV("data/GOOGL.csv", ZOOM, "Stratum", initHeight);
	var parseTest4Hor = graphFromCSV("data/MSFT.csv", ZOOM, "Horizon", initHeight);
	var parseTest4Str = graphFromCSV("data/MSFT.csv", ZOOM, "Stratum", initHeight);
});