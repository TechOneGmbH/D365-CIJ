


document.addEventListener("d365mkt-afterformload", function () {
    translateForm();
});

function translateForm() {

    console.log("Language: " + document.documentElement.lang);

    translate("label");
    translate("button");
    translate("option");
    translate("p");
    translate("h4");

}

function translate(tagName) {

    var lang = document.documentElement.lang;
    var form = document.getElementsByClassName("marketingForm");
    var elements = form[0].getElementsByTagName(tagName);

    for (let i = 0; i < elements.length; i++) {

        var currentElement = elements[i].innerHTML;
        var currentElementTexts = currentElement.split("||");

        var newElementText = currentElementTexts[0];

        if (lang.startsWith("en") && currentElementTexts.length >= 2) {
            newElementText = currentElementTexts[1];
        } else if (lang.startsWith("fr") && currentElementTexts.length >= 3) {
            newElementText = currentElementTexts[2];
        }

        elements[i].innerHTML = newElementText;
    }

    console.log(tagName + " count: " + elements.length);
}
