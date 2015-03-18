$(document).ready(function() {
    var activeCategory;
    var allCategories = [];
    var Category = {
        name: "",
        totalAmount: function () {
            var sum = 0;
            for (var i = 0; i < this.purchases.length; i++) {
                sum += (this.purchases[i].totalCost());
            } return sum;
        },
        initialize: function(name){
            this.name = name;
            this.purchases = [];
        }
    };

    var Purchase = {
        description:"",
        price:0,
        quantity:1,
        totalCost:function(){
            return this.price * this.quantity
        }
    };

    $('#categories-form').submit(function(e){
        e.preventDefault();
        var newCategory = Object.create(Category);
        newCategory.initialize($("input#category").val());
        allCategories.push(newCategory);

        $("ul#categories").append("<li><span class='catName'>" + newCategory.name  + "</span></li>");
        $('.no-category').hide();
        $("span#activeCategory").text(newCategory.name);
        $("table").empty().append('<tr>' +
        '<td class="description">Description</td>' +
        '<td class="price">Price</td>' +
        '<td class="quantity">Quantity</td>>' +
        '<td class="total">Total</td>>' +
        '</tr>').hide();
        $('.no-purchase').show();
        $("#total-amount").text("");
        $("input#category").val("");

        $("ul#categories li").last().click(function() {

            activeCategory = $(this).text();
            $("span#activeCategory").text(activeCategory);

            for(var i = 0; i < allCategories.length; i++){
                if(activeCategory == allCategories[i].name){

                    $("table").empty().append('<tr>' +
                    '<td class="description">Description</td>' +
                    '<td class="price">Price</td>' +
                    '<td class="quantity">Quantity</td>>' +
                    '<td class="total">Total</td>>' +
                    '</tr>');

                    allCategories[i].purchases.forEach(function(myPurchase)
                    {
                        $("table").append('<tr>' +
                        '<td class="description"></td>' +
                        '<td class="price"></td>' +
                        '<td class="quantity"></td>>' +
                        '<td class="total"></td>>' +
                        '</tr>');

                        $(".description").last().text(myPurchase.description);
                        $(".price").last().text(myPurchase.price);
                        $(".quantity").last().text(myPurchase.quantity);
                        $(".total").last().text(myPurchase.totalCost());

                    });
                    $("#total-amount").text('The category total amount is: ' + allCategories[i].totalAmount());
                }
            }
        });
    });

    $("form#purchases-form").submit(function (e) {
        e.preventDefault();
        function Track() {
            $('.no-purchase').hide();
            var myPurchase = Object.create(Purchase);
            myPurchase.description = $("input#description").val();
            myPurchase.price = parseInt($("input#price").val());
            myPurchase.quantity = parseInt($("input#quantity").val());

            var activeCategory = $("span#activeCategory").text();

            $("table").show().append('<tr>' +
            '<td class="description"></td>' +
            '<td class="price"></td>' +
            '<td class="quantity"></td>>' +
            '<td class="total"></td>>' +
            '</tr>');

            $(".description").last().text(myPurchase.description);
            $(".price").last().text(myPurchase.price);
            $(".quantity").last().text(myPurchase.quantity);
            $(".total").last().text(myPurchase.totalCost());

            for(var i = 0; i < allCategories.length; i++){
                if(activeCategory == allCategories[i].name){
                    allCategories[i].purchases.push(myPurchase);
                    $("#total-amount").empty().append('Total amount of category is: ' + allCategories[i].totalAmount() );
                }
            }
            $("input#description").val("");
            $("input#price").val("");
            $("input#quantity").val("");
        }
        Track();
    });
});