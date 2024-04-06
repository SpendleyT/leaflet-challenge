# leaflet-challenge

<h3>Instructions</h3>
The instructions for this activity are broken into two parts:
<ul?>
<li>Part 1: Create the Earthquake Visualization</li>
<li>Part 2: Gather and Plot More Data (Optional with no extra points earning)</li>
</ul>

<h3>Part 1: Create the Earthquake Visualization</h3>
Your first task is to visualize an earthquake dataset. Complete the following steps:
<ol>
<li>Get your dataset. To do so, follow these steps:</li>
    <ul>
    <li>The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON FeedLinks to an external site. page and choose a dataset to visualize. 
    <li>When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. 
    </ul>
<li>Import and visualize the data by doing the following:</li>
    <ul>
    <li>Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.</li>
        <ul>
        <li>Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.</li>
        <li>Include popups that provide additional information about the earthquake when its associated marker is clicked.</li>
        </ul>
    <li>Create a legend that will provide context for your map data.</li>
    </ul>
</ol>

<h3>References</h3>
<ul>
<li><a href="https://leafletjs.com/">Leaflet JS - an open-source JavaScript library for mobile-friendly interactive maps</li>
</ul>