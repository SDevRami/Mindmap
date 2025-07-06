const mindmaptitle = document.getElementById('mindmap-title');
const svg = document.getElementById('mindmap');
const description = document.getElementById('description-window');
const menu = document.getElementById('menu-sidebar');
const sidebar = document.getElementById('history-sidebar');
const subtoolSidebar = document.getElementById('subtool-sidebar');
const presentationSidebar = document.getElementById('presentation-sidebar');
const presentationSidebarTitleText = document.getElementById('presentation-sidebar-title-text');
const presentationSidebarText = document.getElementById('presentation-sidebar-text');
const sidebar_list = document.getElementById('history-list');
const tasksidebar = document.getElementById('tasklist-sidebar');
const tasksidebar_list = document.getElementById('tasklist-list');
const shortcutsMap = document.getElementById('shortcuts-map');
const dropdownContent = document.querySelector('.dropdown-content');
const mindmapContainer = document.getElementById('mindmap-container');
const footer = document.getElementById('footer');
const header = document.getElementById('header');

const autoTooltip = document.getElementById('autotip');
const snaptogridTooltip = document.getElementById('snaptogridtooltip');
const collapsetooltip = document.getElementById('collapsetooltip');
const fixedaxisxTooltip = document.getElementById('fixedaxisxtooltip');
const fixedaxisyTooltip = document.getElementById('fixedaxisytooltip');
const presentationTooltip = document.getElementById('presntationmodetooltip');

const menuButton = document.getElementById('menuButton');
const presentationModeButton = document.getElementById('presentation-mode-btn');
const closeMenuButton = document.getElementById('close-menu');
const newMindmapButton = document.getElementById('new-mindmap');
const loadMindmapButton = document.getElementById('upload-btn');
const saveJsonButton = document.getElementById('save-json');
const saveSvgButton = document.getElementById('save-svg');
const savePngButton = document.getElementById('save-png');
const savePdfButton = document.getElementById('save-pdf');
const toggleSidebarButton = document.getElementById('toggle-sidebar');
const closeHistoryButton = document.getElementById('close-history');
const miniPresentationButton = document.getElementById('mini-presentation');
const saveHistoryButton = document.getElementById('save-history');
const clearHistoryButton = document.getElementById('clear-history');
const toggleTaskSidebarButton = document.getElementById('toggle-tasklist-sidebar');
const closeTaskButton = document.getElementById('close-tasklist');
const zoomUpButton = document.getElementById('zoom-up-btn');
const zoomDownButton = document.getElementById('zoom-down-btn');
const addCircleButton = document.getElementById('add-circle');
const openDescriptionButton = document.getElementById('open-description');
const closeDescriptionButton = document.getElementById('close-description');
const saveDescriptionButton = document.getElementById('save-description');
const collapsButton = document.getElementById('collapsButton');
const updateCircleButton = document.getElementById('update-circle');
const deleteCircleButton = document.getElementById('delete-circle');
const snaptogridButton = document.getElementById('snaptogridButton');
const autoButton = document.getElementById('autoButton');
const closeShortcutMapButton = document.getElementById('close-shortcuts-map');
const undoHistoryButton = document.getElementById('undo-history');
const redoHistoryButton = document.getElementById('redo-history');
const dropdownButton = document.querySelector('.dropdown-button');
const temp1Button = document.getElementById('template1');
const temp2Button = document.getElementById('template2');
const temp3Button = document.getElementById('template3');
const shortcutsButton = document.getElementById('shortcuts');
const fixedaxisxButton = document.getElementById('fixed-axis-x');
const fixedaxisyButton = document.getElementById('fixed-axis-y');
//const mainMenuButton = document.getElementById('back-btn');
const connectCircleButton = document.getElementById('connect-circle');
const connectParentButton = document.getElementById('connect-circle-p');
const calculateDistanceButton = document.getElementById('calculate-distance-btn');

const itemForm = document.getElementById('tasklist-form');
const itemInput = document.getElementById('tasklist-input');
const itemList = document.getElementById('tasklist-list');

const description_fontName = document.getElementById('description-fontName');
const description_fontSize = document.getElementById('description-fontSize');
const description_boldBtn = document.getElementById('description-boldBtn');
const description_italicBtn = document.getElementById('description-italicBtn');
const description_underlineBtn = document.getElementById('description-underlineBtn');
const description_strikeBtn = document.getElementById('description-strikeBtn');
const description_foreColor = document.getElementById('description-foreColor');
const description_backColor = document.getElementById('description-backColor');
const description_alignLeftBtn = document.getElementById('description-alignLeftBtn');
const description_alignCenterBtn = document.getElementById('description-alignCenterBtn');
const description_alignRightBtn = document.getElementById('description-alignRightBtn');
const description_alignJustifyBtn = document.getElementById('description-alignJustifyBtn');
const description_undoBtn = document.getElementById('description-undoBtn');
const description_redoBtn = document.getElementById('description-redoBtn');

const autoImg = document.getElementById('autoImg');
const collapsImg = document.getElementById('collapsImg');
const snaptogridImg = document.getElementById('snaptogridImg');
const fixedaxisxImg = document.getElementById('fixedaxisxImg');
const fixedaxisyImg = document.getElementById('fixedaxisyImg');
const presentationImg = document.getElementById('presentationImg');
const minipresentationImg = document.getElementById('minipresentationImg');
const themeImg = document.getElementById('themImg');

const loadJsoninput = document.getElementById('load-json');
const circleInput = document.getElementById('circle-input');
const lineInput = document.getElementById('line-input');
const circleSizeInput = document.getElementById('circle-size');
const fontSizeInput = document.getElementById('text-size');
const circleColorInput = document.getElementById('circle-color');
const descriptionInput = document.getElementById('description');
const searchInput = document.getElementById('search');
const nodeXInput = document.getElementById('node-x');
const nodeYInput = document.getElementById('node-y');
const nodeTypeInput = document.getElementById('nodetypeinput');
const lineTypeInput = document.getElementById('linetypeinput');
const lineColorInput = document.getElementById('linecolorinput');

const gridSize = 10;
const modifiers = ["None", "Shift", "Ctrl", "Alt"];
const kkeys = Array.from(Array(26)).map((_, i) => String.fromCharCode(i + 65)); // A-Z
const keys = ['Enter','Tab','`','1','2','3','4','5','6','7','8','9','0'].concat(kkeys);
const mouseModifiers = ["Left", "Middle", "Right"];

let circles = [];
let singleSelect = true;
let selectedCircleDic = {};
let selectedCircle = [null];
let lines = [];
let selectedLine = null;
let isPanning = false;
let panStart = { x: 0, y: 0 };
let viewBox = { x: 0, y: 0, width: 600, height: 600 };
let offsetX = {};
let offsetY = {};
let snaptogrid = false;
let auto = false;
let history = []; 
let currentIndex = -1;
let oldx = 0;
let oldy = 0;
let fixedAxisX = false;
let fixedAxisY = false;
let presentation = false;
let miniPresentation = false;
let tasklistitems = [];
let theme = 'dark';
let svgBackgroundColor = "#0f0f1a";
let svgBackgroundColorT = "#ffffff";

function toggleTheme() {
    sHref = '';
    if (theme === 'dark') {
        sHref = "app_styles_light.css";
        themeImg.src = 'MindmapData/MindmapNightMode.svg';
        svgBackgroundColorT = "#000000";
        svgBackgroundColor = "#ffffff";
        circles.forEach(c => {
            c.group.querySelector('circle').setAttribute('fill', svgBackgroundColor);
            c.group.querySelector('rect').setAttribute('fill', svgBackgroundColor);
            c.group.querySelector('polygon').setAttribute('fill', svgBackgroundColor);
            c.group.querySelector('text').setAttribute('fill', svgBackgroundColorT);
        })
        theme = 'light';
    } else {
        sHref = "app_styles_dark.css";
        themeImg.src = 'MindmapData/MindmapLightMode.svg';
        svgBackgroundColorT = "#ffffff";
        svgBackgroundColor = "#0f0f1a";
        circles.forEach(c => {
            c.group.querySelector('circle').setAttribute('fill', svgBackgroundColor);
            c.group.querySelector('rect').setAttribute('fill', svgBackgroundColor);
            c.group.querySelector('polygon').setAttribute('fill', svgBackgroundColor);
            c.group.querySelector('text').setAttribute('fill', svgBackgroundColorT);
        })
        theme = 'dark';
    }
    localStorage.setItem('mindMapTheme', theme);
    var linkElement = document.querySelector('link[rel="stylesheet"]');
    // Change the href attribute
    linkElement.href = sHref;
}

//shortcuts functions
function populateShortcutsLists() {
    for (let i = 1; i <= 38; i++) {
        const modifierSelect = document.getElementById(`modifier-${i}`);
        const keySelect = document.getElementById(`key-${i}`);

        // Populate modifier select
        modifiers.forEach(modifier => {
            const option = document.createElement("option");
            option.value = modifier;
            option.textContent = modifier;
            modifierSelect.appendChild(option);
        });

        // Populate key select
        keys.forEach(key => {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = key;
            keySelect.appendChild(option);
        });
    }
    for (let i = 39; i <= 41; i++) {
        const modifierSelect = document.getElementById(`modifier-${i}`);

        // Populate modifier select
        mouseModifiers.forEach(modifier => {
            const option = document.createElement("option");
            if (modifier === 'Left'){
                option.value = 0;
            } else if (modifier === 'Middle') {
                option.value = 1;
            } else if (modifier === 'Right') {
                option.value = 2;
            }
            option.textContent = modifier;
            modifierSelect.appendChild(option);
        });
    }
    const modifierSelect42 = document.getElementById(`modifier-42`);

    // Populate key select
    modifiers.forEach(modifier => {
        const option = document.createElement("option");
        option.value = modifier;
        option.textContent = modifier;
        modifierSelect42.appendChild(option);
    });

    const modifierSelect43 = document.getElementById(`modifier-43`);
    const keySelect43 = document.getElementById(`key-43`);

    // Populate key select
    modifiers.forEach(modifier => {
        const option = document.createElement("option");
        option.value = modifier;
        option.textContent = modifier;
        modifierSelect43.appendChild(option);
    });
    modifiers.forEach(modifier => {
        const option = document.createElement("option");
        option.value = modifier;
        option.textContent = modifier;
        keySelect43.appendChild(option);
    });

    const modifierSelect44 = document.getElementById(`modifier-44`);
    const keySelect44 = document.getElementById(`key-44`);
    // Populate modifier select
    modifiers.forEach(modifier => {
        const option = document.createElement("option");
        option.value = modifier;
        option.textContent = modifier;
        modifierSelect44.appendChild(option);
    });

    // Populate key select
    keys.forEach(key => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        keySelect44.appendChild(option);
    });

    const modifierSelect45 = document.getElementById(`modifier-45`);
    const keySelect45 = document.getElementById(`key-45`);
    // Populate modifier select
    modifiers.forEach(modifier => {
        const option = document.createElement("option");
        option.value = modifier;
        option.textContent = modifier;
        modifierSelect45.appendChild(option);
    });

    // Populate key select
    keys.forEach(key => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        keySelect45.appendChild(option);
    });

    const modifierSelect46 = document.getElementById(`modifier-46`);
    const keySelect46 = document.getElementById(`key-46`);
    // Populate modifier select
    modifiers.forEach(modifier => {
        const option = document.createElement("option");
        option.value = modifier;
        option.textContent = modifier;
        modifierSelect46.appendChild(option);
    });

    // Populate key select
    keys.forEach(key => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        keySelect46.appendChild(option);
    });

    const modifierSelect47 = document.getElementById(`modifier-47`);
    const keySelect47 = document.getElementById(`key-47`);
    // Populate modifier select
    modifiers.forEach(modifier => {
        const option = document.createElement("option");
        option.value = modifier;
        option.textContent = modifier;
        modifierSelect47.appendChild(option);
    });

    // Populate key select
    keys.forEach(key => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        keySelect47.appendChild(option);
    });

    const modifierSelect48 = document.getElementById(`modifier-48`);
    const keySelect48 = document.getElementById(`key-48`);
    // Populate modifier select
    modifiers.forEach(modifier => {
        const option = document.createElement("option");
        option.value = modifier;
        option.textContent = modifier;
        modifierSelect48.appendChild(option);
    });

    // Populate key select
    keys.forEach(key => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        keySelect48.appendChild(option);
    });

    const modifierSelect49 = document.getElementById(`modifier-49`);
    const keySelect49 = document.getElementById(`key-49`);
    // Populate modifier select
    modifiers.forEach(modifier => {
        const option = document.createElement("option");
        option.value = modifier;
        option.textContent = modifier;
        modifierSelect49.appendChild(option);
    });

    // Populate key select
    keys.forEach(key => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        keySelect49.appendChild(option);
    });

    const modifierSelect50 = document.getElementById(`modifier-50`);
    const keySelect50 = document.getElementById(`key-50`);
    // Populate modifier select
    modifiers.forEach(modifier => {
        const option = document.createElement("option");
        option.value = modifier;
        option.textContent = modifier;
        modifierSelect50.appendChild(option);
    });

    // Populate key select
    keys.forEach(key => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        keySelect50.appendChild(option);
    });

    const modifierSelect51 = document.getElementById(`modifier-51`);
    const keySelect51 = document.getElementById(`key-51`);
    // Populate modifier select
    modifiers.forEach(modifier => {
        const option = document.createElement("option");
        option.value = modifier;
        option.textContent = modifier;
        modifierSelect51.appendChild(option);
    });

    // Populate key select
    keys.forEach(key => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        keySelect51.appendChild(option);
    });
};

