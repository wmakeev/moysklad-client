/**
 * Moysklad.ObjectMapping
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Jsonix = require('jsonix');

var Map = module.exports;

var Model = Jsonix.Model,
    XSD = Jsonix.Schema.XSD,
    XML = Jsonix.XML;


/*********
 Objects
 ***********/

// abstractBarcode : entity
Map.AbstractBarcode = new Model.ClassInfo({
    name:'AbstractBarcode'
});

// abstractCashIn : financeIn
Map.AbstractCashIn = new Model.ClassInfo({
    name:'AbstractCashIn'
});

// abstractCashOut : financeOut
Map.AbstractCashOut = new Model.ClassInfo({
    name:'AbstractCashOut'
});

// abstractConnectorSetting : legendEntity
Map.AbstractConnectorSetting = new Model.ClassInfo({
    name:'AbstractConnectorSetting'
});

// abstractDemand : comingOutOperation
Map.AbstractDemand = new Model.ClassInfo({
    name:'AbstractDemand'
});

// abstractGood : goodFolder
Map.AbstractGood = new Model.ClassInfo({
    name:'AbstractGood'
});

// abstractSalesReturn : comingInOperation
Map.AbstractSalesReturn = new Model.ClassInfo({
    name:'AbstractSalesReturn'
});

// abstractShipmentOut : comingOut
Map.AbstractShipmentOut = new Model.ClassInfo({
    name:'AbstractShipmentOut'
});

// accountEntity : object
Map.AccountEntity = new Model.ClassInfo({
    name:'AccountEntity'
});

// agent : legendEntity
Map.Agent = new Model.ClassInfo({
    name:'Agent'
});

// agentAttributeValue : attributeValue
Map.AgentAttributeValue = new Model.ClassInfo({
    name:'AgentAttributeValue'
});

// agentNewsItem : infoEntity
Map.AgentNewsItem = new Model.ClassInfo({
    name:'AgentNewsItem'
});

// agentPictureDocument : document
Map.AgentPictureDocument = new Model.ClassInfo({
    name:'AgentPictureDocument'
});

// amiroConnectorSettings : operationConnectorSetting
Map.AmiroConnectorSettings = new Model.ClassInfo({
    name:'AmiroConnectorSettings'
});

// amiroCustomAttributeInfo : entity
Map.AmiroCustomAttributeInfo = new Model.ClassInfo({
    name:'AmiroCustomAttributeInfo'
});

// attachedDocument : document
Map.AttachedDocument = new Model.ClassInfo({
    name:'AttachedDocument'
});

// attachmentDocument : document
Map.AttachmentDocument = new Model.ClassInfo({
    name:'AttachmentDocument'
});

// attributeMetadata : legendEntity
Map.AttributeMetadata = new Model.ClassInfo({
    name:'AttributeMetadata'
});

// attributeValue : infoEntity
Map.AttributeValue = new Model.ClassInfo({
    name:'AttributeValue'
});

// bankAccount : object
Map.BankAccount = new Model.ClassInfo({
    name:'BankAccount'
});

// barcode : abstractBarcode
Map.Barcode = new Model.ClassInfo({
    name:'Barcode'
});

// cashIn : abstractCashIn
Map.CashIn = new Model.ClassInfo({
    name:'CashIn'
});

// cashOut : abstractCashOut
Map.CashOut = new Model.ClassInfo({
    name:'CashOut'
});

// classifier : legendEntity
Map.Classifier = new Model.ClassInfo({
    name:'Classifier'
});

// cmlConnectorSettings : operationConnectorSetting
Map.CmlConnectorSettings = new Model.ClassInfo({
    name:'CmlConnectorSettings'
});

// collection : object
Map.Collection = new Model.ClassInfo({
    name:'Collection'
});

// collectionContainer : object
Map.CollectionContainer = new Model.ClassInfo({
    name:'CollectionContainer'
});

// comingIn : stockMotion
Map.ComingIn = new Model.ClassInfo({
    name:'ComingIn'
});

// comingInOperation : stockOperation
Map.ComingInOperation = new Model.ClassInfo({
    name:'ComingInOperation'
});

// comingOut : stockMotion
Map.ComingOut = new Model.ClassInfo({
    name:'ComingOut'
});

// comingOutOperation : stockOperation
Map.ComingOutOperation = new Model.ClassInfo({
    name:'ComingOutOperation'
});

// company : agent
Map.Company = new Model.ClassInfo({
    name:'Company'
});

// consignment : legendEntity
Map.Consignment = new Model.ClassInfo({
    name:'Consignment'
});

// consignmentAttributeValue : attributeValue
Map.ConsignmentAttributeValue = new Model.ClassInfo({
    name:'ConsignmentAttributeValue'
});

// consignmentBarcode : abstractBarcode
Map.ConsignmentBarcode = new Model.ClassInfo({
    name:'ConsignmentBarcode'
});

// contact : object
Map.Contact = new Model.ClassInfo({
    name:'Contact'
});

// contactPerson : legendEntity
Map.ContactPerson = new Model.ClassInfo({
    name:'ContactPerson'
});

// contract : legendEntity
Map.Contract = new Model.ClassInfo({
    name:'Contract'
});

// contractAttributeValue : attributeValue
Map.ContractAttributeValue = new Model.ClassInfo({
    name:'ContractAttributeValue'
});

// contractDocument : attachedDocument
Map.ContractDocument = new Model.ClassInfo({
    name:'ContractDocument'
});

// country : predefinedLegendableEntity
Map.Country = new Model.ClassInfo({
    name:'Country'
});

// currency : legendEntity
Map.Currency = new Model.ClassInfo({
    name:'Currency'
});

// customEntity : legendEntity
Map.CustomEntity = new Model.ClassInfo({
    name:'CustomEntity'
});

// customEntityAttributeValue : attributeValue
Map.CustomEntityAttributeValue = new Model.ClassInfo({
    name:'CustomEntityAttributeValue'
});

// customEntityMetadata : entityMetadata
Map.CustomEntityMetadata = new Model.ClassInfo({
    name:'CustomEntityMetadata'
});

// customerOrder : order
Map.CustomerOrder = new Model.ClassInfo({
    name:'CustomerOrder'
});

// customerOrderPosition : orderPosition
Map.CustomerOrderPosition = new Model.ClassInfo({
    name:'CustomerOrderPosition'
});

// demand : abstractDemand
Map.Demand = new Model.ClassInfo({
    name:'Demand'
});

// demandExtension : operationExtension
Map.DemandExtension = new Model.ClassInfo({
    name:'DemandExtension'
});

// document : legendEntity
Map.Document = new Model.ClassInfo({
    name:'Document'
});

// documentMiniature : document
Map.DocumentMiniature = new Model.ClassInfo({
    name:'DocumentMiniature'
});

// embeddedEntityMetadata : entityMetadata
Map.EmbeddedEntityMetadata = new Model.ClassInfo({
    name:'EmbeddedEntityMetadata'
});

// employee : legendEntity
Map.Employee = new Model.ClassInfo({
    name:'Employee'
});

// employeeAttributeValue : attributeValue
Map.EmployeeAttributeValue = new Model.ClassInfo({
    name:'EmployeeAttributeValue'
});

// enter : comingInOperation
Map.Enter = new Model.ClassInfo({
    name:'Enter'
});

// enterPosition : comingIn
Map.EnterPosition = new Model.ClassInfo({
    name:'EnterPosition'
});

// entity : accountEntity
Map.Entity = new Model.ClassInfo({
    name:'Entity'
});

// entityMetadata : legendEntity
Map.EntityMetadata = new Model.ClassInfo({
    name:'EntityMetadata'
});

// entityTemplatesMetadata : templatesMetadata
Map.EntityTemplatesMetadata = new Model.ClassInfo({
    name:'EntityTemplatesMetadata'
});

// error : object
Map.Error = new Model.ClassInfo({
    name:'Error'
});

// exchangeContainer : object
Map.ExchangeContainer = new Model.ClassInfo({
    name:'ExchangeContainer'
});

// facture : operationWithPositions
Map.Facture = new Model.ClassInfo({
    name:'Facture'
});

// factureIn : facture
Map.FactureIn = new Model.ClassInfo({
    name:'FactureIn'
});

// factureOut : facture
Map.FactureOut = new Model.ClassInfo({
    name:'FactureOut'
});

// factureOutExtension : operationExtension
Map.FactureOutExtension = new Model.ClassInfo({
    name:'FactureOutExtension'
});

// feature : infoEntity
Map.Feature = new Model.ClassInfo({
    name:'Feature'
});

// featureAttributeValue : attributeValue
Map.FeatureAttributeValue = new Model.ClassInfo({
    name:'FeatureAttributeValue'
});

// finance : operation
Map.Finance = new Model.ClassInfo({
    name:'Finance'
});

// financeIn : finance
Map.FinanceIn = new Model.ClassInfo({
    name:'FinanceIn'
});

// financeOut : finance
Map.FinanceOut = new Model.ClassInfo({
    name:'FinanceOut'
});

// good : abstractGood
Map.Good = new Model.ClassInfo({
    name:'Good'
});

// goodAttributeValue : attributeValue
Map.GoodAttributeValue = new Model.ClassInfo({
    name:'GoodAttributeValue'
});

// goodFolder : classifier
Map.GoodFolder = new Model.ClassInfo({
    name:'GoodFolder'
});

// goodPack : entity
Map.GoodPack = new Model.ClassInfo({
    name:'GoodPack'
});

// goodPrices : object
Map.GoodPrices = new Model.ClassInfo({
    name:'GoodPrices'
});

// goodSlotPreference : entity
Map.GoodSlotPreference = new Model.ClassInfo({
    name:'GoodSlotPreference'
});

// gtd : legendEntity
Map.Gtd = new Model.ClassInfo({
    name:'Gtd'
});

// infoEntity : entity
Map.InfoEntity = new Model.ClassInfo({
    name:'InfoEntity'
});

// internalOrder : order
Map.InternalOrder = new Model.ClassInfo({
    name:'InternalOrder'
});

// inventory : operationWithPositions
Map.Inventory = new Model.ClassInfo({
    name:'Inventory'
});

// inventoryPosition : motion
Map.InventoryPosition = new Model.ClassInfo({
    name:'InventoryPosition'
});

// invoice : operationWithPositions
Map.Invoice = new Model.ClassInfo({
    name:'Invoice'
});

// invoiceIn : invoice
Map.InvoiceIn = new Model.ClassInfo({
    name:'InvoiceIn'
});

// invoiceOut : invoice
Map.InvoiceOut = new Model.ClassInfo({
    name:'InvoiceOut'
});

// invoicePosition : motion
Map.InvoicePosition = new Model.ClassInfo({
    name:'InvoicePosition'
});

// legendEntity : infoEntity
Map.LegendEntity = new Model.ClassInfo({
    name:'LegendEntity'
});

// loss : comingOutOperation
Map.Loss = new Model.ClassInfo({
    name:'Loss'
});

// lossPosition : comingOut
Map.LossPosition = new Model.ClassInfo({
    name:'LossPosition'
});

// material : processingPlanItem
Map.Material = new Model.ClassInfo({
    name:'Material'
});

// moneyAmount : object
Map.MoneyAmount = new Model.ClassInfo({
    name:'MoneyAmount'
});

