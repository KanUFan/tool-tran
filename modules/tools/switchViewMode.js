// Переключение отображаемого вида текста: разметки или обычного.

["origin", "handled"].forEach(function (kindOfText) {
    let isText = true;

    const innerContent = document.getElementById(kindOfText + "-text");

    const buttonChildren = document.getElementById(
        "switch-display-mode-" + kindOfText
    ).children;

    document
        .getElementById("switch-display-mode-" + kindOfText)
        .addEventListener("click", () => {
            const content = isText
                ? innerContent.innerHTML
                : innerContent.textContent;

            innerContent[isText ? "textContent" : "innerHTML"] = content;

            buttonChildren[0].className = isText ? "hidden" : "";
            buttonChildren[1].className = isText ? "" : "hidden";

            isText = !isText;

            localStorage.setItem("session-" + kindOfText + "-text", content);
        });
});
