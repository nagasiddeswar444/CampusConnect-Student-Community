using CampusConnect.API.DTOs;
using CampusConnect.API.Models;

namespace CampusConnect.API.Services
{
    public interface ICommunityService
    {
        Task CreateCommunity(
            CreateCommunityDto dto
        );

        Task<IEnumerable<Community>>
        GetPendingCommunities();

        Task ApproveCommunity(
            int communityId
        );

        Task RejectCommunity(
            int communityId
        );

        Task<IEnumerable<Community>>
GetApprovedCommunities();

        Task<bool> JoinCommunity(
            int communityId,
            int userId
        );

        Task<IEnumerable<Community>>
        GetMyCommunities(
            int userId
        );

        Task<Community>
GetCommunityById(
int communityId
);

        Task<bool>
        IsCommunityMember(
            int communityId,
            int userId
        );

        Task<IEnumerable<Blog>>
        GetCommunityBlogs(
            int communityId
        );

        Task<IEnumerable<Video>>
        GetCommunityVideos(
            int communityId
        );


        Task<int>
GetCommunityMemberCount(
    int communityId
);

        Task LeaveCommunity(
    int communityId,
    int userId
);


        Task AddCommunityNotification(
    int communityId,
    int senderUserId,
    string message
);


    }
}