// motion : entity
Map.Motion = new Model.ClassInfo({
    name:'Motion'
});

// move : stockOperation
Map.Move = new Model.ClassInfo({
    name:'Move'
});

// movePosition : stockMotion
Map.MovePosition = new Model.ClassInfo({
    name:'MovePosition'
});

// myCompany : company
Map.MyCompany = new Model.ClassInfo({
    name:'MyCompany'
});

// operation : legendEntity
Map.Operation = new Model.ClassInfo({
    name:'Operation'
});

// operationAttributeValue : attributeValue
Map.OperationAttributeValue = new Model.ClassInfo({
    name:'OperationAttributeValue'
});

// operationConnectorSetting : abstractConnectorSetting
Map.OperationConnectorSetting = new Model.ClassInfo({
    name:'OperationConnectorSetting'
});

// operationDocument : attachedDocument
Map.OperationDocument = new Model.ClassInfo({
    name:'OperationDocument'
});

// operationExtension : object
Map.OperationExtension = new Model.ClassInfo({
    name:'OperationExtension'
});

// operationWithPositions : operation
Map.OperationWithPositions = new Model.ClassInfo({
    name:'OperationWithPositions'
});

// order : operationWithPositions
Map.Order = new Model.ClassInfo({
    name:'Order'
});

// orderPosition : motion
Map.OrderPosition = new Model.ClassInfo({
    name:'OrderPosition'
});

// paymentIn : financeIn
Map.PaymentIn = new Model.ClassInfo({
    name:'PaymentIn'
});

// paymentOut : financeOut
Map.PaymentOut = new Model.ClassInfo({
    name:'PaymentOut'
});

// place : classifier
Map.Place = new Model.ClassInfo({
    name:'Place'
});

// placeAttributeValue : attributeValue
Map.PlaceAttributeValue = new Model.ClassInfo({
    name:'PlaceAttributeValue'
});

// predefinedLegendableEntity : legendEntity
Map.PredefinedLegendableEntity = new Model.ClassInfo({
    name:'PredefinedLegendableEntity'
});

// price : entity
Map.Price = new Model.ClassInfo({
    name:'Price'
});

// priceList : operationWithPositions
Map.PriceList = new Model.ClassInfo({
    name:'PriceList'
});

// priceListCell : entity
Map.PriceListCell = new Model.ClassInfo({
    name:'PriceListCell'
});

// priceListCellArray : object
Map.PriceListCellArray = new Model.ClassInfo({
    name:'PriceListCellArray'
});

// priceListMetadata : legendEntity
Map.PriceListMetadata = new Model.ClassInfo({
    name:'PriceListMetadata'
});

// priceListMetadataColumn : legendEntity
Map.PriceListMetadataColumn = new Model.ClassInfo({
    name:'PriceListMetadataColumn'
});

// priceListRow : motion
Map.PriceListRow = new Model.ClassInfo({
    name:'PriceListRow'
});

// priceType : infoEntity
Map.PriceType = new Model.ClassInfo({
    name:'PriceType'
});

// processing : stockOperation
Map.Processing = new Model.ClassInfo({
    name:'Processing'
});

// processingOrder : order
Map.ProcessingOrder = new Model.ClassInfo({
    name:'ProcessingOrder'
});

// processingPlan : processingPlanFolder
Map.ProcessingPlan = new Model.ClassInfo({
    name:'ProcessingPlan'
});

// processingPlanFolder : classifier
Map.ProcessingPlanFolder = new Model.ClassInfo({
    name:'ProcessingPlanFolder'
});

// processingPlanItem : entity
Map.ProcessingPlanItem = new Model.ClassInfo({
    name:'ProcessingPlanItem'
});

// processingPositionMaterial : comingOut
Map.ProcessingPositionMaterial = new Model.ClassInfo({
    name:'ProcessingPositionMaterial'
});

// processingPositionResult : comingIn
Map.ProcessingPositionResult = new Model.ClassInfo({
    name:'ProcessingPositionResult'
});

// product : processingPlanItem
Map.Product = new Model.ClassInfo({
    name:'Product'
});

// project : legendEntity
Map.Project = new Model.ClassInfo({
    name:'Project'
});

// projectAttributeValue : attributeValue
Map.ProjectAttributeValue = new Model.ClassInfo({
    name:'ProjectAttributeValue'
});

// purchaseOrder : order
Map.PurchaseOrder = new Model.ClassInfo({
    name:'PurchaseOrder'
});

// purchaseOrderPosition : orderPosition
Map.PurchaseOrderPosition = new Model.ClassInfo({
    name:'PurchaseOrderPosition'
});

// purchaseReturn : comingOutOperation
Map.PurchaseReturn = new Model.ClassInfo({
    name:'PurchaseReturn'
});

// purchaseReturnPosition : abstractShipmentOut
Map.PurchaseReturnPosition = new Model.ClassInfo({
    name:'PurchaseReturnPosition'
});

// reportTemplatesMetadata : templatesMetadata
Map.ReportTemplatesMetadata = new Model.ClassInfo({
    name:'ReportTemplatesMetadata'
});

// requisite : object
Map.Requisite = new Model.ClassInfo({
    name:'Requisite'
});

// retailCashIn : abstractCashIn
Map.RetailCashIn = new Model.ClassInfo({
    name:'RetailCashIn'
});

// retailCashOut : abstractCashOut
Map.RetailCashOut = new Model.ClassInfo({
    name:'RetailCashOut'
});

// retailDemand : abstractDemand
Map.RetailDemand = new Model.ClassInfo({
    name:'RetailDemand'
});

// retailSalesReturn : abstractSalesReturn
Map.RetailSalesReturn = new Model.ClassInfo({
    name:'RetailSalesReturn'
});

// retailStore : legendEntity
Map.RetailStore = new Model.ClassInfo({
    name:'RetailStore'
});

// salesReturn : abstractSalesReturn
Map.SalesReturn = new Model.ClassInfo({
    name:'SalesReturn'
});

// salesReturnPosition : comingIn
Map.SalesReturnPosition = new Model.ClassInfo({
    name:'SalesReturnPosition'
});

// service : abstractGood
Map.Service = new Model.ClassInfo({
    name:'Service'
});

// shareMode : legendEntity
Map.ShareMode = new Model.ClassInfo({
    name:'ShareMode'
});

// shipmentIn : comingIn
Map.ShipmentIn = new Model.ClassInfo({
    name:'ShipmentIn'
});

// shipmentOut : abstractShipmentOut
Map.ShipmentOut = new Model.ClassInfo({
    name:'ShipmentOut'
});

// skladShareMode : shareMode
Map.SkladShareMode = new Model.ClassInfo({
    name:'SkladShareMode'
});

// slot : legendEntity
Map.Slot = new Model.ClassInfo({
    name:'Slot'
});

// state : legendEntity
Map.State = new Model.ClassInfo({
    name:'State'
});

// stockMotion : motion
Map.StockMotion = new Model.ClassInfo({
    name:'StockMotion'
});

// stockOperation : operationWithPositions
Map.StockOperation = new Model.ClassInfo({
    name:'StockOperation'
});

// supply : comingInOperation
Map.Supply = new Model.ClassInfo({
    name:'Supply'
});

// template : document
Map.Template = new Model.ClassInfo({
    name:'Template'
});

// templatesMetadata : legendEntity
Map.TemplatesMetadata = new Model.ClassInfo({
    name:'TemplatesMetadata'
});

// thing : legendEntity
Map.Thing = new Model.ClassInfo({
    name:'Thing'
});

// thingAttributeValue : attributeValue
Map.ThingAttributeValue = new Model.ClassInfo({
    name:'ThingAttributeValue'
});

// unit : object
Map.Unit = new Model.ClassInfo({
    name:'Unit'
});

// uom : predefinedLegendableEntity
Map.Uom = new Model.ClassInfo({
    name:'Uom'
});

// warehouse : place
Map.Warehouse = new Model.ClassInfo({
    name:'Warehouse'
});

// workflow : legendEntity
Map.Workflow = new Model.ClassInfo({
    name:'Workflow'
});

// ymlConnectorSettings : abstractConnectorSetting
Map.YmlConnectorSettings = new Model.ClassInfo({
    name:'YmlConnectorSettings'
});



/*************
 Inheritance
 ***************/

// entity : accountEntity
Map.Entity.baseTypeInfo = Map.AccountEntity;

// abstractBarcode : entity
Map.AbstractBarcode.baseTypeInfo = Map.Entity;

// amiroCustomAttributeInfo : entity
Map.AmiroCustomAttributeInfo.baseTypeInfo = Map.Entity;

// goodPack : entity
Map.GoodPack.baseTypeInfo = Map.Entity;

// goodSlotPreference : entity
Map.GoodSlotPreference.baseTypeInfo = Map.Entity;

// infoEntity : entity
Map.InfoEntity.baseTypeInfo = Map.Entity;

// motion : entity
Map.Motion.baseTypeInfo = Map.Entity;

// price : entity
Map.Price.baseTypeInfo = Map.Entity;

// priceListCell : entity
Map.PriceListCell.baseTypeInfo = Map.Entity;

// processingPlanItem : entity
Map.ProcessingPlanItem.baseTypeInfo = Map.Entity;

// barcode : abstractBarcode
Map.Barcode.baseTypeInfo = Map.AbstractBarcode;

// consignmentBarcode : abstractBarcode
Map.ConsignmentBarcode.baseTypeInfo = Map.AbstractBarcode;

// agentNewsItem : infoEntity
Map.AgentNewsItem.baseTypeInfo = Map.InfoEntity;

// attributeValue : infoEntity
Map.AttributeValue.baseTypeInfo = Map.InfoEntity;

// feature : infoEntity
Map.Feature.baseTypeInfo = Map.InfoEntity;

// legendEntity : infoEntity
Map.LegendEntity.baseTypeInfo = Map.InfoEntity;

// priceType : infoEntity
Map.PriceType.baseTypeInfo = Map.InfoEntity;

// agentAttributeValue : attributeValue
Map.AgentAttributeValue.baseTypeInfo = Map.AttributeValue;

// consignmentAttributeValue : attributeValue
Map.ConsignmentAttributeValue.baseTypeInfo = Map.AttributeValue;

// contractAttributeValue : attributeValue
Map.ContractAttributeValue.baseTypeInfo = Map.AttributeValue;

// customEntityAttributeValue : attributeValue
Map.CustomEntityAttributeValue.baseTypeInfo = Map.AttributeValue;

// employeeAttributeValue : attributeValue
Map.EmployeeAttributeValue.baseTypeInfo = Map.AttributeValue;

// featureAttributeValue : attributeValue
Map.FeatureAttributeValue.baseTypeInfo = Map.AttributeValue;

// goodAttributeValue : attributeValue
Map.GoodAttributeValue.baseTypeInfo = Map.AttributeValue;

// operationAttributeValue : attributeValue
Map.OperationAttributeValue.baseTypeInfo = Map.AttributeValue;

// placeAttributeValue : attributeValue
Map.PlaceAttributeValue.baseTypeInfo = Map.AttributeValue;

// projectAttributeValue : attributeValue
Map.ProjectAttributeValue.baseTypeInfo = Map.AttributeValue;

// thingAttributeValue : attributeValue
Map.ThingAttributeValue.baseTypeInfo = Map.AttributeValue;

