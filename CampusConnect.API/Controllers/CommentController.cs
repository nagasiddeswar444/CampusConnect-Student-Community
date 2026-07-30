using CampusConnect.API.DTOs;
using CampusConnect.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CampusConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _service;

        public CommentController(ICommentService service)
        {
            _service = service;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddComment(AddCommentDto dto)
        {
            await _service.AddComment(dto);

            return Ok(new
            {
                message = "Comment added successfully"
            });
        }

        [HttpGet("blog/{blogId}")]
        public async Task<IActionResult> GetCommentsByBlog(int blogId)
        {
            var comments = await _service.GetCommentsByBlog(blogId);

            return Ok(comments);
        }
    }
}