using WarehouseApi.Domain.Shared;
using WarehouseApi.Infraesctructure;

namespace WarehouseApi.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        /**
         * Context of database
         */
        private readonly WarehouseAPIDbContext _context;

        /**
         * Unit of work constructor to set the context
         */
        public UnitOfWork(WarehouseAPIDbContext context)
        {
            this._context = context;
        }

        /**
         * Method to save the changes in database
         */
        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}