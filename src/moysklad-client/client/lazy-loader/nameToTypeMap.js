var outOperationAgents = {
    "sourceAgent": "myCompany",
    "targetAgent": "company"
};

var inboundOperationAgents = {
    "sourceAgent": "myCompany",
    "targetAgent": "myCompany"
};

module.exports = {

    "moysklad.invoiceOut": outOperationAgents,
    "moysklad.demand": outOperationAgents,
    "moysklad.purchaseReturn": outOperationAgents,
    "moysklad.factureOut": outOperationAgents,
    "moysklad.cashOut": outOperationAgents,
    "moysklad.paymentOut": outOperationAgents,

    "moysklad.loss": inboundOperationAgents,
    "moysklad.move": inboundOperationAgents,
    "moysklad.inventory": inboundOperationAgents,
    "moysklad.processingOrder": inboundOperationAgents,


    "moysklad.contract": {
        "ownCompany": "myCompany"
    },

    "moysklad.good": {
        "parent": "goodFolder"
    },

    "moysklad.processingPlanFolder": {
        "parent": "processingPlanFolder"
    },

    "moysklad.warehouse": {
        "parent": "warehouse"
    },

    "moysklad.attributeMetadata": {
        "entityMetadata": "embeddedEntityMetadata"
    },

    "moysklad.customEntity": {
        "entityMetadata": "customEntityMetadata"
    },

    // InOperation
    "sourceAgent": "company",
    "targetAgent": "myCompany",

    "sourceStore": "warehouse",
    "targetStore": "warehouse",
    "place": "warehouse",
    "acquire": "company",
    "carrier": "company",
    "agent": "company",
    "supplier": "company",

    "demands": "demand",
    "invoicesOut": "invoiceOut",
    "invoicesIn": "invoiceIn",
    "purchaseReturns": "purchaseReturn",
    "customerOrders": "customerOrder",
    "purchaseOrders": "purchaseOrder",
    "supplies": "supply",
    "salesReturns": "salesReturn",
    "enters": "enter",
    "losses": "loss",
    "returns": "return",
    "commissionreportout": "commissionReportOut",

    "entityValue": "customEntity",
    "agentValue": "company",
    "goodValue": "good",
    "placeValue": "warehouse",
    "consignmentValue": "consignment",
    "contractValue": "contract",
    "projectValue": "project",
    "employeeValue": "employee"

};