function resetShortcuts() {
    document.getElementById('modifier-1').value = 'None';
    document.getElementById('key-1').value = 'Tab';
    document.getElementById('modifier-2').value = 'Ctrl';
    document.getElementById('key-2').value = 'R';
    document.getElementById('modifier-3').value = 'Alt';
    document.getElementById('key-3').value = 'W';
    document.getElementById('modifier-4').value = 'Shift';
    document.getElementById('key-4').value = 'W';
    document.getElementById('modifier-5').value = 'Ctrl';
    document.getElementById('key-5').value = '1';
    document.getElementById('modifier-6').value = 'Ctrl';
    document.getElementById('key-6').value = '2';
    document.getElementById('modifier-7').value = 'Ctrl';
    document.getElementById('key-7').value = '3';
    document.getElementById('modifier-8').value = 'Shift';
    document.getElementById('key-8').value = 'Q';
    document.getElementById('modifier-9').value = 'Ctrl';
    document.getElementById('key-9').value = 'E';
    document.getElementById('modifier-10').value = 'Ctrl';
    document.getElementById('key-10').value = 'Q';
    document.getElementById('modifier-11').value = 'Shift';
    document.getElementById('key-11').value = 'V';
    document.getElementById('modifier-12').value = 'Alt';
    document.getElementById('key-12').value = '`';
    document.getElementById('modifier-13').value = 'Shift';
    document.getElementById('key-13').value = 'E';
    document.getElementById('modifier-14').value = 'Alt';
    document.getElementById('key-14').value = '1';
    document.getElementById('modifier-15').value = 'Alt';
    document.getElementById('key-15').value = '2';
    document.getElementById('modifier-16').value = 'Alt';
    document.getElementById('key-16').value = '3';
    document.getElementById('modifier-17').value = 'Alt';
    document.getElementById('key-17').value = 'A';
    document.getElementById('modifier-18').value = 'Alt';
    document.getElementById('key-18').value = '4';
    document.getElementById('modifier-19').value = 'Alt';
    document.getElementById('key-19').value = '5';
    document.getElementById('modifier-20').value = 'Alt';
    document.getElementById('key-20').value = '6';
    document.getElementById('modifier-21').value = 'Alt';
    document.getElementById('key-21').value = 'V';
    document.getElementById('modifier-22').value = 'Ctrl';
    document.getElementById('key-22').value = 'F';
    document.getElementById('modifier-23').value = 'Shift';
    document.getElementById('key-23').value = 'S';
    document.getElementById('modifier-24').value = 'Shift';
    document.getElementById('key-24').value = 'Z';
    document.getElementById('modifier-25').value = 'Shift';
    document.getElementById('key-25').value = 'R';
    document.getElementById('modifier-26').value = 'Alt';
    document.getElementById('key-26').value = 'X';
    document.getElementById('modifier-27').value = 'Alt';
    document.getElementById('key-27').value = 'C';
    document.getElementById('modifier-28').value = 'Shift';
    document.getElementById('key-28').value = 'A';
    document.getElementById('modifier-29').value = 'Shift';
    document.getElementById('key-29').value = 'D';
    document.getElementById('modifier-30').value = 'Shift';
    document.getElementById('key-30').value = 'F';
    document.getElementById('modifier-31').value = 'Shift';
    document.getElementById('key-31').value = 'C';
    document.getElementById('modifier-32').value = 'Ctrl';
    document.getElementById('key-32').value = 'S';
    document.getElementById('modifier-33').value = 'Shift';
    document.getElementById('key-33').value = 'X';
    document.getElementById('modifier-34').value = 'Ctrl';
    document.getElementById('key-34').value = 'D';
    document.getElementById('modifier-35').value = 'Shift';
    document.getElementById('key-35').value = 'T';
    document.getElementById('modifier-36').value = 'Alt';
    document.getElementById('key-36').value = 'T';
    document.getElementById('modifier-37').value = 'Ctrl';
    document.getElementById('key-37').value = 'Z';
    document.getElementById('modifier-38').value = 'Ctrl';
    document.getElementById('key-38').value = 'Y';
    document.getElementById('modifier-39').value = 1;
    document.getElementById('modifier-40').value = 0;
    document.getElementById('modifier-41').value = 0;
    document.getElementById('modifier-42').value = 'Shift';
    document.getElementById('modifier-43').value = 'Ctrl';
    document.getElementById('key-43').value = 'Shift';
    document.getElementById('modifier-44').value = 'Shift';
    document.getElementById('key-44').value = 'G';
    document.getElementById('modifier-45').value = 'Ctrl';
    document.getElementById('key-45').value = '4';
    document.getElementById('modifier-46').value = 'Ctrl';
    document.getElementById('key-46').value = '5';
    document.getElementById('modifier-47').value = 'Ctrl';
    document.getElementById('key-47').value = 'G';
    document.getElementById('modifier-48').value = 'Ctrl';
    document.getElementById('key-48').value = 'B';
    document.getElementById('modifier-49').value = 'Alt';
    document.getElementById('key-49').value = 'Z';
    document.getElementById('modifier-50').value = 'Alt';
    document.getElementById('key-50').value = 'S';
    document.getElementById('modifier-51').value = 'Alt';
    document.getElementById('key-51').value = 'D';
    checkShorcuts();
};

function checkShorcuts() {
    for (let i = 1; i <= 51; i++) {
        const keyValue = document.getElementById(`key-${i}`);
        const modifierValue = document.getElementById(`modifier-${i}`);
        if (keyValue && modifierValue) {
            keyValue.style.backgroundColor = '#fff';
            for (let j = 1; j <= 51; j++) {
                const checkKeyValue = document.getElementById(`key-${j}`);
                const checkModifierValue = document.getElementById(`modifier-${j}`);
                if (checkKeyValue && checkModifierValue) {
                    if (keyValue !== checkKeyValue){
                        if (keyValue.value === checkKeyValue.value && modifierValue.value === checkModifierValue.value) {
                            keyValue.style.backgroundColor = '#f00';
                        };
                    };
                };
            };
        };
    };
};

// Function to save values to local storage
function saveShortcutsValues() {
    for (let i = 1; i <= 51; i++) {
        const modifierValue = document.getElementById(`modifier-${i}`).value;
        const keyValue = document.getElementById(`key-${i}`).value;
        
        // Save both modifier and key values in local storage
        localStorage.setItem(`modifier-${i}`, modifierValue);
        localStorage.setItem(`key-${i}`, keyValue);
    }
    alert("Values saved successfully!");
};

// Function to load values from local storage
function loadShortcutsValues() {
    for (let i = 1; i <= 51; i++) {
        const modifierValue = localStorage.getItem(`modifier-${i}`);
        const keyValue = localStorage.getItem(`key-${i}`);
        
        // Set the values to the input fields
        if (modifierValue !== null) {
            document.getElementById(`modifier-${i}`).value = modifierValue;
        }
        if (keyValue !== null) {
            document.getElementById(`key-${i}`).value = keyValue;
        }
    }
};

// Event Listeners
const addEventListeners = () => {
    document.getElementById('save-shortcuts-button').addEventListener('click', saveShortcutsValues);
    document.getElementById('load-shortcuts-button').addEventListener('click', loadShortcutsValues);

    //mainMenuButton.addEventListener('click', () => {
    //    const userConfirmed = confirm('Do you want to proceed? make sure you save the changes!');
    //    if (userConfirmed) {
    //         window.location.href = 'index.html';
    //    }
    //});

    dropdownButton.addEventListener('click', () => {
      const showing = dropdownContent.classList.toggle('show');
      dropdownButton.setAttribute('aria-expanded', showing);
    });

    // Close dropdown if clicking outside
    window.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        dropdownContent.classList.remove('show');
        dropdownButton.setAttribute('aria-expanded', 'false');
      }
    });

    loadMindmapButton.addEventListener('click', () => {loadJsoninput.click();});
    closeMenuButton.addEventListener('click', closeMenu);
    shortcutsButton.addEventListener('click', showInfo);
    temp1Button.addEventListener('click', () => {LoadTemplate('MindmapData/SingleLine.mndmp');});
    temp2Button.addEventListener('click', () => {LoadTemplate('MindmapData/Tree.mndmp');});
    temp3Button.addEventListener('click', () => {LoadTemplate('MindmapData/SnowFlake.mndmp');});
    undoHistoryButton.addEventListener('click', undoActionsFromHistory);
    redoHistoryButton.addEventListener('click', redoActionsFromHistory);
    closeShortcutMapButton.addEventListener('click', showInfo);
    saveHistoryButton.addEventListener('click', () => {saveHistory();});
    menuButton.addEventListener('click', toggleMenu);
    closeHistoryButton.addEventListener('click', closeSidebar);
    miniPresentationButton.addEventListener('click', toggleMiniPresentationSidebar);
    searchInput.addEventListener('input', searchCircle)
    openDescriptionButton.addEventListener('click', openDescription);
    closeDescriptionButton.addEventListener('click', closeDescription);
    saveDescriptionButton.addEventListener('click', saveDescription);

    addCircleButton.addEventListener('click', addCircle);
    updateCircleButton.addEventListener('click', updateCircle);
    deleteCircleButton.addEventListener('click', deleteCircle);
    connectCircleButton.addEventListener('click', () => {connectCircle()});
    connectParentButton.addEventListener('click', () => {connectCircle('normal')});
    calculateDistanceButton.addEventListener('click', () => {getDistanceToRoot('calc')});

    collapsButton.addEventListener('click', toggleChildVisibility);
    snaptogridButton.addEventListener('click', toggleSnapToGrid);
    autoButton.addEventListener('click', toggleAuto);
    
    svg.addEventListener('mousedown', e => {
        const modifier41 = document.getElementById('modifier-41').value;
        if (e.button === Number(modifier41)) {
                e.preventDefault();
                deselectCircle();
            }
        }
    );
    
    svg.addEventListener('mousedown', e => {
        const modifier39 = document.getElementById('modifier-39').value;
        if (e.button === Number(modifier39)){
            e.preventDefault();
            startPan(e);
            svg.style.cursor = 'grabbing';
        }
    });
    svg.addEventListener('mouseup', e => {
        const modifier39 = document.getElementById('modifier-39').value;
        if (e.button === Number(modifier39)){
            e.preventDefault();
            svg.style.cursor = 'default';
        }
    });

    svg.addEventListener('wheel', e => {zoom(e, 'none')});

    zoomUpButton.addEventListener('click', e => {zoom(e,'down')});
    zoomDownButton.addEventListener('click', e => {zoom(e,'up')});

    saveSvgButton.addEventListener('click', saveAsSvg);
    savePngButton.addEventListener('click',  e => {saveAsPng(svg,mindmapContainer)});
    savePdfButton.addEventListener('click',  e => {saveAsPdf(svg)});
    saveJsonButton.addEventListener('click', saveAsJson);
    toggleSidebarButton.addEventListener('click', toggleSidebar);
    presentationModeButton.addEventListener('click', togglePresentationSidebar);
    toggleTaskSidebarButton.addEventListener('click', toggleTasksSidebar);
    closeTaskButton.addEventListener('click', closeTasksSidebar);
    clearHistoryButton.addEventListener('click', clearHistory);
    newMindmapButton.addEventListener('click', newMindmap);
    fixedaxisxButton.addEventListener('click', togglefixedaxisX);
    fixedaxisyButton.addEventListener('click', togglefixedaxisY);

    itemList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingEl = itemList.querySelector('.dragging');
        const afterElement = getDragAfterElement(itemList, e.clientY);
        if (afterElement == null) {
            itemList.appendChild(draggingEl);
        } else {
            itemList.insertBefore(draggingEl, afterElement);
        }});

    itemList.addEventListener('drop', () => {
        const newItems = [];
        itemList.querySelectorAll('li').forEach(li => {
            const itemText = li.firstChild.textContent;
            const itemCompleted = li.querySelector('.check-btn').checked; // Get the completion status
            newItems.push({ text: itemText, completed: itemCompleted }); // Store both text and completed status
        });
        tasklistitems = newItems;
        renderList();});

    itemForm.addEventListener('submit', e => {
        e.preventDefault();
        const text = itemInput.value.trim();
        if (text) {
            tasklistitems.push({ text: text, completed: false }); // Add new item with completed status
            renderList();
            itemInput.value = '';
            itemInput.focus();
        }});

    description_boldBtn.addEventListener('click', () => execCmd('bold'));
    description_italicBtn.addEventListener('click', () => execCmd('italic'));
    description_underlineBtn.addEventListener('click', () => execCmd('underline'));
    description_strikeBtn.addEventListener('click', () => execCmd('strikeThrough'));

    description_foreColor.addEventListener('change', () => execCmd('foreColor', description_foreColor.value));
    description_backColor.addEventListener('change', () => execCmd('hiliteColor', description_backColor.value)); // `backColor` fallback for Firefox

    description_alignLeftBtn.addEventListener('click', () => execCmd('justifyLeft'));
    description_alignCenterBtn.addEventListener('click', () => execCmd('justifyCenter'));
    description_alignRightBtn.addEventListener('click', () => execCmd('justifyRight'));
    description_alignJustifyBtn.addEventListener('click', () => execCmd('justifyFull'));

    description_undoBtn.addEventListener('click', () => execCmd('undo'));
    description_redoBtn.addEventListener('click', () => execCmd('redo'));

    // Update button state on selection change or keyup
    descriptionInput.addEventListener('keyup', description_updateButtonsState);
    descriptionInput.addEventListener('mouseup', description_updateButtonsState);
    descriptionInput.addEventListener('mouseout', description_updateButtonsState);

    description_fontName.addEventListener('change', () => {
        description_fontName.style.fontFamily = sanitizeFontName(description_fontName.value);
        execCmd('fontName', description_fontName.value);
    });

    description_fontSize.addEventListener('change', () => {
      execCmd('fontSize', description_fontSize.value);
    });

    loadJsoninput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {loadFromJson(file);}
    });

    //keyboard shortcuts  
    const modifier42 = document.getElementById('modifier-42').value;
    const modifier43 = document.getElementById('modifier-43').value;
    const key43 = document.getElementById('key-43').value;

    const modifier44 = document.getElementById('modifier-44').value;
    const key44 = document.getElementById('key-44').value;

    const modifier45 = document.getElementById('modifier-45').value;
    const key45 = document.getElementById('key-45').value;

    const modifier46 = document.getElementById('modifier-46').value;
    const key46 = document.getElementById('key-46').value;

    const modifier47 = document.getElementById('modifier-47').value;
    const key47 = document.getElementById('key-47').value;

    const modifier48 = document.getElementById('modifier-48').value;
    const key48 = document.getElementById('key-48').value;

    const modifier49 = document.getElementById('modifier-49').value;
    const key49 = document.getElementById('key-49').value;

    const modifier50 = document.getElementById('modifier-50').value;
    const key50 = document.getElementById('key-50').value;

    const modifier51 = document.getElementById('modifier-51').value;
    const key51 = document.getElementById('key-51').value;

    document.addEventListener('keydown', function(event) {
        const isModifier43 = (modifier43 === "None") ||
                                (modifier43 === "Shift" && event.shiftKey) ||
                                (modifier43 === "Ctrl" && event.ctrlKey) ||
                                (modifier43 === "Alt" && event.altKey);
        const isKey43 = (key43 === "None") ||
                                (key43 === "Shift" && event.shiftKey) ||
                                (key43 === "Ctrl" && event.ctrlKey) ||
                                (key43 === "Alt" && event.altKey);

        if (isModifier43 && isKey43){
            event.preventDefault();
            viewBox = { x: 0, y: 0, width: 600, height: 600 };
            svg.setAttribute('viewBox', '-300 -300 600 600');
        } else if ((event.key === modifier42.toLowerCase() || event.key === modifier42) && singleSelect) {
            event.preventDefault();
            singleSelect = false;
        }

        if (event.key === key44.toLowerCase() || event.key === key44) {
            // Check if the correct modifier is pressed
            const isModifierCorrect = (modifier44 === "None") ||
                                      (modifier44 === "Shift" && event.shiftKey) ||
                                      (modifier44 === "Ctrl" && event.ctrlKey) ||
                                      (modifier44 === "Alt" && event.altKey);

            if (isModifierCorrect) {
                event.preventDefault();
                lineColorInput.click();
            }
        }

        if (event.key === key45.toLowerCase() || event.key === key45) {
            // Check if the correct modifier is pressed
            const isModifierCorrect = (modifier45 === "None") ||
                                      (modifier45 === "Shift" && event.shiftKey) ||
                                      (modifier45 === "Ctrl" && event.ctrlKey) ||
                                      (modifier45 === "Alt" && event.altKey);

            if (isModifierCorrect) {
                event.preventDefault();
                zoom('', 'down');
            }
        }

        if (event.key === key46.toLowerCase() || event.key === key46) {
            // Check if the correct modifier is pressed
            const isModifierCorrect = (modifier46 === "None") ||
                                      (modifier46 === "Shift" && event.shiftKey) ||
                                      (modifier46 === "Ctrl" && event.ctrlKey) ||
                                      (modifier46 === "Alt" && event.altKey);

            if (isModifierCorrect) {
                event.preventDefault();
                zoom('', 'up');
                
            }
        }

        if (event.key === key47.toLowerCase() || event.key === key47) {
            // Check if the correct modifier is pressed
            const isModifierCorrect = (modifier47 === "None") ||
                                      (modifier47 === "Shift" && event.shiftKey) ||
                                      (modifier47 === "Ctrl" && event.ctrlKey) ||
                                      (modifier47 === "Alt" && event.altKey);

            if (isModifierCorrect) {
                event.preventDefault();
                togglePresentationSidebar();
            }
        }

        if (event.key === key48.toLowerCase() || event.key === key48) {
            // Check if the correct modifier is pressed
            const isModifierCorrect = (modifier48 === "None") ||
                                      (modifier48 === "Shift" && event.shiftKey) ||
                                      (modifier48 === "Ctrl" && event.ctrlKey) ||
                                      (modifier48 === "Alt" && event.altKey);

            if (isModifierCorrect) {
                event.preventDefault();
                toggleMiniPresentationSidebar();
            }
        }

        if (event.key === key49.toLowerCase() || event.key === key49) {
            // Check if the correct modifier is pressed
            const isModifierCorrect = (modifier49 === "None") ||
                                      (modifier49 === "Shift" && event.shiftKey) ||
                                      (modifier49 === "Ctrl" && event.ctrlKey) ||
                                      (modifier49 === "Alt" && event.altKey);

            if (isModifierCorrect) {
                event.preventDefault();
                connectCircle();
            }
        }

        if (event.key === key50.toLowerCase() || event.key === key50) {
            // Check if the correct modifier is pressed
            const isModifierCorrect = (modifier50 === "None") ||
                                      (modifier50 === "Shift" && event.shiftKey) ||
                                      (modifier50 === "Ctrl" && event.ctrlKey) ||
                                      (modifier50 === "Alt" && event.altKey);

            if (isModifierCorrect) {
                event.preventDefault();
                connectCircle('normal');
            }
        }

        if (event.key === key51.toLowerCase() || event.key === key51) {
            // Check if the correct modifier is pressed
            const isModifierCorrect = (modifier51 === "None") ||
                                      (modifier51 === "Shift" && event.shiftKey) ||
                                      (modifier51 === "Ctrl" && event.ctrlKey) ||
                                      (modifier51 === "Alt" && event.altKey);

            if (isModifierCorrect) {
                event.preventDefault();
                getDistanceToRoot('calc');
            }
        }
    });

    document.addEventListener('keyup', function(event) {
        if ((event.key === modifier42.toLowerCase() || event.key === modifier42) && !singleSelect) {
            event.preventDefault();
            singleSelect = true;
        }
    });

    document.addEventListener('keydown', function(event) {
        for (let i = 1; i <= 38; i++) {
            const modifier = document.getElementById(`modifier-${i}`).value;
            const key = document.getElementById(`key-${i}`).value;

            // Check if the pressed key matches the selected key
            if (event.key === key.toLowerCase() || event.key === key) {
                // Check if the correct modifier is pressed
                const isModifierCorrect = (modifier === "None") ||
                                          (modifier === "Shift" && event.shiftKey) ||
                                          (modifier === "Ctrl" && event.ctrlKey) ||
                                          (modifier === "Alt" && event.altKey);

                if (isModifierCorrect) {
                    event.preventDefault();
                    switch (i) {
                        case 1:
                            toggleMenu();
                            break;
                        case 2:
                            newMindmap();
                            break;
                        case 3:
                            loadJsoninput.click();
                            break;
                        case 4:
                            saveAsJson();
                            break;
                        case 5:
                            saveAsSvg();
                            break;
                        case 6:
                            saveAsPng(svg,mindmapContainer);
                            break;
                        case 7:
                            saveAsPdf(svg);
                            break;
                        case 8:
                            toggleSidebar();
                            break;
                        case 9:
                            saveHistory();
                            break;
                        case 10:
                            clearHistory();
                            break;
                        case 11:
                            toggleTasksSidebar();
                            break;
                        case 12:
                            showInfo();
                            break;
                        case 13:
                            searchInput.focus();
                            searchInput.select();
                            break;
                        case 14:
                            nodeTypeInput.value = 'circle';
                            break;
                        case 15:
                            nodeTypeInput.value = 'rectangle';
                            break;
                        case 16:
                            nodeTypeInput.value = 'triangle';
                            break;
                        case 17:
                            circleInput.focus();
                            circleInput.select();
                            break;
                        case 18:
                            lineTypeInput.value = 'solid';
                            break;
                        case 19:
                            lineTypeInput.value = 'dashed';
                            break;
                        case 20:
                            lineTypeInput.value = 'dotted';
                            break;
                        case 21:
                            lineInput.focus();
                            lineInput.select();
                            break;
                        case 22:
                            toggleAuto();
                            break;
                        case 23:
                            circleSizeInput.focus();
                            circleSizeInput.select();
                            break;
                        case 24:
                            fontSizeInput.focus();
                            fontSizeInput.select();
                            break;
                        case 25:
                            circleColorInput.click();
                            break;
                        case 26:
                            nodeXInput.focus();
                            nodeXInput.select();
                            break;
                        case 27:
                            nodeYInput.focus();
                            nodeYInput.select();
                            break;
                        case 28:
                            addCircle();
                            break;
                        case 29:
                            openDescription();
                            break;
                        case 30:
                            saveDescription();
                            break;
                        case 31:
                            toggleChildVisibility();
                            break;
                        case 32:
                            updateCircle();
                            fontSizeInput.blur();
                            circleInput.blur();
                            circleSizeInput.blur();
                            nodeXInput.blur();
                            nodeYInput.blur();
                            lineInput.blur();
                            break;
                        case 33:
                            deleteCircle();
                            break;
                        case 34:
                            toggleSnapToGrid();
                            break;
                        case 35:
                            togglefixedaxisX();
                            break;
                        case 36:
                            togglefixedaxisY();
                            break;
                        case 37:
                            undoActionsFromHistory();
                            break;
                        case 38:
                            redoActionsFromHistory();
                            break;
                    }
                }
            }
        }
    });
};

