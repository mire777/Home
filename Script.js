// ==UserScript==
// @name             Google Pretraga ***
// @namespace        userscript://google-search
// @version          4.1
// @description      Dodaj pretragu i prečice
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
        addShortcutButton.addEventListener('click', openAddShortcutDialog);
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

    function openAddShortcutDialog() {
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

        const message = document.createElement('div');
        message.textContent = 'Enter shortcut name and URL:';
        message.style.marginBottom = '10px';
        dialog.appendChild(message);

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Shortcut name...';
        nameInput.style.width = '250px';
        nameInput.style.marginBottom = '10px';
        nameInput.style.borderRadius = '4px';
        nameInput.style.border = '1px solid #dcdcdc';
        nameInput.style.padding = '5px';

        const urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.placeholder = 'Enter URL...';
        urlInput.style.width = '250px';
        urlInput.style.marginBottom = '10px';
        urlInput.style.borderRadius = '4px';
        urlInput.style.border = '1px solid #dcdcdc';
        urlInput.style.padding = '5px';
        
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
            const name = nameInput.value;
            const url = urlInput.value;
            if (name && url) {
                addShortcut(name, url);
                document.body.removeChild(dialog);
            } else {
                alert('Molimo unesite ime i URL prečice.');
            }
        });

        cancelButton.addEventListener('click', () => {
            document.body.removeChild(dialog);
        });

        dialog.appendChild(nameInput);
        dialog.appendChild(urlInput);
        dialog.appendChild(saveButton);
        dialog.appendChild(cancelButton);
        document.body.appendChild(dialog);
    }

    function addShortcut(name, url) {
        if (shortcuts.length >= 20) {
            alert('Maximum number shortcuts reached (20)');
            return;
        }

        const initial = name.charAt(0).toUpperCase();
        const color = getRandomColor();
        const shortcut = { name, url, initial, color };
        shortcuts.push(shortcut);
        saveShortcuts();
        loadShortcuts(document.getElementById('shortcut-area'));
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

        button.addEventListener('click', () => {
            const fullUrl = shortcut.url.startsWith('http://') || shortcut.url.startsWith('https://') ? shortcut.url : 'http://' + shortcut.url;
            window.open(fullUrl, '_blank');
        });

        let pressTimer;
        button.addEventListener('touchstart', function() {
            pressTimer = setTimeout(() => {
                if (confirm('Do you want to delete Shortcut?')) {
                    deleteShortcut(shortcut, buttonWrapper);
                }
            }, 700);
        });

        button.addEventListener('touchend', function() {
            clearTimeout(pressTimer);
        });

        button.addEventListener('touchcancel', function() {
            clearTimeout(pressTimer);
        });

        const nameLabel = document.createElement('div');
        nameLabel.textContent = shortcut.name;
        nameLabel.style.marginTop = '5px';
        nameLabel.style.textAlign = 'center';

        buttonWrapper.appendChild(button);
        buttonWrapper.appendChild(nameLabel);
        container.appendChild(buttonWrapper);
    }

    function deleteShortcut(shortcut, buttonWrapper) {
        shortcuts = shortcuts.filter(s => s.url !== shortcut.url);
        saveShortcuts();
        buttonWrapper.parentNode.removeChild(buttonWrapper);
        loadShortcuts(document.getElementById('shortcut-area'));
    }

    function saveShortcuts() {
        localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
    }

    function loadShortcuts(shortcutArea) {
        shortcutArea.innerHTML = '';
        shortcuts.forEach(shortcut => createShortcutButton(shortcutArea, shortcut));

        const shortcutCount = shortcuts.length;
        if (shortcutCount < 4) {
            shortcutArea.style.justifyContent = 'center';
            shortcutArea.style.gridTemplateColumns = `repeat(${shortcutCount}, 1fr)`;
        } else {
            shortcutArea.style.justifyContent = 'start';
            shortcutArea.style.gridTemplateColumns = 'repeat(4, 1fr)';
        }
    }

    function getRandomColor() {
        const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'gray', 'black', 'pink', 'lightgreen', 'lightblue', 'purple', 'lavender'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    createSearchOverlay();
})();
