const button = document.getElementById("pick");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
    try {
        const eyeDropper = new EyeDropper();
        const color = await eyeDropper.open();
        result.innerText = color.sRGBHex;
        await navigator.clipboard.writeText(result.innerText)
    } catch (error) {
        console.error("Couldn't Pick Color!!!", error);
        result.textContent = "Couldn't Pick Color!!!"
    }

});