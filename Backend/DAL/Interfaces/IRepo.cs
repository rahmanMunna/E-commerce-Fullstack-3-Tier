using System;
using System.Collections.Generic;


namespace DAL.Interfaces
{
    public interface IRepo<CLASS,Cr_RET, Up_RET,ID>
    {
        List<CLASS> Get();
        CLASS Get(ID id);
        Cr_RET Create(CLASS obj);
        Up_RET Update(CLASS obj);
        bool Delete(ID id);
        

    }
}
