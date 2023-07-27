# Module 14 Challenge: Belly Button Diversity

My static site is deployed at: https://vmueller13.github.io/belly-button-challenge/

<ins>Project Overview</ins>
This project explored the Belly Button Diversity dataset found at http://robdunnlab.com/projects/belly-button-biodiversity/. This dataset catalogs the microbes that colonize human navels. Furthermore, the dataset reveals that a micobial species, also called operational taxonomic units, or OTUs, were present in more that 70% of people while the rest species were relatively rare. My dashboard visualizations display the top ten OTUs for each test subject as well as the OTU IDs versus the Sample Values.
I was able to add the cool background picture from https://img.freepik.com! I added in my own styles.css file into the index file as a new stylesheet.

<ins>Processes and Technologies</ins>
To create this dashboard, I first loaded in the URL of the JSON file using `d3.json()` and logged the data onto the console. Next, I created four different functions: `init`, `createCharts`, `buildMetadata`, and `optionChanged`. Each of these functions were called in the index file, so when the functions were correct, the dashboard was able to update.

*function init()*
This is the first function in the app.js file because it will initialize the dashboard at start up.

*function createCharts(sample)*
This function first sets up the `selectedSampleData` so that the top 10 OTUs can be called for each test subject. Once this data has been called, the bar chart and the bubble chart are created and plotted using `Plotly.newPlot`.
![Bubble Chart](../Images/Bubble Chart.png)

*function buildMetadata(sample)*
This function uses `d3.json` to pull in the data in an array and set the first value always at the first index from the array, this way the dashboard will never be empty and there will always be something displayed.

*function optionChanged*
This is the final function in the project that updates the dashboard when a Test Subject ID is changed.
![optionChanged and Bar Chart](../Images/Top 10 OTUs.png)

<ins>Challenges</ins>
My biggest challenge in completing this project was to have the bar chart and the bubble chart show up on the dashboard. After talkign with TA, Taylor Grafft, and fellow student Kimberly Reitema, I was able to figure out that the names of the functions were already set up in the index.html file and that I needed to name the functions correctly in order for the visualizations to display correctly.
