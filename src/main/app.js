const remote = require('electron').remote;
const { themeChange } = require('theme-change');
themeChange();
const win = remote.getCurrentWindow(); /* Note this is different to the
html global `window` variable */
let url = "https://www.google.com";
let webInput = "null";

// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState === "complete") {
        handleWindowControls();

        //document.getElementById('electron-ver').innerHTML = `${process.versions.electron}`
    }
};

window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    win.removeAllListeners();
}

function handleWindowControls() {
    console.log("hello")
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    if (document.getElementById('web-input-btn') != null) {
        console.log("hello from web input")
        document.getElementById('web-input-btn').addEventListener("click", event => {
            console.log("hello from event in web input")
            webInput = document.getElementById('web-input').value;
            if (webInput.startsWith("http")) {
                for (let i = 0; i < 10; i++) {
                    console.log("hello from web input if")
                }
                url = webInput;
                console.log(url);
            }
            window.location.href = "../render/website.html";
        });
    }

    if (document.getElementById('webview-embed') != null) {
        document.getElementById('webview-embed').src = url;
    }

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}