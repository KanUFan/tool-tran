import { pickerOpts } from "./pickerOpts";

// Сохранение файла.

(function () {
    // Замыкание нужно, чтобы не открывать окно выбора файлов каждый раз.
    let fileHandle;
    const hadnledText = document.getElementById("handled-text");

    document
        .getElementById("file-saver")
        .addEventListener("click", async function () {
            fileHandle =
                fileHandle ?? (await window.showSaveFilePicker(pickerOpts));

            const writableStream = await fileHandle.createWritable();
            await writableStream.write(
                new Blob([hadnledText.innerHTML], { type: "text/plain" })
            );
            await writableStream.close();

            // Локальное сохранение последней обработанной версии текста.
            localStorage.setItem("session-handled-text", hadnledText.innerHTML);

            // Анимация успешного сохранения.
            hadnledText.classList.add("saving");
            setTimeout(() => hadnledText.classList.remove("saving"), 400);
        });
})();
