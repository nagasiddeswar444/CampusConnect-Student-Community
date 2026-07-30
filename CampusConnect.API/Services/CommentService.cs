using CampusConnect.API.DTOs;
using CampusConnect.API.Models;
using CampusConnect.API.Repositories;

namespace CampusConnect.API.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _repository;

        public CommentService(ICommentRepository repository)
        {
            _repository = repository;
        }

        public async Task AddComment(AddCommentDto dto)
        {
            await _repository.AddComment(dto);
        }

        public async Task<IEnumerable<Comment>> GetCommentsByBlog(int blogId)
        {
            return await _repository.GetCommentsByBlog(blogId);
        }
    }
}