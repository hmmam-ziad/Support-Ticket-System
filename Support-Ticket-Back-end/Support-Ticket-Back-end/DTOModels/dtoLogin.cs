using System.ComponentModel.DataAnnotations;

namespace Support_Ticket_Back_end.DTOModels
{
    public class dtoLogin
    {
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
    }
}