// abstractConnectorSetting : legendEntity
Map.AbstractConnectorSetting.baseTypeInfo = Map.LegendEntity;

// agent : legendEntity
Map.Agent.baseTypeInfo = Map.LegendEntity;

// attributeMetadata : legendEntity
Map.AttributeMetadata.baseTypeInfo = Map.LegendEntity;

// classifier : legendEntity
Map.Classifier.baseTypeInfo = Map.LegendEntity;

// consignment : legendEntity
Map.Consignment.baseTypeInfo = Map.LegendEntity;

// contactPerson : legendEntity
Map.ContactPerson.baseTypeInfo = Map.LegendEntity;

// contract : legendEntity
Map.Contract.baseTypeInfo = Map.LegendEntity;

// currency : legendEntity
Map.Currency.baseTypeInfo = Map.LegendEntity;

// customEntity : legendEntity
Map.CustomEntity.baseTypeInfo = Map.LegendEntity;

// document : legendEntity
Map.Document.baseTypeInfo = Map.LegendEntity;

// employee : legendEntity
Map.Employee.baseTypeInfo = Map.LegendEntity;

// entityMetadata : legendEntity
Map.EntityMetadata.baseTypeInfo = Map.LegendEntity;

// gtd : legendEntity
Map.Gtd.baseTypeInfo = Map.LegendEntity;

// operation : legendEntity
Map.Operation.baseTypeInfo = Map.LegendEntity;

// predefinedLegendableEntity : legendEntity
Map.PredefinedLegendableEntity.baseTypeInfo = Map.LegendEntity;

// priceListMetadata : legendEntity
Map.PriceListMetadata.baseTypeInfo = Map.LegendEntity;

// priceListMetadataColumn : legendEntity
Map.PriceListMetadataColumn.baseTypeInfo = Map.LegendEntity;

// project : legendEntity
Map.Project.baseTypeInfo = Map.LegendEntity;

// retailStore : legendEntity
Map.RetailStore.baseTypeInfo = Map.LegendEntity;

// shareMode : legendEntity
Map.ShareMode.baseTypeInfo = Map.LegendEntity;

// slot : legendEntity
Map.Slot.baseTypeInfo = Map.LegendEntity;

// state : legendEntity
Map.State.baseTypeInfo = Map.LegendEntity;

// templatesMetadata : legendEntity
Map.TemplatesMetadata.baseTypeInfo = Map.LegendEntity;

// thing : legendEntity
Map.Thing.baseTypeInfo = Map.LegendEntity;

// workflow : legendEntity
Map.Workflow.baseTypeInfo = Map.LegendEntity;

// operationConnectorSetting : abstractConnectorSetting
Map.OperationConnectorSetting.baseTypeInfo = Map.AbstractConnectorSetting;

// ymlConnectorSettings : abstractConnectorSetting
Map.YmlConnectorSettings.baseTypeInfo = Map.AbstractConnectorSetting;

// amiroConnectorSettings : operationConnectorSetting
Map.AmiroConnectorSettings.baseTypeInfo = Map.OperationConnectorSetting;

// cmlConnectorSettings : operationConnectorSetting
Map.CmlConnectorSettings.baseTypeInfo = Map.OperationConnectorSetting;

// company : agent
Map.Company.baseTypeInfo = Map.Agent;

// myCompany : company
Map.MyCompany.baseTypeInfo = Map.Company;

// goodFolder : classifier
Map.GoodFolder.baseTypeInfo = Map.Classifier;

// place : classifier
Map.Place.baseTypeInfo = Map.Classifier;

// processingPlanFolder : classifier
Map.ProcessingPlanFolder.baseTypeInfo = Map.Classifier;

// abstractGood : goodFolder
Map.AbstractGood.baseTypeInfo = Map.GoodFolder;

// good : abstractGood
Map.Good.baseTypeInfo = Map.AbstractGood;

// service : abstractGood
Map.Service.baseTypeInfo = Map.AbstractGood;

// warehouse : place
Map.Warehouse.baseTypeInfo = Map.Place;

// processingPlan : processingPlanFolder
Map.ProcessingPlan.baseTypeInfo = Map.ProcessingPlanFolder;

// agentPictureDocument : document
Map.AgentPictureDocument.baseTypeInfo = Map.Document;

// attachedDocument : document
Map.AttachedDocument.baseTypeInfo = Map.Document;

// attachmentDocument : document
Map.AttachmentDocument.baseTypeInfo = Map.Document;

// documentMiniature : document
Map.DocumentMiniature.baseTypeInfo = Map.Document;

// template : document
Map.Template.baseTypeInfo = Map.Document;

// contractDocument : attachedDocument
Map.ContractDocument.baseTypeInfo = Map.AttachedDocument;

// operationDocument : attachedDocument
Map.OperationDocument.baseTypeInfo = Map.AttachedDocument;

// customEntityMetadata : entityMetadata
Map.CustomEntityMetadata.baseTypeInfo = Map.EntityMetadata;

// embeddedEntityMetadata : entityMetadata
Map.EmbeddedEntityMetadata.baseTypeInfo = Map.EntityMetadata;

// finance : operation
Map.Finance.baseTypeInfo = Map.Operation;

// operationWithPositions : operation
Map.OperationWithPositions.baseTypeInfo = Map.Operation;

// financeIn : finance
Map.FinanceIn.baseTypeInfo = Map.Finance;

// financeOut : finance
Map.FinanceOut.baseTypeInfo = Map.Finance;

// abstractCashIn : financeIn
Map.AbstractCashIn.baseTypeInfo = Map.FinanceIn;

// paymentIn : financeIn
Map.PaymentIn.baseTypeInfo = Map.FinanceIn;

// cashIn : abstractCashIn
Map.CashIn.baseTypeInfo = Map.AbstractCashIn;

// retailCashIn : abstractCashIn
Map.RetailCashIn.baseTypeInfo = Map.AbstractCashIn;

// abstractCashOut : financeOut
Map.AbstractCashOut.baseTypeInfo = Map.FinanceOut;

// paymentOut : financeOut
Map.PaymentOut.baseTypeInfo = Map.FinanceOut;

// cashOut : abstractCashOut
Map.CashOut.baseTypeInfo = Map.AbstractCashOut;

// retailCashOut : abstractCashOut
Map.RetailCashOut.baseTypeInfo = Map.AbstractCashOut;

// facture : operationWithPositions
Map.Facture.baseTypeInfo = Map.OperationWithPositions;

// inventory : operationWithPositions
Map.Inventory.baseTypeInfo = Map.OperationWithPositions;

// invoice : operationWithPositions
Map.Invoice.baseTypeInfo = Map.OperationWithPositions;

// order : operationWithPositions
Map.Order.baseTypeInfo = Map.OperationWithPositions;

// priceList : operationWithPositions
Map.PriceList.baseTypeInfo = Map.OperationWithPositions;

// stockOperation : operationWithPositions
Map.StockOperation.baseTypeInfo = Map.OperationWithPositions;

// factureIn : facture
Map.FactureIn.baseTypeInfo = Map.Facture;

// factureOut : facture
Map.FactureOut.baseTypeInfo = Map.Facture;

// invoiceIn : invoice
Map.InvoiceIn.baseTypeInfo = Map.Invoice;

// invoiceOut : invoice
Map.InvoiceOut.baseTypeInfo = Map.Invoice;

// customerOrder : order
Map.CustomerOrder.baseTypeInfo = Map.Order;

// internalOrder : order
Map.InternalOrder.baseTypeInfo = Map.Order;

// processingOrder : order
Map.ProcessingOrder.baseTypeInfo = Map.Order;

// purchaseOrder : order
Map.PurchaseOrder.baseTypeInfo = Map.Order;

// comingInOperation : stockOperation
Map.ComingInOperation.baseTypeInfo = Map.StockOperation;

// comingOutOperation : stockOperation
Map.ComingOutOperation.baseTypeInfo = Map.StockOperation;

// move : stockOperation
Map.Move.baseTypeInfo = Map.StockOperation;

// processing : stockOperation
Map.Processing.baseTypeInfo = Map.StockOperation;

// abstractSalesReturn : comingInOperation
Map.AbstractSalesReturn.baseTypeInfo = Map.ComingInOperation;

// enter : comingInOperation
Map.Enter.baseTypeInfo = Map.ComingInOperation;

// supply : comingInOperation
Map.Supply.baseTypeInfo = Map.ComingInOperation;

// retailSalesReturn : abstractSalesReturn
Map.RetailSalesReturn.baseTypeInfo = Map.AbstractSalesReturn;

// salesReturn : abstractSalesReturn
Map.SalesReturn.baseTypeInfo = Map.AbstractSalesReturn;

// abstractDemand : comingOutOperation
Map.AbstractDemand.baseTypeInfo = Map.ComingOutOperation;

// loss : comingOutOperation
Map.Loss.baseTypeInfo = Map.ComingOutOperation;

// purchaseReturn : comingOutOperation
Map.PurchaseReturn.baseTypeInfo = Map.ComingOutOperation;

// demand : abstractDemand
Map.Demand.baseTypeInfo = Map.AbstractDemand;

// retailDemand : abstractDemand
Map.RetailDemand.baseTypeInfo = Map.AbstractDemand;

// country : predefinedLegendableEntity
Map.Country.baseTypeInfo = Map.PredefinedLegendableEntity;

// uom : predefinedLegendableEntity
Map.Uom.baseTypeInfo = Map.PredefinedLegendableEntity;

// skladShareMode : shareMode
Map.SkladShareMode.baseTypeInfo = Map.ShareMode;

// entityTemplatesMetadata : templatesMetadata
Map.EntityTemplatesMetadata.baseTypeInfo = Map.TemplatesMetadata;

// reportTemplatesMetadata : templatesMetadata
Map.ReportTemplatesMetadata.baseTypeInfo = Map.TemplatesMetadata;

// inventoryPosition : motion
Map.InventoryPosition.baseTypeInfo = Map.Motion;

// invoicePosition : motion
Map.InvoicePosition.baseTypeInfo = Map.Motion;

// orderPosition : motion
Map.OrderPosition.baseTypeInfo = Map.Motion;

// priceListRow : motion
Map.PriceListRow.baseTypeInfo = Map.Motion;

// stockMotion : motion
Map.StockMotion.baseTypeInfo = Map.Motion;

// customerOrderPosition : orderPosition
Map.CustomerOrderPosition.baseTypeInfo = Map.OrderPosition;

// purchaseOrderPosition : orderPosition
Map.PurchaseOrderPosition.baseTypeInfo = Map.OrderPosition;

// comingIn : stockMotion
Map.ComingIn.baseTypeInfo = Map.StockMotion;

// comingOut : stockMotion
Map.ComingOut.baseTypeInfo = Map.StockMotion;

// movePosition : stockMotion
Map.MovePosition.baseTypeInfo = Map.StockMotion;

// enterPosition : comingIn
Map.EnterPosition.baseTypeInfo = Map.ComingIn;

// processingPositionResult : comingIn
Map.ProcessingPositionResult.baseTypeInfo = Map.ComingIn;

// salesReturnPosition : comingIn
Map.SalesReturnPosition.baseTypeInfo = Map.ComingIn;

// shipmentIn : comingIn
Map.ShipmentIn.baseTypeInfo = Map.ComingIn;

