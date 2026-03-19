sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/export/CommaSeparatedValues",
    "sap/m/MessageBox",
    "sap/ui/core/BusyIndicator",
    "./handlers/exportUtilities"
], function (MessageToast, CommaSeparatedValues, MessageBox, BusyIndicator, exportUtilities) {
    'use strict';

    // const EDM_META = {
    //     "Edm.String": { len: 255, numeric: false },
    //     "Edm.Guid": { len: 36, numeric: false },
    //     "Edm.Boolean": { len: 5, numeric: false },
    //     "Edm.Byte": { len: 3, numeric: true },
    //     "Edm.SByte": { len: 4, numeric: true },
    //     "Edm.Int16": { len: 6, numeric: true },
    //     "Edm.Int32": { len: 11, numeric: true },
    //     "Edm.Int64": { len: 20, numeric: true },
    //     "Edm.Decimal": { len: 28, numeric: true },
    //     "Edm.Double": { len: 24, numeric: true },
    //     "Edm.Single": { len: 14, numeric: true },
    //     "Edm.Date": { len: 10, numeric: false },
    //     "Edm.TimeOfDay": { len: 8, numeric: false },
    //     "Edm.DateTimeOffset": { len: 19, numeric: false },
    // };

    // _resolveFieldDefs: async function (oBinding) {
    // const resolveFieldDefs = async function (fieldDefCache) {
    //     // Cache so repeated exports don't re-read metadata
    //     if (fieldDefCache) return fieldDefCache;

    //     const oMetaModel = oView.getModel().getMetaModel();

    //     // requestObject("/<EntitySet>/")  returns the entity type map
    //     const oEntityType = await oMetaModel.requestObject("/" + "Requests" + "/");

    //     if (!oEntityType) {
    //         throw new Error("Could not read metadata for path: " + "Requests");
    //     }

    //     const aFields = [];

    //     for (const sKey of Object.keys(oEntityType)) {
    //         if (sKey.startsWith("$") || sKey.startsWith("@")) continue;

    //         const oProp = oEntityType[sKey];
    //         if (!oProp || typeof oProp !== "object") continue;
    //         if (oProp.$kind && oProp.$kind !== "Property") continue; // skip nav props

    //         const sType = oProp.$Type || "Edm.String";
    //         const oDefaults = EDM_META[sType];
    //         if (!oDefaults) continue;                 // unknown / Edm.Binary → skip

    //         let iLen = oDefaults.len;

    //         // $MaxLength wins for strings
    //         if (oProp.$MaxLength) {
    //             iLen = parseInt(oProp.$MaxLength, 10);
    //         }

    //         // For Decimal: derive length from Precision + Scale
    //         if (sType === "Edm.Decimal" && oProp.$Precision) {
    //             const iPrecision = parseInt(oProp.$Precision, 10);
    //             const iScale = parseInt(oProp.$Scale || "0", 10);
    //             // sign(1) + integer part + dot(1) + scale part
    //             iLen = 1 + (iPrecision - iScale) + (iScale > 0 ? 1 + iScale : 0);
    //         }

    //         aFields.push({
    //             name: sKey,
    //             type: sType,
    //             len: iLen,
    //             numeric: oDefaults.numeric
    //         });
    //     }

    //     console.log("[ListReportExt] Resolved field defs:", aFields);
    //     this._aFieldDefsCache = aFields;
    //     return aFields;
    // }
    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        CustomExportTextHandler: async function (oContext, aSelectedContexts) {
            //     MessageToast.show("Custom handler invoked.");

            //     MessageToast.show("Custom handler invoked.");

            //     const context = oContext;
            //     const selected = aSelectedContexts;
            //     const editFlow = this.editFlow;

            //     const view = editFlow.getView();
            //     const model = view.getModel();
            //     const path = "/Requests";
            //     this._sEntitySet = path;
            //     this.oModel = model;

            //     const allData = model.getBindings()
            //         .filter(binding => binding.sPath.startsWith(path))
            //         .flatMap(binding => binding.aContexts.map(context => context.getObject()).filter(Boolean));


            //     const oMetaModel = this._oModel.getMetaModel();
            //     await oMetaModel.requestObject("/");

            //     // Resolve entity type properties via the metamodel path
            //     // Path format: /<EntitySetName>/<PropertyName>@<annotation>
            //     const sEntityTypePath = "/" + this._sEntitySet + "/";
            //     const oEntityType = await oMetaModel.requestObject(sEntityTypePath);

            //     if (!oEntityType) {
            //         throw new Error("[FixedLengthExtractor] EntitySet not found in metadata: " + this._sEntitySet);
            //     }

            //     //
            //     let oBinding;
            //     if (!oBinding) {
            //         // Create a temporary binding if none is supplied
            //         oBinding = this._oModel.bindList("/" + this._sEntitySet, null, [], [], {
            //             $$groupId: "$auto"
            //         });
            //     }

            //     // Request all contexts (use large $top to get everything)
            //     const aContexts = await oBinding.requestContexts(0, Infinity);
            //     const allMappedDAta = aContexts.map(oCtx => oCtx.getObject());
            //     //
            //     this._aFieldDefs = this._parseFieldDefs(oEntityType, oMetaModel);
            //     this._bInitialized = true;

            //     console.log("[FixedLengthExtractor] Field definitions loaded:", this._aFieldDefs);


            //     // viewBindings.forEach(binding => {
            //     //     // Perform any necessary operations on the bindings here
            //     //     // filter /Requests
            //     //     if (binding.sPath === path) {
            //     //         for (const context of binding.aContexts) {
            //     //             const data = context.getObject();
            //     //             if (data) {
            //     //                 allData.push(data);
            //     //             }

            //     //         }
            //     //         // binding.aContexts.forEach(({ context }) => {
            //     //         //     const data = context.getObject();
            //     //         //     if (data) {
            //     //         //         allData.push(data);
            //     //         //     }
            //     //         // });
            //     //     }
            //     // });

            //     if (!allData) {
            //         console.log(allData);
            //         return;
            //     }

            //     //////////////custom export
            //     const createColumnConfig = () => {
            //         const aCols = [
            //             {
            //                 label: "Request Number",
            //                 property: "RequestNumber"
            //             },
            //             {
            //                 label: "Title",
            //                 property: "Title"
            //             },
            //             {
            //                 label: "Description",
            //                 property: "Description"
            //             }
            //         ];

            //         return aCols;
            //     }

            //     // const aCols = this.createColumnConfig();
            //     const aCols = createColumnConfig();
            //     // const oBinding = this.byId("exportTable").getBinding("items");

            //     // Define export settings
            //     const oSettings = {
            //         workbook: {
            //             columns: aCols,
            //             // separator: this.getView().getModel().getProperty("/separator")
            //             separator: ';'
            //         },
            //         dataSource: allData,
            //         fileName: "TextExport.txt"
            //     };

            //     // const oCSV = new CommaSeparatedValues(oSettings);
            //     // const spreadSheet = new Spreadsheet(oSettings);

            //     // oCSV.build();
            //     // spreadSheet.build();

            //     // const aColumns = ["RequestNumber", "Title", "Description", "Status"]; // adjust to your fields

            //     // // Header row
            //     // const sHeader = aColumns.join("\t");

            //     // // Data rows
            //     // const sRows = allData.map(function (oItem) {
            //     //     return aColumns.map(function (sKey) {
            //     //         var sValue = oItem[sKey];
            //     //         // Handle null/undefined gracefully
            //     //         return (sValue !== null && sValue !== undefined) ? sValue : "";
            //     //     }).join("\t");
            //     // }).join("\n");

            //     // const sContent = sHeader + "\n" + sRows;

            //     // const oBlob = new Blob([sContent], { type: "text/plain;charset=utf-8;" });

            //     // // const oBlob = new Blob([allData], { type: "text/plain;charset=utf-8;" });
            //     // const sUrl = URL.createObjectURL(oBlob);

            //     // const oLink = document.createElement("a");
            //     // oLink.setAttribute("href", sUrl);
            //     // oLink.setAttribute("download", "TableExport.txt");
            //     // document.body.appendChild(oLink);
            //     // oLink.click();
            //     // document.body.removeChild(oLink);
            //     // URL.revokeObjectURL(sUrl);

            //     const sDelimiter = ";"; // Change to "," | "|" | "\t" as needed
            //     const aColumns = ["RequestNumber", "Title", "Description", "Status"]; // Adjust to your fields

            //     // Helper function to safely wrap values in quotes
            //     function fnEscapeValue(vValue) {
            //         if (vValue === null || vValue === undefined) {
            //             return '""';
            //         }
            //         // Convert to string first
            //         var sValue = String(vValue);

            //         // If value contains the delimiter, a quote, or a newline — wrap and escape
            //         if (sValue.includes(sDelimiter) || sValue.includes('"') || sValue.includes("\n")) {
            //             // Escape any existing double quotes by doubling them → standard CSV escaping
            //             sValue = sValue.replace(/"/g, '""');
            //         }

            //         // Always wrap in double quotes for robustness
            //         return '"' + sValue + '"';
            //     }

            //     // Header row
            //     const sHeader = aColumns.map(function (sCol) {
            //         return '"' + sCol + '"';
            //     }).join(sDelimiter);

            //     // Data rows
            //     const sRows = allData.map(function (oItem) {
            //         return aColumns.map(function (sKey) {
            //             return fnEscapeValue(oItem[sKey]);
            //         }).join(sDelimiter);
            //     }).join("\n");

            //     const sContent = sHeader + "\n" + sRows;

            //     // 👇 Add this one line to strip all quotes
            //     const sCleanContent = sContent.replace(/"/g, "");

            //     // Then pass sCleanContent instead of sContent into Blob
            //     const oBlob = new Blob([sCleanContent], { type: "text/plain;charset=utf-8;" });
            //     const sUrl = URL.createObjectURL(oBlob);
            //     const oLink = document.createElement("a");
            //     oLink.setAttribute("href", sUrl);
            //     oLink.setAttribute("download", "TableExport.txt");
            //     document.body.appendChild(oLink);
            //     oLink.click();
            //     document.body.removeChild(oLink);
            //     URL.revokeObjectURL(sUrl);
            // },

            // _parseFieldDefs(oEntityType, oMetaModel) {
            //     const aFields = [];

            //     for (const sKey of Object.keys(oEntityType)) {
            //         // Skip OData metadata keys (start with $ or @)
            //         if (sKey.startsWith("$") || sKey.startsWith("@")) continue;

            //         const oProp = oEntityType[sKey];
            //         if (!oProp || typeof oProp !== "object") continue;
            //         if (oProp.$kind && oProp.$kind !== "Property") continue; // skip nav props

            //         const sType = oProp.$Type || "Edm.String";
            //         const oDefaults = EDM_DEFAULTS[sType] || { maxLength: 255, isNumeric: false };

            //         // MaxLength from metadata wins over our defaults
            //         let iLength = oProp.$MaxLength || oDefaults.maxLength;

            //         // For Decimal, compute length from Precision + decimal point + optional sign
            //         if (sType === "Edm.Decimal" && oProp.$Precision) {
            //             const iPrecision = parseInt(oProp.$Precision, 10);
            //             const iScale = parseInt(oProp.$Scale || "0", 10);
            //             // sign(1) + integer digits + decimal point(1) + scale digits
            //             iLength = 1 + (iPrecision - iScale) + (iScale > 0 ? 1 + iScale : 0);
            //         }

            //         // Skip Binary fields (no sensible text representation)
            //         if (sType === "Edm.Binary") continue;

            //         aFields.push({
            //             name: sKey,
            //             length: iLength,
            //             isNumeric: oDefaults.isNumeric,
            //             type: sType
            //         });
            //     }

            //     return aFields;

            //claude test
            BusyIndicator.show(0);
            try {
                // 1. Locate the inner table rendered by Fiori Elements
                // const oTable = this._getFETable();
                const editFlow = this.editFlow;

                const view = editFlow.getView();
                const oView = editFlow.getView();
                const model = view.getModel();

                // Fiori Elements wraps the table in an sap.ui.mdc.Table.
                // Its inner table (sap.m.Table or sap.ui.table.Table) carries the binding.
                // We search for the mdc.Table first, then fall back to m.Table.
                // const aMDC = oView.findAggregatedObjects(true, function (o) {
                //     // return o.isA("sap.ui.mdc.Table");
                // });
                // if (aMDC.length) return aMDC[0];

                // // Fallback: plain sap.m.Table (older FE versions)
                // const aMTable = oView.findAggregatedObjects(true, function (o) {
                //     // return o.isA("sap.m.Table");
                // });
                // const oTable = aMTable.length ? aMTable[0] : null;

                // if (!oTable) {
                //     MessageBox.error("Could not locate the table. Please try again.");
                //     return;
                // }

                // // 2. Grab the OData v4 list binding that is already active
                // let oBinding = this._getListBinding(oTable);

                // if (typeof oTable.getRowBinding === "function") {
                //     oBinding = oTable.getRowBinding();
                // }
                // // sap.m.Table uses "items" aggregation
                // if (typeof oTable.getBinding === "function") {
                //     oBinding = oTable.getBinding("items") || oTable.getBinding("rows");
                // }


                // if (!oBinding) {
                //     MessageBox.error("No active OData binding found on the table.");
                //     return;
                // }

                // 3. Read field definitions from $metadata (once; cached after first call)
                // let aFieldDefs = await this._resolveFieldDefs(oBinding);

                // if (this._aFieldDefsCache) return this._aFieldDefsCache;
                this._aFieldsCache = await exportUtilities.resolveFieldDefs(oView, this._aFieldsCache);
                if (this._aFieldsCache) {
                    return this._aFieldsCache;
                }

                // const oMetaModel = oView.getModel().getMetaModel();
                // // const sMetaPath = oBinding.getResolvedPath
                // //     ? oBinding.getResolvedPath()   // OData v4
                // //     : oBinding.getPath();          // fallback

                // // requestObject("/<EntitySet>/")  returns the entity type map
                // // const oEntityType = await oMetaModel.requestObject(sMetaPath + "/");
                // const oEntityType = await oMetaModel.requestObject("/" + "Requests" + "/");

                // if (!oEntityType) {
                //     throw new Error("Could not read metadata for path: " + "Requests");
                // }

                // const aFields = [];

                // for (const sKey of Object.keys(oEntityType)) {
                //     if (sKey.startsWith("$") || sKey.startsWith("@")) continue;

                //     const oProp = oEntityType[sKey];
                //     if (!oProp || typeof oProp !== "object") continue;
                //     if (oProp.$kind && oProp.$kind !== "Property") continue; // skip nav props

                //     const sType = oProp.$Type || "Edm.String";
                //     const oDefaults = EDM_META[sType];
                //     if (!oDefaults) continue;                 // unknown / Edm.Binary → skip

                //     let iLen = oDefaults.len;

                //     // $MaxLength wins for strings
                //     if (oProp.$MaxLength) {
                //         iLen = parseInt(oProp.$MaxLength, 10);
                //     }

                //     // For Decimal: derive length from Precision + Scale
                //     if (sType === "Edm.Decimal" && oProp.$Precision) {
                //         const iPrecision = parseInt(oProp.$Precision, 10);
                //         const iScale = parseInt(oProp.$Scale || "0", 10);
                //         // sign(1) + integer part + dot(1) + scale part
                //         iLen = 1 + (iPrecision - iScale) + (iScale > 0 ? 1 + iScale : 0);
                //     }

                //     aFields.push({
                //         name: sKey,
                //         type: sType,
                //         len: iLen,
                //         numeric: oDefaults.numeric
                //     });
                // }

                // console.log("[ListReportExt] Resolved field defs:", aFields);
                // let aFieldDefs = aFields;

                // 4. Collect all currently loaded contexts
                // const aContexts = oBinding.getCurrentContexts();  // already loaded, no new request
                const aContexts = model.getBindings()
                    .filter(binding => binding.sPath.startsWith('/Requests'))
                    .flatMap(binding => binding.aContexts.map(context => context.getObject()).filter(Boolean));

                if (!aContexts || aContexts.length === 0) {
                    MessageToast.show("No rows to export.");
                    return;
                }

                // 5. Build fixed-length text content
                // const sContent = this._buildFixedLengthText(aContexts, aFieldDefs);

                const aLines = [];

                // Header row — field names, also fixed-width (always left-aligned)
                // const sHeader = aFieldDefs.map(f => this._pad(f.name, f.len, false)).join("");
                // aLines.push(sHeader);

                // Data rows
                for (const oCtx of aContexts) {
                    // const oData = oCtx.getObject();           // plain JS object for this row
                    const oData = oCtx;
                    if (!oData) continue;
                    
                    // const sRow = aFieldDefs.map(f => {
                    const sRow = this._aFieldsCache.map(f => {
                        // const sVal = this._formatValue(oData[f.name], f.type);

                        let sVal;
                        if (oData[f.name] === null || oData[f.name] === undefined) return "";

                        switch (f.type) {
                            case "Edm.Boolean":
                                sVal = oData[f.name] ? "true" : "false";

                            case "Edm.Date":
                                // OData v4 already gives "YYYY-MM-DD"
                                sVal = String(oData[f.name]);

                            case "Edm.TimeOfDay":
                                String(oData[f.name]).substring(0, 8);   // HH:MM:SS

                            case "Edm.DateTimeOffset":
                                try {
                                    // Normalise to "YYYY-MM-DD HH:MM:SS"
                                    sVal = new Date(oData[f.name]).toISOString()
                                        .replace("T", " ")
                                        .substring(0, 19);
                                } catch (e) {
                                    sVal = String(oData[f.name]);
                                }

                            default:
                                sVal = String(oData[f.name]);
                        }
                        // return this._pad(sVal, f.len, f.numeric);

                        const s = String(sVal ?? "");
                        const iLen = f.len;
                        const bNumeric = f.numeric;

                        if (s.length === iLen) return s;

                        if (s.length > iLen) {
                            console.warn("[ListReportExt] Truncating value to fit field length:", s, "→", iLen);
                            return s.substring(0, iLen);
                        }

                        const sPad = " ".repeat(iLen - s.length);
                        return bNumeric ? sPad + s : s + sPad;
                        // }).join("");
                    }).join(" ");

                    aLines.push(sRow);
                }

                // CRLF — compatible with Windows / mainframe / SAP downstream systems
                const sContent = aLines.join("\r\n");

                // 6. Trigger browser download
                // this._download("ListReport_Export.txt", sContent);

                const oBlob = new Blob([sContent], { type: "text/plain;charset=utf-8;" });
                const sUrl = URL.createObjectURL(oBlob);
                const oLink = document.createElement("a");

                oLink.href = sUrl;
                oLink.download = "ListReport_Export.txt";
                oLink.style.display = "none";
                document.body.appendChild(oLink);
                oLink.click();
                document.body.removeChild(oLink);
                setTimeout(() => URL.revokeObjectURL(sUrl), 5000);

                MessageToast.show(`Exported ${aContexts.length} row(s) successfully.`);

            } catch (oErr) {
                console.error("[ListReportExt] Export error:", oErr);
                MessageBox.error("Export failed:\n" + (oErr.message || String(oErr)));
            } finally {
                BusyIndicator.hide();
            }
        },

        // // ── Step 1: find the MDC / Fiori-Elements inner table ────────────────
        // _getFETable: function () {
        //     const oView = this.base.getView();

        //     // Fiori Elements wraps the table in an sap.ui.mdc.Table.
        //     // Its inner table (sap.m.Table or sap.ui.table.Table) carries the binding.
        //     // We search for the mdc.Table first, then fall back to m.Table.
        //     const aMDC = oView.findAggregatedObjects(true, function (o) {
        //         return o.isA("sap.ui.mdc.Table");
        //     });
        //     if (aMDC.length) return aMDC[0];

        //     // Fallback: plain sap.m.Table (older FE versions)
        //     const aMTable = oView.findAggregatedObjects(true, function (o) {
        //         return o.isA("sap.m.Table");
        //     });
        //     return aMTable.length ? aMTable[0] : null;
        // },

        // ── Step 2: extract the ODataListBinding ─────────────────────────────
        // _getListBinding: function (oTable) {
        //     // sap.ui.mdc.Table exposes getRowBinding()  (preferred in FE context)
        //     if (typeof oTable.getRowBinding === "function") {
        //         return oTable.getRowBinding();
        //     }
        //     // sap.m.Table uses "items" aggregation
        //     if (typeof oTable.getBinding === "function") {
        //         return oTable.getBinding("items") || oTable.getBinding("rows");
        //     }
        //     return null;
        // },

        // ── Step 3: parse $metadata for field widths / types ─────────────────
        // _resolveFieldDefs: async function (oBinding) {
        //     // Cache so repeated exports don't re-read metadata
        //     if (this._aFieldDefsCache) return this._aFieldDefsCache;

        //     const oMetaModel = oBinding.getModel().getMetaModel();
        //     const sMetaPath = oBinding.getResolvedPath
        //         ? oBinding.getResolvedPath()   // OData v4
        //         : oBinding.getPath();          // fallback

        //     // requestObject("/<EntitySet>/")  returns the entity type map
        //     const oEntityType = await oMetaModel.requestObject(sMetaPath + "/");

        //     if (!oEntityType) {
        //         throw new Error("Could not read metadata for path: " + sMetaPath);
        //     }

        //     const aFields = [];

        //     for (const sKey of Object.keys(oEntityType)) {
        //         if (sKey.startsWith("$") || sKey.startsWith("@")) continue;

        //         const oProp = oEntityType[sKey];
        //         if (!oProp || typeof oProp !== "object") continue;
        //         if (oProp.$kind && oProp.$kind !== "Property") continue; // skip nav props

        //         const sType = oProp.$Type || "Edm.String";
        //         const oDefaults = EDM_META[sType];
        //         if (!oDefaults) continue;                 // unknown / Edm.Binary → skip

        //         let iLen = oDefaults.len;

        //         // $MaxLength wins for strings
        //         if (oProp.$MaxLength) {
        //             iLen = parseInt(oProp.$MaxLength, 10);
        //         }

        //         // For Decimal: derive length from Precision + Scale
        //         if (sType === "Edm.Decimal" && oProp.$Precision) {
        //             const iPrecision = parseInt(oProp.$Precision, 10);
        //             const iScale = parseInt(oProp.$Scale || "0", 10);
        //             // sign(1) + integer part + dot(1) + scale part
        //             iLen = 1 + (iPrecision - iScale) + (iScale > 0 ? 1 + iScale : 0);
        //         }

        //         aFields.push({
        //             name: sKey,
        //             type: sType,
        //             len: iLen,
        //             numeric: oDefaults.numeric
        //         });
        //     }

        //     console.log("[ListReportExt] Resolved field defs:", aFields);
        //     this._aFieldDefsCache = aFields;
        //     return aFields;
        // },

        // ── Step 4: build the fixed-length text ──────────────────────────────
        // _buildFixedLengthText: function (aContexts, aFieldDefs) {
        //     const aLines = [];

        //     // Header row — field names, also fixed-width (always left-aligned)
        //     const sHeader = aFieldDefs.map(f => this._pad(f.name, f.len, false)).join("");
        //     aLines.push(sHeader);

        //     // Data rows
        //     for (const oCtx of aContexts) {
        //         const oData = oCtx.getObject();           // plain JS object for this row
        //         if (!oData) continue;

        //         const sRow = aFieldDefs.map(f => {
        //             const sVal = this._formatValue(oData[f.name], f.type);
        //             return this._pad(sVal, f.len, f.numeric);
        //         }).join("");

        //         aLines.push(sRow);
        //     }

        //     // CRLF — compatible with Windows / mainframe / SAP downstream systems
        //     return aLines.join("\r\n");
        // },

        // ── Value formatter ───────────────────────────────────────────────────
        // _formatValue: function (vRaw, sType) {
        //     if (vRaw === null || vRaw === undefined) return "";

        //     switch (sType) {
        //         case "Edm.Boolean":
        //             return vRaw ? "true" : "false";

        //         case "Edm.Date":
        //             // OData v4 already gives "YYYY-MM-DD"
        //             return String(vRaw);

        //         case "Edm.TimeOfDay":
        //             return String(vRaw).substring(0, 8);   // HH:MM:SS

        //         case "Edm.DateTimeOffset":
        //             try {
        //                 // Normalise to "YYYY-MM-DD HH:MM:SS"
        //                 return new Date(vRaw).toISOString()
        //                     .replace("T", " ")
        //                     .substring(0, 19);
        //             } catch (e) {
        //                 return String(vRaw);
        //             }

        //         default:
        //             return String(vRaw);
        //     }
        // },

        // // ── Padding helper ────────────────────────────────────────────────────
        // /**
        //  * Pad / truncate sValue to exactly iLen characters.
        //  *
        //  * bNumeric = true  → RIGHT-align  →  "       123"  (left-pad  with spaces)
        //  * bNumeric = false → LEFT-align   →  "ABC       "  (right-pad with spaces)
        //  */
        // _pad: function (sValue, iLen, bNumeric) {
        //     const s = String(sValue ?? "");

        //     if (s.length === iLen) return s;

        //     if (s.length > iLen) {
        //         console.warn("[ListReportExt] Truncating value to fit field length:", s, "→", iLen);
        //         return s.substring(0, iLen);
        //     }

        //     const sPad = " ".repeat(iLen - s.length);
        //     return bNumeric ? sPad + s : s + sPad;
        // },

        // ── Browser download trigger ──────────────────────────────────────────
        // _download: function (sFilename, sContent) {
        //     const oBlob = new Blob([sContent], { type: "text/plain;charset=utf-8;" });
        //     const sUrl = URL.createObjectURL(oBlob);
        //     const oLink = document.createElement("a");

        //     oLink.href = sUrl;
        //     oLink.download = sFilename;
        //     oLink.style.display = "none";
        //     document.body.appendChild(oLink);
        //     oLink.click();
        //     document.body.removeChild(oLink);
        //     setTimeout(() => URL.revokeObjectURL(sUrl), 5000);
        // }

        // }); // end ControllerExtension.extend
        //
        // }
    }
});
