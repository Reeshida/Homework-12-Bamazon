var inquirer = require('inquirer');
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  port     :  '3306',
  password : '!207Weeble',
  database : 'bamazondb'
});
 
connection.connect(function(error){
    if(error)throw error;
    console.log("connection successful");
    makeTable();
})

 var makeTable = function(){
connection.query('SELECT * FROM products', function (error, results, fields) {
    for (var i=0; i<results.length; i++){
        console.log(results[i].item_id +" *** "+ results[i].product_name +" *** "+ results[i].department_name+"  *** "+results[i].price+" *** "+results[i].stock_quantity+"/n");
    
 
  
    }
    promptCustomer(results);
});
 }
 

 
var promptCustomer = function (results){
inquirer.prompt([ 
    {
        name: 'choice',
        message:'Enter item id that you would like to select [Quit with Q]',
        type: 'input',

    }]).then(function(answers) {
        console.log(answers);
        var correct = false;
        if(answers.choice.toUpperCase()=="Q")
            process.exit();
    
        for (var i = 0; i<results.length;i++){
            if(results[i].product_name ==answers.choice){
                correct = true;
                var product = answers.choice;
                var id = i;
                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to buy?",
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then (function(answers){
                    if ((results[id].stock_quantity-answers.quantity)>0){
                        connection.query("UPDATE products SET stock_quantity ='"+(results[id].stock_quantity - answers.quantity) + "' WHERE product_name ='"+product +"'", function (error, results2, fields){
                            console.log("there is enough");
                            console.log("Your purchase was successful!");
                            makeTable();
                        

                    })
                }  else {
                    console.log("not enough!");
                    promptCustomer(results);
                }
                })
            }
        }
    })
}


    


