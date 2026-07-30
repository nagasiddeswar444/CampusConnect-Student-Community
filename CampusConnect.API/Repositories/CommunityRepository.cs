using CampusConnect.API.Data;
using CampusConnect.API.DTOs;
using CampusConnect.API.Models;
using Dapper;
using System.Data;

namespace CampusConnect.API.Repositories
{
    public class CommunityRepository
        : ICommunityRepository
    {
        private readonly DbContextDapper
            _dbContext;

        public CommunityRepository(
            DbContextDapper dbContext
        )
        {
            _dbContext = dbContext;
        }

        public async Task CreateCommunity(
            CreateCommunityDto dto
        )
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_CreateCommunity",
                new
                {
                    dto.CommunityName,
                    dto.Description,
                    dto.CreatedBy
                },
                commandType:
                CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Community>>
        GetPendingCommunities()
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection.QueryAsync<Community>(
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


        public async Task<IEnumerable<Community>>
GetApprovedCommunities()
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection.QueryAsync<Community>(
                "sp_GetApprovedCommunities",
                commandType:
                CommandType.StoredProcedure
            );
        }

        public async Task<bool> JoinCommunity(
     int communityId,
     int userId
 )
        {
            using var connection =
                _dbContext.CreateConnection();

            int result =
                await connection.ExecuteScalarAsync<int>(
                    "sp_JoinCommunity",
                    new
                    {
                        CommunityId = communityId,
                        UserId = userId
                    },
                    commandType:
                    CommandType.StoredProcedure
                );

            return result == 1;
        }

        public async Task<IEnumerable<Community>>
GetMyCommunities(
    int userId
)
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection.QueryAsync<Community>(
                "sp_GetMyCommunities",
                new
                {
                    UserId = userId
                },
                commandType:
                CommandType.StoredProcedure
            );
        }


        public async Task<Community>
GetCommunityById(
    int communityId
)
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .QueryFirstOrDefaultAsync<Community>(
                    "sp_GetCommunityById",
                    new
                    {
                        CommunityId =
                            communityId
                    },
                    commandType:
                    CommandType.StoredProcedure
                );
        }

        public async Task<bool>
IsCommunityMember(
    int communityId,
    int userId
)
        {
            using var connection =
                _dbContext.CreateConnection();

            var result =
                await connection
                .ExecuteScalarAsync<int>(
                    "sp_IsCommunityMember",
                    new
                    {
                        CommunityId =
                            communityId,
                        UserId =
                            userId
                    },
                    commandType:
                    CommandType.StoredProcedure
                );

            return result == 1;
        }


        public async Task<IEnumerable<Blog>>
GetCommunityBlogs(
    int communityId
)
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .QueryAsync<Blog>(
                    "sp_GetCommunityBlogs",
                    new
                    {
                        CommunityId =
                            communityId
                    },
                    commandType:
                    CommandType.StoredProcedure
                );
        }

        public async Task<IEnumerable<Video>>
GetCommunityVideos(
    int communityId
)
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .QueryAsync<Video>(
                    "sp_GetCommunityVideos",
                    new
                    {
                        CommunityId =
                            communityId
                    },
                    commandType:
                    CommandType.StoredProcedure
                );
        }


        public async Task<int>
GetCommunityMemberCount(
    int communityId
)
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .ExecuteScalarAsync<int>(
                    "sp_GetCommunityMemberCount",
                    new
                    {
                        CommunityId =
                            communityId
                    },
                    commandType:
                    CommandType.StoredProcedure
                );
        }


        public async Task LeaveCommunity(
    int communityId,
    int userId
)
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_LeaveCommunity",
                new
                {
                    CommunityId = communityId,
                    UserId = userId
                },
                commandType:
                CommandType.StoredProcedure
            );
        }

        public async Task AddCommunityNotification(
    int communityId,
    int senderUserId,
    string message
)
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_AddCommunityNotification",
                new
                {
                    CommunityId = communityId,
                    SenderUserId = senderUserId,
                    Message = message
                },
                commandType:
                CommandType.StoredProcedure
            );
        }
    }
}


