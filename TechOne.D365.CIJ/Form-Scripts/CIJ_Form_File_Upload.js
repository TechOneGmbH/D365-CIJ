/***** BEGIN - INIT FILEUPLOAD CONTROLS *****/

document.addEventListener("d365mkt-formsubmit", function (event) {

    var controls = document.querySelectorAll("input[type='file']");
    var controlsWithFile = [];

    controls.forEach(function (inputFileControl) {

        if (inputFileControl.files.length == 1) {
            controlsWithFile.push(inputFileControl);
        }
    });

    load_files(controlsWithFile);

});

document.addEventListener("d365mkt-afterformload", function () {
    CreateFileUploadControls();
});

function CreateFileUploadControls() {

    var controls = document.querySelectorAll("input");

    controls.forEach(function (textBoxControl) {
        if (textBoxControl.placeholder == "FileUpload") {
            CreateFileUploadControl(textBoxControl);
        }
    });
}

var allowedFileExtensions = ".jpg,.gif,.png,.pdf,.mp3,.mp4";

function CreateFileUploadControl(textBoxControl) {

    var fileupload = document.createElement("input");
    fileupload.name = "fu_" + textBoxControl.name;
    fileupload.id = "fu_" + textBoxControl.id;
    fileupload.setAttribute("class", "lp-form-fieldInput");
    fileupload.setAttribute("type", "file");
    fileupload.setAttribute("accept", allowedFileExtensions);
    fileupload.onchange = function () {
        var errorMessage = "";

        if (this.files[0].size > 20971520) {
            errorMessage = "Die Datei darf maximal 20 MB gross sein.\n";
        };

        var extensionsAllowed = false;
        allowedFileExtensions.split(",").forEach(extension => {
            if (this.files[0].name.endsWith(extension)) {
                extensionsAllowed = true;
            }
        });

        if (!extensionsAllowed) {
            errorMessage = "Falscher Dateityp. Zugelassen sind: " + allowedFileExtensions;
        }

        if (errorMessage != "") {
            this.value = "";
            alert(errorMessage);
        }

        var FileId = generateGuid();
        this.form[this.id.replace("fu_", "")].value = "fileupload/" + FileId;
    };

    //var br = document.createElement("br");
    //textBoxControl.parentElement.appendChild(br);
    textBoxControl.parentElement.appendChild(fileupload);
    textBoxControl.style.display = "none";
}

var currentFileUploadTextBoxId = "";


function load_files(fileControls) {

    Promise.all(
        (function* () {
            for (let i = 0; i < fileControls.length; i++) {
                var FileId = generateGuid();
                //var textControl = document.getElementById(fileControls[i].id.replace("fu_", ""));
                //textControl.value = "fileupload/" + FileId;
                //document.forms[0][fileControls[i].id.replace("fu_", "")].value = "fileupload/" + FileId;

                debugger;
                var file = fileControls[i].files[0];
                debugger;
                yield new Promise(resolve => {
                    let reader = new FileReader();
                    reader.onload = (event) => resolve(event.target.result);
                    reader.readAsDataURL(file);
                })
            }
        })())
        .then(data => {
            for (let i = 0; i < fileControls.length; i++) {

                var textControl = document.getElementById(fileControls[i].id.replace("fu_", ""));
                const json = {
                    "filename": fileControls[i].files[0].name,
                    "base64file": data[i],
                    "fileid": textControl.value,
                    "MarketingFormFieldId": "obsolet"
                };

                sendFile(json);
            }
        });
}

function sendFile(json) {

    var theUrl = "https://6c8c368728e9e387ad02e4ec693997.5b.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/65ac9ed10b8e4c089f65ef34617df427/triggers/manual/paths/invoke?api-version=1"; // This URL is Environment specific
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

            if (xmlHttp.responseText != "") {
                //alert(xmlHttp.responseText);
            }
        }
    }
    xmlHttp.open("POST", theUrl, false);
    xmlHttp.send(JSON.stringify(json));

}

function generateGuid() {
    var d = new Date().getTime();

    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);

        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return guid;
}

/***** END - INIT FILEUPLOAD CONTROLS *****/


<script>

</script>