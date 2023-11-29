import * as models from "src/assets/plotlymodels";

//** DECLARATIONS */*************************************************************************************** */
var DefaultCandleIncreaseColors:models.Increasing[] = [
    {line:{color:"#337def"}},
    {line:{color:"pink"}},
    {line:{color:"black"}},
    {line:{color:"#390879"}},
    {line:{color:""}},
    {line:{color:""}},
    {line:{color:""}},
    {line:{color:""}},
    {line:{color:""}},
    {line:{color:"#FCEDDA"}}
  ]
export {DefaultCandleIncreaseColors}

var DefaultCandleDecreaseColors:models.Decreasing[] = [
    {line:{color:"#fcc729"}},
    {line:{color:"#990011"}},
    {line:{color:"#36454F"}},
    {line:{color:"#b8df10"}},
    {line:{color:""}},
    {line:{color:""}},
    {line:{color:""}},
    {line:{color:""}},
    {line:{color:""}},
    {line:{color:" #EE4E34"}}
  ]
export {DefaultCandleDecreaseColors}

var defaultTickfont:models.Font = 
{
    color:"#CCCCCC",
    family:"Garamond, Times serif",
    size:15
    
}

var defaultAxisTitlefont:models.Font = 
{
    color:"#CCCCCC",
    family:"Garamond, Times serif",
    size:30
}

var defaultTitlefont:models.Font = 
{
    color:"#CCCCCC",
    family:"Garamond, Times serif",
    size:50
}

var DefaultTitle:models.Title = 
{
    font: defaultTitlefont
}
var defaultrangeslider:models.Rangeslider = 
{
    visible:false
}

var defaultxaxis:models.layout_axis = 
{
    type:"date",
    showgrid:true,
    titlefont:defaultAxisTitlefont,
    tickfont:defaultTickfont,
    side:"bottom",
    autorange: true,
    rangeslider:defaultrangeslider,
    title:"Dates"
}

var defaultxaxis_option:models.layout_axis = 
{
    type:"_",
    showgrid:true,
    titlefont:defaultAxisTitlefont,
    tickfont:defaultTickfont,
    side:"bottom",
    autorange: true,
    rangeslider:defaultrangeslider,
    title:"Sequence"
}

var defaultyaxis:models.layout_axis = 
{
    type:"_",
    showgrid:true,
    titlefont:defaultAxisTitlefont,
    tickfont:defaultTickfont,
    side:"right",
    autorange: true,
    rangeslider:defaultrangeslider,
    title:"Prices"
}

var defaultyaxis2:models.layout_axis = 
{
    type:"_",
    showgrid:true,
    titlefont:defaultAxisTitlefont,
    tickfont:defaultTickfont,
    
    side:"left",
    autorange: true,
    overlaying:"y",
    rangeslider:defaultrangeslider
}

var defaultyaxis3:models.layout_axis = 
{
    type:"_",
    showgrid:true,
    titlefont:defaultAxisTitlefont,
    tickfont:defaultTickfont,
    side:"right",
    autorange: true,
    overlaying:"y",
    rangeslider:defaultrangeslider
}

var defaultyaxis4:models.layout_axis = 
{
    type:"_",
    showgrid:true,
    titlefont:defaultAxisTitlefont,
    tickfont:defaultTickfont,
    side:"left",
    autorange: true,
    overlaying:"y",
    rangeslider:defaultrangeslider
}


//EXPORTS---*****************************************************************************

var defaultstocklayout:models.Layout = 
{
    title:DefaultTitle,
    plot_bgcolor: '#FAFAFA',
    paper_bgcolor:'#FAFAFA', 
    xaxis:{     
        type:"date",
        showgrid:true,
        titlefont:{
            color:"rgba(221, 65, 36, 0.6)",
            family:"Garamond, Times serif",
            size: 15,
        },
        tickfont:{
            family:"Garamond, Times serif",
            color:"rgba(221, 65, 36, 0.6)",
            size:12,
        },
        side:"bottom",
        autorange: true,
        rangeslider:defaultrangeslider,
    },

    yaxis:{
        type:"_",
        showgrid:true,
        titlefont:{
            color:"#337def",
            family:"Garamond, Times serif",
            size: 20,
        },
        tickfont:{
            family:"Garamond, Times serif",
            color:"#337def",
            size:12,
        },
        side:"right",
        autorange: true,
        rangeslider:defaultrangeslider
    },
    yaxis2:{
        type:"_",
        showgrid:true,
        titlefont:{
            color:"pink",
            family:"Garamond, Times serif",
            size: 20,
        },
        tickfont:{
            family:"Garamond, Times serif",
            color:"pink",
            size:12,
        },
        side:"right",
        overlaying:"y",
        autorange: true,
        rangeslider:defaultrangeslider
    },
    yaxis3:{
        type:"_",
        showgrid:true,
        titlefont:{
            color:"black",
            family:"Garamond, Times serif",
            size: 20,
        },
        tickfont:{
            family:"Garamond, Times serif",
            color:"black",
            size:12,
        },
        side:"left",
        overlaying:"y",
        autorange: true,
        rangeslider:defaultrangeslider
    },
    yaxis4:{
        type:"_",
        showgrid:true,
        titlefont:{
            color:"#390879",
            family:"Garamond, Times serif",
            size: 20,
        },
        tickfont:{
            family:"Garamond, Times serif",
            color:"#390879",
            size:12,
        },
        side:"left",
        overlaying:"y",
        autorange: true,
        rangeslider:defaultrangeslider
    }
    

};
export{defaultstocklayout}

var defaultoptionlayout:models.Layout = 
{
    title:DefaultTitle,
    plot_bgcolor: '#FAFAFA',
    paper_bgcolor:'#FAFAFA', 
    xaxis:defaultxaxis_option,
    yaxis:defaultyaxis,
    yaxis2:defaultyaxis2,

};
export{defaultoptionlayout}

var defaultmodellayout:models.Layout = 
{
    title:DefaultTitle,
    plot_bgcolor: '#FAFAFA',
    paper_bgcolor:'#FAFAFA', 
    xaxis:defaultxaxis,
    yaxis:defaultyaxis,
};

export{defaultmodellayout}

var defaultfredlayout:models.Layout = 
{
    title:{
    
        font:{
            color:"rgba(221, 65, 36, 0.6)",
            family:"Garamond, Times serif",
            size: 18,
        }
    },
    plot_bgcolor: '#FAFAFA',
    paper_bgcolor:'#FAFAFA', 
    xaxis:{     
        type:"date",
        showgrid:true,
        titlefont:{
            color:"rgba(221, 65, 36, 0.6)",
            family:"Garamond, Times serif",
            size: 15,
        },
        tickfont:{
            family:"Garamond, Times serif",
            color:"rgba(221, 65, 36, 0.6)",
            size:12,
        },
        side:"bottom",
        autorange: true,
        rangeslider:defaultrangeslider,
    },

    yaxis:{
        type:"_",
        showgrid:true,
        titlefont:{
            color:"rgba(221, 65, 36, 0.6)",
            family:"Garamond, Times serif",
            size: 20,
        },
        tickfont:{
            family:"Garamond, Times serif",
            color:"rgba(221, 65, 36, 0.6)",
            size:12,
        },
        side:"right",
        autorange: true,
        rangeslider:defaultrangeslider
    }
}
export{defaultfredlayout}