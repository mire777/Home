// ==UserScript==
// @name             Home 3
// @namespace        userscript://google-search
// @version          5.0
// @description      Browser home page
// @run-at           document-end
// @match            https://www.google.com/
// ==/UserScript==

(function() {
    let shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
    let backgroundImageUrl = localStorage.getItem('backgroundImageUrl');

    function createSearchOverlay() {

    // Postavi osnovne vrednosti na početku
    backgroundImageUrl = localStorage.getItem('backgroundImageUrl') || '';
    const searchText = localStorage.getItem('searchText') || '';
    const logoLetter = localStorage.getItem('logoLetter') || 'S';
    const ShortcutTextColor = localStorage.getItem('ShortcutTextColor') || 'black';   
 
        if (document.getElementById('custom-search-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'custom-search-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = backgroundImageUrl ? 'transparent' : 'rgba(255, 255, 255, 1)';
        overlay.style.backgroundImage = backgroundImageUrl ? `url(${backgroundImageUrl})` : '';
        overlay.style.backgroundSize = 'cover';
        overlay.style.zIndex = '10000';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.flexDirection = 'column';

        const menuButton = document.createElement('div');
        // TextColor
        menuButton.style.setProperty('color', ShortcutTextColor, 'important');
        menuButton.id = 'menuButton-area';
        menuButton.style.position = 'fixed';
        menuButton.style.top = '10px';
        menuButton.style.right = '20px';
        menuButton.style.width = '6px';
        menuButton.style.height = '6px';
        menuButton.style.cursor = 'pointer';
       // menuButton.style.color = 'black';
        menuButton.style.fontSize = '24px';
        menuButton.textContent = '⋮';
        menuButton.style.zIndex = '10001';
    menuButton.addEventListener('click', openBackgroundMenu);
        document.body.appendChild(menuButton);

    const logoButton = document.createElement('button');
    // logoButton.textContent = 'S'; // Zameniti sa željenim slovom
    logoButton.textContent = logoLetter; // Učitaj logo
    // ...
    logoButton.style.width = '80px';
    logoButton.style.minHeight = '80px';
    logoButton.style.borderRadius = '50%';
    logoButton.style.backgroundColor = 'white'; // Belo dugme
    logoButton.style.color = 'red'; // Crveni tekst
    logoButton.style.border = '1px solid gray'; // Tanki sivi border
    logoButton.style.fontSize = '24px'; // Povećaj font za bolju vidljivost
    logoButton.style.cursor = 'default'; // Nema efekta na kursor
    logoButton.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.2)'; // Senka dugmeta
    logoButton.style.display = 'flex';
    logoButton.style.alignItems = 'center'; // Vertikalno centriranje
    logoButton.style.justifyContent = 'center'; // Horizontalno centriranje
    logoButton.style.pointerEvents = 'none'; // Ne klikabilno dugme
    //Podesi visinu
    logoButton.style.marginTop = (localStorage.getItem('logoMarginTop') || '-150') + 'px';

logoButton.style.marginBottom = '40px'; // Razmak ispod

    overlay.appendChild(logoButton); // Dodaj dugme u overlay

        const input = document.createElement('input');
input.placeholder = localStorage.getItem('searchText') || 'Search...'; // Vratite placeholder

        input.type = 'text';
        input.style.minHeight = '50px';
        input.style.width = 'calc(100% - 100px)';
        input.style.border = '1px solid #dcdcdc';
        input.style.borderRadius = '24px';
        input.style.padding = '0 20px';
        input.style.fontSize = '16px';
        input.style.boxShadow = '0 1px 1px rgba(0, 0, 0, 0.2)';
        input.style.margin = '0 10px 10px 10px';
       // input.style.marginTop = '180px';
       // input.style.marginBottom = '10px';
        overlay.appendChild(input);

        const shortcutArea = document.createElement('div');
        // ShortcutTextColor
        shortcutArea.style.setProperty('color', ShortcutTextColor, 'important');
        shortcutArea.id = 'shortcut-area';
        shortcutArea.style.display = 'grid';
        shortcutArea.style.gridTemplateColumns = 'repeat(4, 1fr)';
        shortcutArea.style.gridGap = '4px';
        shortcutArea.style.marginTop = '10px';
        shortcutArea.style.width = 'calc(100% - 100px)';
        shortcutArea.style.height = '12%';
        // shortcutArea.style.height = '100px';
        // Centriraj precice
        shortcutArea.style.alignItems = 'center';
        shortcutArea.style.justifyContent = 'center';
        overlay.appendChild(shortcutArea);
        
const addShortcutButton = document.createElement('button');
addShortcutButton.textContent = '＋';
addShortcutButton.style.width = '30px';
addShortcutButton.style.height = '30px';
addShortcutButton.style.borderRadius = '50%';
addShortcutButton.style.backgroundColor = 'white'; // Belo dugme
addShortcutButton.style.color = 'gray'; // Siv plus
addShortcutButton.style.border = '1px solid gray'; // Tanki sivi border
addShortcutButton.style.fontSize = '16px'; // Povećaj font za bolju vidljivost
// addShortcutButton.style.lineHeight = '30px'; // Poravnaj linijski visinu sa visinom dugmeta
addShortcutButton.style.cursor = 'pointer';
addShortcutButton.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.2)'; // Senka dugmeta
addShortcutButton.style.display = 'flex';
addShortcutButton.style.alignItems = 'center';
addShortcutButton.style.justifyContent = 'center'; // Ovo će centrirati horizontalno znak plus


// Postavljanje margine da bi se dugme pravilno pozicioniralo
//addShortcutButton.style.marginTop = '250px';
//addShortcutButton.style.marginBottom = '-250px';

addShortcutButton.style.position = 'fixed';
addShortcutButton.style.bottom = '5px'; // iznad donje ivice browsera
addShortcutButton.style.left = '50%'; // pozicioniraj 50% od leve strane
addShortcutButton.style.transform = 'translateX(-50%)'; // centriraj horizontalno
addShortcutButton.style.zIndex = '1001'; // z-index mora biti veći od overlay-a
addShortcutButton.style.bottom = `calc(5px + env(safe-area-inset-bottom))`; // osiguraj pozicioniranje iznad browser bara

        addShortcutButton.addEventListener('click', () => openAddShortcutDialog());
        overlay.appendChild(addShortcutButton);

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                performSearch(input.value);
                input.value = '';
            }
        });

        loadShortcuts(shortcutArea);
        document.body.appendChild(overlay);
    }

    function openBackgroundMenu() {
    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.top = '50%';
    menu.style.left = '50%';
    menu.style.transform = 'translate(-50%, -50%)';
    menu.style.backgroundColor = 'white';
    menu.style.border = '1px solid #ccc';
    menu.style.padding = '20px';
    menu.style.borderRadius = '10px';
    menu.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    menu.style.zIndex = '10001';

    // Opcija za unos URL-a za pozadinsku sliku
    const backgroundLabel = document.createElement('p');
    backgroundLabel.textContent = 'Set background image:';
    backgroundLabel.style.fontSize = '13px';
    backgroundLabel.style.marginBottom = '4px';
    menu.appendChild(backgroundLabel);

    const backgroundInput = document.createElement('input');
    backgroundInput.type = 'text';
    backgroundInput.placeholder = 'Enter image URL...';
    backgroundInput.value = backgroundImageUrl || '';
    backgroundInput.style.width = '250px';
    backgroundInput.style.marginBottom = '5px';
    backgroundInput.style.borderRadius = '4px';
    backgroundInput.style.border = '1px solid #dcdcdc';
    backgroundInput.style.padding = '5px';
    menu.appendChild(backgroundInput);

    // Opcija za unos teksta u search bar
    const searchbarLabel = document.createElement('p');
    searchbarLabel.textContent = 'Set searchbar text:';
searchbarLabel.style.fontSize = '13px';
    searchbarLabel.style.marginBottom = '4px';
    menu.appendChild(searchbarLabel);

    const searchbarInput = document.createElement('input');
    searchbarInput.type = 'text';
    searchbarInput.placeholder = 'Enter search text...';
    searchbarInput.style.width = '250px';
    searchbarInput.style.marginBottom = '5px';
    searchbarInput.style.borderRadius = '4px';
    searchbarInput.style.border = '1px solid #dcdcdc';
    searchbarInput.style.padding = '5px';
    menu.appendChild(searchbarInput);

    // Opcija za unos custom provider-a
    const providerLabel = document.createElement('p');
    providerLabel.textContent = 'Custom provider:';
providerLabel.style.fontSize = '13px';
    providerLabel.style.marginBottom = '4px';
    menu.appendChild(providerLabel);

    const providerInput = document.createElement('input');
    providerInput.type = 'text';
    providerInput.placeholder = 'Enter custom provider...';
    providerInput.style.width = '250px';
    providerInput.style.marginBottom = '5px';
    providerInput.style.borderRadius = '4px';
    providerInput.style.border = '1px solid #dcdcdc';
    providerInput.style.padding = '5px';
    menu.appendChild(providerInput);

    // Opcija za unos logotipa (slova)
    const logoLabel = document.createElement('p');
    logoLabel.textContent = 'Set logo letter:';
    logoLabel.style.fontSize = '13px';
    logoLabel.style.marginBottom = '4px';
    menu.appendChild(logoLabel);

    const logoInput = document.createElement('input');
    logoInput.type = 'text';
    logoInput.placeholder = 'Enter logo letter...';

logoInput.addEventListener('input', () => {
    if (logoInput.value.length > 1) {
        logoInput.value = logoInput.value.charAt(0); // Zadrži samo prvo slovo
    }
});

    logoInput.style.width = '250px';
    logoInput.style.marginBottom = '5px';
    logoInput.style.borderRadius = '4px';
    logoInput.style.border = '1px solid #dcdcdc';
    logoInput.style.padding = '5px';
    menu.appendChild(logoInput);

const createInputField = (labelText, placeholder, value = '', type = 'text') => {
        const label = document.createElement('p');
        label.textContent = labelText;
        label.style.marginBottom = '4px';
        menu.appendChild(label);

        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.value = value;
        input.style = `
            width: 250px;
            margin-bottom: 5px;
            border-radius: 4px;
            border: 1px solid #dcdcdc;
            padding: 5px;
        `;
        menu.appendChild(input);

        return input;
    };

// Kreiraj meni za podesavanje visine (heighInput)
const savedHeight = localStorage.getItem('logoMarginTop') || '-150';
    const heightInput = createInputField('Set Height:', 'Enter height in px...', savedHeight, 'number');

// (Meni - ShortcutTextColor)
const colorLabel = document.createElement('p');
colorLabel.textContent = 'Set text color:';
colorLabel.style.fontSize = '13px';
colorLabel.style.marginBottom = '4px';
menu.appendChild(colorLabel);

const colorSelect = document.createElement('select');
const colors = ['black', 'white'];

const savedColor = localStorage.getItem('ShortcutTextColor') || 'black';
colors.forEach(color => {
    const option = document.createElement('option');
    option.value = color;
    option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
    
    if (color === savedColor) {
        option.selected = true;
    }
    colorSelect.style.width = '82px'; //duzina boxa
    colorSelect.appendChild(option);
});

menu.appendChild(colorSelect);

// Učitavanje trenutnih vrednosti iz localStorage
backgroundInput.value = backgroundImageUrl || '';
searchbarInput.value = localStorage.getItem('searchText') || '';
providerInput.value = localStorage.getItem('customProvider') || '';
logoInput.value = localStorage.getItem('logoLetter') || '';

    // Dugmad za Save i Cancel
    const buttonWrapper = document.createElement('div');
    buttonWrapper.style.display = 'flex';
    buttonWrapper.style.justifyContent = 'flex-end';
    buttonWrapper.style.marginTop = '10px';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.marginRight = '10px';
    saveButton.style.borderRadius = '4px';
    saveButton.style.padding = '5px 10px';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.borderRadius = '4px';
    cancelButton.style.padding = '5px';

// ********************** -——>
saveButton.addEventListener('click', () => {
    const newUrl = backgroundInput.value;
    if (newUrl) {
        backgroundImageUrl = newUrl;
        localStorage.setItem('backgroundImageUrl', backgroundImageUrl);
        document.getElementById('custom-search-overlay').style.backgroundImage = `url(${backgroundImageUrl})`;
        document.getElementById('custom-search-overlay').style.backgroundColor = 'transparent';
    } else {
        backgroundImageUrl = '';
        localStorage.removeItem('backgroundImageUrl');
        document.getElementById('custom-search-overlay').style.backgroundColor = 'rgba(255, 255, 255, 1)';
        document.getElementById('custom-search-overlay').style.backgroundImage = '';
    }

    // Sačuvajte dodatne informacije
    const searchText = searchbarInput.value;
    const customProvider = providerInput.value;
    const logoLetter = logoInput.value;
      
// Ažurirajte polje za pretragu odmah
const inputField = document.querySelector('#custom-search-overlay input[type="text"]');
if (inputField) {
    inputField.placeholder = searchText || 'Search...'; // Ažuriraj placeholder

}
    // Ažurirajte logo
    const logoButton = document.getElementById('custom-search-overlay').querySelector('button'); // Pronađi logo dugme
    if (logoButton) {
        logoButton.textContent = logoLetter || 'S'; // Ažuriraj tekst
    }

    // Sačuvajte u localStorage
    localStorage.setItem('searchText', searchbarInput.value);
    localStorage.setItem('customProvider', customProvider);
    localStorage.setItem('logoLetter', logoLetter);
// DISABLED! (Boja teksta)  
// document.getElementById('custom-search-overlay').style.color = textColor;


// Sacuvaj visinu u LocalStorage
localStorage.setItem('logoMarginTop', heightInput.value);

//Azuriraj visinu (primeni)
const logoHeight = heightInput.value;
logoButton.style.marginTop = (logoHeight || '-150') + 'px';

// Primeni ShortcutTextColor
localStorage.setItem('ShortcutTextColor', colorSelect.value); // Sačuvaj novu boju
const ShortcutTextColor = localStorage.getItem('ShortcutTextColor') || 'black';
document.getElementById('shortcut-area').style.color = ShortcutTextColor; // Azuriraj boju

// Azuriraj boju Menu - dugmeta
document.getElementById('menuButton-area').style.color = ShortcutTextColor;

 document.body.removeChild(menu);
});
   cancelButton.addEventListener('click', () => {
        document.body.removeChild(menu);
    });
  buttonWrapper.appendChild(saveButton);
    buttonWrapper.appendChild(cancelButton);
    menu.appendChild(buttonWrapper);   document.body.appendChild(menu);
}

    //Polje za pretragu
