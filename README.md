# MindMap by SDevRami

## Overview

The **MindMap** project is a tool kit web-based application designed to help users create, manage, and visualize mind maps. It provides a user-friendly interface with various features to enhance the mind mapping experience, including theme toggling, zooming, and exporting options.

## Table of Contents

* [Features](#features)
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)
* [File Structure](#file-structure)
* [Contributing](#contributing)
* [License](#license)

## Features

* **Dynamic Mind Map Creation**: Users can create mind maps with various node types (circle, rectangle, triangle).
* **Theme Toggle**: Switch between light and dark themes for better visibility.
* **Zoom Functionality**: Zoom in and out of the mind map for detailed editing.
* **Export Options**: Save mind maps in multiple formats including JSON, SVG, PNG, and PDF.
* **Undo/Redo History**: Keep track of changes and revert to previous states.
* **Task Management**: Add and manage tasks associated with mind map nodes.
* **Shortcuts**: Utilize keyboard shortcuts for efficient navigation and actions.

## Technologies Used

* **HTML**: Structure of the web application.
* **CSS**: Styling the application for a better user experience.
* **JavaScript**: Adding interactivity and functionality to the application.
* **Libraries**:
	+ [html2canvas](https://html2canvas.hertzen.com/): For rendering the mind map as an image.
	+ [jsPDF](https://github.com/parallax/jsPDF): For generating PDF files from the mind map.

## Installation

you can try the app online :
[link to Mindmap](https://sdevrami.github.io/Mindmap/).

To set up the project locally, follow these steps:

1. **Clone the repository**:
```bash
git clone https://github.com/SDevRami/Mindmap.git
```
2. **Navigate to the project directory**:
```bash
cd mindmap
```
5. **Run this command**:
```bash
python -m http.server 8000
```
4. **Open your browser and navigate to http://localhost:8000.

## Usage

* **Creating a Mind Map**: Click on the "New Mindmap" button in the menu to start a new mind map.
* **Adding Nodes**: Use the input fields in the footer to add nodes and connections.
* **Exporting**: Use the export buttons in the menu to save your mind map in the desired format.
* **Managing Tasks**: Open the task list sidebar to add and manage tasks related to your mind map.
* **Shortcuts**: All the tools in the app have own shortcut and you can change it.
* **Note**: This app work only on pc (need mouse), the mobile touch handler (and ui) on the next update.

## File Structure

```
mindmap/
│
├── index.html            # Main HTML file
├── app_styles_dark.css   # CSS styles for dark theme
├── app_styles_light.css  # CSS styles for light theme
├── script.js             # JavaScript file for functionality
└── MindmapData/          # Directory containing icons and images
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

## License

This project is licensed under the GNU General Public License (GPL). See the [LICENSE](LICENSE) file for details.
