using DAL.EF;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class TokenRepo : IRepo<Token, Token, bool, int>,IToken
    {
        EcommerceMSWebAPIEntities db;
        public TokenRepo() { 
            this.db = new EcommerceMSWebAPIEntities();  
        }
        public Token Create(Token obj)
        {

            db.Tokens.Add(obj);
            return db.SaveChanges() > 0 ? obj : null;   
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<Token> Get()
        {
            throw new NotImplementedException();
        }

        public Token Get(int id)
        {
            throw new NotImplementedException();
        }

        public Token GetByTKey(string tkey)
        {
            return db.Tokens.FirstOrDefault(t => t.Tkey == tkey);  
        }

        public bool ExpireToken(string tkey)
        {
            var token = GetByTKey(tkey);
            if(token != null)
            {
                token.ExpiredAt = DateTime.Now;
                return db.SaveChanges() > 0;
            }
            return false;   

        }
        public bool Update(Token obj)
        {
            throw new NotImplementedException();
        }
    }
}
