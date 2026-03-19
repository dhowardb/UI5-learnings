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
            BusyIndicator.show(0);
            try {
                const editFlow = this.editFlow;
                const view = editFlow.getView();
                const model = view.getModel();
                const path = '/Requests'

                this._fieldsCache = await exportUtilities.resolveFieldDefs(view, this._fieldsCache, path);

                const contexts = model.getBindings()
                    .filter(binding => binding.sPath.startsWith(path))
                    .flatMap(binding => binding.aContexts.map(context => context.getObject()).filter(Boolean));

                if (!contexts || contexts.length === 0) {
                    MessageToast.show("No rows to export.");
                    return;
                }

                const content = exportUtilities.buildFixedLengthText(contexts, this._fieldsCache);
                exportUtilities.download("ListReport_Export.txt", content);

                MessageToast.show(`Exported ${contexts.length} row(s) successfully.`);

            } catch (error) {
                console.error("[ListReportExt] Export error:", error);
                MessageBox.error("Export failed:\n" + (error.message || String(error)));
            } finally {
                BusyIndicator.hide();
            }
        },
    }
});
