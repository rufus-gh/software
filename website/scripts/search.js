let fileNames = paginationOrder;  // Array of file names
const contentFolder = "./content/";  // Folder where markdown files are stored
let fileContents = {};  // Store loaded file contents
let strippedContents = {};  // Store text with Markdown removed

async function loadFiles() {
    for (const name of fileNames) {
        const filename = name + ".md"; // Append .md to each name
        try {
            const response = await fetch(contentFolder + filename);
            if (!response.ok) throw new Error(`Failed to load ${filename}`);
            
            const text = await response.text();
            fileContents[filename] = text;
            strippedContents[filename] = stripMarkdown(text);
        } catch (error) {
            console.error(error);
        }
    }
    console.log("Markdown files loaded.");
}

/*
function stripMarkdown(mdText) {
    mdText = mdText.replace(/!\[.*?\]\(.*?\)|!\[.*?\]|\[!\[.*?\]\(.*?\)\]\(.*?\)|!\[.*?\]\[.*?\]|\[([^\]]+)\]\(.*?\)|(\*\*|__)(.*?)\1|(\*|_)(.*?)\1|~~(.*?)~~|`{3}[\s\S]*?`{3}|`{1,2}.*?`{1,2}|#+\s*(.*)|>\s*(.*)|[-*+]\s+|^\s*\d+\.\s+|[*_~`]|[\[\]\(\)]| {2,}|\r+|\n+/g, (m, p1, p2) => p1 || p2 || '').trim();
    mdText = mdText.replace(/(\*\*|__)(.*?)\1/g, '$2'); // Explicitly remove bold formatting
    return mdText;
}*/

function stripMarkdown(mdText) {
    // Remove Markdown image syntax
    mdText = mdText.replace(/!\[.*?\]\(.*?\)/g, '');
    // Remove Markdown link syntax
    mdText = mdText.replace(/\[([^\]]+)\]\(.*?\)/g, '$1');
    // Remove inline code blocks
    mdText = mdText.replace(/`{1,2}.*?`{1,2}/g, '');
    // Remove block code fences
    mdText = mdText.replace(/`{3}[\s\S]*?`{3}/g, '');
    // Remove bold and italic formatting
    mdText = mdText.replace(/(\*\*|__)(.*?)\1/g, '$2');
    mdText = mdText.replace(/(\*|_)(.*?)\1/g, '$2');
    // Remove strikethrough formatting
    mdText = mdText.replace(/~~(.*?)~~/g, '$1');
    // Remove headings
    mdText = mdText.replace(/^#+\s*(.*)/gm, '$1');
    // Remove blockquotes
    mdText = mdText.replace(/^>\s*(.*)/gm, '$1');
    // Remove list markers
    mdText = mdText.replace(/^[-*+]\s+/gm, '');
    mdText = mdText.replace(/^\s*\d+\.\s+/gm, '');
    // Remove extra spaces, newlines, and carriage returns
    mdText = mdText.replace(/ {2,}|\r+|\n+/g, ' ').trim();
    return mdText;
}

function searchFiles() {
    let query = document.getElementById("search").value.trim().toLowerCase();
    if (!query) {
        document.querySelector(".results").innerHTML = "";
        return;
    }

    query = query.replace(/[^a-zA-Z0-9 ]/g, "");

    let resultsHtml = "";
    for (const [filename, text] of Object.entries(strippedContents)) {
        const fileTitle = filename.replace(".md", ""); // Remove .md extension

        const regex = new RegExp(`(.{0,10})(${query})(.{0,10})`, "gi"); // Capture 5 chars before and after
        let match;
        while ((match = regex.exec(text)) !== null) {
            const preview = `...${match[1]}<strong>${match[2]}</strong>${match[3]}...`;
            if (resultsHtml.split('<div class="result"').length - 1 < 8) {
                const shortenedPreview = preview //preview.length > 20 ? preview.slice(0, 17) + "..." : preview;
                resultsHtml += `<div class="result" data-content="${fileTitle}"><div class="title">${nameMapping[fileTitle]}</div><div class="text">${shortenedPreview}</div></div>`;
            } else {
                break;
            }
        }
    }
    document.querySelector(".results").innerHTML = resultsHtml || "<p>No matches found</p>";
}


// Load Markdown files when page loads
loadFiles();

document.getElementById("search").addEventListener("input", function (event) {
    // Allow only alphanumeric characters and spaces
    const sanitizedValue = event.target.value.replace(/[^a-zA-Z0-9 ]/g, ""); // Updated regex to disallow all special characters
    if (event.target.value !== sanitizedValue) {
        event.target.value = sanitizedValue; // Update the input value
    }
});