using DAL.EF;
using System;


namespace BLL.DTOs
{
    public class TokenDTO
    {
        public int Id { get; set; }
        public string Tkey { get; set; }
        public DateTime GeneratedAt { get; set; }
        public Nullable<System.DateTime> ExpiredAt { get; set; }
        public string UserId { get; set; }

        public virtual UserDTO User { get; set; }
    }
}
