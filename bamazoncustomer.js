var inquirer = require('inquirer');
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '!207Weeble',
  database : 'bamazondb'
});
 
connection.connect();

 var makeTable = function(){
connection.query('SELECT * FROM products', function (error, results, fields) {
    for (var i=0; i<results.length; i++){
        console.log(res[i].item_id +" *** "+ results[i].product_name +" *** "+ results[i].department_name+"  *** "+results[i].price+" *** "+results[i].stock_quantity+"/n");
    
 
  askQuestion();
    }
});
 }


function askQuestion (){
inquirer.prompt([
    {
        name: "menu",
        message:"Enter item id that you would like to select",
        type: "input",

    },{
        name: "quantity",
        message:"How many of this item do you want to buy?",
        type:"input",
    }
]).then(answers => {
    console.log(answers);
    connection.query('SELECT * FROM products WHERE item_id='+ answers.menu, function (error, results, fields){
        console.log("quantity available:" , results[0].stock_quantity);

        if (parseInt(results[0].stock_quantity)> parseInt(answers.quantity)){
        console.log("there is enough");
        connection.query("UPDATE products SET stock_quantity ='"+(results[id].stock_quantity - answers.quantity) + "' WHERE product_name ='"+product +"'", function (error, results, fields){
            console.log("Your purchase was successful!");
            makeTable();
        })
    
        }  else {
            console.log("not enough!");
            promptCustomer(results);
        }

    })
});
}