// abstractShipmentOut : comingOut
Map.AbstractShipmentOut.baseTypeInfo = Map.ComingOut;

// lossPosition : comingOut
Map.LossPosition.baseTypeInfo = Map.ComingOut;

// processingPositionMaterial : comingOut
Map.ProcessingPositionMaterial.baseTypeInfo = Map.ComingOut;

// purchaseReturnPosition : abstractShipmentOut
Map.PurchaseReturnPosition.baseTypeInfo = Map.AbstractShipmentOut;

// shipmentOut : abstractShipmentOut
Map.ShipmentOut.baseTypeInfo = Map.AbstractShipmentOut;

// material : processingPlanItem
Map.Material.baseTypeInfo = Map.ProcessingPlanItem;

// product : processingPlanItem
Map.Product.baseTypeInfo = Map.ProcessingPlanItem;



/***********
 Elements
 *************/

Map.elementInfos = [
    {
        elementName: new XML.QName('agent'),
        typeInfo: Map.Agent
    },
    {
        elementName: new XML.QName('agentPictureDocument'),
        typeInfo: Map.AgentPictureDocument
    },
    {
        elementName: new XML.QName('amiroConnectorSettings'),
        typeInfo: Map.AmiroConnectorSettings
    },
    {
        elementName: new XML.QName('attachmentDocument'),
        typeInfo: Map.AttachmentDocument
    },
    {
        elementName: new XML.QName('barcode'),
        typeInfo: Map.Barcode
    },
    {
        elementName: new XML.QName('cashIn'),
        typeInfo: Map.CashIn
    },
    {
        elementName: new XML.QName('cashOut'),
        typeInfo: Map.CashOut
    },
    {
        elementName: new XML.QName('cmlConnectorSettings'),
        typeInfo: Map.CmlConnectorSettings
    },
    {
        elementName: new XML.QName('collection'),
        typeInfo: Map.Collection
    },
    {
        elementName: new XML.QName('company'),
        typeInfo: Map.Company
    },
    {
        elementName: new XML.QName('consignment'),
        typeInfo: Map.Consignment
    },
    {
        elementName: new XML.QName('consignmentBarcode'),
        typeInfo: Map.ConsignmentBarcode
    },
    {
        elementName: new XML.QName('contract'),
        typeInfo: Map.Contract
    },
    {
        elementName: new XML.QName('contractDocument'),
        typeInfo: Map.ContractDocument
    },
    {
        elementName: new XML.QName('country'),
        typeInfo: Map.Country
    },
    {
        elementName: new XML.QName('currency'),
        typeInfo: Map.Currency
    },
    {
        elementName: new XML.QName('customEntity'),
        typeInfo: Map.CustomEntity
    },
    {
        elementName: new XML.QName('customEntityMetadata'),
        typeInfo: Map.CustomEntityMetadata
    },
    {
        elementName: new XML.QName('customerOrder'),
        typeInfo: Map.CustomerOrder
    },
    {
        elementName: new XML.QName('demand'),
        typeInfo: Map.Demand
    },
    {
        elementName: new XML.QName('document'),
        typeInfo: Map.Document
    },
    {
        elementName: new XML.QName('documentMiniature'),
        typeInfo: Map.DocumentMiniature
    },
    {
        elementName: new XML.QName('embeddedEntityMetadata'),
        typeInfo: Map.EmbeddedEntityMetadata
    },
    {
        elementName: new XML.QName('employee'),
        typeInfo: Map.Employee
    },
    {
        elementName: new XML.QName('enter'),
        typeInfo: Map.Enter
    },
    {
        elementName: new XML.QName('entityTemplatesMetadata'),
        typeInfo: Map.EntityTemplatesMetadata
    },
    {
        elementName: new XML.QName('exchange'),
        typeInfo: Map.ExchangeContainer
    },
    {
        elementName: new XML.QName('factureIn'),
        typeInfo: Map.FactureIn
    },
    {
        elementName: new XML.QName('factureOut'),
        typeInfo: Map.FactureOut
    },
    {
        elementName: new XML.QName('feature'),
        typeInfo: Map.Feature
    },
    {
        elementName: new XML.QName('good'),
        typeInfo: Map.Good
    },
    {
        elementName: new XML.QName('goodFolder'),
        typeInfo: Map.GoodFolder
    },
    {
        elementName: new XML.QName('gtd'),
        typeInfo: Map.Gtd
    },
    {
        elementName: new XML.QName('internalOrder'),
        typeInfo: Map.InternalOrder
    },
    {
        elementName: new XML.QName('inventory'),
        typeInfo: Map.Inventory
    },
    {
        elementName: new XML.QName('invoiceIn'),
        typeInfo: Map.InvoiceIn
    },
    {
        elementName: new XML.QName('invoiceOut'),
        typeInfo: Map.InvoiceOut
    },
    {
        elementName: new XML.QName('loss'),
        typeInfo: Map.Loss
    },
    {
        elementName: new XML.QName('move'),
        typeInfo: Map.Move
    },
    {
        elementName: new XML.QName('myCompany'),
        typeInfo: Map.MyCompany
    },
    {
        elementName: new XML.QName('operationDocument'),
        typeInfo: Map.OperationDocument
    },
    {
        elementName: new XML.QName('paymentIn'),
        typeInfo: Map.PaymentIn
    },
    {
        elementName: new XML.QName('paymentOut'),
        typeInfo: Map.PaymentOut
    },
    {
        elementName: new XML.QName('place'),
        typeInfo: Map.Place
    },
    {
        elementName: new XML.QName('priceList'),
        typeInfo: Map.PriceList
    },
    {
        elementName: new XML.QName('priceType'),
        typeInfo: Map.PriceType
    },
    {
        elementName: new XML.QName('processing'),
        typeInfo: Map.Processing
    },
    {
        elementName: new XML.QName('processingOrder'),
        typeInfo: Map.ProcessingOrder
    },
    {
        elementName: new XML.QName('processingPlan'),
        typeInfo: Map.ProcessingPlan
    },
    {
        elementName: new XML.QName('processingPlanFolder'),
        typeInfo: Map.ProcessingPlanFolder
    },
    {
        elementName: new XML.QName('project'),
        typeInfo: Map.Project
    },
    {
        elementName: new XML.QName('purchaseOrder'),
        typeInfo: Map.PurchaseOrder
    },
    {
        elementName: new XML.QName('purchaseReturn'),
        typeInfo: Map.PurchaseReturn
    },
    {
        elementName: new XML.QName('reportTemplatesMetadata'),
        typeInfo: Map.ReportTemplatesMetadata
    },
    {
        elementName: new XML.QName('retailCashIn'),
        typeInfo: Map.RetailCashIn
    },
    {
        elementName: new XML.QName('retailCashOut'),
        typeInfo: Map.RetailCashOut
    },
    {
        elementName: new XML.QName('retailDemand'),
        typeInfo: Map.RetailDemand
    },
    {
        elementName: new XML.QName('retailSalesReturn'),
        typeInfo: Map.RetailSalesReturn
    },
    {
        elementName: new XML.QName('salesReturn'),
        typeInfo: Map.SalesReturn
    },
    {
        elementName: new XML.QName('service'),
        typeInfo: Map.Service
    },
    {
        elementName: new XML.QName('skladShareMode'),
        typeInfo: Map.SkladShareMode
    },
    {
        elementName: new XML.QName('slot'),
        typeInfo: Map.Slot
    },
    {
        elementName: new XML.QName('supply'),
        typeInfo: Map.Supply
    },
    {
        elementName: new XML.QName('template'),
        typeInfo: Map.Template
    },
    {
        elementName: new XML.QName('thing'),
        typeInfo: Map.Thing
    },
    {
        elementName: new XML.QName('uom'),
        typeInfo: Map.Uom
    },
    {
        elementName: new XML.QName('warehouse'),
        typeInfo: Map.Warehouse
    },
    {
        elementName: new XML.QName('workflow'),
        typeInfo: Map.Workflow
    },
    {
        elementName: new XML.QName('ymlConnectorSettings'),
        typeInfo: Map.YmlConnectorSettings
    },
    {
        elementName: new XML.QName('error'),
        typeInfo: Map.Error
    }
];

/************
 Properties
 **************/

// abstractBarcode : entity
Map.AbstractBarcode.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'barcode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'barcodeType',
        typeInfo : XSD.String.INSTANCE
    })
];

// abstractCashIn : financeIn
Map.AbstractCashIn.propertyInfos = [];

// abstractCashOut : financeOut
Map.AbstractCashOut.propertyInfos = [];

// abstractConnectorSetting : legendEntity
Map.AbstractConnectorSetting.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'active',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'login',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'organizationId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'organizationUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'password',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'pollPeriod',
        typeInfo : XSD.Int.INSTANCE
    })
];

// abstractDemand : comingOutOperation
Map.AbstractDemand.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'customerOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesOutUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceOutRef'),
        wrapperElementName : new XML.QName('invoicesOutUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesOut',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceOutRef'),
        wrapperElementName : new XML.QName('invoicesOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'salesPreturns',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('salesReturnRef'),
        wrapperElementName : new XML.QName('salesPreturns')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'shipmentOut',
        typeInfo : Map.ShipmentOut,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'salesReturnsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('salesReturnRef'),
        wrapperElementName : new XML.QName('salesReturnsUuid')
    })
];

// abstractGood : goodFolder
Map.AbstractGood.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'minPrice',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'uomUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'countryUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'supplierUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'salePrice',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'saleCurrencyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'buyCurrencyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    [
        0,                              // AttributePropertyInfo
        [
            0, "buyCurrencyUuid",       // name : 'buyCurrencyUuid',
            1, 71                       // typeInfo : XSD.String.INSTANCE
        ]
    ],
    new Model.AttributePropertyInfo({
        name : 'buyCurrencyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'countryId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'saleCurrencyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'supplierId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'uomId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'barcode',
        typeInfo : Map.Barcode,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'salePrices',
        typeInfo : Map.Price,
        collection : true,
        elementName : new XML.QName('price'),
        wrapperElementName : new XML.QName('salePrices')
    })
];

// abstractSalesReturn : comingInOperation
Map.AbstractSalesReturn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'demandUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'demandId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'lossesUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('lossRef'),
        wrapperElementName : new XML.QName('lossesUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'losses',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('lossRef'),
        wrapperElementName : new XML.QName('losses')
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'salesReturnPosition',
        typeInfo : Map.SalesReturnPosition,
        collection : true
    })
];

// abstractShipmentOut : comingOut
Map.AbstractShipmentOut.propertyInfos = [];

// accountEntity : object
Map.AccountEntity.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'accountId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'accountUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// agent : legendEntity
Map.Agent.properties = [
    new Model.AttributePropertyInfo({
        name : 'discount',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'autoDiscount',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stateId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'discountCardNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'discountCorrection',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stateUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'employeeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'archived',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'created',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'employeeId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.AgentAttributeValue,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'requisite',
        typeInfo : Map.Requisite
    }),
    new Model.ElementPropertyInfo({
        name : 'contact',
        typeInfo : Map.Contact
    }),
    new Model.ElementPropertyInfo({
        name : 'contactPerson',
        typeInfo : Map.ContactPerson,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'agentNewsItem',
        typeInfo : Map.AgentNewsItem,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'tags',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('tag'),
        wrapperElementName : new XML.QName('tags')
    })
];

