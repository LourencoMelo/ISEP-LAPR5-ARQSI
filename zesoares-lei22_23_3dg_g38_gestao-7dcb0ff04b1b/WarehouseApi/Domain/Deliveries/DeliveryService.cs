using WarehouseApi.Domain.Shared;
using WarehouseApi.Domain.Warehouses;

namespace WarehouseApi.Domain.Deliveries;

public class DeliveryService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IDeliveryRepository _repo;

    public DeliveryService(IUnitOfWork unitOfWork, IDeliveryRepository repo)
    {
        this._unitOfWork = unitOfWork;
        this._repo = repo;
    }
    /**
     * Method of GET all(.../api/Delivery)
     */
    public async Task<List<DeliveryDto>> GetAllASync()
    {
        var list = await this._repo.GetAllAsync();

        var listDto = list.ConvertAll<DeliveryDto>(delivery => DeliveryMapper.ToDto(delivery));
        
        return listDto;
    }
    
    public async Task<List<DeliveryDto>> GetDeliveriesByDate(DeliveryDate date)
    {
        var list = await this._repo.GetAllDeliveriesByDate(date.Date);

        var listDto = list.ConvertAll<DeliveryDto>(delivery => DeliveryMapper.ToDto(delivery));
        
        return listDto;
    }
    
    /**
     * Method of GET by id(.../api/Delivery/{id})
     */
    public async Task<DeliveryDto> GetByIdAsync(DeliveryId id)
    {
        var del = await this._repo.GetByIdAsync(id);

        if (del == null) return null;

        return DeliveryMapper.ToDto(del);
    }

    /**
     * Method of POST(.../api/Delivery)
     */
    public async Task<DeliveryDto> AddASync(CreatingDeliveryDto dto)
    {
        var delivery = DeliveryMapper.ToDomain2(dto);

        await this._repo.AddAsync(delivery);

        await this._unitOfWork.CommitAsync();

        return DeliveryMapper.ToDto(delivery);
    }

    /**
     * Method of PUT(.../api/Delivery/{id})
     */
    public async Task<DeliveryDto> UpdateAsync(DeliveryDto dto)
    {
        var delivery = await this._repo.GetByIdAsync(new DeliveryId(dto.Id));

        if (delivery == null)
        {
            return null;
        }
        
        //change all field
        delivery.ChangeDeliveryDate(new DeliveryDate(dto.Date));
        delivery.ChangeDeliveryMass(new DeliveryMass(dto.Mass));
        delivery.ChangeWarehouseID(new WarehouseId(dto.WarehouseId));
        delivery.ChangeInputTruck(new InputTruck(dto.InputTruck));
        delivery.ChangeOutputTruck(new OutputTruck(dto.OutputTruck));

        await this._unitOfWork.CommitAsync();

        return DeliveryMapper.ToDto(delivery);
    }

    /**
     * Make a Delivery Inactive with a DELETE Method
     * (.../api/Delivery/{id})
     */
    public async Task<DeliveryDto> InactiveAsync(DeliveryId id)
    {
        var delivery = await this._repo.GetByIdAsync(id);

        if (delivery == null) return null;
        
        //change all fields
        delivery.MarkAsInative();

        await this._unitOfWork.CommitAsync();

        return DeliveryMapper.ToDto(delivery);
    }

    /**
     * Delivery METHOD
     * (.../api/Delivery/{id})
     */
    public async Task<DeliveryDto> DeleteAsync(DeliveryId id)
    {
        var delivery = await this._repo.GetByIdAsync(id);

        if (delivery == null) return null;

        if (delivery.Active)
            throw new BusinessRuleValidationException("It's not possible to delete an active delivery");
        
        this._repo.Remove(delivery);
        await this._unitOfWork.CommitAsync();

        return DeliveryMapper.ToDto(delivery);
    }
}