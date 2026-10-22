const maxEntries = 6;
const preventDuplicates = false;
const searchEnabled = false;

const source = window.CARNET;
const entries = source.entries.map(entry => ({ ...entry }));
const list = document.querySelector("#entries");
const counter = document.querySelector("#entry-count");
const form = document.querySelector("#entry-form");
const nameInput = document.querySelector("#name");
const noteInput = document.querySelector("#note");
const feedback = document.querySelector("#feedback");
const searchInput = document.querySelector("#search");
const book = document.querySelector("#book");
const toggle = document.querySelector("#toggle-book");
const paper = document.querySelector("#paper");

document.querySelector("#site-title").textContent = source.title;
document.title = "Death Note — " + source.title;
document.querySelector("#search-area").hidden = !searchEnabled;

function normalize(value) {
    return value.trim().toLocaleLowerCase("fr");
}

function render() {
    const query = searchEnabled ? normalize(searchInput.value) : "";
    const visibleEntries = entries.filter(entry => normalize(entry.name).includes(query));
    list.replaceChildren();
    visibleEntries.forEach(entry => {
        const row = document.createElement("li");
        const name = document.createElement("strong");
        const note = document.createElement("span");
        name.textContent = entry.name;
        note.textContent = entry.note;
        row.append(name, note);
        list.append(row);
    });
    counter.textContent = entries.length + " / " + maxEntries + " entrées";
    document.querySelector("#empty-state").hidden = visibleEntries.length !== 0;
}

toggle.addEventListener("click", function () {
    const closed = book.classList.toggle("closed");
    paper.hidden = closed;
    toggle.setAttribute("aria-expanded", String(!closed));
    document.querySelector("#toggle-label").textContent = closed ? "Ouvrir le carnet" : "Fermer le carnet";
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    const note = noteInput.value.trim();
    if (!name) {
        feedback.textContent = "Écris un nom avant d’ajouter une entrée.";
        nameInput.focus();
        return;
    }
    if (preventDuplicates && entries.some(entry => normalize(entry.name) === normalize(name))) {
        feedback.textContent = "Ce nom figure déjà dans le carnet.";
        nameInput.focus();
        return;
    }
    if (entries.length >= maxEntries) {
        feedback.textContent = "Le carnet est plein : " + maxEntries + " entrées au maximum.";
        return;
    }
    entries.push({ name, note });
    searchInput.value = "";
    if (paper.hidden) {
        book.classList.remove("closed");
        paper.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        document.querySelector("#toggle-label").textContent = "Fermer le carnet";
    }
    render();
    form.reset();
    feedback.textContent = name + " a été ajouté au carnet. Exporte le contenu pour le conserver dans le projet.";
    nameInput.focus();
});

searchInput.addEventListener("input", render);

document.querySelector("#export-content").addEventListener("click", function () {
    const content = "window.CARNET = " + JSON.stringify({ ...source, entries }, null, 4) + ";\n";
    const blob = new Blob([content], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contenu.js";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    feedback.textContent = "Le fichier contenu.js est exporté. Remplace celui du projet pour conserver ces entrées.";
});

render();
