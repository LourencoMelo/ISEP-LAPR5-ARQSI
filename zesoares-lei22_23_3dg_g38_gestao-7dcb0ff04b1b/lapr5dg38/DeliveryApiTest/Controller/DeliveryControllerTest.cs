namespace WarehouseApiTest.ControllerWarehouseTest;

public class DeliveryControllerTest
{
    private readonly ITestOutputHelper _output;

    public DeliveryControllerTest(ITestOutputHelper _output)
    {
        this.output = _output;
    }

    [Fact]
    public async void PostDelivery()
    {
        string date = "12091999";
        double mass = 24;
        string warehouseID = "6de62bed-e66f-4025-ba17-cba990ebe6eb";
        int input = 7;
        int output = 7;

        DeliveryId deliveryId = new DeliveryId(date);
    }

}