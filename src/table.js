require('./style.css');
let $ = require("jquery");

let q=window.location.href;
q = q.slice(q.indexOf("file=")+5);

$(function(){
    $.ajax({
        url:"expe/expe1.json",
        async:false,
        success:function(data){
            for(let tab in data){
                for(let line in data[tab]){
                    $("#myTable").find('tbody')
                        .append($('<tr>')
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

    console.log(q);
});