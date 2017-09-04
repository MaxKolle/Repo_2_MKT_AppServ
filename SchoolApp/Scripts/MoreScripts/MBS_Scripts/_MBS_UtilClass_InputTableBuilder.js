
//=======================================================================================================================
// Class Definition and Contruction Function
//=======================================================================================================================
function InputTableBuilder_Class() {

    //=======================================================================================================================
    // Private Class Attributes
    //=======================================================================================================================
    var Intern_InputFieldIds = [];
    var Intern_InputFieldElems = [];
    var Intern_InputFieldTypes = [];
    //var Intern_InputFieldIdToDisplays = [];
    var Intern_TableFieldIDs = [];
    var Intern_TableFieldDispNames = [];



    var Intern_ValidationFunct = null;
    var Intern_AddButtonId = "";
    var Intern_TableDivName = "";
    var Intern_TableDivElem = null;

    var Intern_Delimiter = "*%*";
    var Intern_ArrayOfValues = [];
    var Intern_DictConcatInput = null;

    var Intern_LineEditedNum = null;

    var Setting_AddToTop = true;
    var Setting_IncludeUpDown = false;
    var Setting_IncludeEdit = true;
    var Setting_IncludeDelete = true;

    var Disp_TextAdd = "Add";
    var Disp_TextSave = "Save";
    var Disp_OperationsTitle = "Tasks";
    var Disp_TextUp = "Up";
    var Disp_TextDown = "Down";
    var Disp_TextEdit = "Edit";
    var Disp_TextDelete = "Delete";

    var Intern_InstanceName = Math.floor((Math.random() * 100) + 1) + "_";



    //=======================================================================================================================
    // Public Class Attributes
    //=======================================================================================================================




    //=======================================================================================================================
    // Private Class Methods
    //=======================================================================================================================





    //=======================================================================================================================
    // Public Class Methods
    //=======================================================================================================================

    function setInstanceName(str) {
        Intern_InstanceName = str + "_";
    }

    // Function used to specify the field IDs, html elements, and types
    function setInputFieldId(index, value) {

        //debugger;

        //Intern_TableFieldIDs[index] = value;
        Intern_InputFieldIds[index] = value;
        Intern_InputFieldElems[index] = $("#" + value);
        Intern_InputFieldTypes[index] = Intern_InputFieldElems[index].attr("type");
        if (Intern_InputFieldTypes[index] === undefined)
            Intern_InputFieldTypes[index] = "select";
    }

    // Function used to specify the array of input field IDs
    function setInputFieldIds(arrInputFieldIds) {
        $.each(arrInputFieldIds, function (index, value) {
            setInputFieldId(index, value);
        });
    }

    // Function used to specify the fields to display on the table
    //function setInputFieldIdToDisplays(arrInputFieldIdToDisplays) {
    function setTableFieldIDs(arrInputFieldIdToDisplays) {
        for (var i = 0; i < arrInputFieldIdToDisplays.length; i++) {
            //Intern_InputFieldIdToDisplays[i] = arrInputFieldIdToDisplays[i];
            Intern_TableFieldIDs[i] = arrInputFieldIdToDisplays[i];
        }
    }

    // Function used to specify the name of the table columns
    function setTableFieldDispNames(arrFieldDispNames) {
        $.each(arrFieldDispNames, function (index, value) {
            Intern_TableFieldDispNames[index] = value;
        });
    }

    // Function used to specify the validation function
    function setValidationFunct(funct) {
        Intern_ValidationFunct = funct;
    }
    // Function used to add button and the add function
    function setAddButtonId(str, funct) {
        Intern_AddButtonId = str;
        $("#" + str).click(function () {

            debugger;

            if (Intern_ValidationFunct === undefined || Intern_ValidationFunct === null
                || Intern_ValidationFunct() === true) {
                if ($(this).html() === Disp_TextAdd)
                    AddDataFunct(funct);
                else
                    EditDataFunct(funct);
                Intern_DictConcatInput = null;
            }
        });
    }
    // Function used to specify the div in which the table is to be displayed
    function setTableDivName(str) {
        Intern_TableDivName = str;
        Intern_TableDivElem = $("#" + str);
    }
    // Function used to specify some table settings and operations
    function setSettings(obj) {
        Setting_AddToTop = (obj.Set_AddToTop !== undefined && obj.Set_AddToTop !== null && obj.Set_AddToTop !== "") ? obj.Set_AddToTop : Set_AddToTop;
        Setting_IncludeUpDown = (obj.Set_IncludeUpDown !== undefined && obj.Set_IncludeUpDown !== null && obj.Set_IncludeUpDown !== "") ? obj.Set_IncludeUpDown : Set_IncludeUpDown;
        Setting_IncludeEdit = (obj.Set_IncludeEdit !== undefined && obj.Set_IncludeEdit !== null && obj.Set_IncludeEdit !== "") ? obj.Set_IncludeEdit : Set_IncludeEdit;
        Setting_IncludeDelete = (obj.Set_IncludeDelete !== undefined && obj.Set_IncludeDelete !== null && obj.Set_IncludeDelete !== "") ? obj.Set_IncludeDelete : Set_IncludeDelete;
    }
    // Function used to specify some of the text to be displayed on the table
    function setDispText(obj) {

        //debugger;

        Disp_TextAdd = (obj.Disp_TextAdd !== undefined && obj.Disp_TextAdd !== null && obj.Disp_TextAdd !== "") ? obj.Disp_TextAdd : Disp_TextAdd;
        Disp_TextSave = (obj.Disp_TextSave !== undefined && obj.Disp_TextSave !== null && obj.Disp_TextSave !== "") ? obj.Disp_TextSave : Disp_TextSave;
        Disp_OperationsTitle = (obj.Disp_OperationsTitle !== undefined && obj.Disp_OperationsTitle !== null && obj.Disp_OperationsTitle !== "") ? obj.Disp_OperationsTitle : Disp_OperationsTitle;
        Disp_TextUp = (obj.Disp_TextUp !== undefined && obj.Disp_TextUp !== null && obj.Disp_TextUp !== "") ? obj.Disp_TextUp : Disp_TextUp;
        Disp_TextDown = (obj.Disp_TextDown !== undefined && obj.Disp_TextDown !== null && obj.Disp_TextDown !== "") ? obj.Disp_TextDown : Disp_TextDown;
        Disp_TextEdit = (obj.Disp_TextEdit !== undefined && obj.Disp_TextEdit !== null && obj.Disp_TextEdit !== "") ? obj.Disp_TextEdit : Disp_TextEdit;
        Disp_TextDelete = (obj.Disp_TextDelete !== undefined && obj.Disp_TextDelete !== null && obj.Disp_TextDelete !== "") ? obj.Disp_TextDelete : Disp_TextDelete;
    }
    // Function used to specify the data delimiter
    function setDelimiter(delim) {
        Intern_Delimiter = delim;
    }

    // Function used to specify the object data list, together with the field names and the field IDs
    function setArrayOfValuesFNames_Ver1_2(objList, fieldIDs, fieldIDsToDisp, fieldNames) {

        //debugger;

        // We specify here the display names on the table for the various data fields
        if (fieldNames !== undefined && fieldNames !== null && fieldNames.length !== 0) {
            $.each(fieldNames, function (index, value) {
                Intern_TableFieldDispNames[index] = value;
            });
        }
        else if (fieldIDsToDisp !== undefined && fieldIDsToDisp !== null && fieldIDsToDisp.length !== 0) {
            $.each(fieldIDsToDisp, function (index, value) {
                Intern_TableFieldDispNames[index] = value;
            });
        }
        else if (fieldIDs !== undefined && fieldIDs !== null && fieldIDs.length !== 0) {
            $.each(fieldIDs, function (index, value) {
                Intern_TableFieldDispNames[index] = value;
            });
        }

        // We specify here the data fields that will be displayed on the table
        if (fieldIDsToDisp !== undefined && fieldIDsToDisp !== null && fieldIDsToDisp.length !== 0) {
            $.each(fieldIDsToDisp, function (index, value) {
                Intern_TableFieldIDs[index] = value;
                //setInputFieldId(index, value);
            });
        }
        else if (fieldIDs !== undefined && fieldIDs !== null && fieldIDs.length !== 0) {
            $.each(fieldIDs, function (index, value) {
                Intern_TableFieldIDs[index] = value;
                //setInputFieldId(index, value);
            });
        }

        // We specify here the data fields to be considered in creating the array
        if (fieldIDs !== undefined && fieldIDs !== null && fieldIDs.length !== 0) {
            setInputFieldIds(fieldIDs);
        }

        // In case we do not have anything defined in terms of the fields, we quit the function
        if (Intern_TableFieldDispNames.length === 0 || Intern_TableFieldIDs.length === 0)
            return;

        // Here we are building the array of the values for display in the table
        if (objList !== undefined && objList !== null && objList.length !== 0) {
            $.each(objList, function (index, value) {
                Intern_ArrayOfValues[index] = {};
                $.each(value, function (index1, value1) {
                    Intern_ArrayOfValues[index][index1] = value1;
                });
            });
        }
        GenerateFullTable();
    }
    // Function used to specify the object data list, together with the field names and the field IDs
    function setArrayOfValuesFNames(objList, fieldNames, fieldIDs) {

        //debugger;

        if (objList !== undefined && objList !== null && objList.length !== 0) {
            var tableFieldDispNamesDefined = false;
            if (Intern_TableFieldDispNames !== undefined && Intern_TableFieldDispNames !== null && Intern_TableFieldDispNames.length !== 0)
                tableFieldDispNamesDefined = true;
            $.each(objList, function (index, value) {
                Intern_ArrayOfValues[index] = {};
                $.each(fieldIDs, function (index1, value1) {
                    Intern_ArrayOfValues[index][fieldIDs[index1]] = value[value1];
                    if (index === 0) {

                        setInputFieldId(index1, fieldIDs[index1]);

                        if (tableFieldDispNamesDefined === false)
                            Intern_TableFieldDispNames[index1] = fieldIDs[index1];
                    }
                });
            });
        }
        else {
            var tableFieldDispNamesDefined = false;
            if (Intern_TableFieldDispNames !== undefined && Intern_TableFieldDispNames !== null && Intern_TableFieldDispNames.length !== 0)
                tableFieldDispNamesDefined = true;
            $.each(fieldIDs, function (index1, value1) {
                if (tableFieldDispNamesDefined === false) {
                    Intern_TableFieldDispNames[index1] = fieldNames[index1];
                }
            });
        }
        GenerateFullTable();
    }
    // Function used to specify the object data list
    function setArrayOfValues(objList) {

        //debugger;

        if (objList !== undefined && objList !== null) {
            var tableFieldDispNamesDefined = false;
            if (Intern_TableFieldDispNames !== undefined && Intern_TableFieldDispNames !== null && Intern_TableFieldDispNames.length !== 0)
                tableFieldDispNamesDefined = true;
            $.each(objList, function (index, value) {
                Intern_ArrayOfValues[index] = {};
                $.each(value, function (index1, value1) {
                    Intern_ArrayOfValues[index][index1] = value1;
                    if (index === 0) {

                        setInputFieldId(Intern_InputFieldIds.length, index1);

                        if (tableFieldDispNamesDefined === false)
                            Intern_TableFieldDispNames[Intern_TableFieldDispNames.length] = index1;
                    }
                });
            });
            GenerateFullTable();
        }
    }

    // Function used to return the array of values
    function getArrayOfValues() {

        //debugger;

        return Intern_ArrayOfValues
    }

    // Function used to Generate the table, and put in some values
    function GenerateFullTable() {

        //debugger;

        var Intern_TableHtml = '';
        if (Intern_ArrayOfValues.length !== 0) {
            Intern_TableHtml = Intern_TableHtml + '<table class="tableCls">';
            Intern_TableHtml = Intern_TableHtml + '<thead>';
            Intern_TableHtml = Intern_TableHtml + '<tr id="' + Intern_InstanceName + 'trHeaders">';
            if (Intern_TableFieldDispNames === undefined || Intern_TableFieldDispNames === null)
                Intern_TableFieldDispNames = Intern_TableFieldIDs;
            $.each(Intern_TableFieldDispNames, function (index, value) {
                Intern_TableHtml = Intern_TableHtml + '<th class="tableHeadCls">';
                Intern_TableHtml = Intern_TableHtml + value;
                Intern_TableHtml = Intern_TableHtml + '</th>';
            });
            if (Setting_IncludeUpDown || Setting_IncludeEdit || Setting_IncludeDelete) {
                Intern_TableHtml = Intern_TableHtml + '<th class="tableHeadCls">';
                Intern_TableHtml = Intern_TableHtml + Disp_OperationsTitle;
                Intern_TableHtml = Intern_TableHtml + '</th>';
            }
            Intern_TableHtml = Intern_TableHtml + '</tr>';
            Intern_TableHtml = Intern_TableHtml + '</thead>';

            Intern_TableHtml = Intern_TableHtml + '<tbody>';
            Intern_TableHtml = Intern_TableHtml + '</tbody>';
            Intern_TableHtml = Intern_TableHtml + '</table>';

            Intern_TableDivElem.html(Intern_TableHtml);

            $("#" + Intern_TableDivName + " tbody").html(GenerateTableData());
            for (var i = 0; i < Intern_ArrayOfValues.length; i++)
                AddEvents(i);
            Intern_DictConcatInput = null;
        }
    }

    // Function used to generate the concatenated fields to be sent to the controller
    function Generate_DictConcatFieldInput() {
        Intern_DictConcatInput = {};
        //var firstRun = true;
        $.each(Intern_ArrayOfValues, function (index, value) {
            if (index === 0) {
                $.each(value, function (index1, value1) {
                    Intern_DictConcatInput[index1] = value1 + Intern_Delimiter;
                });
            }
            else {
                $.each(value, function (index1, value1) {
                    Intern_DictConcatInput[index1] = Intern_DictConcatInput[index1] + value1 + Intern_Delimiter;
                });
            }
        });
    }
    // Function used to extract a specific concatenated field
    function getConcatFieldData(str) {

        //debugger;

        if (Intern_DictConcatInput === undefined || Intern_DictConcatInput === null) {
            Generate_DictConcatFieldInput();
        }
        return Intern_DictConcatInput[str];
    }

    // Function used to add the links to the various rows
    function AddOperations(i) {
        if (Setting_IncludeUpDown || Setting_IncludeEdit || Setting_IncludeDelete) {
            var str = '';
            str = str + '<td>';
            if (Setting_IncludeUpDown) {
                str = str + '<a class="clsLink" id="' + Intern_InstanceName + 'lnkUpLine_' + i + '">' + Disp_TextUp + '</a> | ';
                str = str + '<a class="clsLink" id="' + Intern_InstanceName + 'lnkDownLine_' + i + '">' + Disp_TextDown + '</a> | ';
            }
            if (Setting_IncludeEdit) {
                str = str + '<a class="clsLink" id="' + Intern_InstanceName + 'lnkEditLine_' + i + '">' + Disp_TextEdit + '</a> | ';
            }
            if (Setting_IncludeDelete) {
                str = str + '<a class="clsLink" id="' + Intern_InstanceName + 'lnkDeleteLine_' + i + '">' + Disp_TextDelete + '</a> | ';
            }
            str = str + '</td>';

            return str;
        }
        return "";
    }
    // Function used to add events to the various links for the various rows
    function AddEvents(i) {

        if (Setting_IncludeUpDown) {
            $('#'+ Intern_InstanceName + 'lnkUpLine_' + i).click(function () {
                var valI = parseInt(($(this).attr("id")).replace(Intern_InstanceName + "lnkUpLine_", ""));
                if (Setting_AddToTop)
                    OperationDown(valI);
                else
                    OpertionUp(valI);
                Intern_DictConcatInput = null;
            });
            $('#' + Intern_InstanceName + 'lnkDownLine_' + i).click(function () {
                var valI = parseInt(($(this).attr("id")).replace(Intern_InstanceName + "lnkDownLine_", ""));
                if (Setting_AddToTop)
                    OpertionUp(valI);
                else
                    OperationDown(valI);
                Intern_DictConcatInput = null;
            });
        }
        if (Setting_IncludeEdit) {
            $('#' + Intern_InstanceName + 'lnkEditLine_' + i).click(function () {
                var valI = parseInt(($(this).attr("id")).replace(Intern_InstanceName + "lnkEditLine_", ""));
                var tempVal;
                $.each(Intern_InputFieldElems, function (index, value) {

                    //debugger;

                    if (Intern_InputFieldTypes[index] === "checkbox") {
                        tempVal = Intern_ArrayOfValues[valI][Intern_InputFieldIds[index]];
                        if (tempVal === "0")
                            Intern_InputFieldElems[index].prop('checked', false);
                        else
                            Intern_InputFieldElems[index].prop('checked', true);
                    }
                    else if (Intern_InputFieldTypes[index] === "radio") {
                        tempVal = Intern_ArrayOfValues[valI][Intern_InputFieldIds[index]];
                        if (tempVal !== null)
                            $('input:radio[value=' + tempVal + ']').prop('checked', true);
                    }
                    else {
                        value.val(Intern_ArrayOfValues[valI][Intern_InputFieldIds[index]]);
                    }
                });
                $('#' + Intern_AddButtonId).html(Disp_TextSave);
                Intern_LineEditedNum = valI;
            });
        }
        if (Setting_IncludeDelete) {
            $('#' + Intern_InstanceName + 'lnkDeleteLine_' + i).click(function () {
                var valI = parseInt(($(this).attr("id")).replace(Intern_InstanceName + "lnkDeleteLine_", ""));
                Intern_ArrayOfValues.splice(valI, 1);
                $("#" + Intern_TableDivName + " tbody").html(GenerateTableData());
                for (var i = 0; i < Intern_ArrayOfValues.length; i++)
                    AddEvents(i);
                Intern_DictConcatInput = null;
            });
        }
    }
    // Function used to perform the upwards and downwards operations on the table
    function OpertionUp(valI) {
        if (valI > 0) {
            var tempObj = Intern_ArrayOfValues[valI];
            Intern_ArrayOfValues[valI] = Intern_ArrayOfValues[valI - 1];
            Intern_ArrayOfValues[valI - 1] = tempObj;

            $("#" + Intern_TableDivName + " tbody").html(GenerateTableData());
            for (var i = 0; i < Intern_ArrayOfValues.length; i++)
                AddEvents(i);
        }
    }
    // Function used to perform the upwards and downwards operations on the table
    function OperationDown(valI) {
        if (valI < (Intern_ArrayOfValues.length - 1)) {
            var tempObj = Intern_ArrayOfValues[valI];
            Intern_ArrayOfValues[valI] = Intern_ArrayOfValues[valI + 1];
            Intern_ArrayOfValues[valI + 1] = tempObj;

            $("#" + Intern_TableDivName + " tbody").html(GenerateTableData());
            for (var i = 0; i < Intern_ArrayOfValues.length; i++)
                AddEvents(i);
        }
    }

    // Function used to generate the various table lines or rows to be included in the table
    function GenerateTableLine(inputNum) {
        var ret = "";
        var tempVal;
        var data;
        $.each(Intern_InputFieldIds, function (index, value) {

            //debugger;

            if (Intern_InputFieldTypes[index] === "checkbox") {
                tempVal = Intern_InputFieldElems[index].prop("checked");
                if (tempVal === false) {
                    data = "0";
                }
                else {
                    data = "1";
                }
            }
            else if (Intern_InputFieldTypes[index] === "radio") {
                tempVal = Intern_InputFieldElems[index].attr("name");
                tempVal = $('input:radio[name=' + tempVal + ']:checked').val();
                if (tempVal !== undefined) {
                    data = tempVal;
                }
                else {
                    data = null;
                }
            }
            else if (Intern_InputFieldTypes[index] === "color") {
                tempVal = Intern_InputFieldElems[index].val();
                data = tempVal;
            }
            else if (Intern_InputFieldTypes[index] === "select") {
                tempVal = Intern_InputFieldElems[index].val();
                data = tempVal;
            }
            else {
                tempVal = Intern_InputFieldElems[index].val();
                data = tempVal;
            }
            Intern_ArrayOfValues[inputNum][value] = data;
        });

        var display;
        var i;
        $.each(Intern_TableFieldIDs, function (index, value) {

            i = Intern_InputFieldIds.indexOf(value);

            if (Intern_InputFieldTypes[i] === "checkbox") {
                tempVal = Intern_InputFieldElems[i].prop("checked");
                if (tempVal === false) {
                    display = "<td>false</td>";
                }
                else {
                    display = "<td>true</td>";
                }
            }
            else if (Intern_InputFieldTypes[i] === "radio") {
                tempVal = Intern_InputFieldElems[i].attr("name");
                tempVal = $('input:radio[name=' + tempVal + ']:checked').val();
                if (tempVal !== undefined) {
                    display = "<td>" + tempVal + "</td>";
                }
                else {
                    display = "<td></td>";
                }
            }
            else if (Intern_InputFieldTypes[i] === "color") {
                tempVal = Intern_InputFieldElems[i].val();
                display = '<td style="background-color:' + tempVal + '"></td>';
            }
            else if (Intern_InputFieldTypes[i] === "select") {
                tempVal = Intern_InputFieldElems[i].val();
                display = '<td>' + $('#' + Intern_InputFieldIds[i] + ' option[value=' + tempVal + ']').text() + '</td>';
            }
            else {
                tempVal = Intern_InputFieldElems[i].val();
                display = '<td>' + tempVal + '</td>';
            }
            ret = ret + display;
        });
        ret = ret + AddOperations(inputNum);
        return ret;
    }
    // Function used to generate the various table lines or rows to be included in the table
    function GenerateTableData() {
        var ret = "";
        var tempRet = "";
        var display;
        var i;
        $.each(Intern_ArrayOfValues, function (index, value) {

            //debugger;

            tempRet = tempRet + '<tr id="' + Intern_InstanceName + 'tableRow_' + index + '">';
            $.each(Intern_TableFieldIDs, function (index1, value1) {

                //debugger;

                i = Intern_InputFieldIds.indexOf(value1);
                if (Intern_InputFieldTypes[i] === "checkbox") {
                    if (value[value1] === "0") {
                        display = "<td>false</td>";
                    }
                    else {
                        display = "<td>true</td>";
                    }
                }
                else if (Intern_InputFieldTypes[i] === "radio") {
                    if (value[value1] === null) {
                        display = "<td></td>";
                    }
                    else {
                        display = "<td>" + value[value1] + "</td>";
                    }
                }
                else if (Intern_InputFieldTypes[i] === "color") {
                    display = '<td style="background-color:' + value[value1] + '"></td>';
                }
                else if (Intern_InputFieldTypes[i] === "select") {
                    display = '<td>' + $('#' + Intern_InputFieldIds[i] + ' option[value=' + value[value1] + ']').text() + '</td>';
                }
                else {
                    display = '<td>' + value[value1] + '</td>';
                }
                tempRet = tempRet + display;
                //i++;
            });
            tempRet = tempRet + AddOperations(index);
            tempRet = tempRet + '</tr>';

            if (Setting_AddToTop)
                ret = tempRet + ret;
            else
                ret = ret + tempRet;
            tempRet = "";
            //i = 0;
        });
        return ret;
    }

    // Function used to clear all of the input field in the form
    function ClearAllInputs() {
        $.each(Intern_InputFieldElems, function (index, value) {
            if (Intern_InputFieldTypes[index] === "checkbox") {
                Intern_InputFieldElems[index].prop('checked', false);
            }
            else if (Intern_InputFieldTypes[index] === "radio") {
                var rbName = Intern_InputFieldElems[index].attr("name");
                $('input[name="' + rbName + '"]').prop('checked', false);
            }
            else {
                value.val("");
            }
        });
    }

    // Function used to add values to the table and to the array of values
    function AddDataFunct(funct) {
        var Intern_TableHtml = '';
        if (funct !== undefined && funct !== null && funct !== "") {
            // This else statement or route is for when the data needs to be added to the table with some extra ordering or processing.
            funct();
        }
        else if (Intern_ArrayOfValues.length === 0) {
            Intern_TableHtml = Intern_TableHtml + '<table class="tableCls">';
            Intern_TableHtml = Intern_TableHtml + '<thead>';
            Intern_TableHtml = Intern_TableHtml + '<tr id="' + Intern_InstanceName + 'trHeaders">';
            if (Intern_TableFieldDispNames === undefined || Intern_TableFieldDispNames === null)
                Intern_TableFieldDispNames = Intern_TableFieldIDs;
            $.each(Intern_TableFieldDispNames, function (index, value) {
                Intern_TableHtml = Intern_TableHtml + '<th class="tableHeadCls">';
                Intern_TableHtml = Intern_TableHtml + value;
                Intern_TableHtml = Intern_TableHtml + '</th>';
            });
            if (Setting_IncludeUpDown || Setting_IncludeEdit || Setting_IncludeDelete) {
                Intern_TableHtml = Intern_TableHtml + '<th class="tableHeadCls">';
                Intern_TableHtml = Intern_TableHtml + Disp_OperationsTitle;
                Intern_TableHtml = Intern_TableHtml + '</th>';
            }
            Intern_TableHtml = Intern_TableHtml + '</tr>';
            Intern_TableHtml = Intern_TableHtml + '</thead>';

            Intern_ArrayOfValues[Intern_ArrayOfValues.length] = {};
            Intern_TableHtml = Intern_TableHtml + '<tbody>';
            Intern_TableHtml = Intern_TableHtml + '<tr id="' + Intern_InstanceName + 'tableRow_0">';
            Intern_TableHtml = Intern_TableHtml + GenerateTableLine(0);
            Intern_TableHtml = Intern_TableHtml + '</tr>';
            Intern_TableHtml = Intern_TableHtml + '</tbody>';
            Intern_TableHtml = Intern_TableHtml + '</table>';

            Intern_TableDivElem.html(Intern_TableHtml);
            AddEvents(0);
        }
        else {
            // This else statement or route is for when the data needs to be added to the table without any extra ordering.
            Intern_ArrayOfValues[Intern_ArrayOfValues.length] = {};
            Intern_TableHtml = Intern_TableHtml + '<tr id="' + Intern_InstanceName + 'tableRow_' + (Intern_ArrayOfValues.length - 1) + '">';
            Intern_TableHtml = Intern_TableHtml + GenerateTableLine(Intern_ArrayOfValues.length - 1);
            Intern_TableHtml = Intern_TableHtml + '</tr>';

            if (Setting_AddToTop)
                $("#" + Intern_TableDivName + " tbody").prepend(Intern_TableHtml);
            else
                $("#" + Intern_TableDivName + " tbody").append(Intern_TableHtml);
            AddEvents(Intern_ArrayOfValues.length - 1);
        }

        ClearAllInputs();
        if (Intern_InputFieldElems.length !== 0)
            Intern_InputFieldElems[0].focus();
    }
    // Function used to edit a field in the table of values
    function EditDataFunct() {

        //debugger;

        $("#tableRow_" + Intern_LineEditedNum).html(GenerateTableLine(Intern_LineEditedNum));
        AddEvents(Intern_LineEditedNum);
        Intern_LineEditedNum = null;
        ClearAllInputs();
        $('#' + Intern_AddButtonId).html(Disp_TextAdd);
        Intern_InputFieldElems[0].focus();
    }

    // Function used to highlight a row in the table of values
    function HighLightRow(index, funct) {
        $("#tableRow_" + index).addClass("highLightRow");
        if (funct !== undefined && funct !== null && funct !== "")
            funct();
    }
    // Function used to unhighlight a row in the table of values
    function UnHighLightRow(index) {
        $("#tableRow_" + index).removeClass("highLightRow");
    }

    // Below is the linking of various functions to the class object
    this.setInstanceName = setInstanceName;
    this.setInputFieldIds = setInputFieldIds;
    this.setTableFieldIDs = setTableFieldIDs;
    this.setTableFieldDispNames = setTableFieldDispNames;
    this.setAddButtonId = setAddButtonId;
    this.setTableDivName = setTableDivName;
    this.setSettings = setSettings;
    this.setDispText = setDispText;
    this.setDelimiter = setDelimiter;
    this.setArrayOfValues = setArrayOfValues;

    this.setArrayOfValuesFNames_Ver1_2 = setArrayOfValuesFNames_Ver1_2;
    this.setArrayOfValuesFNames = setArrayOfValuesFNames;

    this.setValidationFunct = setValidationFunct;

    this.getConcatFieldData = getConcatFieldData;
    this.getArrayOfValues = getArrayOfValues;

    this.HighLightRow = HighLightRow;
    this.UnHighLightRow = UnHighLightRow;
    this.GenerateFullTable = GenerateFullTable;

    this.Initialize = Initialize;


    //=======================================================================================================================
    // Call the constructor function
    //=======================================================================================================================
    //The Constructor Method or Function
    function Initialize() {

    }
    Initialize();
}