using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Support_Ticket_Back_end.Models;

namespace Support_Ticket_Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<UserApp> _userManager;
        private readonly IConfiguration _config;
        public AccountController(UserManager<UserApp> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }
    }
}
