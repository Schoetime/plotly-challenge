//Read in samples.json using D3
d3.json('samples.json').then(data => {
    
    var names = data.names;
    var metadata = data.metadata;
    var samples = data.samples

    //Test Subject ID selection dropdown
    d3.select("#selDataset")
        .selectAll("select")
        .data(names)
        .enter()
        .append("option")
        .attr("value", d => d)
        .text(d => d)

//Horizontal Bar Chart
    var values = samples[0].sample_values.slice(0, 10);
    var labels = samples[0].otu_ids.slice(0, 10);

    let reversedValues = values.reverse();
    let reversedLabels = labels.reverse();
    reversedLabels = reversedLabels.map(id=>"OTU " + id.toString());

    var trace1 = {
        x: reversedValues,
        y: reversedLabels,
        text: reversedLabels,
        orientation: "h",
        type: "bar" 
    }

    var data = [trace1];

    var layout = {
        title: "Top 10 OTUs"
    };

    Plotly.newPlot("bar", data, layout)

//Bubble Chart
    var trace2 = {
        x: samples[0].otu_ids,
        y: samples[0].sample_values,
        mode: 'markers',
        marker: {
            size: samples[0].sample_values,
            color: samples[0].otu_ids 
        },
        text: samples[0].otu_labels  
    };

    var bdata = [trace2];

    var blayout = {
        title: "# of Each Bacteria Strain",
        showlegend: false,
      };
    
    Plotly.newPlot("bubble", bdata, blayout);

});