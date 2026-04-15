function removeShorts(link) {
    if (!link) return;
    link.remove();
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node instanceof Element && node.tagName === "A" && node.getAttribute("title") === "Shorts") {
                const parentElement = node.parentElement;
                if (parentElement != null) {
                    removeShorts(parentElement);
                }
            }
        }
    }
})

observer.observe(document.querySelector('ytd-app'), {
    childList: true,
    subtree: true
});

console.log("[NYS] Loaded!");