// Button State Management
const updateButtons = () => {
    updateCircleButton.disabled = !selectedCircleDic[selectedCircle[0]];
    deleteCircleButton.disabled = !selectedCircleDic[selectedCircle[0]];
    openDescriptionButton.disabled = !selectedCircleDic[selectedCircle[0]];
    collapsButton.disabled =  !selectedCircleDic[selectedCircle[0]];
    if (!presentation) {
        subtoolSidebar.style.display = selectedCircleDic[selectedCircle[0]] ? 'inline' : 'none';
    }
};

// app info and shorcuts
function showInfo() {
    shortcutsMap.classList.toggle('open');
};

// new mindmap / clear all data
const newMindmap = () => {
    clearHistory();
    circles = [];
    singleSelect = true;
    selectedCircleDic = {};
    selectedCircle = [null];
    lines = [];
    selectedLine = null;
    isPanning = false;
    panStart = { x: 0, y: 0 };
    viewBox = { x: 0, y: 0, width: 600, height: 600 };
    offsetX = {};
    offsetY = {};
    snaptogrid = false;
    auto = false;
    history = []; 
    currentIndex = -1;
    oldx = 0;
    oldy = 0;
    fixedAxisX = false;
    fixedAxisY = false;
    presentation = false;
    miniPresentation = false;
    tasklistitems = [];
    while (svg.children.length > 1) {
        svg.removeChild(svg.lastChild); // Remove the last child until only the first child remains
    }
    circleInput.value = '';
    circleSizeInput.value = 70;
    fontSizeInput.value = '24px';
    circleColorInput.value = "#00ff88";
    lineTypeInput.value = "solid";
    lineColorInput.value = "#00ff00";
    searchInput.value = '';
    nodeXInput.value = 0;
    nodeYInput.value = 0;
    mindmaptitle.innerText = 'Untitled Mindmap';
    snaptogridButton.classList.remove('on');
    snaptogridImg.src = 'MindmapData/MindmapSnapToGrid_off.svg';
    autoButton.classList.remove('on');
    autoImg.src = 'MindmapData/MindmapAuto_off.svg';
    fixedaxisxButton.classList.remove('on');
    fixedaxisxImg.src = 'MindmapData/MindmapFixedAxisX_off.svg';
    fixedaxisyButton.classList.remove('on');
    fixedaxisyImg.src = 'MindmapData/MindmapFixedAxisY_off.svg';
    presentationSidebar.classList.remove('open');
    closeSidebar();
    closeMenu();
    closeDescription();
    closeTasksSidebar();
    saveHistory('New Mindmap');
    updateButtons();
    svg.setAttribute('viewBox', '-300 -300 600 600');
};

// Function to toggle the Menu
const toggleMenu = () => {
    menu.classList.toggle('open');
};

const closeMenu = () => {
    menu.classList.remove('open');
};

// Function to toggle the history sidebar
const toggleSidebar = () => {
    sidebar.classList.toggle('open'); // Toggle the 'open' class
    sidebar_list.scrollTop = sidebar_list.scrollHeight;
    closeTasksSidebar();
};

const closeSidebar = () => {
    sidebar.classList.remove('open');
};

// Function to toggle the Presentation mode
const togglePresentationSidebar = () => {
    presentationSidebar.classList.toggle('open'); // Toggle the 'open' class
    presentation = !presentation;
    presentationModeButton.classList.toggle('on');
    miniPresentation = false;
    toggleMiniPresentationSidebar();
    if (presentation) {
        closeSidebar();
        closeTasksSidebar();
        closeMenu();
        presentationTooltip.innerText = 'Presentation Mode : ON';
        presentationImg.src = 'MindmapData/MindmapPresentationMode_on.svg';
        footer.style.display = 'none';
        header.style.justifyContent = "flex-start";
        snaptogridButton.style.display = 'none';
        fixedaxisxButton.style.display = 'none';
        fixedaxisyButton.style.display = 'none';
        redoHistoryButton.style.display = 'none';
        undoHistoryButton.style.display = 'none';
        mainMenuButton.style.display = 'none';
        subtoolSidebar.style.display = 'none';
        menuButton.style.display = 'none';
        miniPresentationButton.style.display = 'inline';
    } else {
        presentationTooltip.innerText = 'Presentation Mode : OFF';
        presentationImg.src = 'MindmapData/MindmapPresentationMode_off.svg';
        footer.style.display = 'flex';
        header.style.justifyContent = "space-between";
        snaptogridButton.style.display = 'inline';
        fixedaxisxButton.style.display = 'inline';
        fixedaxisyButton.style.display = 'inline';
        redoHistoryButton.style.display = 'inline';
        undoHistoryButton.style.display = 'inline';
        mainMenuButton.style.display = 'inline';
        menuButton.style.display = 'inline';
        miniPresentationButton.style.display = 'none';
    }
};

const toggleMiniPresentationSidebar = () => {
    miniPresentation = !miniPresentation;
    if (miniPresentation) {
        presentationSidebar.style.width = "0%";
        presentationSidebarText.style.display = 'none';
        presentationSidebarTitleText.style.display = 'none';
        minipresentationImg.src = 'MindmapData/MindmapPresentaionMaximize.svg';
    } else {
        presentationSidebar.style.width = "30%";
        presentationSidebarText.style.display = 'inline';
        presentationSidebarTitleText.style.display = 'inline';
        minipresentationImg.src = 'MindmapData/MindmapPresentaionMinimize.svg';
    }
};

// Function to toggle the tasks sidebar
const toggleTasksSidebar = () => {
    tasksidebar.classList.toggle('open'); // Toggle the 'open' class
    tasksidebar_list.scrollTop = tasksidebar_list.scrollHeight;
    closeSidebar();
};

const closeTasksSidebar = () => {
    tasksidebar.classList.remove('open');
};

// tasks functions 
function createListItem(item, index) {
    const li = document.createElement('li');
    li.setAttribute('draggable', 'true');
    li.setAttribute('aria-grabbed', 'false');

    // Create a container for the task text
    const taskContent = document.createElement('div');
    taskContent.className = 'task-content'; // Use the new class for styling
    taskContent.textContent = item.text; // Use item.text for the task text
    li.appendChild(taskContent); // Add the task content to the list item

    // Create checkbox
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'check-btn';
    checkBox.checked = item.completed; // Set checkbox state based on item.completed
    checkBox.addEventListener('change', () => {
        item.completed = checkBox.checked; // Update the completed status in the items array
        li.classList.toggle('completed', item.completed);
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.setAttribute('aria-label', 'Delete item');
    delBtn.innerHTML = '&times;';
    delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tasklistitems.splice(index, 1);
        renderList();
    });

    // Create a container for the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'task-button-container';

    buttonContainer.appendChild(checkBox); // Add checkbox to the button container
    buttonContainer.appendChild(delBtn); // Add delete button to the button container

    li.appendChild(buttonContainer); // Add button container to the list item
    // Apply completed class if the task is completed
    if (item.completed) {
        li.classList.add('completed');
    }

    // Drag and drop events
    li.addEventListener('dragstart', () => {
        li.classList.add('dragging');
        li.setAttribute('aria-grabbed', 'true');
    });
    li.addEventListener('dragend', () => {
        li.classList.remove('dragging');
        li.setAttribute('aria-grabbed', 'false');
    });

    return li;
};

function renderList() {
    itemList.innerHTML = '';
    tasklistitems.forEach((item, index) => {
        const li = createListItem(item, index);
        itemList.appendChild(li);
    });
};

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('#tasklist-list li:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
};

// toggleAuto
const toggleAuto = () => {
    auto = !auto;
    autoButton.classList.toggle('on');
    if (auto) {
        autoTooltip.innerText = 'Auto Node Settings : ON';
        autoImg.src = 'MindmapData/MindmapAuto_on.svg';
        circleSizeInput.disabled = true;
        fontSizeInput.disabled = true;
        circleColorInput.disabled = true;
        nodeXInput.disabled = true;
        nodeYInput.disabled = true;
    } else {
        autoTooltip.innerText = 'Auto Node Settings : OFF';
        autoImg.src = 'MindmapData/MindmapAuto_off.svg';
        circleSizeInput.disabled = false;
        fontSizeInput.disabled = false;
        circleColorInput.disabled = false;
        nodeXInput.disabled = false;
        nodeYInput.disabled = false;
    }
}

//togglefixedaxisX
const togglefixedaxisX = () => {
    fixedAxisX = !fixedAxisX;
    fixedaxisxButton.classList.toggle('on');
    if (fixedAxisX) {
        fixedaxisxTooltip.innerText = 'Fixed On Axis X : ON';
        fixedaxisxImg.src = 'MindmapData/MindmapFixedAxisX_on.svg';
    } else {
        fixedaxisxImg.src = 'MindmapData/MindmapFixedAxisX_off.svg';
        fixedaxisxTooltip.innerText = 'Fixed On Axis X : OFF';
    }
}

//togglefixedaxisY
const togglefixedaxisY = () => {
    fixedAxisY = !fixedAxisY;
    fixedaxisyButton.classList.toggle('on');
    if (fixedAxisY) {
        fixedaxisyTooltip.innerText = 'Fixed On Axis Y : ON';
        fixedaxisyImg.src = 'MindmapData/MindmapFixedAxisY_on.svg';
    } else {
        fixedaxisyImg.src = 'MindmapData/MindmapFixedAxisY_off.svg';
        fixedaxisyTooltip.innerText = 'Fixed On Axis Y : OFF';
    }
}

// toggleSnapToGrid
const toggleSnapToGrid = () => {
    snaptogrid = !snaptogrid;
    snaptogridButton.classList.toggle('on');
    if (snaptogrid) {
        snaptogridTooltip.innerText = 'Snap To Grid : ON';
        snaptogridImg.src = 'MindmapData/MindmapSnapToGrid_on.svg';
    } else {
        snaptogridImg.src = 'MindmapData/MindmapSnapToGrid_off.svg';
        snaptogridTooltip.innerText = 'Snap To Grid : OFF';
    }
};

// search for circle with title/name text
const searchCircle = () => {
    let searchText = searchInput.value.toLowerCase();
    if (searchText) {
        circles.forEach(circleObj => {
            const textElement = circleObj.text.textContent;
            if (textElement.toLowerCase() === searchText) {
                selectCircle('', circleObj.group, circleObj.id);
            }
        });
    } else {
        deselectCircle();
    }
};

