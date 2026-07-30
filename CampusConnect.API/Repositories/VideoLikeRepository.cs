using CampusConnect.API.Data;
using CampusConnect.API.DTOs;
using Dapper;
using System.Data;

namespace CampusConnect.API.Repositories
{
    public class VideoLikeRepository
        : IVideoLikeRepository
    {
        private readonly DbContextDapper _dbContext;

        public VideoLikeRepository(
            DbContextDapper dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddLike(
            AddVideoLikeDto dto)
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_AddVideoLike",
                new
                {
                    dto.VideoId,
                    dto.UserId
                },
                commandType:
                CommandType.StoredProcedure
            );
        }

        public async Task RemoveLike(
            RemoveVideoLikeDto dto)
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_RemoveVideoLike",
                new
                {
                    dto.VideoId,
                    dto.UserId
                },
                commandType:
                CommandType.StoredProcedure
            );
        }

        public async Task<int> GetLikeCount(
            int videoId)
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .ExecuteScalarAsync<int>(
                    "sp_GetVideoLikeCount",
                    new
                    {
                        VideoId = videoId
                    },
                    commandType:
                    CommandType.StoredProcedure
                );
        }
    }
}