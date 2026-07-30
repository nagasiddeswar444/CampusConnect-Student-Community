using CampusConnect.API.DTOs;
using CampusConnect.API.Models;
using CampusConnect.API.Repositories;

namespace CampusConnect.API.Services
{
    public class CommunityService
        : ICommunityService
    {
        private readonly
            ICommunityRepository
            _repository;

        public CommunityService(
            ICommunityRepository repository
        )
        {
            _repository = repository;
        }

        public async Task CreateCommunity(
            CreateCommunityDto dto
        )
        {
            await _repository.CreateCommunity(dto);
        }

        public async Task<IEnumerable<Community>>
        GetPendingCommunities()
        {
            return await _repository
                .GetPendingCommunities();
        }

        public async Task ApproveCommunity(
            int communityId
        )
        {
            await _repository
                .ApproveCommunity(
                    communityId
                );
        }

        public async Task RejectCommunity(
            int communityId
        )
        {
            await _repository
                .RejectCommunity(
                    communityId
                );
        }





        public async Task<IEnumerable<Community>>
GetApprovedCommunities()
        {
            return await _repository
                .GetApprovedCommunities();
        }


        public async Task<bool> JoinCommunity(
            int communityId,
            int userId
        )
        {
            return await _repository.JoinCommunity(
                communityId,
                userId
            );
        }

        public async Task<IEnumerable<Community>>
GetMyCommunities(
    int userId
)
        {
            return await _repository
                .GetMyCommunities(
                    userId
                );
        }



        public async Task<Community>
GetCommunityById(
    int communityId
)
        {
            return await _repository
                .GetCommunityById(
                    communityId
                );
        }

        public async Task<bool>
IsCommunityMember(
    int communityId,
    int userId
)
        {
            return await _repository
                .IsCommunityMember(
                    communityId,
                    userId
                );
        }

        public async Task<IEnumerable<Blog>>
GetCommunityBlogs(
    int communityId
)
        {
            return await _repository
                .GetCommunityBlogs(
                    communityId
                );
        }

        public async Task<IEnumerable<Video>>
GetCommunityVideos(
    int communityId
)
        {
            return await _repository
                .GetCommunityVideos(
                    communityId
                );
        }

        public async Task<int>
        GetCommunityMemberCount(
            int communityId
        )
        {
            return await _repository
                .GetCommunityMemberCount(
                    communityId
                );
        }


        public async Task LeaveCommunity(
    int communityId,
    int userId
)
        {
            await _repository
                .LeaveCommunity(
                    communityId,
                    userId
                );
        }



        public async Task AddCommunityNotification(
    int communityId,
    int senderUserId,
    string message
)
        {
            await _repository
                .AddCommunityNotification(
                    communityId,
                    senderUserId,
                    message
                );
        }



    }
}