using CampusConnect.API.DTOs;
using CampusConnect.API.Services;
using Microsoft.AspNetCore.Mvc;


namespace CampusConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _service;

        public BlogController(IBlogService service)
        {
            _service = service;
        }

        [HttpPost("create")]
        public async Task<IActionResult>
CreateBlog(
    [FromForm]
    CreateBlogDto dto
)
        {
            await _service.CreateBlog(dto);

            return Ok(new
            {
                message = "Blog created successfully"
            });
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllBlogs()
        {
            var blogs = await _service.GetAllBlogs();

            return Ok(blogs);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetBlogsByUser(int userId)
        {
            var blogs = await _service.GetBlogsByUser(userId);

            return Ok(blogs);
        }

        [HttpPut("update")]
        public async Task<IActionResult>
UpdateBlog(
    [FromForm] UpdateBlogDto dto
)
        {
            await _service.UpdateBlog(dto);

            return Ok(new
            {
                message = "Blog updated successfully"
            });
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteBlog(
    [FromBody] DeleteBlogDto dto)
        {
            await _service.DeleteBlog(dto);

            return Ok(new
            {
                message = "Blog deleted successfully"
            });
        }
    }
}