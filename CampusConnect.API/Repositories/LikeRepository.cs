using CampusConnect.API.Data;
using CampusConnect.API.DTOs;
using Dapper;
using System.Data;

namespace CampusConnect.API.Repositories
{
    public class LikeRepository : ILikeRepository
    {
        private readonly DbContextDapper _dbContext;

        public LikeRepository(DbContextDapper dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddLike(AddLikeDto dto)
        {
            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_AddLike",
                new
                {
                    dto.BlogId,
                    dto.UserId
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task RemoveLike(RemoveLikeDto dto)
        {
            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_RemoveLike",
                new
                {
                    dto.BlogId,
                    dto.UserId
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<int> GetLikeCount(int blogId)
        {
            using var connection = _dbContext.CreateConnection();

            return await connection.ExecuteScalarAsync<int>(
                "sp_GetLikeCount",
                new { BlogId = blogId },
                commandType: CommandType.StoredProcedure
            );
        }
    }
}