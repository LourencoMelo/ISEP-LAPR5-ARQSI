using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using WarehouseApi.Domain.Shared;
using WarehouseApi.Domain.Warehouses;

namespace WarehouseApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehousesController : ControllerBase
    {
        private readonly WarehouseService _service;

        public WarehousesController(WarehouseService service)
        {
            _service = service;
        }

        /**
         * Method to get all info of the warehouses registered using GET
         */
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WarehouseDto>>> GetAll()
        {
            return await _service.GetAllASync();
        }

        /**
         * Method to get info of the a specific warehouse
         */
        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseDto>> GetGetById(string id)
        {
            var war = await _service.GetByIdAsync(new WarehouseId(id));

            if (war == null)
            {
                return NotFound();
            }

            return war;
        }
        
        /**
         * Method to get info of the a specific warehouse
         */
        [HttpGet("GetAllActive")]
        public async Task<ActionResult<IEnumerable<WarehouseDto>>> GetAllActive()
        {
            return await _service.GetAllActive();
        }

        /**
         * Method to register a warehouse using POST
         */
        [HttpPost]
        public async Task<ActionResult<WarehouseDto>> Create(CreatingWarehouseDto dto)
        {
            var war = await _service.AddASync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = war.Id }, war);
        }
        
        /**
         * Method to change a warehouse information using PUT
         */
        [HttpPut("{id}")]
        public async Task<ActionResult<WarehouseDto>> Update(String id, WarehouseDto dto)
        {
            if (id != dto.Id)
            { 
                return BadRequest();
            }

            try
            {
                var war = await _service.UpdateAsync(dto);

                if (war == null)
                {
                    return NotFound();
                }

                return Ok(war);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
        
        //INACTIVATE ===========================================================

        [HttpPut("Inactivate/{id}")]
        public async Task<ActionResult<WarehouseDto>> InactivateWarehouse(String id)
        {
            try
            {
                var war = await _service.InactiveAsync(new WarehouseId(id));

                if (war == null)
                {
                    return NotFound();
                }   

                return Ok(war);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
        
        //ACTIVATE ===========================================================
        
        [HttpPut("Activate/{id}")]
        public async Task<ActionResult<WarehouseDto>> ActivateWarehouse(String id)
        {
            try
            {
                var war = await _service.ActiveAsync(new WarehouseId(id));

                if (war == null)
                {
                    return NotFound();
                }   

                return Ok(war);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
        
        /**
         * Method to inactivate a warehouse
         */
        [HttpDelete("{id}")]
        public async Task<ActionResult<WarehouseDto>> SoftDelete(string id)
        {
            var war = await _service.InactiveAsync(new WarehouseId(id));

            if (war == null)
            {
                return NotFound();
            }   

            return Ok(war);
        }
        
        /**
         * Method to inactivate a warehouse
         */
        [HttpPatch("{id}")]
        public async Task<ActionResult<WarehouseDto>> ActivateWarehousePatch(string id)
        {
            var war = await _service.ActiveAsync(new WarehouseId(id));

            if (war == null)
            {
                return NotFound();
            }   

            return Ok(war);
        }


        /**
         * Method to delete a warehouse
         */
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<WarehouseDto>> HardDelete(string id)
        {
            try
            {
                var war = await _service.DeleteAsync(new WarehouseId(id));

                if (war == null)
                {
                    return NotFound();
                }

                return Ok(war);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}