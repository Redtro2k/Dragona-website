USE [DragonaAccount];
GO

SET XACT_ABORT ON;
GO

BEGIN TRY
    BEGIN TRANSACTION;

    IF OBJECT_ID(N'dbo.posts', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.posts
        (
            id BIGINT IDENTITY(1, 1) NOT NULL,
            author_id BIGINT NULL,
            title NVARCHAR(255) NOT NULL,
            slug NVARCHAR(255) NOT NULL,
            category NVARCHAR(32) NOT NULL,
            excerpt NVARCHAR(500) NOT NULL,
            body NVARCHAR(MAX) NOT NULL,
            cover_path NVARCHAR(255) NULL,
            status NVARCHAR(16) NOT NULL
                CONSTRAINT DF_posts_status DEFAULT N'draft',
            published_at DATETIME2(0) NULL,
            created_at DATETIME2(0) NOT NULL
                CONSTRAINT DF_posts_created_at DEFAULT SYSUTCDATETIME(),
            updated_at DATETIME2(0) NOT NULL
                CONSTRAINT DF_posts_updated_at DEFAULT SYSUTCDATETIME(),

            CONSTRAINT PK_posts PRIMARY KEY CLUSTERED (id),
            CONSTRAINT UQ_posts_slug UNIQUE (slug),
            CONSTRAINT CK_posts_category CHECK
            (
                category IN
                (
                    N'announcement',
                    N'patch-announcement',
                    N'notice',
                    N'events'
                )
            ),
            CONSTRAINT CK_posts_status CHECK
            (
                status IN (N'draft', N'published')
            )
        );

        CREATE INDEX IX_posts_category
            ON dbo.posts (category);

        CREATE INDEX IX_posts_status_published_at
            ON dbo.posts (status, published_at);

        CREATE INDEX IX_posts_updated_at
            ON dbo.posts (updated_at DESC);
    END;

    IF DATABASE_PRINCIPAL_ID(N'dragona_db_login') IS NOT NULL
    BEGIN
        GRANT SELECT, INSERT, UPDATE, DELETE
            ON OBJECT::dbo.posts
            TO [dragona_db_login];
    END;

    COMMIT TRANSACTION;

    PRINT N'dbo.posts is ready.';
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    THROW;
END CATCH;
GO

SELECT
    SCHEMA_NAME(schema_id) AS SchemaName,
    name AS TableName,
    create_date
FROM sys.tables
WHERE object_id = OBJECT_ID(N'dbo.posts');
GO

SELECT TOP (10)
    id,
    author_id,
    title,
    slug,
    category,
    status,
    published_at,
    created_at,
    updated_at
FROM dbo.posts
ORDER BY id DESC;
GO
