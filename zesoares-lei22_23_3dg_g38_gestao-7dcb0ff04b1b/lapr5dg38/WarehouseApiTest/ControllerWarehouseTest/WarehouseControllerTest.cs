using System.Diagnostics.Metrics;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json;
using WarehouseApi.Controllers;
using WarehouseApi.Domain.Shared;
using WarehouseApi.Domain.Warehouses;
using Xunit.Abstractions;

namespace WarehouseApiTest.ControllerWarehouseTest;

public class WarehouseControllerUnitTest
{
    private readonly ITestOutputHelper _output;

    public WarehouseControllerUnitTest(ITestOutputHelper _output)
    {
        this._output = _output;
    }


    [Fact]
    public async void PostWarehouse()
    {
        string designation = "Teste";
        string address = "Rua Teste, 431;4249-015 Porto;Portugal";
        string coordinates = "40.8387° N, 8.4770° W";
        double altitude = 400;

        WarehouseDesignation warehouseDesignation = new WarehouseDesignation(designation);
        WarehouseAddress warehouseAddress = new WarehouseAddress(address);
        WarehouseCoordinates warehouseCoordinates = new WarehouseCoordinates(coordinates);
        WarehouseAltitude warehouseAltitude = new WarehouseAltitude(altitude);

        //Warehouse
        CreatingWarehouseDto _creatingWarehouseDto = new CreatingWarehouseDto(designation, address, coordinates, altitude);
        Warehouse warehouse =
            new Warehouse(warehouseDesignation, warehouseAddress, warehouseCoordinates, warehouseAltitude);

        WarehouseDto warehouseDto =
            new WarehouseDto(warehouse.Id.AsGuid(), designation, address, coordinates, altitude);
        
        //Arrange
        var mockUnitOfWork = new Mock<IUnitOfWork>();
        var mockWarehouseRepository = new Mock<IWarehouseRepository>();
        var mockWarehouseService = new Mock<WarehouseService>(mockUnitOfWork.Object,mockWarehouseRepository.Object);

        var controller = new WarehousesController(mockWarehouseService.Object);
        
        //Act
        ActionResult<WarehouseDto> o = await controller.Create(_creatingWarehouseDto);

        var objectResult = o.Result as ObjectResult;

        var value = objectResult.Value as WarehouseDto;

        _output.WriteLine(JsonConvert.SerializeObject(value));
        _output.WriteLine(JsonConvert.SerializeObject(warehouseDto));
        
        //Assert
        Assert.NotNull(o);
        Assert.Equal(warehouseDto.WarehouseDesignation, value.WarehouseDesignation);
        Assert.Equal(warehouseDto.WarehouseAddress, value.WarehouseAddress);
        Assert.Equal(warehouseDto.WarehouseCoordinates, value.WarehouseCoordinates);
        Assert.Equal(warehouseDto.WarehouseAltitude, value.WarehouseAltitude);

    }

    
    [Fact]
    public async void GetWarehouseById()
    {
        string designation = "Teste";
        string address = "Rua Teste, 431;4249-015 Porto;Portugal";
        string coordinates = "40.8387° N, 8.4770° W";
        double altitude = 400;

        WarehouseDesignation warehouseDesignation = new WarehouseDesignation(designation);
        WarehouseAddress warehouseAddress = new WarehouseAddress(address);
        WarehouseCoordinates warehouseCoordinates = new WarehouseCoordinates(coordinates);
        WarehouseAltitude warehouseAltitude = new WarehouseAltitude(altitude);
        
        //Warehouse
        CreatingWarehouseDto _creatingWarehouseDto = new CreatingWarehouseDto(designation, address, coordinates, altitude);
        Warehouse warehouse =
            new Warehouse(warehouseDesignation, warehouseAddress, warehouseCoordinates, warehouseAltitude);

        Guid guid = warehouse.Id.AsGuid();
        
        WarehouseDto warehouseDto =
            new WarehouseDto(guid, designation, address, coordinates, altitude);
        
        //Arrange
        var mockUnitOfWork = new Mock<IUnitOfWork>();
        var mockWarehouseRepository = new Mock<IWarehouseRepository>();
        var mockWarehouseService = new Mock<WarehouseService>(mockUnitOfWork.Object,mockWarehouseRepository.Object);

        var controller = new WarehousesController(mockWarehouseService.Object);
        
        //Act
        ActionResult<WarehouseDto> o = await controller.Create(_creatingWarehouseDto);

        var obj = o.Result as ObjectResult;

        var l = obj.Value as WarehouseDto;

        _output.WriteLine(JsonConvert.SerializeObject(l));
        _output.WriteLine(JsonConvert.SerializeObject(warehouseDto));
        
        ActionResult<WarehouseDto> x = await controller.GetGetById(l.Id);
        
        var objectResultx = x.Result as ObjectResult;

        var value = objectResultx.Value as WarehouseDto;

        _output.WriteLine(JsonConvert.SerializeObject(x));
        //Assert
        Assert.NotNull(x);
        Assert.Equal(warehouseDto.WarehouseDesignation, value.WarehouseDesignation);
        Assert.Equal(warehouseDto.WarehouseAddress, value.WarehouseAddress);
        Assert.Equal(warehouseDto.WarehouseCoordinates, value.WarehouseCoordinates);
        Assert.Equal(warehouseDto.WarehouseAltitude, value.WarehouseAltitude);

    }
    

