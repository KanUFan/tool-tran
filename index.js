const pickerOpts = {
    types: [
        {
            descripiton: "Text",
            accept: {
                "text/*": [".txt"],
            },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
};

let fileHandle;
let fileContent = { source: "", finish: "d" };

async function getFile(section) {
    buttonDisplayLayoutFinish.disabled = false;
    buttonDisplayTextFinish.disabled = true;

    [fileHandle] = await window.showOpenFilePicker(pickerOpts);

    const file = await fileHandle.getFile();

    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
        fileContent[section] = reader.result;
        document.getElementById(section).innerHTML = fileContent[section];
        localStorage.setItem(
            `session_${section}`,
            String(fileContent[section])
        );
    };
}

async function saveFile() {
    fileHandle = fileHandle ?? (await window.showSaveFilePicker(pickerOpts));
    const writableStream = await fileHandle.createWritable();

    const array = Array(document.querySelector(".finish").innerHTML);
    const blob = new Blob(array, { type: "text/plain" });
    localStorage.setItem("session_finish", array[0]);

    await writableStream.write(blob);
    await writableStream.close();

    finish.classList.add("saving");
    setTimeout(() => finish.classList.remove("saving"), 400);
}

function displayText(section) {
    document.getElementById(section).innerHTML = fileContent[section];
}

function displayLayout(section) {
    document.getElementById(section).textContent = fileContent[section];
}

document
    .getElementById("file-picker-source")
    .addEventListener("click", () => getFile("source"));
document
    .getElementById("file-picker-finish")
    .addEventListener("click", () => getFile("finish"));
const buttonFileSaver = document.getElementById("file-saver");
buttonFileSaver.addEventListener("click", saveFile);
const finish = document.getElementById('finish')

const buttonDisplayLayoutFinish = document.getElementById(
    "display-layout-finish"
);
const buttonDisplayTextFinish = document.getElementById("display-text-finish");

buttonDisplayLayoutFinish.addEventListener("click", () => {
    buttonDisplayLayoutFinish.disabled = true;
    buttonDisplayTextFinish.disabled = false;
    const text = document.getElementById("finish").innerHTML;
    fileContent.finish = text;
    localStorage.setItem("session_finish", text);
    displayLayout("finish");
});
buttonDisplayTextFinish.addEventListener("click", () => {
    buttonDisplayLayoutFinish.disabled = false;
    buttonDisplayTextFinish.disabled = true;
    const text = document.getElementById("finish").textContent;
    fileContent.finish = text;
    localStorage.setItem("session_finish", text);
    displayText("finish");
});
document
    .getElementById("display-layout-source")
    .addEventListener("click", () => displayLayout("source"));
document
    .getElementById("display-text-source")
    .addEventListener("click", () => displayText("source"));

(() => {
    fileContent.source = localStorage.getItem("session_source") ?? "";
    fileContent.finish = localStorage.getItem("session_finish") ?? "";
    document.getElementById("source").innerHTML = fileContent.source;
    document.getElementById("finish").innerHTML = fileContent.finish;
})();
