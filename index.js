const pickColor = document.getElementById("color");
const result = document.getElementById("result");
const copyButton = document.getElementById("copybutton");
const colorInfo = document.getElementById("color-info");

pickColor.addEventListener("click", async () => {
    try {
        const eyeDropper = new EyeDropper();
        const color = await eyeDropper.open();
        result.innerText = color.sRGBHex;
        await navigator.clipboard.writeText(result.innerText)
        colorInfo.classList.remove("hidden");
    } catch (error) {
        console.error("Couldn't Pick Color!!!", error);
        result.textContent = "Couldn't Pick Color!!!"
    }
});

copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(result.innerText)
    copyButton.innerText = "copied";
    setTimeout(() => {
        copybutton.innerText = "copy";
    }, 2000)
})