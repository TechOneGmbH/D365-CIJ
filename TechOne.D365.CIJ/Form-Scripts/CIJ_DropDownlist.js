
function setRequired(fieldEl, isRequired) {
    
    if (!fieldEl) return;

    if (isRequired) {
        fieldEl.setAttribute("required", "required");
        fieldEl.setAttribute("aria-required", "true");
    } else {
        fieldEl.removeAttribute("required");
        fieldEl.removeAttribute("aria-required");
    }

    const container = fieldEl.closest(".msdynmkt-field, .form-group, .field, div");
    const label = container ? container.querySelector("label") : null;
    if (!label) return;

    const starClass = "js-required-star";
    let star = label.querySelector("." + starClass);

    if (isRequired) {
        if (!star) {
            star = document.createElement("span");
            star.className = starClass;
            star.textContent = " *";
            star.style.color = "#c33400";
            label.appendChild(star);
        }
    } else {
        if (star) star.remove();
    }
}


function evaluate(selectfieldName, fieldName) {

    var selectfield = document.getElementById(selectfieldName);
    var field = document.getElementById(fieldName);

    debugger;

    if (!field) return;

    if (!selectfield) return;

    let makeRequired = false;

    if (selectfield.tagName === "SELECT") {
        const selectedValue = selectfield.options[selectfield.selectedIndex]?.value || "";
        makeRequired = (selectedValue == 108960000);
    }

    setRequired(field, makeRequired);
}

function handleCantons() {

    var selectfield = document.getElementById("robe_landprivatadress-1771405089743");

    if (selectfield) {
        selectfield.addEventListener("change", function (e){
            evaluate("robe_landprivatadress-1771405089743","robe_address1canton-1771405057492");
        });

        selectfield.addEventListener("input", function (e){
            evaluate("robe_landprivatadress-1771405089743","robe_address1canton-1771405057492");
        });
    }

    selectfield = document.getElementById("robe_landbillingadress-1771405547793");

    if (selectfield) {
        selectfield.addEventListener("change", function (e){
            evaluate("robe_landbillingadress-1771405547793","robe_cantonbillingadress-1771405543091");
        });

        selectfield.addEventListener("input", function (e){
            evaluate("robe_landbillingadress-1771405547793","robe_cantonbillingadress-1771405543091");
        });
    }
}