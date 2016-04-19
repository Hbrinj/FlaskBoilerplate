function linechart(id,op){
    //setup whats needed inside the content tag
    $("content#" + id).html("<canvas id=" + id  +"/>");

    var obj = $("canvas#" + id);
    var chartParent = obj.parents(".gs-w");
    var ctx = obj.get(0).getContext('2d'),
        startingData = {
            labels: [(new Date()).toLocaleTimeString()],
            datasets: op.options
        },
        latestLabel = 1;

    //resize to parent-ish
    console.log('find better way to resize line chart');
    ctx.canvas.width= (chartParent.attr('data-sizex') * 150);
    ctx.canvas.height= (chartParent.attr('data-sizey') * 150) - 50;
    
    var chart = new Chart(ctx).Line(startingData, {animationSteps: 15});

    setInterval(function(){
        $.ajax({
            url: "/getdata",
            data: JSON.stringify('{"device":' + op.device + '}'),
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            success: function(result){
                data = JSON.parse(result);
                var x = (new Date()).toLocaleTimeString();
                newData = [];
                $.each(op.datapoint, function(i,dp){
                    newData.push(parseFloat(data.d[dp]));
                });

                chart.addData(newData, x);
                latestLabel++;
                if(latestLabel > 10){
                    chart.removeData();
                }
            }
        });
    }, 5000);
}    
