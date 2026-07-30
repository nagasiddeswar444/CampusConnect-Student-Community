using CampusConnect.API.DTOs;
using CampusConnect.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CampusConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoLikeController
        : ControllerBase
    {
        private readonly IVideoLikeService
            _service;

        public VideoLikeController(
            IVideoLikeService service)
        {
            _service = service;
        }

        [HttpPost("add")]
        public async Task<IActionResult>
            AddLike(
                AddVideoLikeDto dto)
        {
            await _service.AddLike(dto);

            return Ok(new
            {
                message =
                "Video liked successfully"
            });
        }

        [HttpDelete("remove")]
        public async Task<IActionResult>
            RemoveLike(
                RemoveVideoLikeDto dto)
        {
            await _service.RemoveLike(dto);

            return Ok(new
            {
                message =
                "Video like removed successfully"
            });
        }

        [HttpGet("count/{videoId}")]
        public async Task<IActionResult>
            GetLikeCount(
                int videoId)
        {
            var count =
                await _service
                .GetLikeCount(videoId);

            return Ok(new
            {
                likeCount = count
            });
        }
    }
}