// Function to get the distance (number of lines) from selected circle to root 
const getDistanceToRoot = (act = 'none') => {
    if (!selectedCircle[0]) {
        console.log("No circle selected.");
        return null;
    }

    const circleObj = circles.find(c => c.group === selectedCircleDic[selectedCircle[0]]);
    if (!circleObj) {
        console.log("Selected circle not found in data.");
        return null;
    }

    let distance = 0;
    let current = circleObj;

    while (current.parent) {
        distance++;
        if (act === 'calc') {
            lines.forEach(line => {
                if (line.circle2.id === current.id && line.circle1.id === current.parent.id) {
                    line.line.setAttribute('stroke-width', 5);
                    if (line.lineC) {
                        line.lineC.setAttribute('stroke-width', 5);
                    }
                }
            })
        }
        current = current.parent; // Move up to parent circle object
    }
    if (act === 'calc') {
        lines.forEach(line => {
            if (line.circle2.id === circleObj.id && line.circle1.id === circleObj.parent.id) {
                circleObj.collapsetext.textContent = `D:${distance}`; // Show number of children
                circleObj.collapsetext.style.display = 'block';
                circleObj.collapse.style.display = 'block';
            }
        })
    }
    return distance;
};

// Circle Management
// create circle group
const createCircle = (type, x, y, titletext, parentObj = null, id) => {

    const distance = getDistanceToRoot(); // This will still return 0 for the root circle
    if (auto) {
        if (distance == 0){
            circleSizeInput.value = 60
            circleColorInput.value = "#00ffcc"}
        else if (distance == 1){
            circleSizeInput.value = 55
            circleColorInput.value = "#00cccc"}
        else if (distance == 2){
            circleSizeInput.value = 50
            circleColorInput.value = "#0099cc"}
        else if (distance == 3){
            circleSizeInput.value = 45
            circleColorInput.value = "#0066cc"}
        else if (distance == 4){
            circleSizeInput.value = 35
            circleColorInput.value = "#0033cc"}
        else if (distance > 4){
            circleSizeInput.value = 30
            circleColorInput.value = "#5500cc"}
    }

    if (type === 'circle') {
        cv = 'block';
        rv = 'none';
        tv = 'none';
    } else if (type === 'rectangle') {
        rv = 'block';
        cv = 'none';
        tv = 'none';
    } else if (type === 'triangle') {
        rv = 'none';
        cv = 'none';
        tv = 'block';
    }

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const circle = createCircleElement(cv, x, y, distance, group);
    const triangle = createTriangleElement(tv, x, y, distance, group);
    const rect = createRectElement(rv, x, y, distance, group);
    const text = createTextElement(x, y, titletext, distance);
    const collapse = createCollapseElement(x, y);
    const collapsetext = createCollapseTextElement(x, y);

    //selection functions
    rect.addEventListener('mousedown', e => {
        const modifier40 = document.getElementById('modifier-40').value;
        if (e.button === Number(modifier40)) {
                e.preventDefault();
                selectCircle(e, group, id);
            }
    });
    triangle.addEventListener('mousedown', e => {
        const modifier40 = document.getElementById('modifier-40').value;
        if (e.button === Number(modifier40)) {
                e.preventDefault();
                selectCircle(e, group, id);
            }
    });
    circle.addEventListener('mousedown', e => {
        const modifier40 = document.getElementById('modifier-40').value;
        if (e.button === Number(modifier40)) {
                e.preventDefault();
                selectCircle(e, group, id);
            }
    });
    text.addEventListener('mousedown', e => {
        const modifier40 = document.getElementById('modifier-40').value;
        if (e.button === Number(modifier40)) {
                e.preventDefault();
                selectCircle(e, group, id);
            }
    });

    group.appendChild(rect);
    group.appendChild(triangle);
    group.appendChild(circle);
    group.appendChild(text);
    group.appendChild(collapse);
    group.appendChild(collapsetext);
    group.style.cursor = "pointer";
    group.addEventListener('contextmenu', (event) => {
        event.preventDefault(); // Prevent the default context menu for this element
    });
    svg.appendChild(group);

    // Find parent circle object if parentObj is a group
    let parentCircleObj = null;
    if (parentObj) {
        parentCircleObj = circles.find(c => c.group === parentObj);
    } else {
        group.querySelector('text').style.textDecoration = 'underline';
    }

    // Create the circle object and assign the parent and id
    const circleObj = { group, type, rect, triangle, circle, text, collapse, collapsetext, x, y, parent: parentCircleObj, id, description: '' , isCollapsed: false};
    circles.push(circleObj);
};

// create collapse obj
const createCollapseElement = (x, y) => {
    const collapse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const size = circleSizeInput.value;

    collapse.setAttribute("cx", x);
    collapse.setAttribute("cy", Number(y)-Number(size));
    collapse.setAttribute("r", 20);
    //collapse.setAttribute("fill", "#ff6600");
    collapse.style.display = 'none';
    collapse.classList.add('collapseCircle');
    return collapse;
};

// create collapse text obj
const createCollapseTextElement = (x, y) => {
    const size = circleSizeInput.value;
    const collapsetextElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    collapsetextElement.setAttribute("x", x);
    collapsetextElement.setAttribute("y", Number(y)-Number(size));
    collapsetextElement.setAttribute("text-anchor", "middle");
    collapsetextElement.setAttribute("dominant-baseline", "middle");
    collapsetextElement.setAttribute("fill", svgBackgroundColorT);
    collapsetextElement.setAttribute("font-size", "20px");
    collapsetextElement.style.display = 'none';
    collapsetextElement.style.fontWeight = 'bold';
    collapsetextElement.classList.add('collapseCircleText');

    return collapsetextElement;
};

// create circle obj
const createCircleElement = (v, x, y, distance, group) => {
    
    const size = circleSizeInput.value;
    const color = circleColorInput.value;

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", size);
    circle.setAttribute("fill", svgBackgroundColor);
    circle.setAttribute("stroke", color);
    circle.setAttribute("stroke-width", 2);
    circle.style.display = v;
    return circle;
};

// create circle obj
const createRectElement = (v, x, y, distance, group) => {

    const size = circleSizeInput.value;
    const color = circleColorInput.value;

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x-size);
    rect.setAttribute('y', y-size);
    rect.setAttribute('width', 2 * size);
    rect.setAttribute('height', 2 * size);
    rect.setAttribute('fill', svgBackgroundColor);
    rect.setAttribute('stroke', color);
    rect.setAttribute('stroke-width', '2');
    rect.setAttribute('rx', '5');
    rect.style.display = v;

    return rect;
};

// create circle obj
const createTriangleElement = (v, x, y, distance, group) => {

    const size = circleSizeInput.value;
    const color = circleColorInput.value;

    const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

    let trianglePointA = `${Number(x)},${Number(y)-Number(size)}`;
    let trianglePointB = `${Number(x)-Number(size)},${Number(y)+(Number(size)/2)*1.5}`;
    let trianglePointC = `${Number(x)+Number(size)},${Number(y)+(Number(size)/2)*1.5}`;

    triangle.setAttribute('points', `${trianglePointA} ${trianglePointB} ${trianglePointC}`);

    triangle.setAttribute('stroke', color);
    triangle.setAttribute('fill', svgBackgroundColor);
    triangle.setAttribute('stroke-width', '2');

    triangle.style.display = v;
  
    return triangle;
};

// create text obj
const createTextElement = (x, y, text, distance) => {
    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    if (auto) {
        if (distance == 0){textElement.setAttribute("font-size", "24px");}
        else if (distance == 1){textElement.setAttribute("font-size", "24px");}
        else if (distance == 2){textElement.setAttribute("font-size", "18px");}
        else if (distance == 3){textElement.setAttribute("font-size", "16px");}
        else if (distance == 4){textElement.setAttribute("font-size", "13px");}
        else if (distance > 4){textElement.setAttribute("font-size", "13px");}
    } else {textElement.setAttribute("font-size", `${fontSizeInput.value}`);}

    textElement.setAttribute("x", x);
    textElement.setAttribute("y", y);
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("dominant-baseline", "middle");
    textElement.setAttribute("fill", svgBackgroundColorT);
    textElement.textContent = text;
    return textElement;
};

