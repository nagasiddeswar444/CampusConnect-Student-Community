using CampusConnect.API.Data;
using CampusConnect.API.DTOs;
using CampusConnect.API.Models;
using Dapper;
using System.Data;

namespace CampusConnect.API.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly DbContextDapper _dbContext;

        public CommentRepository(DbContextDapper dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddComment(AddCommentDto dto)
        {
            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_AddComment",
new
{
    dto.BlogId,
    dto.UserId,
    dto.CommentText,
    dto.ParentCommentId
},
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Comment>> GetCommentsByBlog(int blogId)
        {
            using var connection = _dbContext.CreateConnection();

            return await connection.QueryAsync<Comment>(
                "sp_GetCommentsByBlog",
                new { BlogId = blogId },
                commandType: CommandType.StoredProcedure
            );
        }
    }
}