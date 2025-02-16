document.getElementById("fillButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: fillForm
        });
    });
});

function fillForm() {
    const randomNames = ["John Doe", "Jane Smith", "Michael Johnson"];
    const randomEmails = ["test@example.com", "user@mail.com", "fake@domain.com"];
    const randomNumbers = ["1234567890", "9876543210", "5555555555"];

    document.querySelectorAll("input, textarea, select").forEach(input => {
        if (input.type === "hidden" || input.disabled || input.readOnly) return;

        if (input.type === "checkbox" || input.type === "radio") {
            input.checked = Math.random() > 0.5;
        } else if (input.tagName.toLowerCase() === "select") {
            const options = input.options;
            if (options.length > 1) input.selectedIndex = Math.floor(Math.random() * options.length);
        } else {
            input.value = {
                "text": randomNames[Math.floor(Math.random() * randomNames.length)],
                "email": randomEmails[Math.floor(Math.random() * randomEmails.length)],
                "tel": randomNumbers[Math.floor(Math.random() * randomNumbers.length)],
                "number": Math.floor(Math.random() * 9999) + 1,
                "password": Math.random().toString(36).slice(-8),
                "url": "https://example.com"
            }[input.type] || "Lorem Ipsum";
        }
    });
}