// agentAttributeValue : attributeValue
Map.AgentAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'agentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'agentId',
        typeInfo : XSD.String.INSTANCE
    })
];

// agentNewsItem : infoEntity
Map.AgentNewsItem.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'moment',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'text',
        typeInfo : XSD.String.INSTANCE
    })
];

// agentPictureDocument : document
Map.AgentPictureDocument.propertyInfos = [];

// amiroConnectorSettings : operationConnectorSetting
Map.AmiroConnectorSettings.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'commentsColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerAddressColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerCodeColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerEmailColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerFirstNameColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerLastNameColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerNickColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerPhoneColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodIdColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodNameColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'orderDateColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'orderIdColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'prefixForAgent',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'prefixForGood',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'prefixForOperation',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'quantityColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'shippingAmountColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stateColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'taxColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'customAttribute',
        typeInfo : Map.AmiroCustomAttributeInfo,
        collection : true
    })
];

// amiroCustomAttributeInfo : entity
Map.AmiroCustomAttributeInfo.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'columnNumber',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'name',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'settingsId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'settingsUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// attachedDocument : document
Map.AttachedDocument.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'emailedDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'publicId',
        typeInfo : XSD.String.INSTANCE
    })
];

// attachmentDocument : document
Map.AttachmentDocument.propertyInfos = [];

// attributeMetadata : legendEntity
Map.AttributeMetadata.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'attrType',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'dictionaryMetadataUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'entityMetadataUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'feature',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'dictionaryMetadataId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'entityMetadataId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'position',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'required',
        typeInfo : XSD.Boolean.INSTANCE
    })
];

// attributeValue : infoEntity
Map.AttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'metadataUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'valueText',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'valueString',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'doubleValue',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'longValue',
        typeInfo : XSD.Long.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'booleanValue',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'timeValue',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'entityValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'agentValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'placeValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consignmentValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'contractValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'projectValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'employeeValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'agentValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consignmentValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'contractValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'employeeValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'entityValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'metadataId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'placeValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'projectValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'file',
        typeInfo : Map.AttachmentDocument
    })
];

// bankAccount : object
Map.BankAccount.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'bankName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'bankLocation',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'accountNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'correspondentAccount',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'bic',
        typeInfo : XSD.String.INSTANCE
    })
];

// barcode : abstractBarcode
Map.Barcode.propertyInfos = [];

// cashIn : abstractCashIn
Map.CashIn.propertyInfos = [];

// cashOut : abstractCashOut
Map.CashOut.propertyInfos = [];

// classifier : legendEntity
Map.Classifier.propertyInfos = [];

// cmlConnectorSettings : operationConnectorSetting
Map.CmlConnectorSettings.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'features',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodFolderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodFolderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stockplaceId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'shopType',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stockActive',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stockplaceUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stockPollPeriod',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'syncFeatures',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'syncOrderState',
        typeInfo : XSD.Boolean.INSTANCE
    })
];

// collection : object
Map.Collection.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'total',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'start',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'count',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.ElementRefsPropertyInfo({
        name : 'items',
        collection : true,
        elementTypeInfos : [
            {
                elementName: new XML.QName('agent'),
                typeInfo: Map.Agent
            },
            {
                elementName: new XML.QName('agentPictureDocument'),
                typeInfo: Map.AgentPictureDocument
            },
            {
                elementName: new XML.QName('amiroConnectorSettings'),
                typeInfo: Map.AmiroConnectorSettings
            },
            {
                elementName: new XML.QName('attachmentDocument'),
                typeInfo: Map.AttachmentDocument
            },
            {
                elementName: new XML.QName('barcode'),
                typeInfo: Map.Barcode
            },
            {
                elementName: new XML.QName('cashIn'),
                typeInfo: Map.CashIn
            },
            {
                elementName: new XML.QName('cashOut'),
                typeInfo: Map.CashOut
            },
            {
                elementName: new XML.QName('cmlConnectorSettings'),
                typeInfo: Map.CmlConnectorSettings
            },
            {
                elementName: new XML.QName('collection'),
                typeInfo: Map.Collection
            },
            {
                elementName: new XML.QName('company'),
                typeInfo: Map.Company
            },
            {
                elementName: new XML.QName('consignment'),
                typeInfo: Map.Consignment
            },
            {
                elementName: new XML.QName('consignmentBarcode'),
                typeInfo: Map.ConsignmentBarcode
            },
            {
                elementName: new XML.QName('contract'),
                typeInfo: Map.Contract
            },
            {
                elementName: new XML.QName('contractDocument'),
                typeInfo: Map.ContractDocument
            },
            {
                elementName: new XML.QName('country'),
                typeInfo: Map.Country
            },
            {
                elementName: new XML.QName('currency'),
                typeInfo: Map.Currency
            },
            {
                elementName: new XML.QName('customEntity'),
                typeInfo: Map.CustomEntity
            },
            {
                elementName: new XML.QName('customEntityMetadata'),
                typeInfo: Map.CustomEntityMetadata
            },
            {
                elementName: new XML.QName('customerOrder'),
                typeInfo: Map.CustomerOrder
            },
            {
                elementName: new XML.QName('demand'),
                typeInfo: Map.Demand
            },
            {
                elementName: new XML.QName('document'),
                typeInfo: Map.Document
            },
            {
                elementName: new XML.QName('documentMiniature'),
                typeInfo: Map.DocumentMiniature
            },
            {
                elementName: new XML.QName('embeddedEntityMetadata'),
                typeInfo: Map.EmbeddedEntityMetadata
            },
            {
                elementName: new XML.QName('employee'),
                typeInfo: Map.Employee
            },
            {
                elementName: new XML.QName('enter'),
                typeInfo: Map.Enter
            },
            {
                elementName: new XML.QName('entityTemplatesMetadata'),
                typeInfo: Map.EntityTemplatesMetadata
            },
            {
                elementName: new XML.QName('exchange'),
                typeInfo: Map.ExchangeContainer
            },
            {
                elementName: new XML.QName('factureIn'),
                typeInfo: Map.FactureIn
            },
            {
                elementName: new XML.QName('factureOut'),
                typeInfo: Map.FactureOut
            },
            {
                elementName: new XML.QName('feature'),
                typeInfo: Map.Feature
            },
            {
                elementName: new XML.QName('good'),
                typeInfo: Map.Good
            },
            {
                elementName: new XML.QName('goodFolder'),
                typeInfo: Map.GoodFolder
            },
            {
                elementName: new XML.QName('gtd'),
                typeInfo: Map.Gtd
            },
            {
                elementName: new XML.QName('internalOrder'),
                typeInfo: Map.InternalOrder
            },
            {
                elementName: new XML.QName('inventory'),
                typeInfo: Map.Inventory
            },
            {
                elementName: new XML.QName('invoiceIn'),
                typeInfo: Map.InvoiceIn
            },
            {
                elementName: new XML.QName('invoiceOut'),
                typeInfo: Map.InvoiceOut
            },
            {
                elementName: new XML.QName('loss'),
                typeInfo: Map.Loss
            },
            {
                elementName: new XML.QName('move'),
                typeInfo: Map.Move
            },
            {
                elementName: new XML.QName('myCompany'),
                typeInfo: Map.MyCompany
            },
            {
                elementName: new XML.QName('operationDocument'),
                typeInfo: Map.OperationDocument
            },
            {
                elementName: new XML.QName('paymentIn'),
                typeInfo: Map.PaymentIn
            },
            {
                elementName: new XML.QName('paymentOut'),
                typeInfo: Map.PaymentOut
            },
            {
                elementName: new XML.QName('place'),
                typeInfo: Map.Place
            },
            {
                elementName: new XML.QName('priceList'),
                typeInfo: Map.PriceList
            },
            {
                elementName: new XML.QName('priceType'),
                typeInfo: Map.PriceType
            },
            {
                elementName: new XML.QName('processing'),
                typeInfo: Map.Processing
            },
            {
                elementName: new XML.QName('processingOrder'),
                typeInfo: Map.ProcessingOrder
            },
            {
                elementName: new XML.QName('processingPlan'),
                typeInfo: Map.ProcessingPlan
            },
            {
                elementName: new XML.QName('processingPlanFolder'),
                typeInfo: Map.ProcessingPlanFolder
            },
            {
                elementName: new XML.QName('project'),
                typeInfo: Map.Project
            },
            {
                elementName: new XML.QName('purchaseOrder'),
                typeInfo: Map.PurchaseOrder
            },
            {
                elementName: new XML.QName('purchaseReturn'),
                typeInfo: Map.PurchaseReturn
            },
            {
                elementName: new XML.QName('reportTemplatesMetadata'),
                typeInfo: Map.ReportTemplatesMetadata
            },
            {
                elementName: new XML.QName('retailCashIn'),
                typeInfo: Map.RetailCashIn
            },
            {
                elementName: new XML.QName('retailCashOut'),
                typeInfo: Map.RetailCashOut
            },
            {
                elementName: new XML.QName('retailDemand'),
                typeInfo: Map.RetailDemand
            },
            {
                elementName: new XML.QName('retailSalesReturn'),
                typeInfo: Map.RetailSalesReturn
            },
            {
                elementName: new XML.QName('salesReturn'),
                typeInfo: Map.SalesReturn
            },
            {
                elementName: new XML.QName('service'),
                typeInfo: Map.Service
            },
            {
                elementName: new XML.QName('skladShareMode'),
                typeInfo: Map.SkladShareMode
            },
            {
                elementName: new XML.QName('slot'),
                typeInfo: Map.Slot
            },
            {
                elementName: new XML.QName('supply'),
                typeInfo: Map.Supply
            },
            {
                elementName: new XML.QName('template'),
                typeInfo: Map.Template
            },
            {
                elementName: new XML.QName('thing'),
                typeInfo: Map.Thing
            },
            {
                elementName: new XML.QName('uom'),
                typeInfo: Map.Uom
            },
            {
                elementName: new XML.QName('warehouse'),
                typeInfo: Map.Warehouse
            },
            {
                elementName: new XML.QName('workflow'),
                typeInfo: Map.Workflow
            },
            {
                elementName: new XML.QName('ymlConnectorSettings'),
                typeInfo: Map.YmlConnectorSettings
            },
            {
                elementName: new XML.QName('id'),
                typeInfo: XSD.String.INSTANCE
            },
            {
                elementName: new XML.QName('uuid'),
                typeInfo: XSD.String.INSTANCE
            }
        ]
    })
];

// collectionContainer : object
Map.CollectionContainer.propertyInfos = [];

// comingIn : stockMotion
Map.ComingIn.propertyInfos = [];

// comingInOperation : stockOperation
Map.ComingInOperation.propertyInfos = [];

// comingOut : stockMotion
Map.ComingOut.propertyInfos = [];

// comingOutOperation : stockOperation
Map.ComingOutOperation.propertyInfos = [];

// company : agent
Map.Company.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'director',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'chiefAccountant',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'payerVat',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'companyType',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'sign',
        typeInfo : Map.AgentPictureDocument
    }),
    new Model.ElementPropertyInfo({
        name : 'stamp',
        typeInfo : Map.AgentPictureDocument
    })
];

