sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"rapdemojoule/test/integration/pages/RequestsList",
	"rapdemojoule/test/integration/pages/RequestsObjectPage"
], function (JourneyRunner, RequestsList, RequestsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('rapdemojoule') + '/test/flp.html#app-preview',
        pages: {
			onTheRequestsList: RequestsList,
			onTheRequestsObjectPage: RequestsObjectPage
        },
        async: true
    });

    return runner;
});

