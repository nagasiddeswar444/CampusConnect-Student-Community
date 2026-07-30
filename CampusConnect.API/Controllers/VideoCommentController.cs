using CampusConnect.API.DTOs;
using CampusConnect.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CampusConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoCommentController
        : ControllerBase
    {
        private readonly
            IVideoCommentService
            _service;

        public VideoCommentController(
            IVideoCommentService service)
        {
            _service = service;
        }

        [HttpPost("add")]
        public async Task<IActionResult>
            AddComment(
                AddVideoCommentDto dto)
        {
            await _service
                .AddComment(dto);

            return Ok(new
            {
                message =
                "Comment added successfully"
            });
        }

        [HttpGet("video/{videoId}")]
        public async Task<IActionResult>
            GetCommentsByVideo(
                int videoId)
        {
            var comments =
                await _service
                .GetCommentsByVideo(
                    videoId
                );

            return Ok(comments);
        }
    }
}