// consignment : legendEntity
Map.Consignment.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'goodUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'isDefault',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'barcode',
        typeInfo : Map.ConsignmentBarcode,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.ConsignmentAttributeValue,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'feature',
        typeInfo : Map.Feature
    })
];

// consignmentAttributeValue : attributeValue
Map.ConsignmentAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'consignmentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consignmentId',
        typeInfo : XSD.String.INSTANCE
    })
];

// consignmentBarcode : abstractBarcode
Map.ConsignmentBarcode.propertyInfos = [];

// contact : object
Map.Contact.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'address',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'phones',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'faxes',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'mobiles',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'email',
        typeInfo : XSD.String.INSTANCE
    })
];

// contactPerson : legendEntity
Map.ContactPerson.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'email',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'phone',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'position',
        typeInfo : XSD.String.INSTANCE
    })
];

// contract : legendEntity
Map.Contract.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'agentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'currencyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'moment',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'agentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'currencyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'ownCompanyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'ownCompanyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.ContractAttributeValue,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'document',
        typeInfo : Map.ContractDocument,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'sum',
        typeInfo : Map.MoneyAmount
    })
];

// contractAttributeValue : attributeValue
Map.ContractAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'contractUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'contractId',
        typeInfo : XSD.String.INSTANCE
    })
];

// contractDocument : attachedDocument
Map.ContractDocument.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'contractUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'contractId',
        typeInfo : XSD.String.INSTANCE
    })
];

// country : predefinedLegendableEntity
Map.Country.propertyInfos = [];

// currency : legendEntity
Map.Currency.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'enteredRate',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'invertRate',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'rate',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'major',
        typeInfo : Map.Unit
    }),
    new Model.ElementPropertyInfo({
        name : 'minor',
        typeInfo : Map.Unit
    })
];

// customEntity : legendEntity
Map.CustomEntity.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'entityMetadataUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'entityMetadataId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.CustomEntityAttributeValue,
        collection : true
    })
];

// customEntityAttributeValue : attributeValue
Map.CustomEntityAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'customEntityUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customEntityId',
        typeInfo : XSD.String.INSTANCE
    })
];

// customEntityMetadata : entityMetadata
Map.CustomEntityMetadata.propertyInfos = [];

// customerOrder : order
Map.CustomerOrder.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'demandsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demandsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesOutUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceOutRef'),
        wrapperElementName : new XML.QName('invoicesOutUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'customerOrderPosition',
        typeInfo : Map.CustomerOrderPosition,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseOrdersUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('purchaseOrderRef'),
        wrapperElementName : new XML.QName('purchaseOrdersUuid')
    })
];

// customerOrderPosition : orderPosition
Map.CustomerOrderPosition.propertyInfos = [];

// demand : abstractDemand
Map.Demand.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'extension',
        typeInfo : Map.DemandExtension
    })
];

// demandExtension : operationExtension
Map.DemandExtension.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'opened',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'carrierUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'loadName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consignorIndication',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'transportFacility',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodPackQuantity',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'carNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'carrierId',
        typeInfo : XSD.String.INSTANCE
    })
];

// document : legendEntity
Map.Document.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'created',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'filename',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'miniatureUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'miniatureId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'contents',
        typeInfo : XSD.String.INSTANCE
    })
];

// documentMiniature : document
Map.DocumentMiniature.propertyInfos = [];

// embeddedEntityMetadata : entityMetadata
Map.EmbeddedEntityMetadata.propertyInfos = [];

// employee : legendEntity
Map.Employee.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'city',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'email',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'fax',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'firstName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'icqNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'lastName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'middleName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'mobile',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'uid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'phone',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'postalAddress',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'postalCode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'skypeName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.EmployeeAttributeValue,
        collection : true
    })
];

// employeeAttributeValue : attributeValue
Map.EmployeeAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'employeeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'employeeId',
        typeInfo : XSD.String.INSTANCE
    })
];

// enter : comingInOperation
Map.Enter.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'inventoryUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'inventoryId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'enterPosition',
        typeInfo : Map.EnterPosition,
        collection : true
    })
];

// enterPosition : comingIn
Map.EnterPosition.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'tags',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('tag'),
        wrapperElementName : new XML.QName('tags')
    })
];

// entity : accountEntity
Map.Entity.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'readMode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'changeMode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'groupId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'groupUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'company',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'id',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'uuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// entityMetadata : legendEntity
Map.EntityMetadata.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'uniqueCode',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'codeValueType',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'independentNameGenerator',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'barcodeGen',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'barcodeGenPref',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'editOnlyByAuthor',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'noEditFromOtherPlaceSource',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'noApplicableFromOtherPlaceSource',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'noEditFromOtherPlaceTarget',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'noApplicableFromOtherPlaceTarget',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'editablePeriod',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'editableCalendarDays',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'editableWorkDays',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'editableFromDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attributeMetadata',
        typeInfo : Map.AttributeMetadata,
        collection : true
    })
];

// entityTemplatesMetadata : templatesMetadata
Map.EntityTemplatesMetadata.propertyInfos = [];

// error : object
Map.Error.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'uid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'moment',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'message',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'stack',
        typeInfo : XSD.String.INSTANCE
    })
];

// exchangeContainer : object
Map.ExchangeContainer.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'workflow',
        typeInfo : Map.Workflow,
        collection : true,
        wrapperElementName : new XML.QName('workflow')
    }),
    new Model.ElementPropertyInfo({
        name : 'shareModes',
        typeInfo : Map.SkladShareMode,
        collection : true,
        elementName : new XML.QName('shareMode'),
        wrapperElementName : new XML.QName('shareModes')
    }),
    new Model.ElementPropertyInfo({
        name : 'customEntityMetadata',
        typeInfo : Map.CustomEntityMetadata,
        collection : true,
        wrapperElementName : new XML.QName('customEntityMetadata')
    }),
    new Model.ElementPropertyInfo({
        name : 'embeddedEntityMetadata',
        typeInfo : Map.EmbeddedEntityMetadata,
        collection : true,
        wrapperElementName : new XML.QName('embeddedEntityMetadata')
    }),
    new Model.ElementPropertyInfo({
        name : 'entityTemplatesMetadata',
        typeInfo : Map.EntityTemplatesMetadata,
        collection : true,
        wrapperElementName : new XML.QName('entityTemplatesMetadata')
    }),
    new Model.ElementPropertyInfo({
        name : 'reportTemplatesMetadata',
        typeInfo : Map.ReportTemplatesMetadata,
        collection : true,
        wrapperElementName : new XML.QName('reportTemplatesMetadata')
    }),
    new Model.ElementPropertyInfo({
        name : 'customEntity',
        typeInfo : Map.CustomEntity,
        collection : true,
        wrapperElementName : new XML.QName('customEntity')
    }),
    new Model.ElementPropertyInfo({
        name : 'currencies',
        typeInfo : Map.Currency,
        collection : true,
        elementName : new XML.QName('currency'),
        wrapperElementName : new XML.QName('currencies')
    }),
    new Model.ElementPropertyInfo({
        name : 'country',
        typeInfo : Map.Country,
        collection : true,
        wrapperElementName : new XML.QName('country')
    }),
    new Model.ElementPropertyInfo({
        name : 'gtd',
        typeInfo : Map.Gtd,
        collection : true,
        wrapperElementName : new XML.QName('gtd')
    }),
    new Model.ElementPropertyInfo({
        name : 'uoms',
        typeInfo : Map.Uom,
        collection : true,
        elementName : new XML.QName('uom'),
        wrapperElementName : new XML.QName('uoms')
    }),
    new Model.ElementPropertyInfo({
        name : 'myCompany',
        typeInfo : Map.MyCompany,
        collection : true,
        wrapperElementName : new XML.QName('myCompany')
    }),
    new Model.ElementPropertyInfo({
        name : 'agents',
        typeInfo : Map.Agent,
        collection : true,
        elementName : new XML.QName('agent'),
        wrapperElementName : new XML.QName('agents')
    }),
    new Model.ElementPropertyInfo({
        name : 'companies',
        typeInfo : Map.Company,
        collection : true,
        elementName : new XML.QName('company'),
        wrapperElementName : new XML.QName('companies')
    }),
    new Model.ElementPropertyInfo({
        name : 'goodFolders',
        typeInfo : Map.GoodFolder,
        collection : true,
        elementName : new XML.QName('goodFolder'),
        wrapperElementName : new XML.QName('goodFolders')
    }),
    new Model.ElementPropertyInfo({
        name : 'goods',
        typeInfo : Map.Good,
        collection : true,
        elementName : new XML.QName('good'),
        wrapperElementName : new XML.QName('goods')
    }),
    new Model.ElementPropertyInfo({
        name : 'service',
        typeInfo : Map.Service,
        collection : true,
        wrapperElementName : new XML.QName('service')
    }),
    new Model.ElementPropertyInfo({
        name : 'things',
        typeInfo : Map.Thing,
        collection : true,
        elementName : new XML.QName('thing'),
        wrapperElementName : new XML.QName('things')
    }),
    new Model.ElementPropertyInfo({
        name : 'employees',
        typeInfo : Map.Employee,
        collection : true,
        elementName : new XML.QName('employee'),
        wrapperElementName : new XML.QName('employees')
    }),
    new Model.ElementPropertyInfo({
        name : 'places',
        typeInfo : Map.Place,
        collection : true,
        elementName : new XML.QName('place'),
        wrapperElementName : new XML.QName('places')
    }),
    new Model.ElementPropertyInfo({
        name : 'warehouses',
        typeInfo : Map.Warehouse,
        collection : true,
        elementName : new XML.QName('warehouse'),
        wrapperElementName : new XML.QName('warehouses')
    }),
    new Model.ElementPropertyInfo({
        name : 'project',
        typeInfo : Map.Project,
        collection : true,
        wrapperElementName : new XML.QName('project')
    }),
    new Model.ElementPropertyInfo({
        name : 'contract',
        typeInfo : Map.Contract,
        collection : true,
        wrapperElementName : new XML.QName('contract')
    }),
    new Model.ElementPropertyInfo({
        name : 'processingPlans',
        typeInfo : Map.ProcessingPlan,
        collection : true,
        elementName : new XML.QName('processingPlan'),
        wrapperElementName : new XML.QName('processingPlans')
    }),
    new Model.ElementPropertyInfo({
        name : 'features',
        typeInfo : Map.Feature,
        collection : true,
        elementName : new XML.QName('feature'),
        wrapperElementName : new XML.QName('features')
    }),
    new Model.ElementPropertyInfo({
        name : 'consignments',
        typeInfo : Map.Consignment,
        collection : true,
        elementName : new XML.QName('consignment'),
        wrapperElementName : new XML.QName('consignments')
    }),
    new Model.ElementPropertyInfo({
        name : 'priceLists',
        typeInfo : Map.PriceList,
        collection : true,
        elementName : new XML.QName('priceList'),
        wrapperElementName : new XML.QName('priceLists')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentIn',
        typeInfo : Map.PaymentIn,
        collection : true,
        wrapperElementName : new XML.QName('paymentIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentOut',
        typeInfo : Map.PaymentOut,
        collection : true,
        wrapperElementName : new XML.QName('paymentOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'factureIn',
        typeInfo : Map.FactureIn,
        collection : true,
        wrapperElementName : new XML.QName('factureIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'factureOut',
        typeInfo : Map.FactureOut,
        collection : true,
        wrapperElementName : new XML.QName('factureOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'cashIn',
        typeInfo : Map.CashIn,
        collection : true,
        wrapperElementName : new XML.QName('cashIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'cashOut',
        typeInfo : Map.CashOut,
        collection : true,
        wrapperElementName : new XML.QName('cashOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'deliveries_demand',
        typeInfo : Map.Demand,
        collection : true,
        elementName : new XML.QName('demand'),
        wrapperElementName : new XML.QName('deliveries-demand')
    }),
    new Model.ElementPropertyInfo({
        name : 'deliveries_supply',
        typeInfo : Map.Supply,
        collection : true,
        elementName : new XML.QName('supply'),
        wrapperElementName : new XML.QName('deliveries-supply')
    }),
    new Model.ElementPropertyInfo({
        name : 'retailCashIn',
        typeInfo : Map.RetailCashIn,
        collection : true,
        wrapperElementName : new XML.QName('retailCashIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'retailCashOut',
        typeInfo : Map.RetailCashOut,
        collection : true,
        wrapperElementName : new XML.QName('retailCashOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'retailDemand',
        typeInfo : Map.RetailDemand,
        collection : true,
        wrapperElementName : new XML.QName('retailDemand')
    }),
    new Model.ElementPropertyInfo({
        name : 'retailSalesReturn',
        typeInfo : Map.RetailSalesReturn,
        collection : true,
        wrapperElementName : new XML.QName('retailSalesReturn')
    }),
    new Model.ElementPropertyInfo({
        name : 'inventories',
        typeInfo : Map.Inventory,
        collection : true,
        elementName : new XML.QName('inventory'),
        wrapperElementName : new XML.QName('inventories')
    }),
    new Model.ElementPropertyInfo({
        name : 'moves',
        typeInfo : Map.Move,
        collection : true,
        elementName : new XML.QName('move'),
        wrapperElementName : new XML.QName('moves')
    }),
    new Model.ElementPropertyInfo({
        name : 'losses',
        typeInfo : Map.Loss,
        collection : true,
        elementName : new XML.QName('loss'),
        wrapperElementName : new XML.QName('losses')
    }),
    new Model.ElementPropertyInfo({
        name : 'enters',
        typeInfo : Map.Enter,
        collection : true,
        elementName : new XML.QName('enter'),
        wrapperElementName : new XML.QName('enters')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesIn',
        typeInfo : Map.InvoiceIn,
        collection : true,
        elementName : new XML.QName('invoiceIn'),
        wrapperElementName : new XML.QName('invoicesIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesOut',
        typeInfo : Map.InvoiceOut,
        collection : true,
        elementName : new XML.QName('invoiceOut'),
        wrapperElementName : new XML.QName('invoicesOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'salesReturns',
        typeInfo : Map.SalesReturn,
        collection : true,
        elementName : new XML.QName('salesReturn'),
        wrapperElementName : new XML.QName('salesReturns')
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseReturns',
        typeInfo : Map.PurchaseReturn,
        collection : true,
        elementName : new XML.QName('purchaseReturn'),
        wrapperElementName : new XML.QName('purchaseReturns')
    }),
    new Model.ElementPropertyInfo({
        name : 'processings',
        typeInfo : Map.Processing,
        collection : true,
        elementName : new XML.QName('processing'),
        wrapperElementName : new XML.QName('processings')
    }),
    new Model.ElementPropertyInfo({
        name : 'customerOrders',
        typeInfo : Map.CustomerOrder,
        collection : true,
        elementName : new XML.QName('customerOrder'),
        wrapperElementName : new XML.QName('customerOrders')
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseOrders',
        typeInfo : Map.PurchaseOrder,
        collection : true,
        elementName : new XML.QName('purchaseOrder'),
        wrapperElementName : new XML.QName('purchaseOrders')
    }),
    new Model.ElementPropertyInfo({
        name : 'internalOrders',
        typeInfo : Map.InternalOrder,
        collection : true,
        elementName : new XML.QName('internalOrder'),
        wrapperElementName : new XML.QName('internalOrders')
    }),
    new Model.ElementPropertyInfo({
        name : 'proccessingOrders',
        typeInfo : Map.ProcessingOrder,
        collection : true,
        elementName : new XML.QName('processingOrder'),
        wrapperElementName : new XML.QName('proccessingOrders')
    }),
    new Model.ElementPropertyInfo({
        name : 'amiroConnectors',
        typeInfo : Map.AmiroConnectorSettings,
        collection : true,
        elementName : new XML.QName('amiroConnectorSettings'),
        wrapperElementName : new XML.QName('amiroConnectors')
    }),
    new Model.ElementPropertyInfo({
        name : 'cmlConnectors',
        typeInfo : Map.CmlConnectorSettings,
        collection : true,
        elementName : new XML.QName('cmlConnectorSettings'),
        wrapperElementName : new XML.QName('cmlConnectors')
    }),
    new Model.ElementPropertyInfo({
        name : 'ymlConnectors',
        typeInfo : Map.YmlConnectorSettings,
        collection : true,
        elementName : new XML.QName('ymlConnectorSettings'),
        wrapperElementName : new XML.QName('ymlConnectors')
    })
];

// facture : operationWithPositions
Map.Facture.propertyInfos = [];

// factureIn : facture
Map.FactureIn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'incomingDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'incomingNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'supplies',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('supplyRef'),
        wrapperElementName : new XML.QName('supplies')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'suppliesUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('supplyRef'),
        wrapperElementName : new XML.QName('suppliesUuid')
    })
];

// factureOut : facture
Map.FactureOut.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'paymentDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'paymentNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'demandsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demandsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'extension',
        typeInfo : Map.FactureOutExtension
    }),
    new Model.ElementPropertyInfo({
        name : 'demands',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demands')
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'returns',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('purchaseReturnRef'),
        wrapperElementName : new XML.QName('returns')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'returnsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('returnRef'),
        wrapperElementName : new XML.QName('returnsUuid')
    })
];

// factureOutExtension : operationExtension
Map.FactureOutExtension.propertyInfos = [];

// feature : infoEntity
Map.Feature.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'goodId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'externalcode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.FeatureAttributeValue,
        collection : true
    })
];

