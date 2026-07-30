using CampusConnect.API.Data;
using CampusConnect.API.DTOs;
using CampusConnect.API.Models;
using Dapper;
using System.Data;

namespace CampusConnect.API.Repositories
{
    public class VideoCommentRepository
        : IVideoCommentRepository
    {
        private readonly DbContextDapper
            _dbContext;

        public VideoCommentRepository(
            DbContextDapper dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddComment(
            AddVideoCommentDto dto)
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_AddVideoComment",
                new
                {
                    dto.VideoId,
                    dto.UserId,
                    dto.CommentText
                },
                commandType:
                CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<VideoComment>>
            GetCommentsByVideo(
                int videoId)
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .QueryAsync<VideoComment>(
                    "sp_GetVideoComments",
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