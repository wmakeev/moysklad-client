
- `attributeMetadata`
    - `.dictionaryMetadataUuid`
    - `.entityMetadataUuid`

- `customEntity`
    - `entityMetadataUuid`

- `customEntityAttributeValue`
    - `customEntityUuid`

- `moysklad.good`
    - `parentUuid`

- `warehouse`
    - `parentUuid`

- `goodImage`
    - `tinyUuid`

- `contract`
    - `agentAccountUuid`
    - `ownCompanyUuid`
    - `ownCompanyAccountUuid`

- `purchaseReturn`
    - `paymentsUuid`

- `supply`
    - `invoicesInUuid`
    - `paymentsUuid` -> `paymentsOutUuid`, `paymentsInUuid`
    - `purchaseReturnsUuid`
    - `suppliesUuid`

- `demand`
    - `salesReturnsUuid`

- `financeOut`
    - `commissionreportoutUuid`

- `operationAttributeValue`
    - `operationUuid`

- `processingPlanItem`
    - `planUuid`

- `demandExtension`
    - `carrierUuid`


> При построении модели выдавать предупреждение если есть неизвестное поле