// featureAttributeValue : attributeValue
Map.FeatureAttributeValue.propertyInfos = [];

// finance : operation
Map.Finance.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'paymentPurpose',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'vatSum',
        typeInfo : XSD.Double.INSTANCE
    })
];

// financeIn : finance
Map.FinanceIn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'customerOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureOutUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'invoiceOutUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'invoiceOutId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseReturnId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseReturnUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'demandsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demandsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'demands',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demands')
    })
];

// financeOut : finance
Map.FinanceOut.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'factureInUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'invoiceInUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'invoiceInId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'salesReturnId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'supplyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'salesReturnUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'supplyUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// good : abstractGood
Map.Good.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'isSerialTrackable',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'buyPrice',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'minimumBalance',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'weight',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'volume',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'pack',
        typeInfo : Map.GoodPack,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'preferences',
        typeInfo : Map.GoodSlotPreference,
        collection : true,
        elementName : new XML.QName('preference'),
        wrapperElementName : new XML.QName('preferences')
    })
];

// goodAttributeValue : attributeValue
Map.GoodAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'goodUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodId',
        typeInfo : XSD.String.INSTANCE
    })
];

// goodFolder : classifier
Map.GoodFolder.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'archived',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'parentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'parentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'productCode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'vat',
        typeInfo : XSD.Long.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.GoodAttributeValue,
        collection : true
    })
];

// goodPack : entity
Map.GoodPack.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'uomId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'quantity',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'uomUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// goodPrices : object
Map.GoodPrices.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'price',
        typeInfo : Map.Price,
        collection : true
    })
];

// goodSlotPreference : entity
Map.GoodSlotPreference.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'slotId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'slotUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// gtd : legendEntity
Map.Gtd.propertyInfos = [];

// infoEntity : entity
Map.InfoEntity.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'updated',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'updatedBy',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'deleted',
        typeInfo : XSD.DateTime.INSTANCE
    })
];

// internalOrder : order
Map.InternalOrder.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'purchaseOrderPosition',
        typeInfo : Map.PurchaseOrderPosition,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseOrdersUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('purchaseOrderRef'),
        wrapperElementName : new XML.QName('purchaseOrdersUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'demandsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('moveRef'),
        wrapperElementName : new XML.QName('demandsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'demands',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('moveRef'),
        wrapperElementName : new XML.QName('demands')
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseOrders',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('purchaseOrderRef'),
        wrapperElementName : new XML.QName('purchaseOrders')
    })
];

// inventory : operationWithPositions
Map.Inventory.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'entersUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('enterRef'),
        wrapperElementName : new XML.QName('entersUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'lossesUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('lossRef'),
        wrapperElementName : new XML.QName('lossesUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'enters',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('enterRef'),
        wrapperElementName : new XML.QName('enters')
    }),
    new Model.ElementPropertyInfo({
        name : 'losses',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('lossRef'),
        wrapperElementName : new XML.QName('losses')
    }),
    new Model.ElementPropertyInfo({
        name : 'inventoryPosition',
        typeInfo : Map.InventoryPosition,
        collection : true
    })
];

// inventoryPosition : motion
Map.InventoryPosition.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'correctionAmount',
        typeInfo : XSD.Double.INSTANCE
    })
];

// invoice : operationWithPositions
Map.Invoice.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'paymentPlannedMoment',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicePosition',
        typeInfo : Map.InvoicePosition,
        collection : true
    })
];

// invoiceIn : invoice
Map.InvoiceIn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'incomingDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'incomingNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'financesOutUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('financesOutUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'financesOut',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('financesOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'supplies',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('supplyRef'),
        wrapperElementName : new XML.QName('supplies')
    }),
    new Model.ElementPropertyInfo({
        name : 'suppliesUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('supplyRef'),
        wrapperElementName : new XML.QName('suppliesUuid')
    })
];

// invoiceOut : invoice
Map.InvoiceOut.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'customerOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'demandsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demandsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'demands',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demands')
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('payments')
    })
];

// invoicePosition : motion
Map.InvoicePosition.propertyInfos = [];

// legendEntity : infoEntity
Map.LegendEntity.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'name',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'code',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'externalcode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'description',
        typeInfo : XSD.String.INSTANCE
    })
];

// loss : comingOutOperation
Map.Loss.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'inventoryUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'inventoryId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'salesReturnId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'salesReturnUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'lossPosition',
        typeInfo : Map.LossPosition,
        collection : true
    })
];

// lossPosition : comingOut
Map.LossPosition.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'tags',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('tag'),
        wrapperElementName : new XML.QName('tags')
    })
];

// material : processingPlanItem
Map.Material.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'isOptional',
        typeInfo : XSD.Boolean.INSTANCE
    })
];

// moneyAmount : object
Map.MoneyAmount.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'sum',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sumInCurrency',
        typeInfo : XSD.Double.INSTANCE
    })
];

// motion : entity
Map.Motion.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'discount',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'quantity',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodPackUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consignmentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'slotUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'vat',
        typeInfo : XSD.Long.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consignmentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodPackId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'slotId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'basePrice',
        typeInfo : Map.MoneyAmount
    }),
    new Model.ElementPropertyInfo({
        name : 'price',
        typeInfo : Map.MoneyAmount
    }),
    new Model.ElementPropertyInfo({
        name : 'things',
        typeInfo : Map.Thing,
        collection : true,
        elementName : new XML.QName('thingRef'),
        wrapperElementName : new XML.QName('things')
    })
];

