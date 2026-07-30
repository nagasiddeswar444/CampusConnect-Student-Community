using CampusConnect.API.Data;
using CampusConnect.API.DTOs;
using CampusConnect.API.Models;
using Dapper;
using System.Data;

namespace CampusConnect.API.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        private readonly DbContextDapper _dbContext;

        public BlogRepository(DbContextDapper dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateBlog(CreateBlogDto dto)
        {
            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
     "sp_CreateBlog",
     new
     {
         dto.UserId,
         dto.Title,
         dto.Content,
         dto.CommunityId,
         dto.AttachmentPath,
         dto.AttachmentName
     },
                  commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Blog>> GetAllBlogs()
        {
            using var connection = _dbContext.CreateConnection();

            return await connection.QueryAsync<Blog>(
                "sp_GetAllBlogs",
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Blog>> GetBlogsByUser(int userId)
        {
            using var connection = _dbContext.CreateConnection();

            return await connection.QueryAsync<Blog>(
                "sp_GetBlogsByUser",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );
        }


        public async Task UpdateBlog(
    UpdateBlogDto dto
)
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_UpdateBlog",
                new
                {
                    dto.BlogId,
                    dto.UserId,
                    dto.Title,
                    dto.Content,
                    dto.AttachmentPath,
                    dto.AttachmentName
                },
                commandType:
                CommandType.StoredProcedure
            );
        }

        public async Task DeleteBlog(DeleteBlogDto dto)
        {
            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_DeleteBlog",
                new
                {
                    dto.BlogId,
                    dto.UserId
                },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }


        public async Task<string>
GetUserName(
    int userId
)
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .ExecuteScalarAsync<string>(
                    @"
            SELECT FullName
            FROM Users
            WHERE UserId = @UserId
            ",
                    new
                    {
                        UserId = userId
                    }
                );
        }

        public async Task<string>
        GetCommunityName(
            int communityId
        )
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .ExecuteScalarAsync<string>(
                    @"
            SELECT CommunityName
            FROM Communities
            WHERE CommunityId = @CommunityId
            ",
                    new
                    {
                        CommunityId = communityId
                    }
                );
        }

        public async Task<Blog>
GetBlogById(
    int blogId
)
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .QueryFirstOrDefaultAsync<Blog>(
                    @"
            SELECT *
            FROM Blogs
            WHERE BlogId = @BlogId
            ",
                    new
                    {
                        BlogId = blogId
                    }
                );
        }
    }
}