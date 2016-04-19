$(function() {
    $('#config').on('show.bs.modal', function(event){
        var button = $(event.relatedTarget)
        var dev_id = button.data('deviceid')
        
        $.ajax({url: "/key", 
                data: JSON.stringify('{"device": ' + dev_id + '}'),
                type: 'post',
                contentType: 'application/json;charset=UTF-8',
                success: function(result){
                    data = JSON.parse(result)
                    pData = JSON.stringify(data,null,2)
                    $('#deviceconfigbody').empty().append(pData)
                }});
    });
});
