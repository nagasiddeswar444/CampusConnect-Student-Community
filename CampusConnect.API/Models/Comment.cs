public class Comment
{
    public int CommentId { get; set; }

    public int BlogId { get; set; }

    public int UserId { get; set; }

    public string CommentText { get; set; }

    public DateTime CreatedAt { get; set; }

    public string? FullName { get; set; }

    public int? ParentCommentId { get; set; }
}