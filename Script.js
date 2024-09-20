// ==UserScript==
// @name             Home
// @namespace        userscript://google-search
// @version          5.0
// @description      Browser home page
// @run-at           document-end
// @match            https://mire777.github.io/Home/
// ==/UserScript==

(function() {
    let shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];

    function createSearchOverlay() {
        if (document.getElementById('custom-search-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'custom-search-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        overlay.style.zIndex = '10000';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.flexDirection = 'column';

        const circle = document.createElement('div');
        circle.style.width = '60px';
        circle.style.height = '60px';
        circle.style.borderRadius = '50%';
        circle.style.border = '2px solid #dcdcdc';
        circle.style.backgroundColor = 'white';
        circle.style.display = 'flex';
        circle.style.alignItems = 'center';
        circle.style.justifyContent = 'center';
        circle.style.marginBottom = '40px';

        const letter = document.createElement('span');
        letter.textContent = 'S';
        letter.style.color = 'red';
        letter.style.fontSize = '24px';
        circle.appendChild(letter);

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Search...';
        input.style.height = '50px';
        input.style.width = 'calc(100% - 100px)';
        input.style.border = '1px solid #dcdcdc';
        input.style.borderRadius = '24px';
        input.style.padding = '0 20px';
        input.style.fontSize = '16px';
        input.style.boxShadow = '0 1px 1px rgba(0, 0, 0, 0.2)';
        input.style.margin = '0 20px 20px 20px';

        overlay.appendChild(circle);
        overlay.appendChild(input);

        const shortcutArea = document.createElement('div');
        shortcutArea.id = 'shortcut-area';
        shortcutArea.style.display = 'grid';
        shortcutArea.style.gridTemplateColumns = 'repeat(4, 1fr)';
        shortcutArea.style.gridGap = '4px';
        shortcutArea.style.marginTop = '15px';
        shortcutArea.style.width = 'calc(100% - 100px)';
        overlay.appendChild(shortcutArea);
        
        const addShortcutButton = document.createElement('button');
        addShortcutButton.textContent = 'Add shortcut';
        addShortcutButton.style.marginTop = '40px';
        addShortcutButton.style.padding = '10px 20px';
        addShortcutButton.style.borderRadius = '12px';
        addShortcutButton.addEventListener('click', () => openAddShortcutDialog());
        overlay.appendChild(addShortcutButton);

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                performSearch(input.value);
                input.value = ''; // Očisti polje za unos
            }
        });

        loadShortcuts(shortcutArea);
        document.body.appendChild(overlay);
    }

    function performSearch(query) {
        if (query) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
        } else {
            alert('Please enter a search term.');
        }
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
        ['red', 'green', 'blue', 'yellow', 'orange', 'gray', 'black', 'pink', 'lightgreen', 'lightblue', 'purple', 'lavender'].forEach(colorOption => {
            const option = document.createElement('option');
            option.value = colorOption;
            option.textContent = colorOption.charAt(0).toUpperCase() + colorOption.slice(1);
            if (colorOption === color) option.selected = true;
            colorSelect.appendChild(option);
        });
        
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
                alert('Molimo unesite ime, URL i boju prečice.');
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
        if (shortcuts.length >= 20) {
            alert('Maximum number of shortcuts reached (20)');
            return;
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
        button.style.width = '40px';
        button.style.height = '40px';
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

        buttonWrapper.appendChild(button);
        buttonWrapper.appendChild(nameLabel);
        container.appendChild(buttonWrapper);
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
        menu.style.width = 'auto'; // Smanjena širina prozora
        menu.style.height = 'auto'; // Visina prozora
        menu.style.textAlign = 'center';
        menu.style.paddingBottom = '15px'; // Visina dugmadi

        const message = document.createElement('p');
        message.textContent = 'Edit or delete shortcut?';
      //  message.innerHTML = 'Do you want to Edit <br> or delete shortcut?';
        menu.appendChild(message);

        const buttonSpacer = document.createElement('div');
        buttonSpacer.style.height = '10px'; // Prazan prostor ispod teksta
        menu.appendChild(buttonSpacer);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.style.marginRight = '8px'; // Razmak između dugmadi
        editButton.style.borderRadius = '4px'
        editButton.style.padding = '5px 10px';
        editButton.addEventListener('click', () => {
            document.body.removeChild(menu);
            openAddShortcutDialog(shortcut.name, shortcut.url, shortcut.color);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginRight = '8px'; // Razmak između dugmadi
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
        buttonWrapper.style.marginTop = '10px'; // Razmak između poruke i dugmadi

        buttonWrapper.appendChild(editButton);
        buttonWrapper.appendChild(deleteButton);
        buttonWrapper.appendChild(cancelButton);

        menu.appendChild(buttonWrapper);
        document.body.appendChild(menu);
    }

    function deleteShortcut(shortcut) {
        shortcuts = shortcuts.filter(s => s.initial !== shortcut.initial);
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
