ej.base.enableRipple(true);

//*** COLOR
var defaultObj = new ej.inputs.ColorPicker({}, '#color-picker');

//*** INPUT
var outlineTextbox = new ej.inputs.TextBox({
    placeholder: 'Outlined',
    cssClass: 'e-outline',
    floatLabelType: 'Auto'
});
outlineTextbox.appendTo('#outlined');
var filledTextbox = new ej.inputs.TextBox({
    placeholder: 'Filled',
    cssClass: 'e-filled',
    floatLabelType: 'Auto',
});
filledTextbox.appendTo('#filled');
var inputobj1 = new ej.inputs.TextBox({
    placeholder: 'First Name',
    floatLabelType: 'Auto'
});
inputobj1.appendTo('#firstname');
var inputobj2 = new ej.inputs.TextBox({
    placeholder: 'Last Name',
    floatLabelType: 'Auto',
    enableRtl: true
});
inputobj2.appendTo('#lastname');

//*** signature
var saveBtn = new ej.buttons.Button({ disabled: true }, '#signsave');
var clrBtn = new ej.buttons.Button({ disabled: true }, '#signclear');
var signature = new ej.inputs.Signature({
    change: function (args) {
        if (!signature.isEmpty()) {
            saveBtn.disabled = false;
            clrBtn.disabled = false;
        }
    }
}, '#signature');

//check  if signature exists in the local storage
if (localStorage.getItem("signature")) {
    //load the signature from the local storage
    signature.load(localStorage.getItem("signature"));
}

document.getElementById('signsave').onclick = function (e) {
    // Get the canvas element
    var canvas = document.getElementById('signature');

    // Convert the canvas to a data URL (base64 string)
    var dataURL = canvas.toDataURL();

    // The dataURL now contains your signature as a base64 encoded string
    console.log(dataURL);

    //clear it after saving

    signature.clear();

    //make alert
    alert("Signature saved successfully");

    //reload the signature again for testing
    signature.load(dataURL);

    //save the signature in the browser local storage
    localStorage.setItem("signature", dataURL);
};

document.getElementById('signclear').onclick = function (e) {
    signature.clear();
    if (signature.isEmpty()) {
        saveBtn.disabled = true;
        clrBtn.disabled = true;
    }
};

 //** grid 
 // Example data source
 var data_grid = [];
 for (var i = 1; i <= 1000; i++) {
     data_grid.push({ 
         Name: "Person " + i, 
         Age: 20 + i % 50, 
         Location: "City " + (i % 100) 
     });
 }

// Initialize the Grid component
var grid = new ej.grids.Grid({
    dataSource: data_grid, // your data source
    allowPaging: true,
    allowSorting: true,
    allowFiltering: true,
    allowResizing: true,
    allowReordering: true,  // Enable column reordering
    columns: [
        { field: 'Name', headerText: 'Name', width: 120, headerTemplate: '<div class="custom-header">Name</div>' },
        { field: 'Age', headerText: 'Age', width: 100, headerTemplate: '<div class="custom-header">Age</div>' },
        // ... more columns
    ]
});

grid.appendTo('#Grid');

// Assuming your Syncfusion Grid instance is stored in a variable named 'grid'

// Event listener for the filter clear action
grid.filterSettings = { 
    type: 'Menu',
    showFilterBarStatus: true,
    immediateModeDelay: 500,
    mode: 'Immediate'
};

 

grid.addEventListener('dataBound', function() {
    // Adding event listeners after the grid has been rendered
    grid.addEventListener('columnResizeStop', function(args) {
        grid.refreshHeader();
        grid.refresh();
    });

    grid.addEventListener('filterCleared', function(args) {
        grid.clearFiltering();
        grid.refresh();
    });
});


 