    [Fact]
    public async void updateWarehouse()
    {
        string designation = "Teste";
        string address = "Rua Teste, 431;4249-015 Porto;Portugal";
        string coordinates = "40.8387° N, 8.4770° W";
        double altitude = 400;

        WarehouseDesignation warehouseDesignation = new WarehouseDesignation(designation);
        WarehouseAddress warehouseAddress = new WarehouseAddress(address);
        WarehouseCoordinates warehouseCoordinates = new WarehouseCoordinates(coordinates);
        WarehouseAltitude warehouseAltitude = new WarehouseAltitude(altitude);
        
        string designationNew = "New";
        string addressNew = "Rua New, 431;4249-015 Porto;Portugal";
        string coordinatesNew = "40.8387° N, 8.4770° W";
        double altitudeNew = 200;

        //Warehouse
        CreatingWarehouseDto _creatingWarehouseDto = new CreatingWarehouseDto(designation, address, coordinates, altitude);
        Warehouse warehouse =
            new Warehouse(warehouseDesignation, warehouseAddress, warehouseCoordinates, warehouseAltitude);
        WarehouseDto warehouseDto =
            new WarehouseDto(warehouse.Id.AsGuid(), designation, address, coordinates, altitude);

        //New
        CreatingWarehouseDto _creatingWarehouseDtoNew = new CreatingWarehouseDto(designationNew, addressNew, coordinatesNew, altitudeNew);

        WarehouseDto warehouseDtoNew =
            new WarehouseDto(warehouse.Id.AsGuid(), designationNew, addressNew, coordinatesNew, altitudeNew);
        
        //Arrange
        var mockUnitOfWork = new Mock<IUnitOfWork>();
        var mockWarehouseRepository = new Mock<IWarehouseRepository>();
        var mockWarehouseService = new Mock<WarehouseService>(mockUnitOfWork.Object,mockWarehouseRepository.Object);

        mockWarehouseService.Setup(p=>p.UpdateAsync(warehouseDto));
        
        var controller = new WarehousesController(mockWarehouseService.Object);
        
        //Act
        ActionResult<WarehouseDto> o = await controller.Create(_creatingWarehouseDto);

        var objectResult = o.Result as ObjectResult;

        var value = objectResult.Value as WarehouseDto;

        _output.WriteLine(JsonConvert.SerializeObject(value));
        _output.WriteLine(JsonConvert.SerializeObject(warehouseDto));

        var id = value.Id;
        
        ActionResult<WarehouseDto> x = await controller.Update(id, warehouseDtoNew);
        
        var obj = x.Result as ObjectResult;

        var l = obj.Value as WarehouseDto;
        
        Assert.NotNull(l);
        Assert.Equal("New",l.WarehouseDesignation);
        Assert.Equal("Rua New, 431;4249-015 Porto;Portugal",l.WarehouseAddress);
        Assert.Equal("40.8387° N, 8.4770° W",l.WarehouseCoordinates);
        Assert.Equal(200,l.WarehouseAltitude);

    }

}