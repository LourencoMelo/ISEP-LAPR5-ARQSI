using System.Threading.Tasks;

namespace WarehouseApi.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}