// move : stockOperation
Map.Move.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'internalOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'internalOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'movePosition',
        typeInfo : Map.MovePosition,
        collection : true
    })
];

// movePosition : stockMotion
Map.MovePosition.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'sourceSlotId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sourceSlotUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// myCompany : company
Map.MyCompany.propertyInfos = [];

// operation : legendEntity
Map.Operation.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'stateUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'targetAgentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sourceAgentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'targetStoreUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sourceStoreUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'applicable',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'projectUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'contractUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'moment',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'payerVat',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'retailStoreUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'currencyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'rate',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'vatIncluded',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'created',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'createdBy',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'employeeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'contractId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'currencyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'projectId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'retailStoreId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sourceAgentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sourceStoreId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stateId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'targetAgentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'targetStoreId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.OperationAttributeValue,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'document',
        typeInfo : Map.OperationDocument,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'sum',
        typeInfo : Map.MoneyAmount
    })
];

// operationAttributeValue : attributeValue
Map.OperationAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'operationUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'operationId',
        typeInfo : XSD.String.INSTANCE
    })
];

// operationConnectorSetting : abstractConnectorSetting
Map.OperationConnectorSetting.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'adminDomain',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'autoReserve',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'orderplaceId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'orderplaceUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'shopDomain',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'useShopOperationName',
        typeInfo : XSD.Boolean.INSTANCE
    })
];

// operationDocument : attachedDocument
Map.OperationDocument.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'operationId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'operationUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// operationExtension : object
Map.OperationExtension.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'consigneeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consigneeId',
        typeInfo : XSD.String.INSTANCE
    })
];

// operationWithPositions : operation
Map.OperationWithPositions.propertyInfos = [];

// order : operationWithPositions
Map.Order.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'deliveryPlannedMoment',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'reservedSum',
        typeInfo : XSD.Double.INSTANCE
    })
];

// orderPosition : motion
Map.OrderPosition.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'reserve',
        typeInfo : XSD.Double.INSTANCE
    })
];

// paymentIn : financeIn
Map.PaymentIn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'incomingDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'incomingNumber',
        typeInfo : XSD.String.INSTANCE
    })
];

// paymentOut : financeOut
Map.PaymentOut.propertyInfos = [];

// place : classifier
Map.Place.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'parentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'parentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'contact',
        typeInfo : Map.Contact
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.PlaceAttributeValue,
        collection : true
    })
];

// placeAttributeValue : attributeValue
Map.PlaceAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'placeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'placeId',
        typeInfo : XSD.String.INSTANCE
    })
];

// predefinedLegendableEntity : legendEntity
Map.PredefinedLegendableEntity.propertyInfos = [];

// price : entity
Map.Price.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'currencyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'currencyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'value',
        typeInfo : XSD.Double.INSTANCE
    })
];

// priceList : operationWithPositions
Map.PriceList.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'metadata',
        typeInfo : Map.PriceListMetadata
    }),
    new Model.ElementPropertyInfo({
        name : 'priceListRow',
        typeInfo : Map.PriceListRow,
        collection : true
    })
];

// priceListCell : entity
Map.PriceListCell.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'columnName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'sum',
        typeInfo : Map.MoneyAmount
    })
];

// priceListCellArray : object
Map.PriceListCellArray.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'item',
        typeInfo : Map.PriceListCell,
        collection : true
    })
];

// priceListMetadata : legendEntity
Map.PriceListMetadata.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'priceTypeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'column',
        typeInfo : Map.PriceListMetadataColumn,
        collection : true
    })
];

// priceListMetadataColumn : legendEntity
Map.PriceListMetadataColumn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'percentageDiscount',
        typeInfo : XSD.Int.INSTANCE
    })
];

// priceListRow : motion
Map.PriceListRow.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'cell',
        typeInfo : Map.PriceListCellArray
    })
];

// priceType : infoEntity
Map.PriceType.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'index',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'name',
        typeInfo : XSD.String.INSTANCE
    })
];

// processing : stockOperation
Map.Processing.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'planId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'processingOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'planUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'processingOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'quantity',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'material',
        typeInfo : Map.ProcessingPositionMaterial,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'results',
        typeInfo : Map.ProcessingPositionResult,
        collection : true,
        elementName : new XML.QName('result'),
        wrapperElementName : new XML.QName('results')
    })
];

// processingOrder : order
Map.ProcessingOrder.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'planId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'planUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'quantity',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseOrderPosition',
        typeInfo : Map.CustomerOrderPosition,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'processings',
        typeInfo : Map.Processing,
        collection : true,
        elementName : new XML.QName('processingRef'),
        wrapperElementName : new XML.QName('processings')
    })
];

// processingPlan : processingPlanFolder
Map.ProcessingPlan.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'material',
        typeInfo : Map.Material,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'price',
        typeInfo : Map.MoneyAmount
    }),
    new Model.ElementPropertyInfo({
        name : 'product',
        typeInfo : Map.Product,
        collection : true
    })
];

// processingPlanFolder : classifier
Map.ProcessingPlanFolder.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'parentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'parentUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// processingPlanItem : entity
Map.ProcessingPlanItem.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'goodUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'planId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'planUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'quantity',
        typeInfo : XSD.Double.INSTANCE
    })
];

// processingPositionMaterial : comingOut
Map.ProcessingPositionMaterial.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'planMaterialId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'planMaterialUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// processingPositionResult : comingIn
Map.ProcessingPositionResult.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'planResultId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'planResultUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// product : processingPlanItem
Map.Product.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'costShare',
        typeInfo : XSD.Double.INSTANCE
    })
];

// project : legendEntity
Map.Project.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.ProjectAttributeValue,
        collection : true
    })
];

// projectAttributeValue : attributeValue
Map.ProjectAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'projectUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'projectId',
        typeInfo : XSD.String.INSTANCE
    })
];

// purchaseOrder : order
Map.PurchaseOrder.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'customerOrdersUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('customerOrderRef'),
        wrapperElementName : new XML.QName('customerOrdersUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'internalOrders',
        typeInfo : Map.InternalOrder,
        collection : true,
        elementName : new XML.QName('internalOrderRef'),
        wrapperElementName : new XML.QName('internalOrders')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceInRef'),
        wrapperElementName : new XML.QName('invoicesUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'customerOrders',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('customerOrderRef'),
        wrapperElementName : new XML.QName('customerOrders')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesIn',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceInRef'),
        wrapperElementName : new XML.QName('invoicesIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'supplies',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('supplyRef'),
        wrapperElementName : new XML.QName('supplies')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseOrderPosition',
        typeInfo : Map.PurchaseOrderPosition,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'suppliesUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('supplyRef'),
        wrapperElementName : new XML.QName('suppliesUuid')
    })
];

// purchaseOrderPosition : orderPosition
Map.PurchaseOrderPosition.propertyInfos = [];

// purchaseReturn : comingOutOperation
Map.PurchaseReturn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'factureUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'supplyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'supplyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseReturnPosition',
        typeInfo : Map.PurchaseReturnPosition,
        collection : true
    })
];

// purchaseReturnPosition : abstractShipmentOut
Map.PurchaseReturnPosition.propertyInfos = [];

// reportTemplatesMetadata : templatesMetadata
Map.ReportTemplatesMetadata.propertyInfos = [];

// requisite : object
Map.Requisite.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'bankAccount',
        typeInfo : Map.BankAccount
    }),
    new Model.AttributePropertyInfo({
        name : 'legalTitle',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'legalAddress',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'actualAddress',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'inn',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'kpp',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'okpo',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'ogrn',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'ogrnip',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'nomerSvidetelstva',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'dataSvidetelstva',
        typeInfo : XSD.DateTime.INSTANCE
    })
];

// retailCashIn : abstractCashIn
Map.RetailCashIn.propertyInfos = [];

// retailCashOut : abstractCashOut
Map.RetailCashOut.propertyInfos = [];

// retailDemand : abstractDemand
Map.RetailDemand.propertyInfos = [];

// retailSalesReturn : abstractSalesReturn
Map.RetailSalesReturn.propertyInfos = [];

// retailStore : legendEntity
Map.RetailStore.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'active',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'address',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'myCompanyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'myCompanyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'warehouseId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'warehouseUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// salesReturn : abstractSalesReturn
Map.SalesReturn.propertyInfos = [];

// salesReturnPosition : comingIn
Map.SalesReturnPosition.propertyInfos = [];

// service : abstractGood
Map.Service.propertyInfos = [];

// shareMode : legendEntity
Map.ShareMode.propertyInfos = [];

// shipmentIn : comingIn
Map.ShipmentIn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'overhead',
        typeInfo : XSD.Double.INSTANCE
    })
];

// shipmentOut : abstractShipmentOut
Map.ShipmentOut.propertyInfos = [];

// skladShareMode : shareMode
Map.SkladShareMode.propertyInfos = [];

// slot : legendEntity
Map.Slot.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'warehouseId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'warehouseUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// state : legendEntity
Map.State.propertyInfos = [];

// stockMotion : motion
Map.StockMotion.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'countryUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'gtdUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'gtdId',
        typeInfo : XSD.String.INSTANCE
    })
];

// stockOperation : operationWithPositions
Map.StockOperation.propertyInfos = [];

// supply : comingInOperation
Map.Supply.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'factureInUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'incomingDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'incomingNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureInId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'overheadDistribution',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesInUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceInRef'),
        wrapperElementName : new XML.QName('invoicesInUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesIn',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceInRef'),
        wrapperElementName : new XML.QName('invoicesIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseReturns',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('purchaseReturnRef'),
        wrapperElementName : new XML.QName('purchaseReturns')
    }),
    new Model.ElementPropertyInfo({
        name : 'overhead',
        typeInfo : Map.MoneyAmount
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'shipmentIn',
        typeInfo : Map.ShipmentIn,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseReturnsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('purchaseReturnRef'),
        wrapperElementName : new XML.QName('purchaseReturnsUuid')
    })
];

// template : document
Map.Template.propertyInfos = [];

// templatesMetadata : legendEntity
Map.TemplatesMetadata.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'template',
        typeInfo : Map.Template,
        collection : true
    })
];

// thing : legendEntity
Map.Thing.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'goodUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.ThingAttributeValue,
        collection : true
    })
];

// thingAttributeValue : attributeValue
Map.ThingAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'thingUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'thingId',
        typeInfo : XSD.String.INSTANCE
    })
];

// unit : object
Map.Unit.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 's1',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 's24',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 's5',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sex',
        typeInfo : XSD.UnsignedShort.INSTANCE
    })
];

// uom : predefinedLegendableEntity
Map.Uom.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'type',
        typeInfo : XSD.String.INSTANCE
    })
];

// warehouse : place
Map.Warehouse.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'agentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'agentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'slots',
        typeInfo : Map.Slot,
        collection : true,
        elementName : new XML.QName('slot'),
        wrapperElementName : new XML.QName('slots')
    })
];

// workflow : legendEntity
Map.Workflow.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'state',
        typeInfo : Map.State,
        collection : true
    })
];

// ymlConnectorSettings : abstractConnectorSetting
Map.YmlConnectorSettings.propertyInfos = [];