// Node discription functions
// load description fonts from google or local
const loadDescriptionFonts = () => {
    // google font api key
    const API_KEY = 'none';
    // List of fonts to test for availability
    const description_testFonts = [
      "Arial", "Helvetica", "Verdana", "Tahoma", "Trebuchet MS", "Times New Roman",
      "Georgia", "Garamond", "Courier New", "Brush Script MT", "Comic Sans MS",
      "Impact", "Lucida Console", "Monaco", "Palatino", "Franklin Gothic Medium",
      "Candara", "Century Gothic", "Calibri", "Arial Black", "Segoe UI", "Consolas",
      "Roboto", "Open Sans", "Lato", "Montserrat", "Source Sans Pro", "Raleway", "PT Sans"
    ];

    function loadFontFamily(family) {
        const urlFamily = family.replace(/ /g, '+');
        const linkId = 'font-css-' + urlFamily;
        if (!document.getElementById(linkId)) {
            const link = document.createElement('link');
            link.id = linkId;
            link.rel = 'stylesheet';
            link.href = `https://fonts.googleapis.com/css2?family=${urlFamily}&display=swap`;
            document.head.appendChild(link);
        }
    };

    // Populate select dropdown with detected fonts
    function description_populateFontSelect(fonts) {
      const description_select = document.getElementById('description-fontName');
      description_select.innerHTML = "";
      if(fonts.length === 0) {
        const description_option = document.createElement('option');
        description_option.textContent = "No fonts detected";
        description_select.appendChild(description_option);
        return;
      }
      fonts.forEach(font => {
        //loadFontFamily(font);
        const description_option = document.createElement('option');
        description_option.value = font;
        description_option.textContent = font;
        description_option.style.fontFamily = sanitizeFontName(font);
        description_select.appendChild(description_option);
      });
    }

    // Google Fonts Integration
    async function fetchGoogleFonts() {
      try {
        const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`);
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        return data.items.map(font => font.family); // Return only font family names
      } catch (e) {
        console.warn('Failed to fetch Google Fonts API. Using fallback font list.', e);
        return description_testFonts;
      }
    }
    
    // Fetch Google Fonts and add to the dropdown
    (async () => {
      const googleFonts = await fetchGoogleFonts();
      description_populateFontSelect(googleFonts);
    })();
};

// Utility to update button active states
function description_updateToggleButton(button, command) {
    const description_state = document.queryCommandState(command);
    button.setAttribute('aria-pressed', description_state);
};

// Execute command wrapper
function execCmd(command, value = null) {
    document.execCommand(command, false, value);
    description_updateButtonsState();
    descriptionInput.focus();
};

// Update toolbar button states
function description_updateButtonsState() {
    description_updateToggleButton(description_boldBtn, 'bold');
    description_updateToggleButton(description_italicBtn, 'italic');
    description_updateToggleButton(description_underlineBtn, 'underline');
    description_updateToggleButton(description_strikeBtn, 'strikeThrough');

    // Alignment states
    description_alignLeftBtn.setAttribute('aria-pressed', document.queryCommandValue('justifyLeft') === 'true' || document.queryCommandState('justifyLeft'));
    description_alignCenterBtn.setAttribute('aria-pressed', document.queryCommandValue('justifyCenter') === 'true' || document.queryCommandState('justifyCenter'));
    description_alignRightBtn.setAttribute('aria-pressed', document.queryCommandValue('justifyRight') === 'true' || document.queryCommandState('justifyRight'));
    description_alignJustifyBtn.setAttribute('aria-pressed', document.queryCommandValue('justifyFull') === 'true' || document.queryCommandState('justifyFull'));
};

function sanitizeFontName(name) {
    return `${name.replace(/'/g, "\\'")}`;
};

// Function to open the description
const openDescription = () => {
    if (selectedCircle[0]) {
        description.classList.toggle('open');
        const circleObj = circles.find(c => c.group === selectedCircleDic[selectedCircle[0]]);
        descriptionInput.innerHTML = circleObj ? circleObj.description || '' : '';
        // Initialize button states at start
        description_updateButtonsState();
    } else {
        descriptionInput.innerHTML = '';
    }
};

// Function to close the description
const closeDescription = () => {
    description.classList.remove('open');
};

// Function to save the description
const saveDescription = () => {
    if (selectedCircle[0]) {
        // Find the corresponding circle object in the circles array
        const circleObj = circles.find(c => c.group === selectedCircleDic[selectedCircle[0]]);
        if (circleObj) {
            circleObj.description = descriptionInput.innerHTML; 
            saveHistory('Save description');
            //closeDescription();
        }
    }
};

// Circle Operations
// Circle Selection
const selectCircle = (e, group, id) => {
    if (selectedLine) {
        selectedLine.line.setAttribute("stroke-width", 4);
        if (selectedLine.lineC) {
            selectedLine.line.setAttribute("stroke-width", 2);
            selectedLine.lineC.setAttribute("stroke-width", 2);
        }
        selectedLine = null;
        lineTypeInput.value = 'solid';
        lineInput.value = '';
    }

    if (singleSelect) {
        circles.forEach(circleObj => {
            circleObj.group.querySelector('circle').setAttribute("stroke-width", 2);
            circleObj.group.querySelector('rect').setAttribute("stroke-width", 2);
            circleObj.group.querySelector('polygon').setAttribute("stroke-width", 2);
            if (circleObj.collapsetext.textContent[0] === 'D') {
                circleObj.collapsetext.textContent = '';
                circleObj.collapsetext.style.display = 'none';
                circleObj.collapse.style.display = 'none';
            }
        });
        lines.forEach(line => {
            if (line.lineC) {
                line.line.setAttribute("stroke-width", 2);
                line.lineC.setAttribute("stroke-width", 2);
            } else {
                line.line.setAttribute("stroke-width", 3);
            }
        });
        
        selectedCircle = [null];
        selectedCircleDic = {};
        
        connectCircleButton.disabled =  true;
        connectParentButton.disabled =  true;
    } else {
        connectParentButton.disabled =  false;
        connectCircleButton.disabled =  false;
    }

    // Update the selected circle to the new one
    let oldselectedcircle = selectedCircle.find(element => element === id);
    if (oldselectedcircle) {
        selectedCircle = selectedCircle.filter(i => i !== id);
    }

    let selectedCircleParent = circles.find(c => c.id === id);
    if (selectedCircleParent.isCollapsed) {
        const addChildren = (parent) => {
            const childCircles = circles.filter(c => c.parent === parent);
            childCircles.forEach(child => {
                selectedCircle.unshift(child.id);
                selectedCircleDic[child.id] = child.group;
                addChildren(child); // Count this child and its descendants
            });
        };
        addChildren(selectedCircleParent);
    }

    selectedCircle.unshift(id);
    selectedCircleDic[id] = group;

    selectedCircleDic[selectedCircle[0]].querySelector('circle').setAttribute("stroke-width", 10);
    selectedCircleDic[selectedCircle[0]].querySelector('rect').setAttribute("stroke-width", 10);
    selectedCircleDic[selectedCircle[0]].querySelector('polygon').setAttribute("stroke-width", 10);

    const circleObj = circles.find(c => c.group === selectedCircleDic[selectedCircle[0]]);

    const childCircles = circles.filter(c => c.parent === circleObj);
    childCircles.forEach(child => {
        child.group.querySelector('circle').setAttribute("stroke-width", 5);
        child.group.querySelector('rect').setAttribute("stroke-width", 5);
        child.group.querySelector('polygon').setAttribute("stroke-width", 5);
    })

    circleInput.value = circleObj.text.textContent;
    oldx = circleObj.x;
    oldy = circleObj.y;
    circleSizeInput.value = selectedCircleDic[selectedCircle[0]].querySelector('circle').getAttribute("r");
    fontSizeInput.value = selectedCircleDic[selectedCircle[0]].querySelector('text').getAttribute("font-size");
    circleColorInput.value = selectedCircleDic[selectedCircle[0]].querySelector('circle').getAttribute("stroke");
    nodeXInput.value = selectedCircleDic[selectedCircle[0]].querySelector('circle').getAttribute("cx");
    nodeYInput.value = selectedCircleDic[selectedCircle[0]].querySelector('circle').getAttribute("cy");

    if (circleObj.isCollapsed) {
        collapsImg.src = 'MindmapData/MindmapCollapse_on.svg';
        collapsButton.classList.toggle('on');
        collapsetooltip.innerText = 'Collapse: ON';

    } else {
        collapsImg.src = 'MindmapData/MindmapCollapse_off.svg';
        collapsButton.classList.remove('on');
        collapsetooltip.innerText = 'Collapse: OFF';
    }
    presentationSidebarTitleText.textContent = `Node : ${circleObj.text.textContent}`;
    presentationSidebarText.textContent = `Description : ${circleObj.description}`;
    // Update button states
    updateButtons();
    startDrag(e);
};

// Deselect Circle
const deselectCircle = () => {
    if (selectedCircle[0]) {
        circles.forEach(circleObj => {
            circleObj.group.querySelector('circle').setAttribute("stroke-width", 2);
            circleObj.group.querySelector('rect').setAttribute("stroke-width", 2);
            circleObj.group.querySelector('polygon').setAttribute("stroke-width", 2);
            if (circleObj.collapsetext.textContent[0] === 'D') {
                circleObj.collapsetext.textContent = '';
                circleObj.collapsetext.style.display = 'none';
                circleObj.collapse.style.display = 'none';
            }
        });
        lines.forEach(line => {
            if (line.lineC) {
                line.line.setAttribute("stroke-width", 2);
                line.lineC.setAttribute("stroke-width", 2);
            } else {
                line.line.setAttribute("stroke-width", 3);
            }
        })
        selectedCircle = [null];
        selectedCircleDic = {};
        circleInput.value = '';
        circleSizeInput.value = 70;
        fontSizeInput.value = '24px';
        circleColorInput.value = "#00ff88";
        nodeXInput.value = 0;
        nodeYInput.value = 0;
        oldx = 0;
        oldy = 0;
        offsetX = {};
        offsetY = {};
        collapsImg.src = 'MindmapData/MindmapCollapse_off.svg';
        collapsButton.classList.remove('on');
        collapsetooltip.innerText = 'Collapse: OFF';

        updateButtons();

    } else if (selectedLine) {
        if (selectedLine.lineC) {
            selectedLine.line.setAttribute("stroke-width", 2);
            selectedLine.lineC.setAttribute("stroke-width", 2);
        } else {
            selectedLine.line.setAttribute("stroke-width", 3);
        }
        selectedLine = null;
        lineTypeInput.value = 'solid';
        lineInput.value = '';
        updateCircleButton.disabled = true;
        subtoolSidebar.style.display = 'none';
    }
};

// add new circle
const addCircle = () => {
    const text = circleInput.value;
    const type = nodeTypeInput.value;
    if (text === '' || text === ' ') {
        circleInput.focus();
        circleInput.select();
    } else {
        circleInput.blur();
    }
    if (text) {
        const parentObj = selectedCircle[0] ? circles.find(c => c.group === selectedCircleDic[selectedCircle[0]]) : null;
        const parentGroup = selectedCircleDic[selectedCircle[0]];

        // Generate a unique ID for the new circle
        const newId = `circle-${Date.now()}`; // Simple unique ID based on timestamp
        let x = nodeXInput.value;
        let y = nodeYInput.value;
        if (auto) {
            x = parentObj ? parseFloat(parentObj.group.querySelector('circle').getAttribute('cx')) + Math.random() * 200 - 50 : 0;
            y = parentObj ? parseFloat(parentObj.group.querySelector('circle').getAttribute('cy')) + Math.random() * 200 - 50 : 0;
        }

        createCircle(type, x, y, text, parentGroup, newId); // Pass the unique ID
        circleInput.value = '';
        circleInput.value = '';
        circleSizeInput.value = 70;
        fontSizeInput.value = '24px';
        circleColorInput.value = "#00ff88";
        nodeXInput.value = 0;
        nodeYInput.value = 0;
        // Draw line if parent exists
        if (parentObj) {
            drawLine(parentObj, circles[circles.length - 1], lineInput.value, lineTypeInput.value, lineColorInput.value);
        }

        lineTypeInput.value = 'solid';
        lineInput.value = '';
        saveHistory(`Add Circle: ${text}`);
    }
};

// Select line
const selectLine = (line) => {
    if (selectedCircle[0]){
        circles.forEach(circleObj => {
            circleObj.group.querySelector('circle').setAttribute("stroke-width", 2);
            circleObj.group.querySelector('rect').setAttribute("stroke-width", 2);
            circleObj.group.querySelector('polygon').setAttribute("stroke-width", 2);
        });
        selectedCircle = [null];
        selectedCircleDic = {};
    }
    
    selectedLine = null;
    const lineObj = lines.find(l => l.line === line);
    //{circle1, circle2, line, label, type};
    selectedLine = lineObj;
    if (selectedLine.lineC) {
        selectedLine.line.setAttribute("stroke-width", 7);
        selectedLine.lineC.setAttribute("stroke-width", 7);
    } else {
        selectedLine.line.setAttribute("stroke-width", 10);
    }
    
    lineTypeInput.value = selectedLine.type;
    lineInput.value = selectedLine.label.textContent;
    lineColorInput.value = selectedLine.color;
    subtoolSidebar.style.display = 'inline';
    updateCircleButton.disabled = false;
    deleteCircleButton.disabled = false;
};

// draw connection line
const drawLine = (circle1, circle2, labelText = 'child', lineStyle = 'solid', lineColor = '#00ff00', connectionType = 'normal') => {
    
    // Create the line
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", circle1.circle.getAttribute("cx"));
    line.setAttribute("y1", circle1.circle.getAttribute("cy"));
    line.setAttribute("x2", circle2.circle.getAttribute("cx"));
    line.setAttribute("y2", circle2.circle.getAttribute("cy"));
    line.setAttribute("stroke-width", 3);
    line.setAttribute("stroke", lineColor);

    const hitline = document.createElementNS("http://www.w3.org/2000/svg", "line");
    hitline.setAttribute("x1", circle1.circle.getAttribute("cx"));
    hitline.setAttribute("y1", circle1.circle.getAttribute("cy"));
    hitline.setAttribute("x2", circle2.circle.getAttribute("cx"));
    hitline.setAttribute("y2", circle2.circle.getAttribute("cy"));
    hitline.setAttribute("stroke-width", 20);
    hitline.setAttribute("stroke", "transparent");
    hitline.style.cursor = "pointer";

    // Set line style
    if (lineStyle === 'dashed') {
        line.setAttribute("stroke-dasharray", "8,8");
    } else if (lineStyle === 'dotted') {
        line.setAttribute("stroke-dasharray", "4,8");
    }

    // Calculate midpoint for the label
    let midX = (parseFloat(line.getAttribute("x1")) + parseFloat(line.getAttribute("x2"))) / 2;
    let midY = (parseFloat(line.getAttribute("y1")) + parseFloat(line.getAttribute("y2"))) / 2;

    // Create the label
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", midX);
    label.setAttribute("y", midY);
    //label.setAttribute("fill", "#ffffff");
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("dominant-baseline", "middle");
    label.textContent = labelText;

    // Make the label editable
    label.addEventListener('contextmenu', (event) => {
        const modifier40 = document.getElementById('modifier-40').value;
        if (Number(modifier40) === 2){
            event.preventDefault(); // Prevent the default context menu for this element
            selectLine(line);
        }
    });
    label.addEventListener('click', e => {
        const modifier40 = document.getElementById('modifier-40').value;
        if (e.button === Number(modifier40)) {
            e.preventDefault();
            selectLine(line);
        }
    });

    hitline.addEventListener('contextmenu', (event) => {
        const modifier40 = document.getElementById('modifier-40').value;
        if (Number(modifier40) === 2){
            event.preventDefault(); // Prevent the default context menu for this element
            selectLine(line);
        }
    });
    
    hitline.addEventListener('click', e => {
        const modifier40 = document.getElementById('modifier-40').value;
        if (e.button === Number(modifier40)) {
            e.preventDefault();
            selectLine(line);
        }
    });

    const type = lineStyle;
    let color = lineColor;
    
    let lineObject = {circle1, circle2, line, hitline, label, type, color, connectionType};

    if (connectionType === 'connection') {
        const lineC = document.createElementNS("http://www.w3.org/2000/svg", "line");
        // Calculate the angle between the two circles
        const x1 = parseFloat(circle1.circle.getAttribute("cx"));
        const y1 = parseFloat(circle1.circle.getAttribute("cy"));
        const x2 = parseFloat(circle2.circle.getAttribute("cx"));
        const y2 = parseFloat(circle2.circle.getAttribute("cy"));
        const angle = Math.atan2(y2 - y1, x2 - x1);

        // Calculate offset based on the angle
        const offset = 10; // Adjust this value for more or less spacing
        const offsetX = offset * Math.cos(angle + Math.PI / 2); // Perpendicular offset
        const offsetY = offset * Math.sin(angle + Math.PI / 2); // Perpendicular offset
        
        lineC.setAttribute("x1", x1 + offsetX);
        lineC.setAttribute("y1", y1 + offsetY);
        lineC.setAttribute("x2", x2 + offsetX);
        lineC.setAttribute("y2", y2 + offsetY);
        line.setAttribute("x1", x1 - offsetX);
        line.setAttribute("y1", y1 - offsetY);
        line.setAttribute("x2", x2 - offsetX);
        line.setAttribute("y2", y2 - offsetY);

        lineC.setAttribute("stroke-width", 2);
        lineC.setAttribute("stroke", lineColor);
        line.setAttribute("stroke-width", 2);
        line.setAttribute("stroke", lineColor);


        // Set line style
        if (lineStyle === 'dashed') {
            lineC.setAttribute("stroke-dasharray", "8,8");
        } else if (lineStyle === 'dotted') {
            lineC.setAttribute("stroke-dasharray", "4,8");
        }

        svg.insertBefore(lineC, circles[0].circle.parentNode);
        lineObject = {circle1, circle2, line, lineC, hitline, label, type, color, connectionType};
    }

    svg.insertBefore(line, circles[0].circle.parentNode);
    svg.insertBefore(hitline, circles[0].circle.parentNode);
    svg.insertBefore(label, circles[0].circle.parentNode);

    lines.push(lineObject);

    lineTypeInput.value = 'solid';
    lineInput.value = '';
    lineColorInput.value = '#00ff00';
};

// collaps circle children
const toggleChildVisibility = () => {
    if (!selectedCircle[0]) {
        console.log("No circle selected.");
        return;
    }
    const circleObj = circles.find(c => c.group === selectedCircleDic[selectedCircle[0]]);
    if (!circleObj) {
        console.log("Selected circle not found in data.");
        return;
    }
    let isCollapsed = circleObj.isCollapsed;

    // Update the text to show the number of children when collapsed
    if (isCollapsed) {
        circleObj.collapsetext.style.display = 'none';
        circleObj.collapse.style.display = 'none';
    }

    // Function to recursively toggle visibility of child circles and lines
    const toggleChildren = (parent) => {
        const childCircles = circles.filter(c => c.parent === parent);
        let totalChildCount = 0; // Initialize total child count
        childCircles.forEach(child => {
            if (child.isCollapsed){
                child.collapsetext.style.display = 'none';
                child.collapse.style.display = 'none';
            }
            child.isCollapsed = false;
            child.group.style.display = isCollapsed ? 'block' : 'none';
            // Hide or show lines connected to child circles
            lines.forEach(line => {
                if (line.circle1 === child || line.circle2 === child) {
                    line.line.style.display = isCollapsed ? 'block' : 'none';
                    line.label.style.display = isCollapsed ? 'block' : 'none';
                    if (line.lineC) {
                        line.lineC.style.display = isCollapsed ? 'block' : 'none';
                    }
                }
            });
            // Recursively toggle visibility for children of children
            totalChildCount += 1 + toggleChildren(child); // Count this child and its descendants
        });
        circleObj.isCollapsed = !isCollapsed;
        return totalChildCount; // Return the total number of children including descendants
    };
    const childCount = toggleChildren(circleObj);
    
    if (childCount != 0){
        if (!isCollapsed) {
            if (childCount > 0) {
            circleObj.collapsetext.textContent = `${childCount}`; // Show number of children
            circleObj.collapsetext.style.display = 'block';
            circleObj.collapse.style.display = 'block';
            collapsButton.classList.toggle('on');
            collapsImg.src = 'MindmapData/MindmapCollapse_on.svg';
            collapsetooltip.innerText = 'Collapse: ON';
            saveHistory(`Collaps circle: ${circleObj.text.textContent}`);
            }
        } else {
            circleObj.collapsetext.style.display = 'none';
            circleObj.collapse.style.display = 'none';
            saveHistory(`UnCollaps circle: ${circleObj.text.textContent}`);
            collapsButton.classList.toggle('on');
            collapsImg.src = 'MindmapData/MindmapCollapse_off.svg';
            collapsetooltip.innerText = 'Collapse: OFF';
        }
    }
};

// Update Circle Function
const updateCircle = () => {
    if (selectedCircle[0]) {
        const newText = circleInput.value;
        const newSize = circleSizeInput.value;
        const newColor = circleColorInput.value;
        const newFontSize = fontSizeInput.value;
        const newPositionX = nodeXInput.value;
        const newPositionY = nodeYInput.value;
        const newCircleType = nodeTypeInput.value;
        const oldText = selectedCircleDic[selectedCircle[0]].querySelector('text').textContent;
        const oldSize = selectedCircleDic[selectedCircle[0]].querySelector('circle').getAttribute("r");
        const oldColor = selectedCircleDic[selectedCircle[0]].querySelector('circle').getAttribute("stroke");
        const oldFontSize = selectedCircleDic[selectedCircle[0]].querySelector('text').getAttribute("font-size");
        const oldPositionX = selectedCircleDic[selectedCircle[0]].querySelector('circle').getAttribute("cx");
        const oldPositionY = selectedCircleDic[selectedCircle[0]].querySelector('circle').getAttribute("cy");

        const circleObj = circles.find(c => c.group === selectedCircleDic[selectedCircle[0]]);
        if (newCircleType) {
            if (newCircleType === 'circle') {
                selectedCircleDic[selectedCircle[0]].querySelector('circle').style.display = 'block';
                selectedCircleDic[selectedCircle[0]].querySelector('rect').style.display = 'none';
                selectedCircleDic[selectedCircle[0]].querySelector('polygon').style.display = 'none';
            } else if (newCircleType === 'rectangle') {
                selectedCircleDic[selectedCircle[0]].querySelector('circle').style.display = 'none';
                selectedCircleDic[selectedCircle[0]].querySelector('rect').style.display = 'block';
                selectedCircleDic[selectedCircle[0]].querySelector('polygon').style.display = 'none';
            } else if (newCircleType === 'triangle') {
                selectedCircleDic[selectedCircle[0]].querySelector('circle').style.display = 'none';
                selectedCircleDic[selectedCircle[0]].querySelector('rect').style.display = 'none';
                selectedCircleDic[selectedCircle[0]].querySelector('polygon').style.display = 'block';
            }
            newCircleType.value = 'circle';
            console.log(`Updated circle type to: ${newCircleType}`);
            saveHistory(`Updated circle type to: ${newCircleType}`);
        }

        if (circleObj) {
            if (newText) {
                if (newText != oldText) {
                    circleObj.text.textContent = newText.trim();
                    selectedCircleDic[selectedCircle[0]].querySelector('text').textContent = newText;
                    selectedCircleDic[selectedCircle[0]].querySelector('circle').setAttribute("data-text", newText);
                    circleInput.value = '';
                    console.log(`Updated text to: ${newText}`);
                    saveHistory(`Updated text to: ${newText}`);
                }
            }

            if (newFontSize) {
                if (newFontSize != oldFontSize) {
                    selectedCircleDic[selectedCircle[0]].querySelector('text').setAttribute("font-size", newFontSize);
                    console.log(`Updated size to: ${newFontSize}`);
                    saveHistory(`Updated size to: ${newFontSize}`);
                }
            }

            if (newSize) {
                if (newSize != oldSize) {
                    selectedCircleDic[selectedCircle[0]].querySelector('circle').setAttribute("r", newSize);
                    selectedCircleDic[selectedCircle[0]].querySelector('rect').setAttribute("width", 2 * newSize);
                    selectedCircleDic[selectedCircle[0]].querySelector('rect').setAttribute("height", 2 * newSize);

                    let trianglePointA = `${Number(newPositionX)},${Number(newPositionY)-Number(newSize)}`;
                    let trianglePointB = `${Number(newPositionX)-Number(newSize)},${Number(newPositionY)+(Number(newSize)/2)*1.5}`;
                    let trianglePointC = `${Number(newPositionX)+Number(newSize)},${Number(newPositionY)+(Number(newSize)/2)*1.5}`;
                    let newTriPoints = `${trianglePointA} ${trianglePointB} ${trianglePointC}`;
                    selectedCircleDic[selectedCircle[0]].querySelector('polygon').setAttribute("points", newTriPoints);

                    selectedCircleDic[selectedCircle[0]].querySelector('.collapseCircleText').setAttribute('x', newPositionX);
                    selectedCircleDic[selectedCircle[0]].querySelector('.collapseCircleText').setAttribute('y', Number(newPositionY)-Number(newSize));
                    selectedCircleDic[selectedCircle[0]].querySelector('.collapseCircle').setAttribute('cx', newPositionX);
                    selectedCircleDic[selectedCircle[0]].querySelector('.collapseCircle').setAttribute('cy', Number(newPositionY)-Number(newSize));
                    console.log(`Updated size to: ${newSize}`);
                    saveHistory(`Updated size to: ${newSize}`);
                }
            }

            if (newColor) {
                if (newColor != oldColor) {
                    selectedCircleDic[selectedCircle[0]].querySelector('circle').setAttribute("stroke", newColor);
                    selectedCircleDic[selectedCircle[0]].querySelector('rect').setAttribute("stroke", newColor);
                    selectedCircleDic[selectedCircle[0]].querySelector('polygon').setAttribute("stroke", newColor);
                    console.log(`Updated color to: ${newColor}`);
                    saveHistory(`Updated color to: ${newColor}`);
                }  
            }

            if (newPositionX) {
                if (newPositionX != oldPositionX) {
                    selectedCircleDic[selectedCircle[0]].querySelector('circle').setAttribute("cx", newPositionX);
                    selectedCircleDic[selectedCircle[0]].querySelector('rect').setAttribute("x", newPositionX - newSize);
                    selectedCircleDic[selectedCircle[0]].querySelector('text').setAttribute('x', newPositionX);
                    selectedCircleDic[selectedCircle[0]].querySelector('text').setAttribute('y', newPositionY);
                    selectedCircleDic[selectedCircle[0]].querySelector('.collapseCircleText').setAttribute('x', newPositionX);
                    selectedCircleDic[selectedCircle[0]].querySelector('.collapseCircleText').setAttribute('y', Number(newPositionY)-Number(newSize));
                    selectedCircleDic[selectedCircle[0]].querySelector('.collapseCircle').setAttribute('cx', newPositionX);
                    selectedCircleDic[selectedCircle[0]].querySelector('.collapseCircle').setAttribute('cy', Number(newPositionY)-Number(newSize));
                    let trianglePointA = `${Number(newPositionX)},${Number(newPositionY)-Number(newSize)}`;
                    let trianglePointB = `${Number(newPositionX)-Number(newSize)},${Number(newPositionY)+(Number(newSize)/2)*1.5}`;
                    let trianglePointC = `${Number(newPositionX)+Number(newSize)},${Number(newPositionY)+(Number(newSize)/2)*1.5}`;
                    let newTriPoints = `${trianglePointA} ${trianglePointB} ${trianglePointC}`;
                    selectedCircleDic[selectedCircle[0]].querySelector('polygon').setAttribute("points", newTriPoints);
                    circleObj.x = newPositionX;
                    circleObj.y = newPositionY;
                    console.log(`Updated position X to: ${newPositionX}`);
                    saveHistory(`Updated position X to: ${newPositionX}`);
                }
            }  
        
            if (newPositionY) {
                if (newPositionY != oldPositionY) {
                    selectedCircleDic[selectedCircle[0]].querySelector('circle').setAttribute("cy", newPositionY);
                    selectedCircleDic[selectedCircle[0]].querySelector('rect').setAttribute("y", newPositionY - newSize);
                    selectedCircleDic[selectedCircle[0]].querySelector('text').setAttribute('x', newPositionX);
                    selectedCircleDic[selectedCircle[0]].querySelector('text').setAttribute('y', newPositionY);
                    selectedCircleDic[selectedCircle[0]].querySelector('.collapseCircleText').setAttribute('x', newPositionX);
                    selectedCircleDic[selectedCircle[0]].querySelector('.collapseCircleText').setAttribute('y', Number(newPositionY)-Number(newSize));
                    selectedCircleDic[selectedCircle[0]].querySelector('.collapseCircle').setAttribute('cx', newPositionX);
                    selectedCircleDic[selectedCircle[0]].querySelector('.collapseCircle').setAttribute('cy', Number(newPositionY)-Number(newSize));
                    let trianglePointA = `${Number(newPositionX)},${Number(newPositionY)-Number(newSize)}`;
                    let trianglePointB = `${Number(newPositionX)-Number(newSize)},${Number(newPositionY)+(Number(newSize)/2)*1.5}`;
                    let trianglePointC = `${Number(newPositionX)+Number(newSize)},${Number(newPositionY)+(Number(newSize)/2)*1.5}`;
                    let newTriPoints = `${trianglePointA} ${trianglePointB} ${trianglePointC}`;
                    selectedCircleDic[selectedCircle[0]].querySelector('polygon').setAttribute("points", newTriPoints);
                    circleObj.x = newPositionX;
                    circleObj.y = newPositionY;
                    console.log(`Updated position Y to: ${newPositionX}`);
                    saveHistory(`Updated position Y to: ${newPositionX}`);
                }
            }

        } else {
            console.log("the selected circle no longer in main array.");
        }
    } else if (selectedLine){
        const newText = lineInput.value;
        const newColor = lineColorInput.value;
        const newType = lineTypeInput.value;
        const oldText = selectedLine.label.textContent;
        const oldType = selectedLine.type;
        const oldColor = selectedLine.color;
        if (true) {
            if (newText != oldText) {
                selectedLine.label.textContent = newText.trim();
                console.log(`Updated Line Label text to: ${newText}`);
                saveHistory(`Updated Line Label text to: ${newText}`);
            }
        }
        if (newType) {
            if (newType != oldType) {
                selectedLine.type = newType.trim();
                if (newType === 'solid'){
                    selectedLine.line.setAttribute("stroke-dasharray", "none");
                    if (selectedLine.lineC) {
                        selectedLine.lineC.setAttribute("stroke-dasharray", "none");
                    }
                } else if (newType === 'dashed') {
                    selectedLine.line.setAttribute("stroke-dasharray", "8,8");
                    if (selectedLine.lineC) {
                        selectedLine.lineC.setAttribute("stroke-dasharray", "8,8");
                    }
                } else if (newType === 'dotted') {
                    selectedLine.line.setAttribute("stroke-dasharray", "3,6");
                    if (selectedLine.lineC) {
                        selectedLine.lineC.setAttribute("stroke-dasharray", "3,6");
                    }
                }
                console.log(`Updated Line Label Type to: ${newType}`);
                saveHistory(`Updated Line Label Type to: ${newType}`);
            }
        }
        if (newColor) {
            if (newColor != oldColor) {
                selectedLine.color = newColor;
                selectedLine.line.setAttribute("stroke", newColor);
                console.log(`Updated Line Label Color to: ${newColor}`);
                saveHistory(`Updated Line Label Color to: ${newColor}`);
            }
        }
    } else {
        console.log("No selected for update.");
    }
};

//connect node
const connectCircle = (type = 'connection') => {
    const circleObj1 = selectedCircle[0] ? circles.find(c => c.group === selectedCircleDic[selectedCircle[0]]) : null;
    const circleObj2 = selectedCircle[1] ? circles.find(c => c.group === selectedCircleDic[selectedCircle[1]]) : null;

    if (circleObj1 && circleObj2) {
        drawLine(circleObj1, circleObj2, lineInput.value, lineTypeInput.value, lineColorInput.value, type);
        if (type === 'normal') {
            circleObj2.parent = circleObj1;
            circleObj2.group.querySelector('text').style.textDecoration = 'none';
        }
    }
};

// delete connection
const deleteConnection = () => {
    lines = lines.filter(line => {
        const isConnected = line === selectedLine;
        if (isConnected) {
            svg.removeChild(line.line);
            svg.removeChild(line.hitline);
            svg.removeChild(line.label);
            circles.forEach(circle => {
                if (line.circle1 === circle.parent) {
                    circle.parent = null;
                    circle.group.querySelector('text').style.textDecoration = 'underline';
                }
                if (line.circle2 === circle.parent) {
                    circle.parent.parent = null;
                    circle.parent.group.querySelector('text').style.textDecoration = 'underline';
                }
            });
            if (line.lineC) {
                svg.removeChild(line.lineC);
            }
            return false;
        }
        return true;
    });
};

// Delete Circle Function
const deleteCircle = () => {
    if (selectedCircle[0]) {
        const circleToDelete = selectedCircleDic[selectedCircle[0]].querySelector('circle');
        const circle_title = selectedCircleDic[selectedCircle[0]].querySelector('text').textContent;
        lines = lines.filter(line => {
            const isConnected = line.circle1.circle === circleToDelete || line.circle2.circle === circleToDelete;
            if (isConnected) {
                svg.removeChild(line.line);
                svg.removeChild(line.hitline);
                svg.removeChild(line.label);
                if (line.lineC) {
                    svg.removeChild(line.lineC);
                }
                return false;
            }
            return true;
        });

        svg.removeChild(selectedCircleDic[selectedCircle[0]]);
        circles = circles.filter(c => c.group !== selectedCircleDic[selectedCircle[0]]);
        console.log("Circle deleted.");
        deselectCircle();
        updateButtons();
        saveHistory(`Deleted Circle: ${circle_title}`)
    } else if (selectedLine) {
        deleteConnection();
    } else {
        console.log("No object selected for deletion.");
    }
};

// update lines
const updateLines = () => {
    lines.forEach(line => {
        // Update line endpoints
        line.hitline.setAttribute('x1', line.circle1.circle.getAttribute('cx'));
        line.hitline.setAttribute('y1', line.circle1.circle.getAttribute('cy'));
        line.hitline.setAttribute('x2', line.circle2.circle.getAttribute('cx'));
        line.hitline.setAttribute('y2', line.circle2.circle.getAttribute('cy'));
        // Calculate new midpoint for the label
        let midX = 0;
        let midY = 0;

        if (line.lineC) {
            // Calculate the angle between the two circles
            const x1 = parseFloat(line.circle1.circle.getAttribute("cx"));
            const y1 = parseFloat(line.circle1.circle.getAttribute("cy"));
            const x2 = parseFloat(line.circle2.circle.getAttribute("cx"));
            const y2 = parseFloat(line.circle2.circle.getAttribute("cy"));
            const angle = Math.atan2(y2 - y1, x2 - x1);

            // Calculate offset based on the angle
            const offset = 10; // Adjust this value for more or less spacing
            const offsetX = offset * Math.cos(angle + Math.PI / 2); // Perpendicular offset
            const offsetY = offset * Math.sin(angle + Math.PI / 2); // Perpendicular offset
            
            line.lineC.setAttribute("x1", x1 + offsetX);
            line.lineC.setAttribute("y1", y1 + offsetY);
            line.lineC.setAttribute("x2", x2 + offsetX);
            line.lineC.setAttribute("y2", y2 + offsetY);
            line.line.setAttribute("x1", x1 - offsetX);
            line.line.setAttribute("y1", y1 - offsetY);
            line.line.setAttribute("x2", x2 - offsetX);
            line.line.setAttribute("y2", y2 - offsetY);
            // Calculate new midpoint for the label
            midX = (parseFloat(line.line.getAttribute("x1")) + parseFloat(line.line.getAttribute("x2"))) / 2;
            midY = (parseFloat(line.line.getAttribute("y1")) + parseFloat(line.line.getAttribute("y2"))) / 2;
            let midXC = (parseFloat(line.lineC.getAttribute("x1")) + parseFloat(line.lineC.getAttribute("x2"))) / 2;
            let midYC = (parseFloat(line.lineC.getAttribute("y1")) + parseFloat(line.lineC.getAttribute("y2"))) / 2;
            let lmidX = (midX + midXC) / 2;
            let lmidY = (midY + midYC) / 2;
            // Update label position
            line.label.setAttribute("x", lmidX);
            line.label.setAttribute("y", lmidY);

        } else {
            line.line.setAttribute('x1', line.circle1.circle.getAttribute('cx'));
            line.line.setAttribute('y1', line.circle1.circle.getAttribute('cy'));
            line.line.setAttribute('x2', line.circle2.circle.getAttribute('cx'));
            line.line.setAttribute('y2', line.circle2.circle.getAttribute('cy'));

            // Calculate new midpoint for the label
            midX = (parseFloat(line.line.getAttribute("x1")) + parseFloat(line.line.getAttribute("x2"))) / 2;
            midY = (parseFloat(line.line.getAttribute("y1")) + parseFloat(line.line.getAttribute("y2"))) / 2;
            // Update label position
            line.label.setAttribute("x", midX);
            line.label.setAttribute("y", midY);
        }
        
        
    });
};

// moving nodes single/multiple
const startDrag = (e) => {
    e.stopPropagation();
    selectedCircleDic[selectedCircle[0]] = e.target.parentNode;

    const circle = selectedCircleDic[selectedCircle[0]].querySelector('circle');
    const CTM = svg.getScreenCTM();
    
    // Get mouse position in SVG coordinates
    const mousePos = getMousePosition(e, CTM);
    
    Object.keys(selectedCircleDic).forEach(circleId => {
        offsetX[circleId] = mousePos.x - parseFloat(selectedCircleDic[circleId].querySelector('circle').getAttribute('cx'));
        offsetY[circleId] = mousePos.y - parseFloat(selectedCircleDic[circleId].querySelector('circle').getAttribute('cy'));
    });

    oldx = circle.getAttribute('cx');
    oldy = circle.getAttribute('cy');

    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
};

const drag = (e) => {
    if (selectedCircle[0]) {
        const CTM = svg.getScreenCTM();
        
        // Get mouse position in SVG coordinates
        const mousePos = getMousePosition(e, CTM);
        
        Object.keys(selectedCircleDic).forEach(circleId => {
            let circle = selectedCircleDic[circleId];
            newX = mousePos.x - offsetX[circleId];
            newY = mousePos.y - offsetY[circleId];

            if (fixedAxisY) {
                newX = circle.querySelector('circle').getAttribute('cx');
            }
            if (fixedAxisX) {
                newY = circle.querySelector('circle').getAttribute('cy');
            }

            // Snap to grid if enabled
            if (snaptogrid) {
                newX = Math.round(newX / gridSize) * gridSize;
                newY = Math.round(newY / gridSize) * gridSize;
            }

            const size = circle.querySelector('circle').getAttribute('r');

            circle.querySelector('rect').setAttribute('x', newX - size);
            circle.querySelector('rect').setAttribute('y', newY - size);
            circle.querySelector('circle').setAttribute('cx', newX);
            circle.querySelector('circle').setAttribute('cy', newY);
            circle.querySelector('text').setAttribute('x', newX);
            circle.querySelector('text').setAttribute('y', newY);
            circle.querySelector('.collapseCircleText').setAttribute('x', newX);
            circle.querySelector('.collapseCircleText').setAttribute('y', Number(newY) - Number(size));
            circle.querySelector('.collapseCircle').setAttribute('cx', newX);
            circle.querySelector('.collapseCircle').setAttribute('cy', Number(newY) - Number(size));

            let trianglePointA = `${Number(newX)},${Number(newY) - Number(size)}`;
            let trianglePointB = `${Number(newX) - Number(size)},${Number(newY) + (Number(size) / 2) * 1.5}`;
            let trianglePointC = `${Number(newX) + Number(size)},${Number(newY) + (Number(size) / 2) * 1.5}`;
            let newTriPoints = `${trianglePointA} ${trianglePointB} ${trianglePointC}`;
            circle.querySelector('polygon').setAttribute("points", newTriPoints);
            
        }); 
        updateLines();

        nodeXInput.value = selectedCircleDic[selectedCircle[0]].querySelector('circle').getAttribute("cx");
        nodeYInput.value = selectedCircleDic[selectedCircle[0]].querySelector('circle').getAttribute("cy");
    }
};

const endDrag = () => {
    const circleObj = circles.find(c => c.group === selectedCircleDic[selectedCircle[0]]);
    svg.removeEventListener('mousemove', drag);
    svg.removeEventListener('mouseup', endDrag);

    nodeXInput.value = selectedCircleDic[selectedCircle[0]].querySelector('circle').getAttribute("cx");
    nodeYInput.value = selectedCircleDic[selectedCircle[0]].querySelector('circle').getAttribute("cy");
    circleObj.x = nodeXInput.value;
    circleObj.y = nodeYInput.value;
    if (circleObj.x !== oldx || circleObj.y !== oldy) {
        saveHistory(`Change Circle ${circleObj.text.textContent} position`);
    }
};

// Helper function to get mouse position in SVG coordinates
function getMousePosition(evt, CTM) {
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}

// Pan and Zoom Functions
const startPan = (e) => {
    isPanning = true;
    panStart.x = e.clientX;
    panStart.y = e.clientY;
    svg.addEventListener('mousemove', pan);
    svg.addEventListener('mouseup', endPan);
};

const pan = (e) => {
    if (isPanning) {
        const dx = panStart.x - e.clientX;
        const dy = panStart.y - e.clientY;
        let scale = Number(viewBox.width) / 600;
        viewBox.x += dx * scale;
        viewBox.y += dy * scale;
        svg.setAttribute('viewBox', `${viewBox.x-300} ${viewBox.y-300} ${viewBox.width} ${viewBox.height}`);
        panStart.x = e.clientX;
        panStart.y = e.clientY;
    }
};

const endPan = () => {
    isPanning = false;
    svg.removeEventListener('mousemove', pan);
    svg.removeEventListener('mouseup', endPan);
};

// zoom function
const zoom = (e, key = 'none') => {
    let scale = 1;

    if (key === 'up') {
        scale = 1.1;
    } else if (key === 'down') {
        scale = 0.9;
    } else {
        e.preventDefault();
        scale = e.deltaY > 0 ? 1.1 : 0.9;
    }

    let focusX, focusY;

    // Calculate the new width and height of the viewBox
    const newWidth = viewBox.width * scale;
    const newHeight = viewBox.height * scale;

    // Get the selected circle's position
    if (selectedCircle[0]) {
        const selectedCircleElement = selectedCircleDic[selectedCircle[0]].querySelector('circle');
        focusX = parseFloat(selectedCircleElement.getAttribute('cx')) + 300;
        focusY = parseFloat(selectedCircleElement.getAttribute('cy')) + 300;
    } else {
        focusX = viewBox.x + viewBox.width / 2;
        focusY = viewBox.y + viewBox.height / 2;
    }

    // Calculate the new viewBox position to keep the focus point centered
    viewBox.x = focusX - (focusX - viewBox.x) * (newWidth / viewBox.width);
    viewBox.y = focusY - (focusY - viewBox.y) * (newHeight / viewBox.height);

    // Update the viewBox
    viewBox.width = newWidth;
    viewBox.height = newHeight;
    svg.setAttribute('viewBox', `${viewBox.x-300} ${viewBox.y-300} ${viewBox.width} ${viewBox.height}`);
};

// history functions
const clearHistory = () => {
    history = [];
    currentIndex = -1;
    sidebar_list.innerText = '';
    sidebar.classList.remove('open');
};

const saveHistory = (vname = 'time') => {
    if (vname === 'time') {
        const currentDate = new Date();
        const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
        vname = "mindmap." + formattedTime;
    }   
    const mindMapData = {
        name: vname,
        circles: circles.map(circle => ({
            id: circle.id,
            type: circle.type,
            text: circle.text.textContent,
            fontsize: circle.text.getAttribute('font-size'),
            x: circle.x,
            y: circle.y,
            size: circle.circle.getAttribute('r'),
            color: circle.circle.getAttribute('stroke'),
            description: circle.description,
            isCollapsed: circle.isCollapsed,
            parent: circle.parent ? circle.parent.id : null
        })),
        connections: lines.map(line => ({
            circle1: line.circle1.id,
            circle2: line.circle2.id,
            label: line.label.textContent,
            type: line.type,
            color: line.color,
            connectiontype: line.connectionType,
        }))
    };
    // Save to local storage
    if (currentIndex < history.length - 1) {
        history = history.slice(0, currentIndex + 1); // Remove future states if we're in the middle
    }

    history.push(mindMapData); // Add the new state

    // make the history hold only 50 items
    if (history.length > 50) {
        history.shift();
    }

    currentIndex++; // Update the current index
    loadHistory();
    sidebar_list.scrollTop = sidebar_list.scrollHeight;
};

const loadHistory = () => {
    const savedHistory = JSON.stringify(history);
    if (savedHistory) {
        history = JSON.parse(savedHistory);
        currentIndex = history.length - 1; // Set current index to the last saved state
        updateHistorySidebar(); // Update the sidebar with the loaded history
    }
};

const updateHistorySidebar = () => {
    sidebar_list.innerText = '';
    history.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name}`;
        listItem.onclick = () => loadMindMapFromHistory(index); // Load mind map on click
        sidebar_list.appendChild(listItem);
    });
};

const undoActionsFromHistory = () => {
    loadMindMapFromHistory(currentIndex - 1);
};

const redoActionsFromHistory = () => {
    if (history.length > currentIndex + 1) {
        loadMindMapFromHistory(currentIndex + 1)
    }
};

const loadMindMapFromHistory = (index) => {
    if (index >= 0 && index < history.length) {
        const mindMapData = history[index];
        // update the index // Remove future states if we're in the middle
        currentIndex = index;
        // Clear existing circles and lines 
        circles = [];
        lines.forEach(line => svg.removeChild(line.line)); // Remove existing lines
        lines.forEach(line => svg.removeChild(line.hitline)); // Remove existing lines
        lines.forEach(line => svg.removeChild(line.label)); // Remove existing lines label
        lines = [];
        while (svg.children.length > 1) {
            svg.removeChild(svg.lastChild); // Remove the last child until only the first child remains
        }

        // Create circles without parents first
        mindMapData.circles.forEach(data => {
            if (!data.parent) {
                createCircle(data.type, data.x, data.y, data.text, null, data.id); // Pass the unique ID
                const circleObj = circles[circles.length - 1]; // Get the newly created circle object
                circleObj.description = data.description;
                circleObj.isCollapsed = data.isCollapsed;
                circleObj.text.setAttribute('font-size', data.fontsize);
                circleObj.circle.setAttribute('stroke', data.color);
                circleObj.circle.setAttribute('r', data.size);
                circleObj.rect.setAttribute('width', 2 * data.size);
                circleObj.rect.setAttribute('height', 2 * data.size);
                circleObj.rect.setAttribute('stroke', data.color);
                circleObj.triangle.setAttribute('stroke', data.color);
                let trianglePointA = `${Number(data.x)},${Number(data.y)-Number(data.size)}`;
                let trianglePointB = `${Number(data.x)-Number(data.size)},${Number(data.y)+(Number(data.size)/2)*1.5}`;
                let trianglePointC = `${Number(data.x)+Number(data.size)},${Number(data.y)+(Number(data.size)/2)*1.5}`;
                let newTriPoints = `${trianglePointA} ${trianglePointB} ${trianglePointC}`;
                circleObj.triangle.setAttribute("points", newTriPoints);
            }
        });

        // Create circles with parents using unique IDs
        mindMapData.circles.forEach(data => {
            if (data.parent) {
                const parentObj = circles.find(c => c.id === data.parent); // Use ID instead of text
                if (parentObj) { // Ensure parentObj is found
                    createCircle(data.type, data.x, data.y, data.text, parentObj.group, data.id); // Pass the unique ID
                    const circleObj = circles[circles.length - 1]; // Get the newly created circle object
                    circleObj.description = data.description;
                    circleObj.isCollapsed = data.isCollapsed;
                    circleObj.text.setAttribute('font-size', data.fontsize);
                    circleObj.circle.setAttribute('stroke', data.color);
                    circleObj.circle.setAttribute('r', data.size);
                    circleObj.rect.setAttribute('width', 2 * data.size);
                    circleObj.rect.setAttribute('height', 2 * data.size);
                    circleObj.rect.setAttribute('stroke', data.color);
                    circleObj.triangle.setAttribute('stroke', data.color);
                    let trianglePointA = `${Number(data.x)},${Number(data.y)-Number(data.size)}`;
                    let trianglePointB = `${Number(data.x)-Number(data.size)},${Number(data.y)+(Number(data.size)/2)*1.5}`;
                    let trianglePointC = `${Number(data.x)+Number(data.size)},${Number(data.y)+(Number(data.size)/2)*1.5}`;
                    let newTriPoints = `${trianglePointA} ${trianglePointB} ${trianglePointC}`;
                    circleObj.triangle.setAttribute("points", newTriPoints);
                } else {
                    console.error(`Parent not found for circle: ${data.text}. Expected parent ID: ${data.parent}`);
                }
            }
        });

        // Create connections
        mindMapData.connections.forEach(connection => {
            const circleObj1 = circles.find(c => c.id === connection.circle1);
            const circleObj2 = circles.find(c => c.id === connection.circle2);
            const lineLabel = connection.label;
            const lineStyle = connection.type;
            const lineColor = connection.color;
            const connectionType = connection.connectiontype;

            if (circleObj1 && circleObj2) {
                drawLine(circleObj1, circleObj2, lineLabel, lineStyle, lineColor, connectionType);
            } else {
                console.error(`Connection error: ${connection.circle1} or ${connection.circle2} not found.`);
            }
        });

        circles.forEach(circle => {
            const isCircleCollapsed = circle.isCollapsed;
            let totalChildCount = 0;
            const toggleCircleChildren = (parent) => {
                const childCircles = circles.filter(c => c.parent === parent);
                childCircles.forEach(child => {
                    child.group.style.display = 'none';
                    // Hide or show lines connected to child circles
                    lines.forEach(line => {
                        if (line.circle1 === child || line.circle2 === child) {
                            line.line.style.display = 'none';
                            line.label.style.display = 'none';
                        }
                    });
                    totalChildCount += 1 + toggleCircleChildren(child);
                });
                return totalChildCount;
            };
            if (isCircleCollapsed) {
                circle.collapsetext.style.display = 'block';
                circle.collapse.style.display = 'block';
                let childCount = toggleCircleChildren(circle);
                circle.collapsetext.textContent = `${childCount}`;
            }
        });
        
        // Update the title or any other UI elements as needed
        mindmaptitle.innerText = mindmaptitle.innerText.replace('*', '');
        mindmaptitle.innerText += '*';
    }
};

// load template
const LoadTemplate = async function(path) {
    try {
        const response = await fetch(path)
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const templatedata = await response.text();
        const mindMapData = JSON.parse(templatedata);
        history = [];
        // Clear existing circles and lines
        circles = [];
        lines.forEach(line => svg.removeChild(line.line)); // Remove existing lines
        lines.forEach(line => svg.removeChild(line.hitline)); // Remove existing lines
        lines.forEach(line => svg.removeChild(line.label)); // Remove existing lines label
        lines = [];
        while (svg.children.length > 1) {
            svg.removeChild(svg.lastChild); // Remove the last child until only the first child remains
        }

        // Create circles without parents first
        mindMapData.circles.forEach(data => {
            if (!data.parent) {
                createCircle(data.type, data.x, data.y, data.text, null, data.id); // Pass the unique ID
                const circleObj = circles[circles.length - 1]; // Get the newly created circle object
                circleObj.description = data.description;
                circleObj.isCollapsed = data.isCollapsed;
                circleObj.text.setAttribute('font-size', data.fontsize);
                circleObj.circle.setAttribute('stroke', data.color);
                circleObj.circle.setAttribute('r', data.size);
                circleObj.rect.setAttribute('width', 2 * data.size);
                circleObj.rect.setAttribute('height', 2 * data.size);
                circleObj.rect.setAttribute('stroke',  data.color);
                circleObj.triangle.setAttribute('stroke',  data.color);
                let trianglePointA = `${Number(data.x)},${Number(data.y)-Number(data.size)}`;
                let trianglePointB = `${Number(data.x)-Number(data.size)},${Number(data.y)+(Number(data.size)/2)*1.5}`;
                let trianglePointC = `${Number(data.x)+Number(data.size)},${Number(data.y)+(Number(data.size)/2)*1.5}`;
                let newTriPoints = `${trianglePointA} ${trianglePointB} ${trianglePointC}`;
                circleObj.triangle.setAttribute("points", newTriPoints);
            }
        });

        // Create circles with parents using unique IDs
        mindMapData.circles.forEach(data => {
            if (data.parent) {
                const parentObj = circles.find(c => c.id === data.parent); // Use ID instead of text
                if (parentObj) { // Ensure parentObj is found
                    createCircle(data.type, data.x, data.y, data.text, parentObj.group, data.id); // Pass the unique ID
                    const circleObj = circles[circles.length - 1]; // Get the newly created circle object
                    circleObj.description = data.description;
                    circleObj.isCollapsed = data.isCollapsed;
                    circleObj.text.setAttribute('font-size', data.fontsize);
                    circleObj.circle.setAttribute('stroke', data.color);
                    circleObj.circle.setAttribute('r', data.size);
                    circleObj.rect.setAttribute('width', 2 * data.size);
                    circleObj.rect.setAttribute('height', 2 * data.size);
                    circleObj.rect.setAttribute('stroke',  data.color);
                    circleObj.triangle.setAttribute('stroke',  data.color);
                    let trianglePointA = `${Number(data.x)},${Number(data.y)-Number(data.size)}`;
                    let trianglePointB = `${Number(data.x)-Number(data.size)},${Number(data.y)+(Number(data.size)/2)*1.5}`;
                    let trianglePointC = `${Number(data.x)+Number(data.size)},${Number(data.y)+(Number(data.size)/2)*1.5}`;
                    let newTriPoints = `${trianglePointA} ${trianglePointB} ${trianglePointC}`;
                    circleObj.triangle.setAttribute("points", newTriPoints);
                } else {
                    console.error(`Parent not found for circle: ${data.text}. Expected parent ID: ${data.parent}`);
                }
            }
        });

        // Create connections
        mindMapData.connections.forEach(connection => {
            const circleObj1 = circles.find(c => c.id === connection.circle1);
            const circleObj2 = circles.find(c => c.id === connection.circle2);

            if (circleObj1 && circleObj2) {
                drawLine(circleObj1, circleObj2);
            } else {
                console.error(`Connection error: ${connection.circle1} or ${connection.circle2} not found.`);
            }
        });

        clearHistory();

        // restore history 
        mindMapData.history.forEach(version => {
            history.push(version);
        });

        circles.forEach(circle => {
            const isCircleCollapsed = circle.isCollapsed;
            let totalChildCount = 0;
            const toggleCircleChildren = (parent) => {
                const childCircles = circles.filter(c => c.parent === parent);
                childCircles.forEach(child => {
                    child.group.style.display = 'none';
                    // Hide or show lines connected to child circles
                    lines.forEach(line => {
                        if (line.circle1 === child || line.circle2 === child) {
                            line.line.style.display = 'none';
                            line.label.style.display = 'none';
                        }
                    });
                    totalChildCount += 1 + toggleCircleChildren(child);
                });
                return totalChildCount;
            };
            if (isCircleCollapsed) {
                circle.collapsetext.style.display = 'block';
                circle.collapse.style.display = 'block';
                let childCount = toggleCircleChildren(circle);
                circle.collapsetext.textContent = `${childCount}`;
            }
        });
        
        loadHistory();
        viewBox = { x: 0, y: 0, width: 600, height: 600 };
        svg.setAttribute('viewBox', '-300 -300 600 600');

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// load/save mindmap as json
const loadFromJson = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const mindMapData = JSON.parse(event.target.result);
        history = [];
        // Clear existing circles and lines
        circles = [];
        lines.forEach(line => svg.removeChild(line.line)); // Remove existing lines
        lines.forEach(line => svg.removeChild(line.hitline)); // Remove existing lines
        lines.forEach(line => svg.removeChild(line.label)); // Remove existing lines label
        lines = [];
        while (svg.children.length > 1) {
            svg.removeChild(svg.lastChild); // Remove the last child until only the first child remains
        }
        // Create circles without parents first
        mindMapData.circles.forEach(data => {
            if (!data.parent) {
                createCircle(data.type, data.x, data.y, data.text, null, data.id); // Pass the unique ID
                const circleObj = circles[circles.length - 1]; // Get the newly created circle object
                circleObj.description = data.description;
                circleObj.isCollapsed = data.isCollapsed;
                circleObj.text.setAttribute('font-size', data.fontsize);
                circleObj.circle.setAttribute('stroke', data.color);
                circleObj.circle.setAttribute('r', data.size);
                circleObj.rect.setAttribute('width', 2 * data.size);
                circleObj.rect.setAttribute('height', 2 * data.size);
                circleObj.rect.setAttribute('stroke', data.color);
                circleObj.triangle.setAttribute('stroke', data.color);
                let trianglePointA = `${Number(data.x)},${Number(data.y)-Number(data.size)}`;
                let trianglePointB = `${Number(data.x)-Number(data.size)},${Number(data.y)+(Number(data.size)/2)*1.5}`;
                let trianglePointC = `${Number(data.x)+Number(data.size)},${Number(data.y)+(Number(data.size)/2)*1.5}`;
                let newTriPoints = `${trianglePointA} ${trianglePointB} ${trianglePointC}`;
                circleObj.triangle.setAttribute("points", newTriPoints);
            }
        });

        // Create circles with parents using unique IDs
        mindMapData.circles.forEach(data => {
            if (data.parent) {
                const parentObj = circles.find(c => c.id === data.parent); // Use ID instead of text
                if (parentObj) { // Ensure parentObj is found
                    createCircle(data.type, data.x, data.y, data.text, parentObj.group, data.id); // Pass the unique ID
                    const circleObj = circles[circles.length - 1]; // Get the newly created circle object
                    circleObj.description = data.description;
                    circleObj.isCollapsed = data.isCollapsed;
                    circleObj.text.setAttribute('font-size', data.fontsize);
                    circleObj.circle.setAttribute('stroke', data.color);
                    circleObj.circle.setAttribute('r', data.size);
                    circleObj.rect.setAttribute('width', 2 * data.size);
                    circleObj.rect.setAttribute('height', 2 * data.size);
                    circleObj.rect.setAttribute('stroke', data.color);
                    circleObj.triangle.setAttribute('stroke', data.color);
                    let trianglePointA = `${Number(data.x)},${Number(data.y)-Number(data.size)}`;
                    let trianglePointB = `${Number(data.x)-Number(data.size)},${Number(data.y)+(Number(data.size)/2)*1.5}`;
                    let trianglePointC = `${Number(data.x)+Number(data.size)},${Number(data.y)+(Number(data.size)/2)*1.5}`;
                    let newTriPoints = `${trianglePointA} ${trianglePointB} ${trianglePointC}`;
                    circleObj.triangle.setAttribute("points", newTriPoints);
                } else {
                    console.error(`Parent not found for circle: ${data.text}. Expected parent ID: ${data.parent}`);
                }
            }
        });

        // Create connections
        mindMapData.connections.forEach(connection => {
            const circleObj1 = circles.find(c => c.id === connection.circle1);
            const circleObj2 = circles.find(c => c.id === connection.circle2);
            const lineLabel = connection.label;
            const lineStyle = connection.type;
            const lineColor = connection.color;
            const connectionType = connection.connectiontype;

            if (circleObj1 && circleObj2) {
                drawLine(circleObj1, circleObj2, lineLabel, lineStyle, lineColor, connectionType);
            } else {
                console.error(`Connection error: ${connection.circle1} or ${connection.circle2} not found.`);
            }
        });

        clearHistory();

        // restore history 
        mindMapData.history.forEach(version => {
            history.push(version);
        });

        //restore tasks
        mindMapData.tasks.forEach(task => {
            tasklistitems.push(task);
        });

        circles.forEach(circle => {
            const isCircleCollapsed = circle.isCollapsed;
            let totalChildCount = 0;
            const toggleCircleChildren = (parent) => {
                const childCircles = circles.filter(c => c.parent === parent);
                childCircles.forEach(child => {
                    child.group.style.display = 'none';
                    // Hide or show lines connected to child circles
                    lines.forEach(line => {
                        if (line.circle1 === child || line.circle2 === child) {
                            line.line.style.display = 'none';
                            line.label.style.display = 'none';
                        }
                    });
                    totalChildCount += 1 + toggleCircleChildren(child);
                });
                return totalChildCount;
            };
            if (isCircleCollapsed) {
                circle.collapsetext.style.display = 'block';
                circle.collapse.style.display = 'block';
                let childCount = toggleCircleChildren(circle);
                circle.collapsetext.textContent = `${childCount}`;
            }
        });
        
        renderList();
        loadHistory();
        viewBox = { x: 0, y: 0, width: 600, height: 600 };
        svg.setAttribute('viewBox', '-300 -300 600 600');
    };
    reader.readAsText(file);
    
    mindmaptitle.innerText = file.name.endsWith('.mndmp') ? file.name.slice(0, -5) : file.name;
};

function saveDataInIndex(name, svgData) {
    try {
        const oldmindMapData = localStorage.getItem('mindMapIndex') ? JSON.parse(localStorage.getItem('mindMapIndex')) : [];
        const mindMapData = { 
            "name": `${name}`, 
            "path": `export/${name}.mndmp`, 
            "thumbnail": `${svgData}`
        };

        // Check if the new data already exists based on the "name" property
        const existingIndex = oldmindMapData.findIndex(item => item.name === mindMapData.name);

        if (existingIndex !== -1) {
            // If it exists, replace the existing entry
            oldmindMapData[existingIndex] = mindMapData;
        } else {
            // If it doesn't exist, add the new entry
            oldmindMapData.push(mindMapData);
        }
        // save in localStorage
        localStorage.setItem('mindMapIndex', JSON.stringify(oldmindMapData));

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const saveAsJson = () => {
    // Prompt the user for a filename
    const defaultName = 'mindmap.mndmp';
    const userInput = prompt("Enter a filename:", defaultName);
    
    // Check if the user pressed "Cancel"
    if (userInput === null) {
        return; // Exit the function if the user cancels
    }

    const filename = userInput ? userInput : defaultName;

    if (!(svg instanceof Node)) {
        console.error('Provided element is not a valid Node');
        return;
    }

    // Create a clone of the SVG element to modify it
    const svgClone = svg.cloneNode(true);

    // Get the width and height of the SVG
    const width = svgClone.getAttribute('width') || svgClone.clientWidth;
    const height = svgClone.getAttribute('height') || svgClone.clientHeight;

    // Serialize the modified SVG
    const svgData = new XMLSerializer().serializeToString(svgClone);
    //const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    //const url = URL.createObjectURL(svgBlob);
    
    //const thumbnaillink = document.createElement('a');
    //thumbnaillink.href = url;
    //thumbnaillink.download = `${mindmaptitle.innerText}.svg`;
    //thumbnaillink.click();

    // Save the mindmap data in index for main menu
    mindmaptitle.innerText = filename.endsWith('.mndmp') ? filename.slice(0, -6) : filename;
    const mindMapData = {
        circles: circles.map(circle => ({
            id: circle.id,
            type: circle.type,
            text: circle.text.textContent,
            fontsize: circle.text.getAttribute('font-size'),
            x: circle.x,
            y: circle.y,
            size: circle.circle.getAttribute('r'),
            color: circle.circle.getAttribute('stroke'),
            description: circle.description,
            isCollapsed: circle.isCollapsed,
            parent: circle.parent ? circle.parent.id : null // Use ID for parent
        })),
        connections: lines.map(line => ({
            circle1: line.circle1.id,
            circle2: line.circle2.id,
            label: line.label.textContent,
            type: line.type,
            color: line.color,
            connectiontype: line.connectionType
        })),
        history: history,
        tasks: tasklistitems,
    };

    const blob = new Blob([JSON.stringify(mindMapData, null, 2)], { type: 'application/mndmp' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    
    //saveDataInIndex(mindmaptitle.innerText, svgData);
    // Clean up the URL object
    URL.revokeObjectURL(link);
};

// Function to save the mind map as SVG
const saveAsSvg = () => {
    if (!(svg instanceof Node)) {
        console.error('Provided element is not a valid Node');
        return;
    }

    // Create a clone of the SVG element to modify it
    const svgClone = svg.cloneNode(true);

    // Get the width and height of the SVG
    const width = svgClone.getAttribute('width') || svgClone.clientWidth;
    const height = svgClone.getAttribute('height') || svgClone.clientHeight;

    // Serialize the modified SVG
    const svgData = new XMLSerializer().serializeToString(svgClone);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mindmap.svg';
    link.click();
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
};

// Function to save the mind map as PNG
async function saveAsPng(svgElement, containerElement) {
    try {
        const width = containerElement.clientWidth;
        const height = containerElement.clientHeight;
        const scale = 2; // Increase scale for better resolution

        // Clone SVG and set width/height scaled
        const clonedSVG = svgElement.cloneNode(true);
        clonedSVG.setAttribute('width', width * scale);
        clonedSVG.setAttribute('height', height * scale);
        clonedSVG.style.backgroundColor = svgBackgroundColor;

        // Also update style attribute for background color to ensure proper rendering in exported SVG
        clonedSVG.style.background = svgBackgroundColor;

        // Serialize cloned SVG
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(clonedSVG);

        // Create blob and URL
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.width = width * scale;
        img.height = height * scale;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width * scale;
          canvas.height = height * scale;
          const ctx = canvas.getContext('2d');

          // Fill background color
          ctx.fillStyle = svgBackgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(blob => {
            const link = document.createElement('a');
            link.download = 'map-viewport.png';
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
          }, 'image/png');
        };

        img.onerror = e => {
          URL.revokeObjectURL(url);
          console.error('Failed to load SVG image for PNG export', e);
          alert('Error exporting PNG. See console for details.');
        };

        img.src = url;
    } catch (error) {
        console.error('Error exporting SVG viewport as PNG:', error);
        alert('Error exporting PNG. See console for details.');
    }
};

async function saveAsPdf(svgElement) {
    try {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
          alert('jsPDF library not loaded. PDF export is unavailable.');
          return;
        }

        // Get bounding box of all content
        const bbox = svgElement.getBBox();

        // Calculate scale for better resolution
        const maxDimension = 1600; // increased max dimension for better resolution
        let scale = 1;
        if (bbox.width > bbox.height && bbox.width > maxDimension) {
          scale = maxDimension / bbox.width;
        } else if (bbox.height > maxDimension) {
          scale = maxDimension / bbox.height;
        }

        const exportWidth = bbox.width * scale;
        const exportHeight = bbox.height * scale;

        // Clone SVG and set new viewBox and size
        const clonedSVG = svgElement.cloneNode(true);
        const viewBoxValue = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`;
        clonedSVG.setAttribute('viewBox', viewBoxValue);
        clonedSVG.removeAttribute('width');
        clonedSVG.removeAttribute('height');
        clonedSVG.setAttribute('width', exportWidth);
        clonedSVG.setAttribute('height', exportHeight);

        // Set background color in style attribute
        clonedSVG.style.backgroundColor = svgBackgroundColor;
        clonedSVG.style.background = svgBackgroundColor;

        // Serialize cloned SVG
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(clonedSVG);

        // Create blob and URL
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = async () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = exportWidth;
            canvas.height = exportHeight;
            const ctx = canvas.getContext('2d');

            // Fill background with desired color
            ctx.fillStyle = svgBackgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const pngDataUrl = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
              orientation: exportWidth > exportHeight ? 'landscape' : 'portrait',
              unit: 'px',
              format: [exportWidth, exportHeight],
              compress: true,
            });

            pdf.addImage(pngDataUrl, 'PNG', 0, 0, exportWidth, exportHeight);

            pdf.save('full-map.pdf');

            URL.revokeObjectURL(url);
          } catch (renderError) {
            console.error('Error rasterizing SVG to PDF:', renderError);
            alert('Error exporting PDF. See console for details.');
            URL.revokeObjectURL(url);
          }
        };

        img.onerror = (e) => {
          URL.revokeObjectURL(url);
          console.error('Failed to load SVG image for PDF export', e);
          alert('Error exporting PDF. See console for details.');
        };

        img.src = url;
      } catch (error) {
        console.error('Error exporting SVG as PDF:', error);
        alert('Error exporting PDF. See console for details.');
      }    
};

