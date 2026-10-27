USE [DragonaAccount];
GO

GRANT EXECUTE
    ON OBJECT::dbo.usp_AccountLogin_Local
    TO [dragona_db_login];

GRANT SELECT
    ON OBJECT::dbo.tbl_Account
    TO [dragona_db_login];
GO