function performSearch(query) {
    const customProvider = localStorage.getItem('customProvider');
    const searchUrl = customProvider && customProvider.trim() ? 
        `${customProvider}{searchTerms}` : 
        `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    const finalUrl = searchUrl.replace('{searchTerms}', encodeURIComponent(query));
    
    window.open(finalUrl, '_blank');
}

    function openAddShortcutDialog(name = '', url = '', color = '') {
        const dialog = document.createElement('div');
        dialog.style.position = 'fixed';
        dialog.style.top = '50%';
        dialog.style.left = '50%';
        dialog.style.transform = 'translate(-50%, -50%)';
        dialog.style.backgroundColor = 'white';
        dialog.style.border = '1px solid #ccc';
        dialog.style.padding = '20px';
        dialog.style.borderRadius = '10px';
        dialog.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        dialog.style.zIndex = '10001';

// DISABLED! (Window title)
/* const title = document.createElement('div');
title.textContent = name ? 'Edit shortcut:' : 'Add shortcut:';
dialog.appendChild(title);

// Stilizovanje teksta (window title)
title.style.color = 'initial'; // Normalna boja
title.style.fontWeight = 'normal'; // Debljina
title.style.fontSize = '14px'; // Velicina fonta
title.style.textTransform = 'none'; // Mala slova
title.style.position = 'relative'; // Pozicija
title.style.top = '-5px'; // Podiže tekst gore
title.style.marginBottom = '5px'; */

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Shortcut name...';
        nameInput.value = name;  
        nameInput.style.width = '250px';
        nameInput.style.marginBottom = '10px';
        nameInput.style.borderRadius = '4px';
        nameInput.style.border = '1px solid #dcdcdc';
        nameInput.style.padding = '5px';

        const urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.placeholder = 'Enter URL...';
        urlInput.value = url;  
        urlInput.style.width = '250px';
        urlInput.style.marginBottom = '10px';
        urlInput.style.borderRadius = '4px';
        urlInput.style.border = '1px solid #dcdcdc';
        urlInput.style.padding = '5px';
const colorSelect = document.createElement('select');
colorSelect.style.marginBottom = '10px';

// Definiši svoje boje
const colors = [
    { name: 'Red', value: '#EF5350' },
    { name: 'Green', value: '#81C784' },
    { name: 'Blue', value: '#64B5F6' },
    { name: 'Yellow', value: '#FFC400' }, 
    { name: 'Orange', value: '#FB8C00' },
 // { name: 'Orange_d', value: '#FFAB91' },
    { name: 'Gray', value: '#808080' },
    { name: 'GrayB', value: '#90A4AE' },
    { name: 'Black', value: '#000000' },
    { name: 'Pink', value: '#F48FB1' },
    { name: 'Brown', value: '#A1887F' },
 // { name: 'Purple', value: '#CE93D8' },
 // { name: 'Purple_d', value: '#B39DDB' },
    { name: 'Indigo', value: '#9FA8DA' },
 // { name: 'Cyan', value: '#00838F' },
    { name: 'Teal', value: '#26A69A' }
];

// Dodaj boje u dropdown meni
colors.forEach(color => {
    const option = document.createElement('option');
    option.value = color.value;
    option.textContent = color.name;
    if (color.value === color) option.selected = true;
    colorSelect.appendChild(option);
});
        const buttonWrapper = document.createElement('div');
        buttonWrapper.style.display = 'flex';
        buttonWrapper.style.justifyContent = 'flex-end';
        buttonWrapper.style.marginTop = '10px';

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
       // saveButton.textContent = name ? 'Edit' : 'Add'; // Promeni window title (razliciti prozori)
        saveButton.style.marginRight = '10px';
        saveButton.style.borderRadius = '4px';
        saveButton.style.padding = '5px 10px';
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.padding = '5px';
   saveButton.addEventListener('click', () => {
            const newName = nameInput.value;
            const newUrl = urlInput.value;
            const newColor = colorSelect.value;
            if (newName && newUrl) {
                if (name) {
                    updateShortcut(newName, newUrl, newColor);
                } else {
                    addShortcut(newName, newUrl, newColor);
                }
                document.body.removeChild(dialog);
            } else {
                alert('Please enter name, URL and shortcut color.');
            }
        });
       cancelButton.addEventListener('click', () => {
            document.body.removeChild(dialog);
        });
      buttonWrapper.appendChild(saveButton);
        buttonWrapper.appendChild(cancelButton);

        dialog.appendChild(nameInput);
        dialog.appendChild(urlInput);
        dialog.appendChild(colorSelect);
        dialog.appendChild(buttonWrapper);
        document.body.appendChild(dialog);
    }

    function addShortcut(name, url, color) {
    if (shortcuts.length >= 16) {
        alert('Maximum number of shortcuts reached (16)');
        return;
    }

    // Skrati ime precice
    if (name.length > 8) {
       name = name.substring(0, 8);
    }

        const initial = name.charAt(0).toUpperCase();
        const shortcut = { name, url, initial, color };
        shortcuts.push(shortcut);
        saveShortcuts();
        loadShortcuts(document.getElementById('shortcut-area'));
    }

    function updateShortcut(name, url, color) {
        const shortcut = shortcuts.find(s => s.initial === name.charAt(0).toUpperCase());
        if (shortcut) {
            shortcut.name = name;
            shortcut.url = url;
            shortcut.color = color;
            saveShortcuts();
            loadShortcuts(document.getElementById('shortcut-area'));
        }
    }

    function createShortcutButton(container, shortcut) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.style.display = 'flex';
        buttonWrapper.style.flexDirection = 'column';
        buttonWrapper.style.alignItems = 'center';
        buttonWrapper.style.margin = '10px 0';

        const button = document.createElement('button');
        button.textContent = shortcut.initial;
        button.style.border = 'none';
        button.style.backgroundColor = shortcut.color;
        button.style.color = 'white';
        button.style.borderRadius = '50%';
        button.style.width = '43px';
        button.style.height = '43px';
        button.style.cursor = 'pointer';
        button.style.margin = '0';

        const nameLabel = document.createElement('div');
        nameLabel.textContent = shortcut.name;
        nameLabel.style.marginTop = '5px';
        nameLabel.style.fontSize = '12px';
        nameLabel.style.textAlign = 'center';

        button.addEventListener('click', () => {
            const fullUrl = shortcut.url.startsWith('http') ? shortcut.url : 'http://' + shortcut.url;
            window.open(fullUrl, '_blank');
        });
      button.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            openEditDeleteMenu(shortcut);
        });
       buttonWrapper.appendChild(button);       buttonWrapper.appendChild(nameLabel);       container.appendChild(buttonWrapper);
    }

    function openEditDeleteMenu(shortcut) {
        const menu = document.createElement('div');
        menu.style.position = 'fixed';
        menu.style.top = '50%';
        menu.style.left = '50%';
        menu.style.transform = 'translate(-50%, -50%)';
        menu.style.backgroundColor = 'white';
        menu.style.border = '1px solid #ccc';
        menu.style.padding = '20px';
        menu.style.borderRadius = '10px';
        menu.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        menu.style.zIndex = '10001';
        menu.style.width = 'auto';
        menu.style.height = 'auto';
        menu.style.textAlign = 'center';
        menu.style.paddingBottom = '15px';
        const message = document.createElement('p');
        message.textContent = 'Delete shortcut?';
        menu.appendChild(message);

        const buttonSpacer = document.createElement('div');
        buttonSpacer.style.height = '10px';
        menu.appendChild(buttonSpacer);

        const editButton = document.createElement('button');
        editButton.style.display = 'none'; // sakrij dugme sa prozora
        editButton.textContent = 'Edit';
        editButton.style.marginRight = '8px';
        editButton.style.borderRadius = '4px';
        editButton.style.padding = '5px 10px';
        editButton.addEventListener('click', () => {
            document.body.removeChild(menu);
            openAddShortcutDialog(shortcut.name, shortcut.url, shortcut.color);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginRight = '8px';
        deleteButton.style.borderRadius = '4px';
        deleteButton.style.padding = '5px 10px';
        deleteButton.addEventListener('click', () => {
            deleteShortcut(shortcut);
            document.body.removeChild(menu);
        });

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.padding = '5px 10px';
        cancelButton.addEventListener('click', () => {
            document.body.removeChild(menu);
        });

        const buttonWrapper = document.createElement('div');
        buttonWrapper.style.display = 'flex';
        buttonWrapper.style.justifyContent = 'flex-end';
        buttonWrapper.style.marginTop = '10px';
       buttonWrapper.appendChild(editButton);       buttonWrapper.appendChild(deleteButton);        buttonWrapper.appendChild(cancelButton);
       menu.appendChild(buttonWrapper);       document.body.appendChild(menu);
    }

    function deleteShortcut(shortcut) {
        shortcuts = shortcuts.filter(s => s.name !== shortcut.name);
        saveShortcuts();
        loadShortcuts(document.getElementById('shortcut-area'));
    }

    function saveShortcuts() {
        localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
    }

    function loadShortcuts(container) {
        container.innerHTML = '';
        shortcuts.forEach(shortcut => createShortcutButton(container, shortcut));
    }
    createSearchOverlay();
})();
