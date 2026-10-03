const payButtons = document.querySelectorAll(".pay-button");

payButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const item = button.dataset.item;
    const price = Number(button.dataset.price);

    const widget = new cp.CloudPayments({
      language: "en-US"
    });

    const intentParams = {
      publicTerminalId: "test_api_00000000000000000000002",
      description: "StarBuks — " + item,
      paymentSchema: "Single",
      amount: price,
      currency: "RUB",
      culture: "en-US",
      skin: "classic",
      externalId: "starbuks-" + Date.now()
    };

    widget.oncomplete = function (result) {

      console.log("CloudPayments result:", result);

      if (result.status === "success") {

        alert(
          "Payment successful!\n\n" +
          "Item: " + item + "\n" +
          "Amount: " + price + " RUB"
        );

      } else {

        console.log("Payment was not completed.");

      }

    };

    widget.start(intentParams)
      .then(function (result) {

        console.log("Payment finished:", result);

      })
      .catch(function (error) {

        console.error("CloudPayments error:", error);

        alert(
          "Payment could not be completed."
        );

      });

  });

});
