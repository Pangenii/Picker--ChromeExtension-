const pickColor = document.getElementById("color");
const result = document.getElementById("result");
const copyButton = document.getElementById("copybutton");
const colorInfo = document.getElementById("color-info");
const historyButton = document.getElementById("historyButton");
const historyContainer = document.getElementById("historyContainer");

const MAX_HISTORY = 5;

pickColor.addEventListener("click", async () => {
    try {
        const eyeDropper = new EyeDropper();
        const color = await eyeDropper.open();
        result.innerText = color.sRGBHex;
        await navigator.clipboard.writeText(result.innerText)
        colorInfo.classList.remove("hidden");
        saveColor(color.sRGBHex)
    } catch (error) {
        console.error("Couldn't Pick Color!!!", error);
        result.textContent = "Couldn't Pick Color!!!"
    }
});

async function displayHistory() {
    const { colors } = await chrome.storage.local.get({ colors: [] });

    historyContainer.innerHTML = "";

    colors.forEach((color) => {
        const box = document.createElement("div");
        box.className = "color-box";
        box.style.backgroundColor = color;
        box.title = color;

        box.addEventListener("click", async () => {
            await navigator.clipboard.writeText(color);
            colorInfo.classList.remove("hidden");
            result.innerText = `${color} copied!`;

            setTimeout(() => {
                result.innerText = color;
            }, 1000);
        });

        historyContainer.appendChild(box);
    });
}

historyButton.addEventListener("click", async () => {
    await displayHistory()
});

copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(result.innerText)
    copyButton.innerText = "copied";
    setTimeout(() => {
        copyButton.innerText = "copy";
    }, 2000)
})

async function saveColor(color) {
    if (!chrome.storage) {
        console.error("Chrome storage not available");
        return;
    }
    const data = await chrome.storage.local.get("colors");
    const colors = data.colors || [];
    colors.unshift(color);
    if (colors.length > MAX_HISTORY) {
        colors.pop();
    }
    await chrome.storage.local.set({ colors });
}