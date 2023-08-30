import { pickerOpts } from "./pickerOpts";

// Выбор файла.

async function getFile(kindOfText) {
    const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    const file = await fileHandle.getFile();

    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = () => {
        document.getElementById(kindOfText + "-text").innerHTML = reader.result;

        document.getElementById("switch-display-mode-" + kindOfText).disabled = false;

        // Локальное сохранение текста только что выбранного файла.
        localStorage.setItem('session-' + kindOfText + "-text", String(reader.result));
    };
}

for (const kindOfText of ["origin", "handled"]) {
    document
        .getElementById("file-picker-" + kindOfText)
        .addEventListener("click", () => getFile(kindOfText));
}
