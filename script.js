function removeShortsLink(node) {
    const section = node.closest('ytd-rich-section-renderer');
    if (section) {
        section.remove();
    }
}

function scanAndRemoveShorts(root) {
    root.querySelectorAll('ytd-rich-shelf-renderer[is-shorts]').forEach(node => {
        removeShortsLink(node);
    })

    root.querySelectorAll('a[title=Shorts]').forEach(node => {
        node.closest('ytd-guide-entry-renderer', 'ytm-guide-entry-renderer')?.remove();
    })
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (!(node instanceof Element)) continue;
            if (node.tagName === 'YTD-RICH-SECTION-RENDERER') {
                const shelf = node.querySelector('ytd-rich-shelf-renderer[is-shorts]');
                if (shelf) node.remove();
                continue;
            }

            scanAndRemoveShorts(node);
        }
    }
})

observer.observe(document.querySelector('ytd-app'), {
    childList: true,
    subtree: true
});

console.log("[NYS] Loaded!");