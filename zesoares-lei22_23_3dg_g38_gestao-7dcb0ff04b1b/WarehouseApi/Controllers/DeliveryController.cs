using Microsoft.AspNetCore.Mvc;
using WarehouseApi.Domain.Deliveries;
using WarehouseApi.Domain.Shared;

namespace WarehouseApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        private readonly DeliveryService _service;

        public DeliveryController(DeliveryService service)
        {
            _service = service;
        }
        
        // GET: api/Deliveries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryDto>>> GetAll()
        {
            return await _service.GetAllASync();
        }
        
        // GET: api/Warehouses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryDto>> GetGetById(Guid id)
        {
            var del = await _service.GetByIdAsync(new DeliveryId(id));

            if (del == null)
            {
                return NotFound();
            }

            return del;
        }
        
        [HttpGet("getDeliveriesByDate/{date}")]
        public async Task<ActionResult<IEnumerable<DeliveryDto>>> GetGetByDate(string date)
        {
            var del = await _service.GetDeliveriesByDate(new DeliveryDate(date));

            if (del == null)
            {
                return NotFound();
            }

            return del;
        }
        
        //POST: api/Deliveries
        [HttpPost]
        public async Task<ActionResult<DeliveryDto>> Create(CreatingDeliveryDto dto)
        {
            var del = await _service.AddASync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = del.Id }, del);
        }
        
        //PUT: api/Deliveries/5
        [HttpPut("{id}")]
        public async Task<ActionResult<DeliveryDto>> Update(Guid id, DeliveryDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var del = await _service.UpdateAsync(dto);

                if (del == null)
                {
                    return NotFound();
                }

                return Ok(del);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
        
        //Inactivate: api/Deliveries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DeliveryDto>> SoftDelete(Guid id)
        {
            var del = await _service.InactiveAsync(new DeliveryId(id));

            if (del == null)
            {
                return NotFound();
            }

            return Ok(del);
        }
        
        //DELETE: api/Warehouses/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<DeliveryDto>> HardDelete(Guid id)
        {
            try
            {
                var del = await _service.DeleteAsync(new DeliveryId(id));
                if (del == null)
                {
                    return NotFound();
                }

                return Ok(del);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
