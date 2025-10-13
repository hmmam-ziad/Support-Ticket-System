using System.ComponentModel.DataAnnotations;

namespace Support_Ticket_Back_end.DTOModels
{
    public class dtoRegister
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
