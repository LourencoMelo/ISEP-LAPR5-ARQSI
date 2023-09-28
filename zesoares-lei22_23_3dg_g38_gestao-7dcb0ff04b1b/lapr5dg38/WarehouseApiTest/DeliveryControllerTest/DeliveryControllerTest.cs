using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json;
using WarehouseApi.Controllers;
using WarehouseApi.Domain.Deliveries;
using WarehouseApi.Domain.Shared;
using WarehouseApi.Domain.Warehouses;
using Xunit.Abstractions;

namespace WarehouseApiTest.DeliveryControllerTest;

public class DeliveryControllerTest
{
    private readonly ITestOutputHelper _output;

    public DeliveryControllerTest(ITestOutputHelper _output)
    {
        this._output = _output;
    }

    [Fact]
    public async void PostDelivery()
    {
        string date = "14051999";
        double mass = 25;
        string warehouseID = "6de62bed-e66f-4025-ba17-cba990ebe6eb";
        int input = 4;
        int output = 4;

        DeliveryDate deliveryDate = new DeliveryDate(date);
        DeliveryMass deliveryMass = new DeliveryMass(mass);
        WarehouseId warehouse = new WarehouseId(warehouseID);
        InputTruck inputTruck = new InputTruck(input);
        OutputTruck outputTruck = new OutputTruck(output);
        
        //Delivery
        CreatingDeliveryDto creatingDeliveryDto = new CreatingDeliveryDto(date, mass, warehouseID, input, output);
        Delivery delivery = new Delivery(deliveryDate, deliveryMass,warehouse ,inputTruck, outputTruck);

        DeliveryDto deliveryDto = new DeliveryDto(delivery.Id.AsGuid(), date, mass, warehouseID, input, output);
        
        //Arrange
        var mockUnitOfWork = new Mock<IUnitOfWork>();
        var mockDeliveryRepository = new Mock<IDeliveryRepository>();

        var deliveryService = new DeliveryService(mockUnitOfWork.Object, mockDeliveryRepository.Object);

        var controller = new DeliveryController(deliveryService);
        
        //Act
        ActionResult<DeliveryDto> actionResult = await controller.Create(creatingDeliveryDto);

        var objectResult = actionResult.Result as ObjectResult;

        var value = objectResult.Value as DeliveryDto;
        
        _output.WriteLine(JsonConvert.SerializeObject(value));
        _output.WriteLine(JsonConvert.SerializeObject(deliveryDto));
    
        //Assert
        Assert.NotNull(actionResult);
        Assert.Equal(deliveryDto.Date, deliveryDto.Date);
        Assert.Equal(deliveryDto.Mass, value.Mass);
        Assert.Equal(deliveryDto.WarehouseId, value.WarehouseId);
        Assert.Equal(deliveryDto.InputTruck, value.InputTruck);
        Assert.Equal(deliveryDto.OutputTruck, value.OutputTruck);
    }
}