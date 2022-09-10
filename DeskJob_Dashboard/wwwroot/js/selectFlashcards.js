function filterFlashcardsBy(row, section, filterBy) {
    let element = document.getElementById(section);
    let sectionDefaultValue = (section === "certificate") ? "N/A" : "All";
    // Apply css
    row.classList.toggle("selected");
    // add filter to filter list
    element.getElementsByTagName("td")
    if (
        // determine if a filter has been set on this section
        // if NOT remove the default filter
        // add filters accordingly
        element.innerHTML = (element.innerHTML.match(filterBy)) ? sectionDefaultValue : filterBy);
    // update subsections as necessary
    if (section === "certification") {
        filterModules();
        filterTopics();
    } else if (section === "modules") {
        filterTopics();
    }



    // update the card count

}