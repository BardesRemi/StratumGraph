require('./style.css');
let $ = require("jquery");

let q=window.location.href;
q = q.slice(q.indexOf("file=")+5);

$(function(){
    $.ajax({
        url:"expe/expe0.json",
        async:false,
        success:function(data){
            for(let tab in data){
                for(let line in data[tab]){
                    let $txt = $("<tr>")
                    if(data[tab][line][1] == "start pressed" || data[tab][line][1] == "stop pressed")
                        $txt = $("<tr class='newEntrie'>")
                    if(data[tab][line][0].slice(-11) == "Fold/Unfold")
                        $txt = $("<tr class='foldUnfold'>")
                    if(data[tab][line][0].slice(-8) == "baseline")
                        $txt = $("<tr class='baseline'>")
                    if(data[tab][line][0].slice(-4) == "ZOOM")
                        $txt = $("<tr class='ZOOM'>")
                    if(data[tab][line][0].slice(-10) == "initHeight")
                        $txt = $("<tr class='initHeight'>")
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
                        .append($('<br>')
                        );
            }
        }
    })
    console.log(q)
});