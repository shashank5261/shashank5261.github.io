document.addEventListener('DOMContentLoaded', () => {
    // Initialize CodeMirror
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode: 'python',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        lineWrapping: true,
        extraKeys: {
            'Ctrl-Space': showCompletions
        }
    });

    // Language selector
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', (e) => {
        editor.setOption('mode', e.target.value);
    });

    // Suggestions panel
    const suggestionsPanel = document.getElementById('suggestions');
    let currentSuggestions = [];

    async function showCompletions() {
        const cursor = editor.getCursor();
        const code = editor.getValue();
        
        try {
            const response = await fetch('/api/complete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                    position: editor.indexFromPos(cursor)
                })
            });

            const data = await response.json();
            currentSuggestions = data.suggestions;
            
            if (currentSuggestions.length > 0) {
                // Position the suggestions panel
                const cursorCoords = editor.cursorCoords(true);
                suggestionsPanel.style.left = cursorCoords.left + 'px';
                suggestionsPanel.style.top = (cursorCoords.bottom + 2) + 'px';
                
                // Show suggestions
                suggestionsPanel.innerHTML = currentSuggestions
                    .map(s => `<div class="suggestion-item">${s}</div>`)
                    .join('');
                suggestionsPanel.style.display = 'block';

                // Add click handlers
                document.querySelectorAll('.suggestion-item').forEach((item, index) => {
                    item.addEventListener('click', () => {
                        insertSuggestion(currentSuggestions[index]);
                    });
                });
            }
        } catch (error) {
            console.error('Error fetching completions:', error);
        }
    }

    function insertSuggestion(suggestion) {
        const cursor = editor.getCursor();
        editor.replaceRange(suggestion, cursor);
        suggestionsPanel.style.display = 'none';
    }

    // Hide suggestions panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!suggestionsPanel.contains(e.target)) {
            suggestionsPanel.style.display = 'none';
        }
    });
});
