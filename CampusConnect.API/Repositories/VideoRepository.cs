using CampusConnect.API.Data;
using CampusConnect.API.DTOs;
using CampusConnect.API.Models;
using Dapper;
using System.Data;

namespace CampusConnect.API.Repositories
{
    public class VideoRepository : IVideoRepository
    {
        private readonly DbContextDapper _dbContext;

        public VideoRepository(DbContextDapper dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateVideo(Video video)
        {
            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_CreateVideo",
                new
                {
                    video.UserId,
                    video.Title,
                    video.Description,
                    video.VideoPath,
                    video.CommunityId
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Video>> GetAllVideos()
        {
            using var connection = _dbContext.CreateConnection();

            return await connection.QueryAsync<Video>(
                "sp_GetAllVideos",
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Video>> GetVideosByUser(int userId)
        {
            using var connection = _dbContext.CreateConnection();

            return await connection.QueryAsync<Video>(
                "sp_GetVideosByUser",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );
        }


        public async Task UpdateVideo(UpdateVideoDto dto)
        {
            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_UpdateVideo",
                new
                {
                    dto.VideoId,
                    dto.UserId,
                    dto.Title,
                    dto.Description
                },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }


        public async Task DeleteVideo(DeleteVideoDto dto)
        {
            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_DeleteVideo",
                new
                {
                    dto.VideoId,
                    dto.UserId
                },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }


        public async Task<Video>
GetVideoById(
    int videoId
)
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .QueryFirstOrDefaultAsync<Video>(
                    @"
            SELECT *
            FROM Videos
            WHERE VideoId = @VideoId
            ",
                    new
                    {
                        VideoId = videoId
                    }
                );
        }
    }
}