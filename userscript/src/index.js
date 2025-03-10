import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import PlusPage from "./PlusPage";
import { deleteAllChildren } from "./utils";
import { awaitElement, log, addLocationChangeCallback } from "./utils";

log("React script has successfully started");

// Do required initial work. Gets called every time the URL changes,
// so that elements can be re-inserted as a user navigates a page with
// different routes.
async function main() {
    // Find <body/>. This can be any element. We wait until
    // the page has loaded enough for that element to exist.
    if (document.location == "https://www.syntax.eco/plus") {
        const oldcontainer = document.getElementsByClassName("d-flex align-items-center justify-content-center")[0];
        deleteAllChildren(oldcontainer);
        const body = await awaitElement("body > div");
        const container = document.createElement("div");
        body.appendChild(container);
        ReactDOM.render(<PlusPage />, container);
    }
}

// Call `main()` every time the page URL changes, including on first load.
addLocationChangeCallback(() => {
    // Greasemonkey doesn't bubble errors up to the main console,
    // so we have to catch them manually and log them
    main().catch((e) => {
        log(e);
    });
});
