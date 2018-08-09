# StratumGraph
New shape for horizon graph, more stable with three tones pseudo coloring.

this is the link that leads to a static version of the project :
https://bardesremi.github.io/StratumGraph/index.html

this link leads to a picture of a "new" possible interaction with Stratum graphs :
https://bardesremi.github.io/StratumGraph/Presentation_Drag&Drop_3Step.png

---------------------------------------------

# Setting the project

NEEDED : Node.js

 - Once Node is installed,
 - extract from git the project somewhere.
 - change in the webpack.config.js file :
	line 18 -> 22, you'll can find the "host" and "port". Be sure to set up the port you want to use.
 - using a shell go to the repository of the project (stay where package and webpack file are), then use the command :
	"npm i"
 - once all the initialisation is done, use :
	"npm start"
 - The server should be launch (be patient, the first launch is long).
 - Finaly, go on a browser (i recommend chrome), and go to the following url :
	http://PORT:HOST
where PORT and HOST are the "port" and the "host" respectively choose in the webpack.config.js file.

---------------------------------------------

# Informations about code files :

In the src folder you'll find :
 - index (.js / . hmtl / .css) which are the primary files.
 - training (.js / . hmtl / .css) which are basically a copy of index, where all server interactions are off (can work without a server).
(launch it by adding "/training.html?expe=1" to the url)
- table (.js / . hmtl / .css) which is a way for displaying logs.
(launch it by adding "/table.html?file=expe" to the url)
