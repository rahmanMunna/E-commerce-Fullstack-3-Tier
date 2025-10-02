using BLL.DTOs;
using BLL.Helper;
using DAL;
using DAL.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class AuthentiicationService
    {
        public static TokenDTO Login(string userId, string password)
        {
            var user = DataAccessFactory.UserData().Get(userId);
            if(user != null && user.Password == password)
            {
                var token = GenerateToken(userId);  
                token.User = DataAccessFactory.UserData().Get(userId);
                return MapperHelper.GetMapper().Map<TokenDTO>(token);
             
            }
            return null;
            
        }   

        private static Token GenerateToken(string userId)
        {
            // Create a token
            var newToken = new Token()
            {
                Tkey = Guid.NewGuid().ToString(),
                GeneratedAt = DateTime.Now,
                UserId = userId
            };

            var token = DataAccessFactory.TokenData().Create(newToken);
            return token;
        }

        public static User isValidToken(string tkey)
        {
            var token = DataAccessFactory.TokenDataExtented().GetByTKey(tkey);
            if(token != null && (token.ExpiredAt == null || token.ExpiredAt > DateTime.Now))
            {
                return token.User;
            }
            return null;
        }
        
        public static bool Logout(string tkey)
        {
            var result = DataAccessFactory.TokenDataExtented().ExpireToken(tkey);
            return result;

        }
    }
}
