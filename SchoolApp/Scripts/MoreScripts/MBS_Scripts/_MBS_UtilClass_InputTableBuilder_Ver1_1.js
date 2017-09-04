
//
// Class Definition and Contruction Function
//
function InputTableBuilder_Class() {

    //
    // Private Class Attributes
    //
    var Intern_InputFieldIds = [];
    var Intern_InputFieldElems = [];
    var Intern_InputFieldTypes = [];
    //var Intern_InputFieldIdToDisplays = [];
    var Intern_TableFieldIDs = [];
    var Intern_TableFieldDispNames = [];
    var Intern_EditableFieldIDs = [];
    var Intern_TableFieldDesc = {};
    var Intern_ArrTableFieldDesc = [];


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
    var Setting_UseNgBlur = true;
    var Setting_PointToOriginalArr = false;
    var Setting_UseInputBoxForEditable = false;

    var Disp_TextAdd = "Add";
    var Disp_TextSave = "Save";
    var Disp_OperationsTitle = "Tasks";
    var Disp_TextUp = "Up";
    var Disp_TextDown = "Down";
    var Disp_TextEdit = "Edit";
    var Disp_TextDelete = "Delete";

    var Intern_LinkStyle = "";

    var Intern_InstanceName = Math.floor((Math.random() * 100) + 1) + "_";



    //
    // Public Class Attributes
    //




    //
    // Private Class Methods
    //





    //
    // Public Class Methods
    //

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

        //debugger;

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

            //debugger;

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
        Setting_AddToTop = (obj.Set_AddToTop !== undefined && obj.Set_AddToTop !== null && obj.Set_AddToTop !== "") ? obj.Set_AddToTop : Setting_AddToTop;
        Setting_IncludeUpDown = (obj.Set_IncludeUpDown !== undefined && obj.Set_IncludeUpDown !== null && obj.Set_IncludeUpDown !== "") ? obj.Set_IncludeUpDown : Setting_IncludeUpDown;
        Setting_IncludeEdit = (obj.Set_IncludeEdit !== undefined && obj.Set_IncludeEdit !== null && obj.Set_IncludeEdit !== "") ? obj.Set_IncludeEdit : Setting_IncludeEdit;
        Setting_IncludeDelete = (obj.Set_IncludeDelete !== undefined && obj.Set_IncludeDelete !== null && obj.Set_IncludeDelete !== "") ? obj.Set_IncludeDelete : Setting_IncludeDelete;
        Setting_UseNgBlur = (obj.Set_UseNgBlur !== undefined && obj.Set_UseNgBlur !== null && obj.Set_UseNgBlur !== "") ? obj.Set_UseNgBlur : Setting_UseNgBlur;
        Setting_PointToOriginalArr = (obj.Set_PointToOriginalArr !== undefined && obj.Set_PointToOriginalArr !== null && obj.Set_PointToOriginalArr !== "") ? obj.Set_PointToOriginalArr : Setting_PointToOriginalArr;
        Setting_UseInputBoxForEditable = (obj.Set_UseInputBoxForEditable !== undefined && obj.Set_UseInputBoxForEditable !== null && obj.Set_UseInputBoxForEditable !== "") ? obj.Set_UseInputBoxForEditable : Setting_UseInputBoxForEditable;
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
    // Function used to style the link on the table
    function setDispStyle(str) {
        Intern_LinkStyle = str;
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
        else if (objList !== undefined && objList !== null && objList.length !== 0) {
            var i = 0;
            $.each(objList[0], function (index, value) {
                Intern_TableFieldDispNames[i] = index;
                i++;
            });

            //debugger;

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
        else if (objList !== undefined && objList !== null && objList.length !== 0) {
            var i = 0;
            $.each(objList[0], function (index, value) {
                Intern_TableFieldIDs[i] = index;
                i++;
            });

            //debugger;

        }

        // We specify here the data fields to be considered in creating the array
        if (fieldIDs !== undefined && fieldIDs !== null && fieldIDs.length !== 0) {
            setInputFieldIds(fieldIDs);
        }
        else {
            setInputFieldIds(Intern_TableFieldIDs);
        }

        // In case we do not have anything defined in terms of the fields, we quit the function
        if (Intern_TableFieldDispNames.length === 0 || Intern_TableFieldIDs.length === 0)
            return;

        // Here we are building the array of the values for display in the table
        if (objList !== undefined && objList !== null /* && objList.length !== 0 */) {
            if (Setting_PointToOriginalArr === true) {
                Intern_ArrayOfValues = objList;
            }
            else {
                Intern_ArrayOfValues.splice(0, Intern_ArrayOfValues.length);
                //Intern_ArrayOfValues = [];
                $.each(objList, function (index, value) {
                    Intern_ArrayOfValues[index] = {};
                    $.each(value, function (index1, value1) {
                        Intern_ArrayOfValues[index][index1] = value1;
                    });
                });
            }
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
            if (Setting_PointToOriginalArr === true) {
                Intern_ArrayOfValues = objList;
            }
            else {
                Intern_ArrayOfValues.splice(0, Intern_ArrayOfValues.length);
                //Intern_ArrayOfValues = [];
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
            if (Setting_PointToOriginalArr === true) {
                Intern_ArrayOfValues = objList;
            }
            else {
                Intern_ArrayOfValues.splice(0, Intern_ArrayOfValues.length);
                //Intern_ArrayOfValues = [];
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
            }
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

        if((Intern_TableDivName === undefined || Intern_TableDivName === null || Intern_TableDivName === "") ||
            (Intern_TableDivElem === undefined || Intern_TableDivElem === null || Intern_TableDivElem === ""))
            return;

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
                str = str + '<a class="clsLink" id="' + Intern_InstanceName + 'lnkUpLine_' + i + '" style="' + Intern_LinkStyle + '">' + Disp_TextUp + '</a> | ';
                str = str + '<a class="clsLink" id="' + Intern_InstanceName + 'lnkDownLine_' + i + '" style="' + Intern_LinkStyle + '">' + Disp_TextDown + '</a> | ';
            }
            if (Setting_IncludeEdit) {
                str = str + '<a class="clsLink" id="' + Intern_InstanceName + 'lnkEditLine_' + i + '" style="' + Intern_LinkStyle + '">' + Disp_TextEdit + '</a> | ';
            }
            if (Setting_IncludeDelete) {
                str = str + '<a class="clsLink" id="' + Intern_InstanceName + 'lnkDeleteLine_' + i + '" style="' + Intern_LinkStyle + '">' + Disp_TextDelete + '</a> | ';
            }
            str = str.substring(0, str.length - 3);
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
                if (Intern_InputFieldTypes === undefined || Intern_InputFieldTypes === null
                    || Intern_InputFieldTypes[i] === undefined || Intern_InputFieldTypes[i] === null
                    || Intern_InputFieldTypes[i] === "") {
                    display = '<td>' + value[value1] + '</td>';
                }
                else if (Intern_InputFieldTypes[i] === "checkbox") {
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

































    function setEditableFieldIDs(arr) {
        Intern_EditableFieldIDs = Utilities_OrderArrayOfString(arr);
    }
    function setTableFieldDesc(obj) {
        Intern_TableFieldDesc = obj;
    }
    function setArrTableFieldDesc(arr) {
        Intern_ArrTableFieldDesc = arr;
    }

    function GenerateTableHeaders(template_ColumnHeader, replace, operationsAtFront) {
        operationsAtFront = (operationsAtFront === undefined || operationsAtFront === null || operationsAtFront === "" || operationsAtFront === false) ? false : true;

        var Intern_TableHtml = '';

        //debugger;

        //Intern_TableHtml = Intern_TableHtml + '<tr id="' + Intern_InstanceName + 'trHeaders">';
        if (Intern_TableFieldDispNames === undefined || Intern_TableFieldDispNames === null)
            Intern_TableFieldDispNames = Intern_TableFieldIDs;
        if (template_ColumnHeader === undefined || template_ColumnHeader === null || template_ColumnHeader === "") {
            $.each(Intern_TableFieldDispNames, function (index, value) {
                Intern_TableHtml = Intern_TableHtml + '<th class="tableHeadCls" id="' + Intern_TableFieldIDs[index] + '">';
                Intern_TableHtml = Intern_TableHtml + value;
                Intern_TableHtml = Intern_TableHtml + '</th>';
            });
        }
        else {
            if (replace === undefined || replace === null || replace === false) {
                $.each(Intern_TableFieldDispNames, function (index, value) {
                    Intern_TableHtml = Intern_TableHtml + template_ColumnHeader.replace("*%id%*", Intern_TableFieldIDs[index]);
                    //Intern_TableHtml = Intern_TableHtml + template_ColumnHeader.replace(/\*%id%\*/g, Intern_TableFieldIDs[index]);
                    Intern_TableHtml = Intern_TableHtml + value;
                    Intern_TableHtml = Intern_TableHtml + '</th>';
                });
            }
            else {
                $.each(Intern_TableFieldDispNames, function (index, value) {
                    Intern_TableHtml = Intern_TableHtml + template_ColumnHeader.replace(/\*%Text%\*/g, value).replace("*%id%*", Intern_TableFieldIDs[index]);
                    //Intern_TableHtml = Intern_TableHtml + template_ColumnHeader.replace(/\*%Text%\*/g, value).replace(/\*%id%\*/g, Intern_TableFieldIDs[index]);
                });
            }
        }
        if (Setting_IncludeUpDown || Setting_IncludeEdit || Setting_IncludeDelete) {
            if (operationsAtFront) {
                Intern_TableHtml = '<th class="tableHeadCls">' + Disp_OperationsTitle + '</th>' + Intern_TableHtml;
                Intern_TableHtml = '<tr id="' + Intern_InstanceName + 'trHeaders">' + Intern_TableHtml;
            }
            else {
                Intern_TableHtml = '<tr id="' + Intern_InstanceName + 'trHeaders">' + Intern_TableHtml;
                Intern_TableHtml = Intern_TableHtml + '<th class="tableHeadCls">';
                Intern_TableHtml = Intern_TableHtml + Disp_OperationsTitle;
                Intern_TableHtml = Intern_TableHtml + '</th>';
            }
        }
        Intern_TableHtml = Intern_TableHtml + '</tr>';

        return Intern_TableHtml;
    }
    // Function used to generate the various table lines or rows to be included in the table
    function GenerateTableData_2(paramsObj) {
        var operationsAtFront = (paramsObj.operationsAtFront === undefined || paramsObj.operationsAtFront === null || paramsObj.operationsAtFront === "" || paramsObj.operationsAtFront === false) ? false : true;
        var startNumber = (paramsObj.startNumber === undefined || paramsObj.startNumber === null || paramsObj.startNumber === "") ? 0 : paramsObj.startNumber;
        var endNumber = (paramsObj.endNumber === undefined || paramsObj.endNumber === null || paramsObj.endNumber === "") ? Intern_ArrayOfValues.length : (paramsObj.endNumber > Intern_ArrayOfValues.length ? Intern_ArrayOfValues.length : paramsObj.endNumber);

        //debugger;

        var ret = "";
        var tempRet = "";
        var display;
        var i;

        var minVal, maxVal, maxLength;
        var includeEditText;
        var style;
        for (var i = startNumber; i < endNumber; i++){
        //$.each(Intern_ArrayOfValues, function (index, value) {
            $.each(Intern_TableFieldIDs, function (index1, value1) {

                //debugger;

                //*%* Note: Ludovick - ToDelete
                // BEGIN
                if (Intern_ArrTableFieldDesc[i] !== undefined && Intern_ArrTableFieldDesc[i] !== null) {
                    if (Intern_ArrTableFieldDesc[i][value1] !== undefined && Intern_ArrTableFieldDesc[i][value1] !== null) {
                        if (Intern_ArrTableFieldDesc[i][value1].Template !== undefined && Intern_ArrTableFieldDesc[i][value1].Template !== null) {
                            display = Intern_ArrTableFieldDesc[i][value1].Template.replace(/\*%dataColName%\*/g, value1)
                                        .replace(/\*%dataRowNum%\*/g, i).replace(/\*%dataValue%\*/g, Intern_ArrayOfValues[i][value1]);
                        }
                        else if (Intern_ArrTableFieldDesc[i][value1].CellEditable !== undefined && Intern_ArrTableFieldDesc[i][value1].CellEditable !== null && Intern_ArrTableFieldDesc[i][value1].CellEditable === true) {
                            if (Intern_ArrTableFieldDesc[i][value1].Type === "number") {
                                minVal = (Intern_ArrTableFieldDesc[i][value1].minVal !== undefined && Intern_ArrTableFieldDesc[i][value1].minVal !== null && Intern_ArrTableFieldDesc[i][value1].minVal !== "") ? 'min="' + Intern_ArrTableFieldDesc[i][value1].minVal + '"' : "";
                                maxVal = (Intern_ArrTableFieldDesc[i][value1].maxVal !== undefined && Intern_ArrTableFieldDesc[i][value1].maxVal !== null && Intern_ArrTableFieldDesc[i][value1].maxVal !== "") ? 'max="' + Intern_ArrTableFieldDesc[i][value1].maxVal + '"' : "";
                                includeEditText = (Intern_ArrTableFieldDesc[i][value1].IncludeEditText !== undefined && Intern_ArrTableFieldDesc[i][value1].IncludeEditText !== null)
                                    ? ((Intern_ArrTableFieldDesc[i][value1].IncludeEditText !== "") ? '<a class="clsLink" id="' + Intern_InstanceName + 'lnkEditCell_' + i + '" >' + Intern_ArrTableFieldDesc[i][value1].IncludeEditText + '</a>' : '<span class="glyphicon glyphicon-edit"></span>')
                                    : "";
                                if (Setting_UseInputBoxForEditable)
                                    display = '<td dataColName="' + value1 + '" dataRowNum="' + i + '" dataType="number" >'
                                        + '<input class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" type="number" ' + minVal + ' ' + maxVal + ' value="' + Intern_ArrayOfValues[i][value1] + '" />'
                                        //+ '<input class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" type="number" ng-change=InputFieldChanged() ' + minVal + ' ' + maxVal + ' value="' + Intern_ArrayOfValues[i][value1] + '" />'
                                        + includeEditText //'<span class="glyphicon glyphicon-edit"></span>'
                                        + '</td>';
                                else
                                    display = '<td contenteditable class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" dataType="number" ' + minVal + ' ' + maxVal + '>' + Intern_ArrayOfValues[i][value1] + '</td>';  
                                
                            }
                            else if (Intern_ArrTableFieldDesc[i][value1].Type === "text") {
                                maxLength = (Intern_ArrTableFieldDesc[i][value1].maxLength !== undefined && Intern_ArrTableFieldDesc[i][value1].maxLength !== null && Intern_ArrTableFieldDesc[i][value1].maxLength !== "") ? 'maxlength="' + Intern_ArrTableFieldDesc[i][value1].maxLength + '"' : "";
                                includeEditText = (Intern_ArrTableFieldDesc[i][value1].IncludeEditText !== undefined && Intern_ArrTableFieldDesc[i][value1].IncludeEditText !== null)
                                    ? ((Intern_ArrTableFieldDesc[i][value1].IncludeEditText !== "") ? '<a class="clsLink" id="' + Intern_InstanceName + 'lnkEditCell_' + i + '" >' + Intern_ArrTableFieldDesc[i][value1].IncludeEditText + '</a>' : '<span class="glyphicon glyphicon-edit"></span>')
                                    : "";
                                if (Setting_UseInputBoxForEditable)
                                    display = '<td dataColName="' + value1 + '" dataRowNum="' + i + '" dataType="text" >'
                                        + '<input class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" type="text" ' + maxLength + ' value="' + Intern_ArrayOfValues[i][value1] + '" />'
                                        //+ '<input class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" type="text" ng-change=InputFieldChanged() ' + maxLength + ' value="' + Intern_ArrayOfValues[i][value1] + '" />'
                                        + includeEditText //'<span class="glyphicon glyphicon-edit"></span>'
                                        + '</td>';
                                else
                                    display = '<td contenteditable class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" dataType="text" ' + maxLength + '>' + Intern_ArrayOfValues[i][value1] + '</td>';
                                
                                //display = '<td contenteditable class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" dataType="text" ' + maxLength + '>' + Intern_ArrayOfValues[i][value1] + '</td>';
                            }
                            else {
                                display = '<td contenteditable class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '">' + Intern_ArrayOfValues[i][value1] + '</td>';
                            }
                        }
                        else {
                            display = '<td dataColName="' + value1 + '" dataRowNum="' + i + '">' + Intern_ArrayOfValues[i][value1] + '</td>';
                        }
                    }
                    else {
                        display = '<td dataColName="' + value1 + '" dataRowNum="' + i + '">' + Intern_ArrayOfValues[i][value1] + '</td>';
                    }
                }
                else if (Intern_TableFieldDesc[value1] !== undefined && Intern_TableFieldDesc[value1] !== null) {
                    if (Intern_TableFieldDesc[value1].Template !== undefined && Intern_TableFieldDesc[value1].Template !== null) {
                        display = Intern_TableFieldDesc[value1].Template.replace(/\*%dataColName%\*/g, value1)
                                    .replace(/\*%dataRowNum%\*/g, i).replace(/\*%dataValue%\*/g, Intern_ArrayOfValues[i][value1]);
                    }
                    else if(Intern_TableFieldDesc[value1].CellEditable !== undefined && Intern_TableFieldDesc[value1].CellEditable !== null && Intern_TableFieldDesc[value1].CellEditable === true) {
                        if (Intern_TableFieldDesc[value1].Type === "number") {
                            minVal = (Intern_TableFieldDesc[value1].minVal !== undefined && Intern_TableFieldDesc[value1].minVal !== null && Intern_TableFieldDesc[value1].minVal !== "") ? 'min="' + Intern_TableFieldDesc[value1].minVal + '"' : "";
                            maxVal = (Intern_TableFieldDesc[value1].maxVal !== undefined && Intern_TableFieldDesc[value1].maxVal !== null && Intern_TableFieldDesc[value1].maxVal !== "") ? 'max="' + Intern_TableFieldDesc[value1].maxVal + '"' : "";
                            includeEditText = (Intern_TableFieldDesc[value1].IncludeEditText !== undefined && Intern_TableFieldDesc[value1].IncludeEditText !== null)
                                ? ((Intern_TableFieldDesc[value1].IncludeEditText !== "") ? '<a class="clsLink" id="' + Intern_InstanceName + 'lnkEditCell_' + i + '" >' + Intern_TableFieldDesc[value1].IncludeEditText + '</a>' : '<span class="glyphicon glyphicon-edit"></span>')
                                : "";
                            if (Setting_UseInputBoxForEditable) {
                                display = '<td dataColName="' + value1 + '" dataRowNum="' + i + '" dataType="number" >'
                                    + '<input class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" type="number" ' + minVal + ' ' + maxVal + ' value="' + Intern_ArrayOfValues[i][value1] + '" />'
                                    //+ '<input class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" type="number" ng-change=InputFieldChanged() ' + minVal + ' ' + maxVal + ' value="' + Intern_ArrayOfValues[i][value1] + '" />'
                                    + includeEditText //'<span class="glyphicon glyphicon-edit"></span>'
                                    + '</td>';

                                //display = '<td contenteditable class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" dataType="number" ' + minVal + ' ' + maxVal + '><input type="number" value="' + Intern_ArrayOfValues[i][value1] + '" /></td>';
                            }
                            else
                                display = '<td contenteditable class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" dataType="number" ' + minVal + ' ' + maxVal + '>' + Intern_ArrayOfValues[i][value1] + '</td>';
                            
                        }
                        else if (Intern_TableFieldDesc[value1].Type === "text") {
                            maxLength = (Intern_TableFieldDesc[value1].maxLength !== undefined && Intern_TableFieldDesc[value1].maxLength !== null && Intern_TableFieldDesc[value1].maxLength !== "") ? 'maxlength="' + Intern_TableFieldDesc[value1].maxLength + '"' : "";
                            includeEditText = (Intern_TableFieldDesc[value1].IncludeEditText !== undefined && Intern_TableFieldDesc[value1].IncludeEditText !== null)
                                ? ((Intern_TableFieldDesc[value1].IncludeEditText !== "") ? '<a class="clsLink" id="' + Intern_InstanceName + 'lnkEditCell_' + i + '" >' + Intern_TableFieldDesc[value1].IncludeEditText + '</a>' : '<span class="glyphicon glyphicon-edit"></span>')
                                : "";
                            if (Setting_UseInputBoxForEditable)
                                display = '<td dataColName="' + value1 + '" dataRowNum="' + i + '" dataType="text" >'
                                    + '<input class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" type="text" ' + maxLength + ' value="' + Intern_ArrayOfValues[i][value1] + '" />'
                                    //+ '<input class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" type="text" ng-change=InputFieldChanged() ' + maxLength + ' value="' + Intern_ArrayOfValues[i][value1] + '" />'
                                    + includeEditText //'<span class="glyphicon glyphicon-edit"></span>'
                                    + '</td>';
                            else
                                display = '<td contenteditable class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" dataType="text" ' + maxLength + '>' + Intern_ArrayOfValues[i][value1] + '</td>';

                            //display = '<td contenteditable class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '" dataType="text" ' + maxLength + '>' + Intern_ArrayOfValues[i][value1] + '</td>';
                        }
                        else {
                            display = '<td contenteditable class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '">' + Intern_ArrayOfValues[i][value1] + '</td>';
                        }
                    }
                    else {
                        display = '<td dataColName="' + value1 + '" dataRowNum="' + i + '">' + Intern_ArrayOfValues[i][value1] + '</td>';
                    }
                }
                else if (Utilities_StringInArrayBinarySearch(value1, Intern_EditableFieldIDs)) {
                    if(Setting_UseNgBlur)                    
                        display = '<td contenteditable ng-blur="TableFieldChanged($event)" dataColName="' + value1 + '" dataRowNum="' + i + '">' + Intern_ArrayOfValues[i][value1] + '</td>';
                    else
                        display = '<td contenteditable class="cellEditable" dataColName="' + value1 + '" dataRowNum="' + i + '">' + Intern_ArrayOfValues[i][value1] + '</td>';
                }
                else {
                    display = '<td dataColName="' + value1 + '" dataRowNum="' + i + '">' + Intern_ArrayOfValues[i][value1] + '</td>';
                }
                // END



                //display = '<td>' + Intern_ArrayOfValues[i][value1] + '</td>';
                tempRet = tempRet + display;
            });

            //debugger;

            style = "";
            if (Intern_ArrayOfValues[i] !== undefined && Intern_ArrayOfValues[i] !== null && Intern_ArrayOfValues[i] !== '')
                style = (Intern_ArrayOfValues[i].style === undefined || Intern_ArrayOfValues[i].style === null || Intern_ArrayOfValues[i].style === '') ? '' : 'style="' + Intern_ArrayOfValues[i].style + '"';
            if (Intern_ArrayOfValues[i].paramRowMetaData_AddOperations === undefined || Intern_ArrayOfValues[i].paramRowMetaData_AddOperations === null 
                || Intern_ArrayOfValues[i].paramRowMetaData_AddOperations === "" || Intern_ArrayOfValues[i].paramRowMetaData_AddOperations === true) {
                if (operationsAtFront) {
                    tempRet = '<tr id="' + Intern_InstanceName + 'tableRow_' + i + '" ' + style + ' >' + AddOperations(i) + tempRet;
                }
                else {
                    tempRet = '<tr id="' + Intern_InstanceName + 'tableRow_' + i + '" ' + style + ' >' + tempRet + AddOperations(i);
                }
                tempRet = tempRet + '</tr>';
            }
            else {
                if (AddOperations(i) === "")
                    tempRet = '<tr id="' + Intern_InstanceName + 'tableRow_' + i + '" ' + style + ' >' + tempRet + '</tr>';
                else
                    tempRet = '<tr id="' + Intern_InstanceName + 'tableRow_' + i + '" ' + style + ' >' + tempRet + '<td></td></tr>';
            }

            if (Setting_AddToTop)
                ret = tempRet + ret;
            else
                ret = ret + tempRet;
            tempRet = "";
        }

        /*
        $.each(Intern_ArrayOfValues, function (index, value) {
            $.each(Intern_TableFieldIDs, function (index1, value1) {
                display = '<td>' + value[value1] + '</td>';
                tempRet = tempRet + display;
            });
            if (operationsAtFront) {
                tempRet = '<tr id="' + Intern_InstanceName + 'tableRow_' + index + '">' + AddOperations(index) + tempRet;
            }
            else {
                tempRet = '<tr id="' + Intern_InstanceName + 'tableRow_' + index + '">' + tempRet + AddOperations(index);
            }
            tempRet = tempRet + '</tr>';

            if (Setting_AddToTop)
                ret = tempRet + ret;
            else
                ret = ret + tempRet;
            tempRet = "";
        });
        */
        return ret;
    }
    // Function used to order the data
    function OrderData(orderBy, ascending) {

        Utilities__OrderObjectData(Intern_ArrayOfValues, orderBy, ascending);

        /*
        orderBy = (orderBy === undefined || orderBy === null || orderBy === "") ? Intern_TableFieldIDs[0] : orderBy;
        ascending = (ascending === undefined || ascending === null || ascending === "" || ascending === true) ? true : false;
        //ascending = (ascending === undefined || ascending === null || ascending === "" || ascending === false) ? false : true;

        //debugger;

        var valueIndex;
        var tempVal;
        for (var i = 0; i < Intern_ArrayOfValues.length; i++) {
            valueIndex = i;
            for (var j = i + 1; j < Intern_ArrayOfValues.length; j++) {
                if (ascending) {
                    if (Intern_ArrayOfValues[valueIndex][orderBy] > Intern_ArrayOfValues[j][orderBy]) {
                        //console.log("Intern_ArrayOfValues[valueIndex][orderBy]: " + Intern_ArrayOfValues[valueIndex][orderBy] + " - " + "Intern_ArrayOfValues[j][orderBy]: " + Intern_ArrayOfValues[valueIndex][orderBy]);
                        valueIndex = j;
                    }
                }
                else {
                    if (Intern_ArrayOfValues[valueIndex][orderBy] < Intern_ArrayOfValues[j][orderBy]) {
                        //console.log("Intern_ArrayOfValues[valueIndex][orderBy]: " + Intern_ArrayOfValues[valueIndex][orderBy] + " - " + "Intern_ArrayOfValues[j][orderBy]: " + Intern_ArrayOfValues[valueIndex][orderBy]);
                        valueIndex = j;
                    }
                }
            }

            //debugger;

            tempVal = Intern_ArrayOfValues[i];
            Intern_ArrayOfValues[i] = Intern_ArrayOfValues[valueIndex];
            Intern_ArrayOfValues[valueIndex] = tempVal;
        }

        //debugger;
        */

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
    this.setDispStyle = setDispStyle;
    this.setDelimiter = setDelimiter;
    this.setArrayOfValues = setArrayOfValues;

    this.setArrayOfValuesFNames_Ver1_2 = setArrayOfValuesFNames_Ver1_2;
    this.setArrayOfValuesFNames = setArrayOfValuesFNames;
    this.setEditableFieldIDs = setEditableFieldIDs;
    this.setTableFieldDesc = setTableFieldDesc;
    this.setArrTableFieldDesc = setArrTableFieldDesc;

    this.setValidationFunct = setValidationFunct;

    this.getConcatFieldData = getConcatFieldData;
    this.getArrayOfValues = getArrayOfValues;

    this.HighLightRow = HighLightRow;
    this.UnHighLightRow = UnHighLightRow;
    this.GenerateFullTable = GenerateFullTable;
    this.GenerateTableHeaders = GenerateTableHeaders;
    this.GenerateTableData = GenerateTableData;
    this.GenerateTableData_2 = GenerateTableData_2;

    this.OrderData = OrderData;

    this.Initialize = Initialize;


    //
    // Call the constructor function
    //
    //The Constructor Method or Function
    function Initialize() {

    }
    Initialize();
}