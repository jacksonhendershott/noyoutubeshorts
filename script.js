// ==UserScript==
// @name         No YouTube Shorts
// @namespace    https://jacksonh.net/
// @version      2026-04-25
// @description  Makes YouTube Shorts harder to get to.
// @author       Jackson
// @match        https://www.youtube.com/*
// @icon         https://github.com/jacksonhendershott/noyoutubeshorts/blob/9c450f649e6b396d95befa1f03bfd48e121424a7/images/icon-128.png?raw=true
// @grant        none
// @run-at       document-idle
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function removeShortsLink(node) {
        const section = node.closest('ytd-rich-section-renderer');
        if (section) {
            section.remove();
        }
    }

    function scanAndRemoveShorts(root) {
        root.querySelectorAll('ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer').forEach(node => {
            removeShortsLink(node);
        })

        root.querySelectorAll('a[title="Shorts"]').forEach(node => {
            node.closest('ytd-guide-entry-renderer, ytm-guide-entry-renderer')?.remove();
        })
    }

    function init() {
        scanAndRemoveShorts(document);
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

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log("[NYS] Loaded!");
    }

    init();
})();