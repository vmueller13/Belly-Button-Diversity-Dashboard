
// URL of the JSON file
        var url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

        // Use d3.json() to read the JSON file
        d3.json(url).then(function(data) {console.log(data);
      
        });

// Initialize the dashboard at start up
function init() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Use D3 to get sample names and populate the drop-down selector
  d3.json(url).then((data) => {
    // Set a variable for the sample names
    let names = data.names;

    // Add samples to dropdown menu
    for (let id of data.names) {
      // Log the value of id for each iteration of the loop
      console.log(id);

      dropdownMenu.append("option")
        .text(id)
        .property("value", id);
    }

    // Set the first sample from the list
    let sample_one = names[0];

    // Log the value of sample_one
    console.log(sample_one);

    // Build the initial plots
    buildMetadata(sample_one);
    createCharts(sample_one);
    buildGaugeChart(sample_one);
  });
}

// Function to create the charts
function createCharts(sample) {
  // Use d3.json() to read the JSON file
  d3.json(url).then(function(data) {
    // Retrieve all the data
    var otuData = data.samples;

    // Filter the data for the selected sample
    var selectedSampleData = otuData.filter(function(sampleData) {
      return sampleData.id == sample;
    })[0];

    // Get the top 10 OTUs for the selected sample
    var top10OTUs = selectedSampleData.otu_ids.slice(0, 10).reverse();
    var top10OTUValues = selectedSampleData.sample_values.slice(0, 10).reverse();
    var top10OTULabels = selectedSampleData.otu_labels.slice(0, 10).reverse();

    // Create the bar chart
    var barTrace = {
      x: top10OTUValues,
      y: top10OTUs.map(function(otuID) {
        return `OTU ${otuID}`;
      }),
      text: top10OTULabels,
      type: 'bar',
      orientation: 'h'
    };
    var barData = [barTrace];
    var barLayout = {
      title: 'Top 10 OTUs Present in Individual',
      // xaxis: { title: 'Sample Values' },
      // yaxis: { title: 'OTU ID' }
    };
    Plotly.newPlot('bar', barData, barLayout);

    // Create the bubble chart
    var bubbleTrace = {
      x: selectedSampleData.otu_ids,
      y: selectedSampleData.sample_values,
      text: selectedSampleData.otu_labels,
      mode: 'markers',
      marker: {
        size: selectedSampleData.sample_values,
        color: selectedSampleData.otu_ids,
        colorscale: 'Earth'
      }
    };
    // setting up the bubble chart layout
    var bubbleData = [bubbleTrace];
    var bubbleLayout = {
      title: 'OTU IDs vs Sample Values',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Sample Values' }
    };
    // Call plotly and set up bubble CharacterData, make sure the variable is named the same in the HTML document!!
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  });
}

// Function that populates metadata info
function buildMetadata(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {

      // Retrieve all metadata
      let metadata = data.metadata;

      // Filter based on the value of the sample
      let value = metadata.filter(function(result) {return result.id == sample});
      
      // Log the array of metadata objects after the have been filtered
      console.log(value)

      // Get the first index from the array
      let valueData = value[0];

      // Clear out metadata
      d3.select("#sample-metadata").html("");

      // Use Object.entries to add each key/value pair to the panel
      Object.entries(valueData).forEach(([key,value]) => {

          // Log the individual key/value pairs as they are being appended to the metadata panel
          console.log(key,value);

          d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
      });
  });

};

function buildGuage(sample) {
  
}
// Function that updates dashboard when sample is changed
function optionChanged(selectedSampleData) { 

  // Log the new value
  console.log(selectedSampleData); 

  // Call all functions 
  buildMetadata(selectedSampleData);
  createCharts(selectedSampleData);
  buildGaugeChart(selectedSampleData);
};

// Call the initialize function
init();