$(function() {
    addColorPicker('.linechartLineColor');

    $('#linechartAddButton').click(function(e){
        e.preventDefault();
        var values= $('#linechartForm2').serializeObject(); 
        var title = values.title;
        var device = values.device;
        var type = 'linechart'
        var options = [];
        var datapoints = ($.isArray(values.datalist) ? values.datalist : [values.datalist]);
        var linecolors = ($.isArray(values.linecolor) ? values.linecolor : [values.linecolor]);
        
        var looplength = ($.isArray(values.linecolor) ? values.linecolor.length : 1);
        
        for( var i=0; i < looplength; i++){
            linecolor = linecolors[i];
            option = {};
            option.strokeColor = linecolor;
            option.pointColor = linecolor;
            option.fillColor = rgba2transparent(linecolor,"0.2");
            option.data =[0];
            option.pointStrokeColor = "#fff";
            options.push(option);
        }

        item = {};
        item.title = title;
        item.type = type;
        item.options = options;
        item.device = device;
        item.datapoint = datapoints

        pane = {};
        pane.col ="";
        pane.row ="";
        pane.height ="2";
        pane.width ="3";
        pane.id ="a" + (new Date()).getTime();
        pane.item = item;
        
        addPane(pane,false)

    });

    $('#linechartAddLineButton').click(function(e){
        e.preventDefault();       
        var html = $('#linechartLine')[0].outerHTML;
        $('#linechartLineGroup').append(html);
        addColorPicker('.linechartLineColor');
    });

    $('#linechartDeleteLineButton').click(function(e){
        e.preventDefault();
        $('#linechartLineGroup').children().last().remove()
    });

    $('#linechartDevice').change(function(){
        var selected = $(this).find('option:selected');
        var dataSelect = $(this).parents('#linechartForm').find('.linechartDatalist');
        $.ajax({
            url: "/getdata",
            data: JSON.stringify('{"device":' + selected.val() +'}'),
            type: 'post',
            contentType: 'application/json',
            success: function(result){
                data = JSON.parse(result);
                dataKeys = Object.keys(data.d);
                $.each(dataKeys, function(i,val){
                    dataSelect
                        .append($('<option></option>')
                        .attr('value',val)
                        .text(val))
                });
            }
        }); 
    });
});
