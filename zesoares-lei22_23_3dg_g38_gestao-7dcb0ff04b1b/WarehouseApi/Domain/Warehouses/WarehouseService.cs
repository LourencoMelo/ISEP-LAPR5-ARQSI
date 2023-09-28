using WarehouseApi.Domain.Shared;

namespace WarehouseApi.Domain.Warehouses
{
    public class WarehouseService
    {
        /**
         * Interface unit of work instance
         */
        private readonly IUnitOfWork _unitOfWork;

        /**
         * Interface warehouseRepository instance
         */
        private readonly IWarehouseRepository _repo;

        /**
         * Warehouse service constructor 
         */
        public WarehouseService(IUnitOfWork unitOfWork, IWarehouseRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        /**
         * Method to get all the warehouses
         */
        public async Task<List<WarehouseDto>> GetAllASync()
        {
            var list = await this._repo.GetAllAsync();

            var listDto = list.ConvertAll<WarehouseDto>(warehouse => WarehouseMapper.ToDto(warehouse));

            /*List<WarehouseDto> listDto = list.ConvertAll<WarehouseDto>(war => new WarehouseDto
            {
                Id = war.Id.AsGuid(), WarehouseDesignation = war.WarehouseDesignation,
                WarehouseAddress = war.WarehouseAddress, WarehouseCoordinates = war.WarehouseCoordinates,
                WarehouseAltitude = war.WarehouseAltitude
            });
            */

            return listDto;
        }
        
        public async Task<List<WarehouseDto>> GetAllActive()
        {
            var list = await this._repo.GetAllAsync();

            var newList = list.Where(x => x.Active);

            List<WarehouseDto> listDto = new List<WarehouseDto>();
            
            foreach (var w in newList)
            {
                listDto.Add(WarehouseMapper.ToDto(w));
            }
            
            /*List<WarehouseDto> listDto = list.ConvertAll<WarehouseDto>(war => new WarehouseDto
            {
                Id = war.Id.AsGuid(), WarehouseDesignation = war.WarehouseDesignation,
                WarehouseAddress = war.WarehouseAddress, WarehouseCoordinates = war.WarehouseCoordinates,
                WarehouseAltitude = war.WarehouseAltitude
            });
            */

            return listDto;
        }

        /**
         * Method to get a wareohuse by id
         */
        public async Task<WarehouseDto> GetByIdAsync(WarehouseId id)
        {
            var war = await this._repo.GetByIdAsync(id);

            if (war == null) return null;

            return WarehouseMapper.ToDto(war);
            /*
            return new WarehouseDto
            {
                Id = war.Id.AsGuid(), WarehouseDesignation = war.WarehouseDesignation,
                WarehouseAddress = war.WarehouseAddress, WarehouseCoordinates = war.WarehouseCoordinates,
                WarehouseAltitude = war.WarehouseAltitude
            };
            */
        }

        /**
         * Method to add a warehouse
         */
        public async Task<WarehouseDto> AddASync(CreatingWarehouseDto dto)
        {
            var warehouse = WarehouseMapper.ToDomain2(dto);

            await this._repo.AddAsync(warehouse);


            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.ToDto(warehouse);

            /*var warehouse = new Warehouse(dto.WarehouseDesignation, dto.WarehouseAddress, dto.WarehouseCoordinates,
                dto.WarehouseAltitude);

            await this._repo.AddAsync(warehouse);

            await this._unitOfWork.CommitAsync();

            return new WarehouseDto
            {
                Id = warehouse.Id.AsGuid(), WarehouseDesignation = warehouse.WarehouseDesignation,
                WarehouseAddress = warehouse.WarehouseAddress, WarehouseCoordinates = warehouse.WarehouseCoordinates,
                WarehouseAltitude = warehouse.WarehouseAltitude
            };
            */
        }

        /**
         * Method to update a warehouse
         */
        public async Task<WarehouseDto> UpdateAsync(WarehouseDto dto)
        {
            var warehouse = await this._repo.GetByIdAsync(new WarehouseId(dto.Id));

            if (warehouse == null)
            {
                return null;
            }

            //change all field
            warehouse.ChangeDesignation(new WarehouseDesignation(dto.WarehouseDesignation));
            warehouse.ChangeAddress(new WarehouseAddress(dto.WarehouseAddress));
            warehouse.ChangeCoordinates(new WarehouseCoordinates(dto.WarehouseCoordinates));
            warehouse.ChangeAltitude(new WarehouseAltitude(dto.WarehouseAltitude));

            if (dto.Active == true)
            {
                warehouse.MarkAsActive();
            }
            else
            {
                warehouse.MarkAsInative();
            }

            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.ToDto(warehouse);
            /*
            return new WarehouseDto
            {
                Id = warehouse.Id.AsGuid(), WarehouseDesignation = warehouse.WarehouseDesignation,
                WarehouseAddress = warehouse.WarehouseAddress, WarehouseCoordinates = warehouse.WarehouseCoordinates,
                WarehouseAltitude = warehouse.WarehouseAltitude
            };
            */
        }

        /**
         * Method to set a wareohuse as inactive
         */
        public async Task<WarehouseDto> InactiveAsync(WarehouseId id)
        {
            var warehouse = await this._repo.GetByIdAsync(id);

            if (warehouse == null) return null;

            //change all fields
            warehouse.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.ToDto(warehouse);
            /*
            return new WarehouseDto
            {
                Id = warehouse.Id.AsGuid(), WarehouseDesignation = warehouse.WarehouseDesignation,
                WarehouseAddress = warehouse.WarehouseAddress, WarehouseCoordinates = warehouse.WarehouseCoordinates,
                WarehouseAltitude = warehouse.WarehouseAltitude
            };
            */
        }
        
        public async Task<WarehouseDto> ActiveAsync(WarehouseId id)
        {
            var warehouse = await this._repo.GetByIdAsync(id);

            if (warehouse == null) return null;

            //change all fields
            warehouse.MarkAsActive();

            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.ToDto(warehouse);
            /*
            return new WarehouseDto
            {
                Id = warehouse.Id.AsGuid(), WarehouseDesignation = warehouse.WarehouseDesignation,
                WarehouseAddress = warehouse.WarehouseAddress, WarehouseCoordinates = warehouse.WarehouseCoordinates,
                WarehouseAltitude = warehouse.WarehouseAltitude
            };
            */
        }

        /**
         * Method to delete a warehouse
         */
        public async Task<WarehouseDto> DeleteAsync(WarehouseId id)
        {
            var warehouse = await this._repo.GetByIdAsync(id);

            if (warehouse == null) return null;

            if (warehouse.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active warehouse.");

            this._repo.Remove(warehouse);
            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.ToDto(warehouse);
            /*
            return new WarehouseDto
            {
                Id = warehouse.Id.AsGuid(), WarehouseDesignation = warehouse.WarehouseDesignation,
                WarehouseAddress = warehouse.WarehouseAddress, WarehouseCoordinates = warehouse.WarehouseCoordinates,
                WarehouseAltitude = warehouse.WarehouseAltitude
            };
            */
        }
    }
}