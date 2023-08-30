// Получение последних сохраненных текстов.

["origin", "handled"].forEach((kindOfText) => {
    const dataFromStorage = localStorage.getItem(
        "session-" + kindOfText + "-text"
    );

    if (dataFromStorage) {
        document.getElementById(kindOfText + "-text").innerHTML =
            dataFromStorage;

        document.getElementById(
            "switch-display-mode-" + kindOfText
        ).disabled = false;
    }
});
