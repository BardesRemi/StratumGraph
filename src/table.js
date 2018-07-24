require('./style.css');
let $ = require("jquery");

let q=window.location.href;
q = q.slice(q.indexOf("file=")+5);

console.log(q)
$(function(){
    console.log("hello")

    let $but0 = $("<button>filtre Horizon</button>");
    $but0.on("click", function(){
        $(".newEntrie").css("display","none");
        $(".foldUnfold").css("display","none");
        $(".baseline").css("display","none");
        $(".ZOOM").css("display","none");
        $(".initHeight").css("display","none");
        $(".answer").css("display","none");
        $(".question").css("display","none");
        $(".endEntrieHorizon").css("display","none");
        $(".endEntrieStratum").css("display","table");
    });
    $("#nav").append($but0);

    let $but1 = $("<button>filtre Stratum</button>");
    $but1.on("click", function(){
        $(".newEntrie").css("display","none");
        $(".foldUnfold").css("display","none");
        $(".baseline").css("display","none");
        $(".ZOOM").css("display","none");
        $(".initHeight").css("display","none");
        $(".answer").css("display","none");
        $(".question").css("display","none");
        $(".endEntrieHorizon").css("display","table");
        $(".endEntrieStratum").css("display","none");
    });
    $("#nav").append($but1);

    let $but2 = $("<button>filtre reset</button>");
    $but2.on("click", function(){
        $(".newEntrie").css("display","table");
        $(".foldUnfold").css("display","table");
        $(".baseline").css("display","table");
        $(".ZOOM").css("display","table");
        $(".initHeight").css("display","table");
        $(".answer").css("display","table");
        $(".question").css("display","table");
        $(".endEntrieHorizon").css("display","table");
        $(".endEntrieStratum").css("display","table");
    });
    $("#nav").append($but2);

    $.ajax({
        url:"expeTest/expe2.json",
        async:false,
        error:function(data){
            console.log(data);
        },
        success:function(data){
            console.log("it was a succes")
            for(let tab in data){
                console.log("loop")
                for(let line in data[tab]){
                    let $txt = $("<tr>")
                    if(data[tab][line][1] == "start pressed" || data[tab][line][1] == "stop pressed")
                        $txt = $("<tr class='newEntrie'>")
                    if(data[tab][line][1] == "stop pressed"){
                        if(data[tab][line][2] == "Stratum")
                            $txt = $("<tr class='endEntrieStratum'>");
                        else if(data[tab][line][2] == "Horizon")
                            $txt = $("<tr class='endEntrieHorizon'>");
                    }
                    if(data[tab][line][0].slice(-11) == "Fold/Unfold")
                        $txt = $("<tr class='foldUnfold'>")
                    if(data[tab][line][0].slice(-8) == "baseline")
                        $txt = $("<tr class='baseline'>")
                    if(data[tab][line][0].slice(-4) == "ZOOM")
                        $txt = $("<tr class='ZOOM'>")
                    if(data[tab][line][0].slice(-10) == "initHeight")
                        $txt = $("<tr class='initHeight'>")
                    if(data[tab][line][0] == "Expected result was :")
                        $txt = $("<tr class='answer'>")
                    if(data[tab][line][0] == "new question")
                        $txt = $("<tr class='question'>")
                    $("#myTable").find('tbody')
                        .append($txt
                            .append($('<td>')
                                .append(data[tab][line][0])
                            ).append($('<td>')
                                .append(data[tab][line][1])
                            ).append($('<td>')
                                .append(data[tab][line][2])
                            ).append($('<td>')
                                .append(data[tab][line][3])
                            )

                        );
                }
                $("#myTable").find('tbody')
                        .append($('<br>'));
            }
        }
    })
});
console.log("end of js file");