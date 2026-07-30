using CampusConnect.API.DTOs;
using CampusConnect.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CampusConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommunityController
        : ControllerBase
    {
        private readonly
            ICommunityService
            _service;

        public CommunityController(
            ICommunityService service
        )
        {
            _service = service;
        }

        [HttpPost("create")]
        public async Task<IActionResult>
            CreateCommunity(
                CreateCommunityDto dto
            )
        {
            await _service
                .CreateCommunity(dto);

            return Ok(new
            {
                message =
                "Community created successfully"
            });
        }

        [HttpGet("approved")]
        public async Task<IActionResult>
GetApprovedCommunities()
        {
            var communities =
                await _service
                    .GetApprovedCommunities();

            return Ok(
                communities
            );
        }

        [HttpPost("join")]
        public async Task<IActionResult>
JoinCommunity(
    JoinCommunityDto dto
)
        {
            bool joined =
    await _service.JoinCommunity(
        dto.CommunityId,
        dto.UserId
    );

            if (joined)
            {
                return Ok(new
                {
                    success = true,
                    message = "🎉 You have successfully joined this community!"
                });
            }

            return Ok(new
            {
                success = false,
                message = "ℹ️ You are already a member of this community."
            });
        }

        [HttpGet("my/{userId}")]
        public async Task<IActionResult>
GetMyCommunities(
    int userId
)
        {
            var communities =
                await _service
                    .GetMyCommunities(
                        userId
                    );

            return Ok(
                communities
            );
        }

        [HttpGet("{communityId}")]
        public async Task<IActionResult>
GetCommunity(
    int communityId
)
        {
            var community =
                await _service
                .GetCommunityById(
                    communityId
                );

            return Ok(
                community
            );
        }

        [HttpGet("member")]
        public async Task<IActionResult>
IsMember(
    int communityId,
    int userId
)
        {
            var result =
                await _service
                .IsCommunityMember(
                    communityId,
                    userId
                );

            return Ok(
                result
            );
        }

        [HttpGet("{communityId}/blogs")]
        public async Task<IActionResult>
GetCommunityBlogs(
    int communityId
)
        {
            var blogs =
                await _service
                .GetCommunityBlogs(
                    communityId
                );

            return Ok(
                blogs
            );
        }

        [HttpGet("{communityId}/videos")]
        public async Task<IActionResult>
GetCommunityVideos(
    int communityId
)
        {
            var videos =
                await _service
                .GetCommunityVideos(
                    communityId
                );

            return Ok(
                videos
            );
        }


        [HttpGet("{communityId}/members/count")]
        public async Task<IActionResult>
GetMemberCount(
    int communityId
)
        {
            var count =
                await _service
                .GetCommunityMemberCount(
                    communityId
                );

            return Ok(
                count
            );
        }


        [HttpDelete("leave")]
        public async Task<IActionResult>
LeaveCommunity(
    int communityId,
    int userId
)
        {
            await _service
                .LeaveCommunity(
                    communityId,
                    userId
                );

            return Ok(
                new
                {
                    message =
                    "Community left successfully"
                }
            );
        }


        [HttpGet("test123")]
        public IActionResult Test123()
        {
            return Ok("Working");
        }


    }
}