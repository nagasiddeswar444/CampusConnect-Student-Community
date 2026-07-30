using CampusConnect.API.Data;
using CampusConnect.API.Models;
using Dapper;
using System.Data;

namespace CampusConnect.API.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly DbContextDapper _dbContext;

        public AdminRepository(DbContextDapper dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<User>> GetPendingStudents()
        {
            using var connection = _dbContext.CreateConnection();

            return await connection.QueryAsync<User>(
                "sp_GetPendingStudents",
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task ApproveStudent(int userId)
        {
            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_ApproveStudent",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task RejectStudent(int userId)
        {
            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_RejectStudent",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Blog>> GetAllBlogs()
        {
            using var connection = _dbContext.CreateConnection();

            return await connection.QueryAsync<Blog>(
                "sp_GetAllBlogs",
                commandType: System.Data.CommandType.StoredProcedure
            );
        }

        public async Task DeleteAnyBlog(int blogId)
        {
            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_AdminDeleteBlog",
                new { BlogId = blogId },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }


        public async Task<IEnumerable<Blog>>
    GetPendingBlogs()
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .QueryAsync<Blog>(
                    "sp_GetPendingBlogs",
                    commandType:
                    CommandType.StoredProcedure
                );
        }

        public async Task ApproveBlog(
            int blogId
        )
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_ApproveBlog",
                new
                {
                    BlogId = blogId
                },
                commandType:
                CommandType.StoredProcedure
            );
        }

        public async Task RejectBlog(
            int blogId
        )
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_RejectBlog",
                new
                {
                    BlogId = blogId
                },
                commandType:
                CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Video>>
    GetPendingVideos()
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .QueryAsync<Video>(
                    "sp_GetPendingVideos",
                    commandType:
                    CommandType.StoredProcedure
                );
        }

        public async Task ApproveVideo(
            int videoId
        )
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_ApproveVideo",
                new
                {
                    VideoId = videoId
                },
                commandType:
                CommandType.StoredProcedure
            );
        }

        public async Task RejectVideo(
            int videoId
        )
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_RejectVideo",
                new
                {
                    VideoId = videoId
                },
                commandType:
                CommandType.StoredProcedure
            );
        }







        public async Task<IEnumerable<Video>> GetAllVideos()
        {
            using var connection = _dbContext.CreateConnection();

            return await connection.QueryAsync<Video>(
                "sp_GetAllVideos",
                commandType: System.Data.CommandType.StoredProcedure
            );
        }


        public async Task DeleteAnyVideo(int videoId)
        {
            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_AdminDeleteVideo",
                new { VideoId = videoId },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }



        public async Task DeleteAnyComment(int commentId)
        {
            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_AdminDeleteComment",
                new { CommentId = commentId },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Community>>
GetPendingCommunities()
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .QueryAsync<Community>(
                    "sp_GetPendingCommunities",
                    commandType:
                    CommandType.StoredProcedure
                );
        }

        public async Task ApproveCommunity(
            int communityId
        )
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_ApproveCommunity",
                new
                {
                    CommunityId = communityId
                },
                commandType:
                CommandType.StoredProcedure
            );
        }

        public async Task RejectCommunity(
            int communityId
        )
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_RejectCommunity",
                new
                {
                    CommunityId = communityId
                },
                commandType:
                CommandType.StoredProcedure
            );
        }
    }
}