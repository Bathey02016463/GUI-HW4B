/*
File: script.js
Name: Aneesh Bathey
Email: aneesh_bathey@student.uml.edu
*/

// Getting HTML elements in JavaScript code: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
// Creating HTML elements using JavaScript: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// Type conversions in JavaScript: https://www.w3schools.com/js/js_type_conversion.asp
// jQuery code examples: https://api.jquery.com/jQuery

let form = document.getElementById("input-form");
let minYInput = document.getElementById("minY");
let maxYInput = document.getElementById("maxY");
let minXInput = document.getElementById("minX");
let maxXInput = document.getElementById("maxX");
let tableContainer = document.getElementById("mult-table");
let invalidInput = document.getElementById("invalid-input");
let clearTabsButton = document.getElementById("clear-tabs");

function createMultiplicationTable(minX, maxX, minY, maxY) {
    const tabId = `tab-${minX}-${maxX}-${minY}-${maxY}`;
    const tabLabel = `${minX} to ${maxX}, ${minY} to ${maxY}`;

    // If tab already exists, switch to it
    if ($(`#${tabId}`).length) {
        const index = $(`#tabs a[href="#${tabId}"]`).parent().index();
        $("#tabs").tabs("option", "active", index);
        return;
    }

    // Add tab header
    $("#tabs ul").append(
        `<li><a href="#${tabId}">${tabLabel}</a> <span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span></li>`
    );

    // Create multiplication table
    const tabContent = $(`<div id="${tabId}" class="mult-table"></div>`);
    const table = document.createElement("table");

    const tableHead = document.createElement("thead");
    table.appendChild(tableHead);

    const tableBody = document.createElement("tbody");
    table.appendChild(tableBody);

    for (let row = minX - 1; row <= maxX; row++) {
        const tr = document.createElement("tr");

        for (let col = minY - 1; col <= maxY; col++) {
            const cell = document.createElement(row == minX - 1 || col == minY - 1 ? "th" : "td");

            if (row == minX - 1 && col == minY - 1) {
                cell.textContent = "x";
            } else if (row == minX - 1) {
                cell.textContent = col;
            } else if (col == minY - 1) {
                cell.textContent = row;
            } else {
                cell.textContent = row * col;
            }

            tr.appendChild(cell);
        }

        (row === minX - 1 ? tableHead : tableBody).appendChild(tr);
    }

    tabContent.append(table);
    $("#tabs").append(tabContent);

    // Refresh tabs
    $("#tabs").tabs("refresh");

    // Switch to new tab
    const newIndex = $(`#tabs a[href="#${tabId}"]`).parent().index();
    $("#tabs").tabs("option", "active", newIndex);
}

// Add submit event listener for when user clicks on submit button
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get all inputs and convert to numbers (this prevents bugs with negative numbers)
    const minY = Number(minYInput.value);
    const maxY = Number(maxYInput.value);
    const minX = Number(minXInput.value);
    const maxX = Number(maxXInput.value);

    // Make sure all numbers inputted are in range of -50 to 50
    if (minY < -50 || maxY > 50 || minX < -50 || maxX > 50) {
        return;
    }

    // Make sure min Y value is less than max Y, otherwise throw an error
    if (minY > maxY) {
        return;
    }
    
    // Make sure min X value is less than max X, otherwise throw an error
    if (minX > maxX) {
        return;
    }

    createMultiplicationTable(minX, maxX, minY, maxY);
});

clearTabsButton.addEventListener("click", function(event) {
    // Remove all tabs except the input tab
    $("#tabs ul li").each(function() {
        const href = $(this).find("a").attr("href");

        if (href !== "#tab-input") {
            $(this).remove();
            $(href).remove();
        }
    });

    // Switch to input tab
    $("#tabs").tabs("refresh").tabs("option", "active", 0);
});