
CREATE TABLE dbo.StockCount
(
	StockCountID INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	DeviceID INT NOT NULL,
	SalesAreaID INT NOT NULL,
	SalesItemID INT NOT NULL,
	Edited DATETIME NULL,
	Created DATETIME NOT NULL,
	IsDeleted bit not null,
	SalesItemCount INT NOT NULL
)

alter table dbo.StockCount
add constraint FK_StockCount_luSalesItem FOREIGN KEY ( SalesItemID ) references luSalesItem(SalesItemID)

alter table dbo.StockCount
add constraint FK_StockCount_Device FOREIGN KEY ( DeviceID) references Device(DeviceID)

alter table dbo.StockCount
add constraint FK_StockCount_luSalesArea FOREIGN KEY ( SalesAreaID ) references luSalesArea(SalesAreaID)

CREATE TABLE dbo.WastageReason 
(
	WastageReasonID INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	Reason varchar(250) NOT NULL,
	IsDeleted bit NOT NULL
)

INSERT INTO dbo.WastageReason 
values
(
	'Spoiled', 
	0
),
(
	'Damaged', 
	0
),
(
	'Expired', 
	0
)

CREATE TABLE dbo.Wastage 
(
	WastageID INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	SalesItemID INT NOT NULL,
	DeviceID INT NOT NULL,
	SalesAreaID INT NOT NULL,
	Quantity INT NOT NULL,
	WastageReasonID INT NOT NULL,
	CONSTRAINT FK_Wastage_SalesItem FOREIGN KEY (SalesItemID) REFERENCES luSalesItem(SalesItemID),
	CONSTRAINT FK_Wastage_Device FOREIGN KEY (DeviceID) REFERENCES Device(DeviceID),
	CONSTRAINT FK_Wastage_SalesArea FOREIGN KEY (SalesAreaID) References luSalesArea(SalesAreaID),
	CONSTRAINT FK_Wastage_WastageReason FOREIGN KEY (WastageReasonID) REFERENCES WastageReason(WastageReasonID)
)

select *
from WastageReason

insert into dbo.WastageReason (Reason, IsDeleted)
select 'Spoiled', 0
where not exists (select 1 from dbo.WastageReason where WastageReasonID = 1)
go

insert into dbo.WastageReason (Reason, IsDeleted)
select 'Damaged', 0
where not exists (select 1 from dbo.WastageReason where WastageReasonID = 2)
go

insert into dbo.WastageReason (Reason, IsDeleted)
select 'Expired', 0
where not exists (select 1 from dbo.WastageReason where WastageReasonID = 3)
go

begin transaction
delete from wastage
delete from WastageReason
DBCC CHECKIDENT ('[WastageReason]', RESEED, 0);

commit transaction







