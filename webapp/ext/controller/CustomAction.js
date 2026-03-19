sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/export/CommaSeparatedValues",
    "sap/ui/export/Spreadsheet"
], function (MessageToast, CommaSeparatedValues, Spreadsheet) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        customHandler: async function (oContext, aSelectedContexts) {
            MessageToast.show("Custom handler invoked.");

            const context = oContext;
            const selected = aSelectedContexts;
            const editFlow = this.editFlow;

            const view = editFlow.getView();
            const model = view.getModel();
            const path = "/Requests";

            const allData = model.getBindings()
                .filter(binding => binding.sPath.startsWith(path))
                .flatMap(binding => binding.aContexts.map(context => context.getObject()).filter(Boolean));
            // viewBindings.forEach(binding => {
            //     // Perform any necessary operations on the bindings here
            //     // filter /Requests
            //     if (binding.sPath === path) {
            //         for (const context of binding.aContexts) {
            //             const data = context.getObject();
            //             if (data) {
            //                 allData.push(data);
            //             }

            //         }
            //         // binding.aContexts.forEach(({ context }) => {
            //         //     const data = context.getObject();
            //         //     if (data) {
            //         //         allData.push(data);
            //         //     }
            //         // });
            //     }
            // });

            if (!allData) {
                console.log(allData);
                return;
            }

            //////////////custom export
            const createColumnConfig = () => {
                const aCols = [
                    {
                        label: "Request Number",
                        property: "RequestNumber"
                    },
                    {
                        label: "Title",
                        property: "Title"
                    },
                    {
                        label: "Description",
                        property: "Description"
                    }
                ];

                return aCols;
            }

            // const aCols = this.createColumnConfig();
            const aCols = createColumnConfig();
			// const oBinding = this.byId("exportTable").getBinding("items");

			// Define export settings
			const oSettings = {
				workbook: {
					columns: aCols,
					// separator: this.getView().getModel().getProperty("/separator")
					separator: ';'
				},
				dataSource: allData,
				fileName: "CSVExportData.txt"
			};

			// const oCSV = new CommaSeparatedValues(oSettings);
            const spreadSheet = new Spreadsheet(oSettings);

			// oCSV.build();
			spreadSheet.build();

            //////////////

            //test via bindList
            // const bindList = model.bindList("/Requests", undefined, undefined, undefined);
            // bindList.requestContexts(0, 100).then(
            //     (contexts) => {
            //         for (const context of contexts) {
            //             const data = context.getObject();
            //         }
            //     }
            // )

            // // await binding.invoke();

            // const boundContext = binding.getBoundContext();
            // const objects = boundContext.getObject();

            // if (objects) {

            // }
        }
    };
});


