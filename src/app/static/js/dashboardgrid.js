var config, gridster;
function grid_init(c){
    config = c;

    gridster = $(".gridster").gridster({
        widget_selector :"div",
        widget_margins: [10, 10],
        widget_base_dimensions: [150, 150],
        max_cols: 7
    }).data('gridster');
   
    $('#savePanes').click(function(){
        savePanes();
    });

    $(document).on('click','.deletePane', function(e){
        deletePane($(this),e);
    });
    
    $('#widgetType').change(function(){
        showPaneForm($(this).val()); 
    });
    loadPanes(config["panes"]);
}

function deletePane(origin,e){
    parent = origin.parents('.gs-w');
    content = parent.children('content');
    id = content.attr['id'];
    c = config.panes.filter(function(el){
        return el.id !== this.attr('id');
    },content);

    gridster.remove_widget(parent);
    config.panes=c;
}

function loadPanes(p){
    $.each(p,function(i,pane){
        addPane(pane,true)
    })
}

function addPane(pane,prev){
    //add the element in
    el = $("<div><header><h3>" + pane.item.title + "</h3><button type='button' class='close deletePane'>&times</button></header><content id=" +pane.id + "></content></div>");
    if(prev){
        gridster.add_widget(el,pane.width,pane.height,pane.col,pane.row);
    }else{
        gridster.add_widget(el,pane.width,pane.height);
        config.panes.push(pane);
    }
    //setup what's inside it
    switch(pane.item.type){
        case "linechart":
            linechart(pane.id,pane["item"]);
            break;
    }
}

function savePanes(){
    var panes = [];
    var gridChildren = $('.gridster').children();
    $.each(gridChildren,function(){
        var pane ={};
        var content = $(this).find('content').children();
        var id = $(content).attr('id');
        var prevObject = search(config.panes,id)
        if(prevObject.length != 1){
            return;
        }
        pane['item'] = prevObject[0].item
        pane['col'] = $(this).attr('data-col');
        pane['row'] = $(this).attr('data-row');
        pane['height'] = $(this).attr('data-sizey');
        pane['width'] = $(this).attr('data-sizex');
        pane['id'] = $(content).attr('id');
        panes.push(pane);
    });
    
    config.panes = panes

    $.ajax({
        url: "/savedashboard",
        data: JSON.stringify(config),
        type: "post",
        contentType: 'application/json;chartset=UTF-8'
    });
}

function search(source, name) {
    var results;
    results = $.map(source, function(entry) {
        
        var match = entry.id == name;
        return match ? entry : null;
    });
    return results;
}

function showPaneForm(val) {
    $('#' + val).toggle();
}