// Initialization function
const init = () => {
    theme = localStorage.getItem('mindMapTheme');
    sHref = '';
    if (theme === 'light') {
        sHref = "app_styles_light.css";
        themeImg.src = 'MindmapData/MindmapNightMode.svg';
        svgBackgroundColorT = "#000000";
        svgBackgroundColor = "#ffffff";
        circles.forEach(c => {
            c.group.querySelector('circle').setAttribute('fill', svgBackgroundColor);
            c.group.querySelector('rect').setAttribute('fill', svgBackgroundColor);
            c.group.querySelector('polygon').setAttribute('fill', svgBackgroundColor);
            c.group.querySelector('text').setAttribute('fill', svgBackgroundColorT);
        })
    } else {
        sHref = "app_styles_dark.css";
        themeImg.src = 'MindmapData/MindmapLightMode.svg';
        svgBackgroundColorT = "#ffffff";
        svgBackgroundColor = "#0f0f1a";
        circles.forEach(c => {
            c.group.querySelector('circle').setAttribute('fill', svgBackgroundColor);
            c.group.querySelector('rect').setAttribute('fill', svgBackgroundColor);
            c.group.querySelector('polygon').setAttribute('fill', svgBackgroundColor);
            c.group.querySelector('text').setAttribute('fill', svgBackgroundColorT);
        })
    }
    var linkElement = document.querySelector('link[rel="stylesheet"]');
    // Change the href attribute
    linkElement.href = sHref;
    saveHistory('New Mindmap');
    sidebar_list.scrollTop = sidebar_list.scrollHeight;
    svg.setAttribute('viewBox', `${viewBox.x-300} ${viewBox.y-300} ${viewBox.width} ${viewBox.height}`);
    const urlParams = new URLSearchParams(window.location.search);
    const mindmapfile = urlParams.get('mindmap');
    if (mindmapfile && mindmapfile!= 'empty') {
        LoadTemplate(mindmapfile);
    }
    renderList();
    loadDescriptionFonts();
    populateShortcutsLists();
    resetShortcuts();
    addEventListeners();
};

// Initialize the application console
init();
