window.onload = function () {
    toggleColumnVisibilityEvents("dataTable", ".adjust-column-input")
}
/**
 * Toggles the visibility of columns in a table based on the state of checkboxes.
 * @param {string} tableID - The ID of the table element.
 * @param {string} checkBoxSelector - A CSS selector string to select the checkboxes that control column visibility.
 */
function toggleColumnVisibilityEvents(tableID, checkBoxSelector) {
    const checkboxes = document.querySelectorAll(checkBoxSelector);
    const table = document.getElementById(tableID);

    checkboxes.forEach((checkbox) => {
        const columnIndex = parseInt(checkbox.getAttribute("data-column"));
        if (!columnIndex)
            return;
        const localStorageKey = tableID + "-column-state-" + columnIndex;
        const checkboxState = localStorage.getItem(localStorageKey);
        const cells = table.querySelectorAll(
            `tr > td:nth-child(${columnIndex}), tr > th:nth-child(${columnIndex})`
        );
        //update checkbox based on local storage value
        checkbox.checked = checkboxState == "true" ? true : false;
        //update cell visibilty based on local storage value
        cells.forEach(cell => cell.style.display = checkbox.checked ? "" : "none")
        //add change event
        checkbox.addEventListener("change", () => {
            cells.forEach(cell => {
                cell.style.display = checkbox.checked ? "" : "none";
            })
            localStorage.setItem(localStorageKey, checkbox.checked);
        });
    });
}