
// URL of the JSON file
        var url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

        // Use d3.json() to read the JSON file
        d3.json(url).then(function(data) {console.log(data);
      
        });

//         // Function to create the bar chart
//         function createBarChart(selectedData) {
//             // Use d3.json() to read the JSON file
//             d3.json(url).then(function(data) {
// //                 Retrieve all the data
//                 var otuData = data.samples;

//                 // Sort the data by sample_values in descending order
//                 var sortedData = otuData.sort((a, b) => b.sample_values - a.sample_values);

//                 // Select the top 10 OTUs
//                 var selectedValues = sortedData.map(item => item.sample_values).slice(0, selectedData);
//                 var selectedIds = sortedData.map(item => `OTU ${item.otu_ids}`).slice(0, selectedData);
//                 var selectedLabels = sortedData.map(item => item.otu_labels).slice(0, selectedData);

//                 var trace = {
//                     x: selectedValues,
//                     y: selectedIds,
//                     text: selectedLabels,
//                     type: 'bar',
//                     orientation: 'h',
//                     hovertemplate: '%{text}<extra></extra>'
//                 };

//                 var layout = {
//                     title: `Top ${selectedData} OTUs`,
//                     xaxis: { title: 'Sample Values' },
//                     yaxis: { title: 'OTU IDs' }
//                 };

//                 var chartData = [trace];
//                 Plotly.newPlot('bar', chartData, layout);
//             }).catch(function(error) {
//                 console.error('Error loading the JSON file:', error);
//             });
//         }

//         // Dropdown menu
//         var dropdown = document.getElementById('dropdown');
//         dropdown.addEventListener('change', function() {
//             var selectedData = parseInt(this.value);
//             createBarChart(selectedData);
//         });

//         // Populate dropdown options
//         for (var i = 1; i <= 10; i++) {
//             var option = document.createElement('option');
//             option.value = i;
//             option.text = i;
//             dropdown.appendChild(option);
//         }

//         // Initial chart with default selection
//         createBarChart(5);

// // Function to update the plots and display metadata
//         function updatePlots(selectedSample) {
//             // Use d3.json() to read the JSON file
//             d3.json(url).then(function(data) {
//                 var sampleData = data.samples.find(sample => sample.id === selectedSample);
//                 var metadata = data.metadata.find(sample => sample.id === selectedSample);

//                 var trace = {
//                     x: sampleData.otu_ids,
//                     y: sampleData.sample_values,
//                     text: sampleData.otu_labels,
//                     mode: 'markers',
//                     marker: {
//                         size: sampleData.sample_values,
//                         color: sampleData.otu_ids,
//                         colorscale: 'Viridis'
//                     }
//                 };

//                 var layout = {
//                     title: 'Bubble Chart',
//                     xaxis: { title: 'OTU IDs' },
//                     yaxis: { title: 'Sample Values' }
//                 };

//                 var chartData = [trace];
//                 Plotly.newPlot('bubble', chartData, layout);

//                 // Display metadata
//                 var metadataContainer = document.getElementById('metadata');
//                 metadataContainer.innerHTML = ''; // Clear existing content

//                 for (var key in metadata) {
//                     var value = metadata[key];
//                     var metadataItem = document.createElement('p');
//                     metadataItem.textContent = key + ': ' + value;
//                     metadataContainer.appendChild(metadataItem);
//                 }
//             }).catch(function(error) {
//                 console.error('Error loading the JSON file:', error);
//             });
//         }

//         // Dropdown menu
//         var dropdown = document.getElementById('dropdown');
//         dropdown.addEventListener('change', function() {
//             var selectedSample = parseInt(this.value);
//             updatePlots(selectedSample);
//         });

//         // Use d3.json() to read the JSON file and populate the dropdown menu
//         d3.json(url).then(function(data) {
//             var samples = data.samples;
//             samples.forEach(function(sample) {
//                 var option = document.createElement('option');
//                 option.value = sample.id;
//                 option.text = sample.id;
//                 dropdown.appendChild(option);
//             });
//         }).catch(function(error) {
//             console.error('Error loading the JSON file:', error);
//         });

//         // Initial plots with default selection
//         updatePlots(940);



// // Function to create the bubble chart
//         function createBubbleChart() {
//             // Use d3.json() to read the JSON file
//             d3.json(url).then(function(data) {
//                 var otuData = data.samples[0]; // Assuming the first sample

//                 var trace = {
//                     x: otuData.otu_ids,
//                     y: otuData.sample_values,
//                     text: otuData.otu_labels,
//                     mode: 'markers',
//                     marker: {
//                         size: otuData.sample_values,
//                         color: otuData.otu_ids,
//                         colorscale: 'Viridis'
//                     }
//                 };

//                 var layout = {
//                     title: 'Bubble Chart',
//                     xaxis: { title: 'OTU IDs' },
//                     yaxis: { title: 'Sample Values' }
//                 };

//                 var chartData = [trace];
//                 Plotly.newPlot('bubble', chartData, layout);
//             }).catch(function(error) {
//                 console.error('Error loading the JSON file:', error);
//             });
//         }

//         // Create the bubble chart
//         createBubbleChart();



// Function to create the charts
function createCharts(sample) {
  // Use d3.json() to read the JSON file
  d3.json(url).then(function(data) {
    // Retrieve all the data
    var otuData = data.samples;

    // Filter the data for the selected sample
    var selectedSampleData = otuData.filter(function(sampleData) {
      return sampleData.id === sample;
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
      title: 'Top 10 OTUs',
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU ID' }
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
    var bubbleData = [bubbleTrace];
    var bubbleLayout = {
      title: 'OTU IDs vs Sample Values',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Sample Values' }
    };
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  }).catch(function(error) {
    // Handle any errors that occur during loading
    console.error('Error loading the JSON file:', error);
  });
}

// Call the createCharts function with a sample ID
createCharts('sample1');