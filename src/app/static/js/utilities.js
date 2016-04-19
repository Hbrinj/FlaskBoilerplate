$(function() {
    pathname = $(location).attr('pathname');
    x = pathname.match("/([^\?]*)$");
    console.log("."+x[1])
    $("#"+x[1]).addClass("active");
});

function rgba2transparent(rgb,opacity){
 rgb = rgb.match(/^rgba[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "rgba(" + rgb[1] + "," + rgb[2] + "," + rgb[3] + "," + opacity + ")" : '';
}


$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


function addColorPicker(ids){
    var values = ($.isArray(ids) ? ids : [ids] );
    for(var i = 0; i < values.length; i++){
        $(values[i]).colorpicker({
            color: '#AA3399',
            format: 'rgba'
        });
    }
}
