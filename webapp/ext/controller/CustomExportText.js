sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/export/CommaSeparatedValues",
    "sap/m/MessageBox",
    "sap/ui/core/BusyIndicator",
    "../handlers/exportUtilities"
], function (MessageToast, CommaSeparatedValues, MessageBox, BusyIndicator, exportUtilities) {
    'use strict';
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

                const table = exportUtilities.getFioriElementsTable(view);
                this._fieldsCache = await exportUtilities.resolveFieldDefs(view, this._fieldsCache, path, table);

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
