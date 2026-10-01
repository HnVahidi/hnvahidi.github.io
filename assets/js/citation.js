"use strict";

const copyButton = document.getElementById("copy-citation");
const citation = document.getElementById("bibtex");
const status = document.getElementById("citation-status");

if (copyButton && citation && status) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    copyButton.disabled = true;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(citation.textContent);
      status.textContent = "Copied.";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(citation);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      citation.closest("pre").focus();
      status.textContent = "Press Ctrl+C or ⌘C to copy the selected citation.";
    } finally {
      copyButton.disabled = false;
    }
  });
}
