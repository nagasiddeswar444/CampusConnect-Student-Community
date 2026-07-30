using CampusConnect.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CampusConnect.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _service;

        public AdminController(IAdminService service)
        {
            _service = service;
        }

        [HttpGet("pending-students")]
        public async Task<IActionResult> GetPendingStudents()
        {
            var students = await _service.GetPendingStudents();

            return Ok(students);
        }

        [HttpPut("approve-student/{userId}")]
        public async Task<IActionResult> ApproveStudent(int userId)
        {
            await _service.ApproveStudent(userId);

            return Ok(new
            {
                message = "Student approved successfully"
            });
        }

        [HttpPut("reject-student/{userId}")]
        public async Task<IActionResult> RejectStudent(int userId)
        {
            await _service.RejectStudent(userId);

            return Ok(new
            {
                message = "Student rejected successfully"
            });
        }

        [HttpGet("pending-blogs")]
        public async Task<IActionResult>
 GetPendingBlogs()
        {
            var blogs =
                await _service
                    .GetPendingBlogs();

            return Ok(blogs);
        }

        [HttpGet("blogs")]
        public async Task<IActionResult>
        GetAllBlogs()
        {
            var blogs =
                await _service
                    .GetAllBlogs();

            return Ok(blogs);
        }

        [HttpPut("approve-blog/{blogId}")]
        public async Task<IActionResult>
            ApproveBlog(
                int blogId
            )
        {
            await _service
                .ApproveBlog(blogId);

            return Ok(
                new
                {
                    message =
                    "Blog approved"
                }
            );
        }

        [HttpPut("reject-blog/{blogId}")]
        public async Task<IActionResult>
            RejectBlog(
                int blogId
            )
        {
            await _service
                .RejectBlog(blogId);

            return Ok(
                new
                {
                    message =
                    "Blog rejected"
                }
            );
        }


        [HttpGet("pending-videos")]
        public async Task<IActionResult>
    GetPendingVideos()
        {
            var videos =
                await _service
                    .GetPendingVideos();

            return Ok(videos);
        }

        [HttpGet("pending-communities")]
        public async Task<IActionResult>
GetPendingCommunities()
        {
            var communities =
                await _service
                    .GetPendingCommunities();

            return Ok(
                communities
            );
        }

        [HttpPut("approve-community/{communityId}")]
        public async Task<IActionResult>
        ApproveCommunity(
            int communityId
        )
        {
            await _service
                .ApproveCommunity(
                    communityId
                );

            return Ok(new
            {
                message =
                "Community approved"
            });
        }

        [HttpPut("reject-community/{communityId}")]
        public async Task<IActionResult>
        RejectCommunity(
            int communityId
        )
        {
            await _service
                .RejectCommunity(
                    communityId
                );

            return Ok(new
            {
                message =
                "Community rejected"
            });
        }

        [HttpPut("approve-video/{videoId}")]
        public async Task<IActionResult>
            ApproveVideo(
                int videoId
            )
        {
            await _service
                .ApproveVideo(videoId);

            return Ok(
                new
                {
                    message =
                    "Video approved"
                }
            );
        }

        [HttpPut("reject-video/{videoId}")]
        public async Task<IActionResult>
            RejectVideo(
                int videoId
            )
        {
            await _service
                .RejectVideo(videoId);

            return Ok(
                new
                {
                    message =
                    "Video rejected"
                }
            );
        }

        [HttpDelete("blog/{blogId}")]
        public async Task<IActionResult> DeleteBlog(int blogId)
        {
            await _service.DeleteAnyBlog(blogId);

            return Ok(new
            {
                message = "Blog deleted successfully"
            });
        }

        [HttpGet("videos")]
        public async Task<IActionResult> GetAllVideos()
        {
            var videos = await _service.GetAllVideos();

            return Ok(videos);
        }

        [HttpDelete("video/{videoId}")]
        public async Task<IActionResult> DeleteVideo(int videoId)
        {
            await _service.DeleteAnyVideo(videoId);

            return Ok(new
            {
                message = "Video deleted successfully"
            });
        }

        [HttpDelete("comment/{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            await _service.DeleteAnyComment(commentId);

            return Ok(new
            {
                message = "Comment deleted successfully"
            });
        }
    }
}