public class AddCommentDto
{
    public int BlogId { get; set; }

    public int UserId { get; set; }

    public string CommentText { get; set; }

    public int? ParentCommentId { get; set; }



}