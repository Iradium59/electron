const titleInput = document.getElementById('titleInput');
const titleButton = document.getElementById('changeButton');


titleButton.addEventListener('click', () => {
    const title = titleInput.value;
    if (title) {
        window.electronAPI.changeTitle(title);
    }
});


